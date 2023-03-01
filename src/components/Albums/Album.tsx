import { url } from "inspector"
import React, { useContext } from "react"
import { Button, Card, OverlayTrigger, Tooltip } from "react-bootstrap"
import { Link, useLocation } from "react-router-dom"
import { IAlbum } from "../../interface/album"
import { useService } from "../ServiceProvider"
import DeleteModal from "./DeleteModal"
import SharedAlbum from "./ShareAlbum"
function Album(props: { album: IAlbum }) {

    const { albumService } = useService()

    const album = props.album;
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
                    <Tooltip id={`tooltip-top`}> {album.title} </Tooltip>
                }>
                <Card.Header className="album-title">{album.title}</Card.Header>
            </OverlayTrigger>

            <Link to={{
                pathname: `./${album.id}`,
                state: album
            }}>
                <Card.Body>
                    <Card.Title></Card.Title>
                    <Card.Text>
                        <div className="w-100 d-flex"> <img src="https://via.placeholder.com/600/92c952" className="w-50 m-auto"></img>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Link>
            <Card.Footer>
                <div className="modal-footer">
                     <SharedAlbum />
                    <DeleteModal deleteFunction={albumService.delete.bind(null, album.id)} itemType="album" disabled={false}></DeleteModal>
                </div>
            </Card.Footer>
        </Card >
    )
}

export default Album