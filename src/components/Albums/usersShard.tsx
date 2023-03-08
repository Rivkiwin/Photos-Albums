import { User } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { Button, Offcanvas } from 'react-bootstrap';
import { Permissions } from '../../interface/album';
import { useAuth } from '../AuthProvider';
import { useService } from '../ServiceProvider';
import DeleteModal from './DeleteModal';
import SharedAlbum from './ShareAlbum';

type SharedWith = Permissions & { addByUserName: string, userName: string };

export function UsersShared({ permissions }: { permissions: Permissions }) {
    const [show, setShow] = useState(false);
    const [shareds, setShared] = useState<SharedWith[]>([]);
    const { permissionsService, allUsers } = useService();
    const { currentUser } = useAuth();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function deletePermissions(id: string) {
        permissionsService.delete(id).then(getPermissions )
    }
   function getPermissions() {
        permissionsService.find({ albumId: permissions.albumId }).then(res => {
            if (res?.data) {
                const sharedUsers = res.data.map((permissions: Permissions) => {
                    const addBy = allUsers.find(user => user.uid === permissions.addBy);
                    const userName = allUsers.find(user => user.uid === permissions.userId);
                    permissions.updatedAt = new Date(permissions.updatedAt).toISOString().split('T')[0];
                    return { ...permissions, addByUserName: addBy?.displayName || addBy?.email, userName: userName?.displayName || userName?.email };
                });

                console.log(sharedUsers);
                setShared(sharedUsers);
            }
        })
    }

    useEffect(() => {
      getPermissions();
    }, [])

    return (
        <>
            <Button variant="outline-light" size="sm" onClick={handleShow} className="ml-1">
                Shared With
            </Button>
            <Offcanvas show={show} onHide={handleClose} placement={'end'}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Shared With</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {shareds.map(shared =>
                        <div id={shared._id} className='text-center border-bottom'>
                            <div className='m-1'>
                                <div><b>{shared.userId !== currentUser?.uid ? shared.userName : 'me'}</b></div>
                                <div> <span>shared by {shared.addByUserName} at {shared.createdAt.split('T')[0]}</span></div>
                                <span>update at {shared.updatedAt.split('T')[0]}</span>
                            </div>
                            {permissions.editPermissions && <div>
                                <SharedAlbum albumId={permissions.albumId} method='edit' permission={shared}></SharedAlbum>
                                <DeleteModal disabled={!permissions.editPermissions} itemType='permissions' deleteFunction={() => deletePermissions(shared._id)}/>
                            </div>}
                        </div>
                    )}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}