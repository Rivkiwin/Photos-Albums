import React, { useState, useEffect, useRef } from 'react';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import SharedAlbum from './ShareAlbum';
import Album from './Album';
import { IAlbum, Permissions } from '../../interface/album';
import { Accordion, Button, Form, ListGroup, Nav, Navbar } from 'react-bootstrap';
import AddAlbum from './AddAlbum/AddAlbum';
import { useService } from '../ServiceProvider';
import { useAuth } from '../AuthProvider';
import NavBar from '../Application'
import { link } from 'fs';
import { Link } from 'react-router-dom';



function Albums() {

    const [albums, setAlbums] = useState<IAlbum[]>([]);
    const [flittersAlbums, setFilter] = useState<IAlbum[]>([]);
    const [flitterShared, setFilterShared] = useState<{ album: IAlbum, permission: Permissions }[]>([]);

    const [shardAlbums, setShardAlbums] = useState<{ album: IAlbum, permission: Permissions }[]>([]);
    const [reload, triggerReload] = useState(false)

    const { albumService } = useService();
    const { currentUser } = useAuth();
    const searchRef = useRef<any>()

    function flitterAlbums() {
        setFilter(albums.filter(album => album.title.includes(searchRef.current.value)));
        setFilterShared(shardAlbums.filter(album => album.album.title.includes(searchRef.current.value)))
        console.log(searchRef.current.value)
    }

    useEffect(() => {

        if (currentUser) {
            getAlbums();
        }

    }, [currentUser])

    useEffect(() => {
        let isCancelled = false
        if (reload && !isCancelled) {
            getAlbums();
            triggerReload(false)
        }
        return () => {
            isCancelled = true;
        }
    }, [reload])

    const getAlbums = async () => {
        albumService.find({ createBy: currentUser?.uid }).then(res => {
            if (!res) { return }
            setFilter(res.data || []);
            setAlbums(res.data || []);
        });
        albumService.getSherd(currentUser?.uid).then(res => {
            setFilterShared(res?.data || [])
            setShardAlbums(res?.data || [])
        })
    }

    return (
        <div>

            <NavBar >
                <Navbar.Brand className='text-white'>Albums</Navbar.Brand>
                <Nav className="me-auto"></Nav>

                <Form className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="ml-1"
                        aria-label="Search"
                        ref={searchRef}
                        size='sm'
                    />
                </Form>
                <Button variant="outline-light" size="sm" className="ml-1"
                    onClick={flitterAlbums}>Search</Button>
                <Nav.Link className='m-1'><AddAlbum reloadAlbums={triggerReload} /></Nav.Link>
            </NavBar>

            <Accordion className='w-75 m-auto mt-5'>
                <Accordion.Item eventKey="0">
                    <Accordion.Header><div>
                        <div>My Albums</div>
                    </div></Accordion.Header>
                    <Accordion.Body>
                        <div className='d-grid mt-1 albumsList m-auto'>
                            {flittersAlbums.map((album: IAlbum, index) => <div id={album._id}>
                                <Album album={album as any} isOwner={true} triggerReload={triggerReload}></Album></div>)}
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Albums That Shared With Me</Accordion.Header>
                    <Accordion.Body>
                        <div className='d-grid albumsList m-auto'>
                            {flitterShared.map((album: any) => <div id={album?.album?._id}>
                                <Album triggerReload={triggerReload} album={album} isOwner={false}></Album></div>)}
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion></div>
    )
}

export default Albums;