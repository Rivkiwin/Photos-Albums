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
import AddAlbum from './AddAlbum/AddAlbum';
import { useService } from '../ServiceProvider';
import { useAuth } from '../AuthProvider';



function Albums() {

    const [albums, setAlbums] = useState([]);
    const { albumService } = useService();
    const { currentUser } = useAuth();
    useEffect(() => {
        getAlbums();
    }, [])

    const getAlbums = async () => {

        albumService.find({params:{ userId: currentUser?.id }}).then(res => {
            if (!res) { return }
            console.log(res);
            
        })
    }

    return (
        <div>
            <div className='bg-secondary d-flex' style={{ height: '38px' }}>
                <h3 className='text-sm-center text-bg-secondary w-100'>ALbums</h3>
                <div className='m-1'><AddAlbum /></div>
            </div>


            <Accordion className='w-75 m-auto mt-5'>
                <Accordion.Item eventKey="0">
                    <Accordion.Header><div>
                        <div>My Albums</div>
                    </div></Accordion.Header>
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
            </Accordion></div>
    )
}

export default Albums;