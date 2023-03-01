import { type } from 'os';
import React, { InputHTMLAttributes, useCallback, useEffect, useRef, useState } from 'react'
import { Form, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ChooseImg from './ChooseImg';

function AddAlbum() {
    let shareDetails: { name: string, permission: number } = {} as any;
    const [show, setShow] = useState(false);
    const [isDirty, setDirty] = useState(false);
    const [images, setImages] = useState<any>();
    const [title, setTitle] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const addImages = (img: any) => {
        setImages(img);
        console.log(img);
    };

    function save() {
    }

    function handleChangeSubmit() {
        console.log(shareDetails);
    }

    return (
        <>
            <Button variant="outline-light" size="sm" onClick={handleShow}>
                Add Album
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Album</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Label>Album Title</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control type="text"
                            required
                            size="sm" 
                            isInvalid={isDirty && title === ''}
                            name='title'
                            placeholder={'Album Title'}
                            onChange={(event) => {setDirty(true); setTitle(event.target.value) }} />
                        <Form.Control.Feedback
                            type="invalid">
                            Please enter album title. {isDirty}
                        </Form.Control.Feedback>
                    </InputGroup>
                    <ChooseImg setImages={addImages} images={images} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary btn-sm" onClick={save}>
                        Save
                    </Button>
                    <Button variant="secondary btn-sm" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>)
}

export default AddAlbum