import React, { useState, useEffect } from 'react';
import { Button, Carousel, Col, Form, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { IAlbum } from '../../interface/album';
import Photo from './Photo';


function Photos() {

    const { state } = useLocation();
    const album: any = state;
    const [data, setData] = useState([]);
    const [mode, setMode] = useState<'show' | 'edit'>('show');
    let albumTitle = ''

    useEffect(() => {
        getPhotos();
    }, []);

    const getPhotos = async () => {
        const allPho = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${album.id}`);
        const allPhotos = await allPho.json()
        let temp: any = [];
        console.log(allPho, allPhotos);

        for (let i = 0; i < allPhotos.length; ++i) {
            temp.push({ "image": allPhotos[i].thumbnailUrl, "caption": allPhotos[i].title });
        }
        setData(allPhotos);
    }

    const save = () => {
        console.log(albumTitle);
    }
    return (
        <div>
            <div className='bg-secondary d-flex justify-content-between pl-2 pr-1 align-items-center' style={{ height: '38px' }}>
                <h3 className='text-bg-secondary w-75 ellipsis m-0'>ALbum: {album.title}</h3>
                <div className='m-1'>
                    <Button variant="outline-light" size="sm">
                        <input className='' multiple
                            style={{ opacity: 0, width: '0px' }}
                            type={'file'}
                            accept="image/*"
                            id="photo_uploads"
                        />
                        <label htmlFor="photo_uploads" className='m-0'>Add Photo</label></Button>
                </div>
            </div>
            <div className='m-auto text-center w-75 mt-3'>
                {mode === 'edit' && <Form.Group>
                    <Form.Label>Album Title</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Album Title"
                        defaultValue={album.title}
                        onChange={(event) => albumTitle = event.target.value}
                    />
                </Form.Group>}
                <Carousel className='w-75 h-25 m-auto mt-5 bg-dark'
                    pause="hover">
                    {data.map((img: any) => {
                        return <Carousel.Item interval={2000}
                            style={{ height: '300px' }}>
                            <img className="d-block h-100"
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
                        {data.map((img: any) => {
                            return <><Col className='p-1 h-100'>
                                <Photo permissions={{ edit: true, delete: false }} photo={img}></Photo>
                            </Col>
                                <Col className='p-1'><img className="d-block w-100 m-auto" src='https://www.freedigitalphotos.net/images/img/homepage/394230.jpg'></img></Col>

                            </>
                        })}
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default Photos;