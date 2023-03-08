import React, { useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Permissions } from '../../interface/album';
import { useService } from '../ServiceProvider';
import DeleteModal from './DeleteModal';

function Photo({ photo, permissions, triggerReload }: { photo: any, permissions: Permissions, triggerReload: any }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { photoService } = useService();
    let title = '';

    const deletePhoto = () => {
        photoService.delete(photo._id).then(res => {
            triggerReload(true);
        })
        handleClose();
    }

    const save = () => {
        photoService.update({ ...photo, title }, photo._id)
            .then(res => {
                triggerReload(true)
            })
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
                style={{
                    overflowY: 'scroll',
                    maxHeight: '98vh'
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Photo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className='mb-1 d-flex align-items-center'>
                        <Form.Label className='m-1'>title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Photo Title"
                            defaultValue={photo.title}
                            disabled={!permissions.add}
                            onChange={(event) => { title = event.target.value }}
                        /></Form.Group>
                    <img className="d-block w-100 m-auto"
                        src={photo.url}
                        alt={photo.title} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary btn-sm" onClick={save} disabled={!permissions.delete}>
                        Save
                    </Button>
                    <DeleteModal deleteFunction={deletePhoto.bind(null, photo.id)}
                        itemType="photo"
                        disabled={!permissions.add} />
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Photo