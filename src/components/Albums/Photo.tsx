import React, { useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteModal from './DeleteModal';

function Photo({ photo, permissions }: { photo: any, permissions: { delete: boolean, edit: boolean } }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let title = '';

    const deletePhoto = () => {
        console.log('delete photo', photo.id);
        handleClose();

    }

    const save = () => {
        console.log(title);
        handleClose();
    }

    return (
        <>
            <Button variant="link">
                <img className="d-block w-100 m-auto"
                    onClick={handleShow}
                    src={photo.url}
                    alt={photo.title} />
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Photo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <Form.Group className='mb-1'>
                            <Form.Label>title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Photo Title"
                                defaultValue={photo.title}
                                disabled={!permissions.edit}
                                onChange={(event) => { title = event.target.value }}
                            /></Form.Group>
                    <img className="d-block w-100 m-auto"
                        src={photo.url}
                        alt={photo.title} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary btn-sm" onClick={save} disabled={!permissions.edit}>
                        Save
                    </Button>
                    <DeleteModal deleteFunction={deletePhoto.bind(null, photo.id)}
                        itemType="photo"
                        disabled={!permissions.edit} />
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Photo