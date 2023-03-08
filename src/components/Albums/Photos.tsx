import React, { useState, useEffect, useRef } from 'react';
import { Button, Carousel, Col, Form, Nav, Navbar, Row } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';

import { Link, useLocation, useParams } from 'react-router-dom';
import { IAlbum, IPhoto } from '../../interface/album';
import { useAuth } from '../AuthProvider';
import { useService } from '../ServiceProvider';
import Photo from './Photo';
import { UsersShared } from './usersShard';
import { getDownloadURL, ref as storageRef, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../services/config/fireBase';
import NavBar from '../Application';
import AddAlbum from './AddAlbum/AddAlbum';
import { AlbumService } from '../../services/AlbumService';



function Photos() {

    const { state } = useLocation();
    let { album, permissions }: any = state;
    const { id } = useParams<any>();
    const [data, setData] = useState<IPhoto[]>([]);
    const [method, setMethod] = useState<'show' | 'edit'>('show');
    const [progress, setProgress] = useState<any>(0);
    const [showProgress, setShowProgress] = useState<any>(false);
    const [reload, triggerReload] = useState(true);
    const [photos, setPhotos] = useState<IPhoto[]>([]);

    const { currentUser, setLoading } = useAuth();
    const { photoService, albumService, permissionsService } = useService();
    const searchRef = useRef<any>();
    let albumTitle = '';


    function flitterPhotos() {
        setPhotos(data.filter(photo => photo.title.includes(searchRef.current.value)))
        console.log(searchRef.current.value)
    }

    useEffect(() => {
        if (!album && currentUser) {
            albumService.getById(id).then(
                res => album = res?.data
            );
            permissionsService.find({ albumId: id, userId: currentUser?.uid }).then(res => {
                permissions = res?.data
            })
        }
    }, [currentUser])

    useEffect(() => {
        if (currentUser && reload) {
            setLoading(true)
            getPhotos();
            triggerReload(false);
            albumTitle = album.title
        }
    }, [reload, currentUser]);

    const getPhotos = async () => {
        photoService.find({ albumId: album._id }).then(res => {
            setData(res?.data);
            setPhotos(res?.data)
            setTimeout(setLoading(false), 5000)
        })

    }

    useEffect(() => {
        if (progress && progress < 100 && !showProgress) {
            setShowProgress(true);
        }
        if (progress >= 100) {
            setShowProgress(false);
            setProgress(0)
        }
    }, [progress])

    function uploadPhoto(e: any) {
        setProgress(0);
        setShowProgress(true);
        let images = Array.from(e.target.files);
        images.map(async (photo: any, index: number) => {
            console.log(progress, showProgress);

            const _storageRef = storageRef(storage, `/photo/${photo.name}`);
            const uploadTask = uploadBytesResumable(_storageRef, photo);
            uploadTask.on(
                "state_changed",
                (snapshot) => {

                    // update progress
                    const _progress = (((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed()) as any / images.length + index * 100 / images.length;
                    console.log(_progress, progress);

                    setProgress(progress + _progress)
                },
                error => console.log(error.code),
            );
            await uploadTask;
            setLoading(true);
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            photoService.create({ url, albumId: album._id, title: '' }).then(() => triggerReload(true));
        });
        setShowProgress(false);
    }
    const save = () => {
        albumService.update({ ...album, title: albumTitle }, album._id).then(
            res => {
                album.title = albumTitle;
                setMethod('show')
            }
        )
    }

    return (
        <div>
            <NavBar>
                <Navbar.Brand className='text-white'>
                    <Link to="/Albums" className='text-white text-decoration-none'>Albums/</Link>{album.title}</Navbar.Brand>
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
                    onClick={flitterPhotos}>Search</Button>
                <Nav.Link className='m-1'> <Button variant="outline-light" size="sm" disabled={!permissions.add}>
                    <input className='' multiple
                        style={{
                            opacity: 0, width: '0px', position: 'absolute'
                        }}
                        type={'file'}
                        accept="image/*"
                        id="photo_uploads"
                        onChange={uploadPhoto}
                    />
                    <label htmlFor="photo_uploads" className='m-0' style={{ cursor: 'pointer' }}>Add Photo</label></Button>
                    <Button variant="outline-light ml-1" size="sm" disabled={!permissions.add} onClick={() => setMethod('edit')}>Edit Title</Button>
                    <UsersShared permissions={permissions}></UsersShared></Nav.Link>

            </NavBar>
            <div className='m-auto text-center w-75 mt-3'>
                {showProgress && <ProgressBar now={progress} label={`${progress}%`} className='mt-5' />}

                {method === 'edit' && <Form.Group className='mb-2'>
                    <Form.Label>Album Title</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Album Title"
                        defaultValue={album.title}
                        onChange={(event) => albumTitle = event.target.value}
                    />
                    <Button variant="outline-secondary" size="sm"  className='mt-2' onClick={save}>Save</Button>
                </Form.Group>}
                <Carousel className='w-75 h-25 m-auto mt-5 bg-dark'
                    pause="hover">
                    {data.map((img: any) => {
                        return <Carousel.Item interval={2000}
                            style={{ height: '300px' }}>
                            <img className="d-block h-100 m-auto"
                                src={img.url}
                                alt={img.title} />
                            <Carousel.Caption>
                                <p className='ellipsis'>{img.title}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    })}
                </Carousel >
                <div className='w-75 m-auto mt-5'>
                    <Row xs={2} md={4} lg={6} className="bg-dark">
                        {photos.map((img: any) => {
                            return <>
                                <Col className='p-1 h-100'>
                                    <Photo permissions={permissions} triggerReload={triggerReload} photo={img}></Photo>
                                </Col>
                            </>
                        })}
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default Photos;