import { url } from "inspector"
import React, { useContext, useEffect, useState } from "react"
import { Button, Card, OverlayTrigger, Tooltip } from "react-bootstrap"
import { Link, useLocation } from "react-router-dom"
import { IAlbum } from "../../interface/album"
import { useAuth } from "../AuthProvider"
import { useService } from "../ServiceProvider"
import DeleteModal from "./DeleteModal"
import SharedAlbum from "./ShareAlbum"
function Album(props: { album: { album: IAlbum, permissions: Permissions }, isOwner: boolean, triggerReload: any }) {
    const [permissions, setPermissions] = useState<any>();
    const [album, setAlbum] = useState<IAlbum>();

    const { currentUser } = useAuth();
    const { albumService, allUsers } = useService();

    function deleteAlbum() {
        albumService.delete(album?._id || '').then(
            res => props.triggerReload(true)
        )
    }


    useEffect(() => {
        if (props.isOwner) {
            const ownerPermission = {
                albumId: (props.album as any)._id,
                delete: true,
                editPermissions: true,
                add: true,
                share: true
            }
            setAlbum((props.album) as unknown as IAlbum)
            setPermissions(ownerPermission);
        } else {
            setAlbum(props.album.album)
            setPermissions(props.album.permissions);
        }

    }, [currentUser])



    return (
        <Card
            bg={"Dark".toLowerCase()}
            key={"Dark"}
            text='white'
            className="mb-2"
        >
            <OverlayTrigger
                key={"top"}
                placement={"top"}
                overlay={
                    <Tooltip id={`tooltip-top`}> {album?.title} </Tooltip>
                }>
                <Card.Header className="album-title">{album?.title}</Card.Header>
            </OverlayTrigger>

            <Link className="text-white text-decoration-none" to={{
                pathname: `./${album?._id}`,
                state: { album, permissions }
            }}>
                <Card.Body>
                    <Card.Text className="text-white text-decoration-none">
                        <div>create by {allUsers.find(user => user.uid === album?.createBy)?.displayName}</div>
                        <div>create at {album?.createdAt.split('T')[0]}</div>
                        <div>update at {album?.updatedAt.split('T')[0]}</div>
                    </Card.Text>
                </Card.Body>
            </Link>
            <Card.Footer>
                <div className="modal-footer">
                    {permissions?.editPermissions && <SharedAlbum albumId={album?._id || ''} />}
                    <DeleteModal deleteFunction={deleteAlbum} itemType="album" disabled={!permissions?.delete}></DeleteModal>
                </div>
            </Card.Footer>
        </Card >
    )
}

export default Album