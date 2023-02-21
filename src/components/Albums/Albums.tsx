import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Link,
    useRouteMatch
} from "react-router-dom";
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import SharedAlbum from './ShareAlbum';
import Album from './Album';
import { IAlbum } from '../../interface/album';
import { Accordion, ListGroup } from 'react-bootstrap';



function Albums() {

    const [albums, setAlbums] = useState([]);
    let { url, path } = useRouteMatch();

    useEffect(() => {
        getAlbums();
    }, [])

    const getAlbums = async () => {
        const alb = await fetch(`https://jsonplaceholder.typicode.com/albums`);
        const allAlbums = await alb.json();
        setAlbums(allAlbums.sort((a: IAlbum, b: IAlbum) => a.title > b.title ? 1 : -1));
    }

    return (
        <Accordion className='w-75 m-auto mt-5'>
            <Accordion.Item eventKey="0">
                <Accordion.Header>My Albums</Accordion.Header>
                <Accordion.Body>
                    <div className='d-grid mt-1 albumsList m-auto'>
                        {albums.map((album: IAlbum, index) => <div>
                            <Album album={album}></Album></div>)}
                    </div>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Albums That Shared Me</Accordion.Header>
                <Accordion.Body>
                    <div className='d-grid albumsList m-auto'>
                        {albums.map((album: IAlbum) => <div>
                            <Album album={album}></Album></div>)}
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default Albums;