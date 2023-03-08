import { collection, getDocs, query, where } from 'firebase/firestore';
import { type } from 'os';
import React, { useEffect, useState } from 'react'
import { Form, FormSelect } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Permissions } from '../../interface/album';
import { db } from '../../services/config/fireBase';
import { useAuth } from '../AuthProvider';
import { useService } from '../ServiceProvider';

function SharedAlbum({ albumId, method = 'create', permission }: { albumId: string, permission?: Permissions, method?: 'create' | 'edit' }) {
    const [show, setShow] = useState(false);
    const { currentUser, allUsers } = useAuth();
    const { permissionsService, authService, } = useService();
    const handleShow = () => setShow(true);
    const [users, setUsers] = useState<any[]>()
    const [permissions, setPermissions] = useState<any>({ addBy: currentUser?.uid });

    const handleClose = () => {
        setShow(false);
        setPermissions({ addBy: currentUser?.uid })
    };


    function handleChange(e: any) {
        const target = e.target
        setPermissions({ ...permissions, [target.name]: target.type === 'checkbox' ? target.checked : target.value });
    }

    async function handleChangeSubmit(e: any) {
        e.preventDefault();
        if (method === 'create') {
            permissionsService.create({ ...permissions, albumId })
        }
        if (method === 'edit') {
            permissionsService.update({ ...permissions, albumId }, permission?._id as string)
        }
        handleClose();
    }

    useEffect(() => {
        if (!currentUser) { return }
        authService.listAllUsers().then((res: any) => {
            setUsers(allUsers || []);
        });
    }
        , [allUsers])

    return (
        <>
            <Button variant="secondary" size="sm" className='m-1' onClick={handleShow}>
                {method === 'create' && <span>Share Album</span>}
                {method === 'edit' && <span>Edit</span>}</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    {method === 'create' && <Modal.Title>Share Album</Modal.Title>}
                    {method === 'edit' && <Modal.Title>Edit</Modal.Title>}
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleChangeSubmit}>
                        <div className="mb-3">
                            <FormSelect onChange={handleChange} name='userId'
                                required
                                disabled={method === 'edit'}>
                                <option value={0}>Select User</option>
                                {users?.map(user => {
                                    return (user.uid !== currentUser?.uid || method === 'edit') &&
                                        <option key={user.uid} selected={permission?.userId === user.uid} value={user.uid}>{user.displayName}</option>
                                })}
                            </FormSelect>
                        </div>
                        <div key={`inline-checkbox`} className="mb-3">
                            <div> <label>Permission</label></div>
                            <Form.Check
                                inline
                                className='d-inline-flex'
                                label="Add/Edit Photos"
                                name="add"
                                type="checkbox"
                                id={`inline-checkbox-2`}
                                defaultChecked={permission?.add}
                                onChange={handleChange}
                            />
                            <Form.Check
                                inline
                                name='share'
                                className='d-inline-flex'
                                label="Share"
                                type="checkbox"
                                value={'true'}
                                defaultChecked={permission?.share}
                                id={`inline-checkbox-3`}
                                onChange={handleChange}

                            />
                            <Form.Check
                                inline
                                name='delete'
                                label="Delete"
                                value={'true'}
                                className='d-inline-flex'
                                type="checkbox"
                                defaultChecked={permission?.delete}
                                id={`inline-checkbox-4`}
                                onChange={handleChange}
                            />
                            <Form.Check
                                inline
                                name='editPermissions'
                                label="Edit Permissions"
                                value={'true'}
                                className='d-inline-flex'
                                type="checkbox"
                                defaultChecked={permission?.delete}
                                id={`inline-checkbox-5`}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-secondary" disabled={!permissions?.userId && !permission?.userId || permissions?.userId =='0'}>
                                Save
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>)
}

export default SharedAlbum