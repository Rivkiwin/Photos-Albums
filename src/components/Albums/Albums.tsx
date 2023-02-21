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
import { ListGroup } from 'react-bootstrap';



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
        <div className='d-grid w-75 mt-1 albumsList m-auto'>
                {albums.map((album: IAlbum, index) => <div>
                    <Album album={album}></Album></div>)}
        </div>
    )
}

export default Albums;