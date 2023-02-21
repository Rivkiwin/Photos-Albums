import { url } from "inspector"
import React from "react"
import { Button, Card, OverlayTrigger, Tooltip } from "react-bootstrap"
import { Link, useLocation } from "react-router-dom"
import { IAlbum } from "../../interface/album"
import SharedAlbum from "./ShareAlbum"
function Album(props: { album: IAlbum }) {
    const album = props.album;
    return (
        <Card
            bg={"Dark".toLowerCase()}
            key={"Dark"}
            text='white'
            style={{ width: '18rem', m }}
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
            <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text>
                    <img src="https://via.placeholder.com/600/92c952" className="w-100"></img>
                    <SharedAlbum />
                    <Link className="btn btn-secondary btn btn-primary btn-sm m-1" to={{
                        pathname: `/${album.id}/Photos`,
                        state: album
                    }}>
                    Edit
                    </Link>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Album