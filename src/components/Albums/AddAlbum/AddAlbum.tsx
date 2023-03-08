import { type } from 'os';
import React, { InputHTMLAttributes, useCallback, useEffect, useRef, useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { Form, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ChooseImg from './ChooseImg';
import { storage } from '../../../services/config/fireBase';
import { useService } from '../../ServiceProvider';
import { useAuth } from '../../AuthProvider';
import { Permissions } from '../../../interface/album';

function AddAlbum({ reloadAlbums }: any) {
    const [show, setShow] = useState(false);
    const [isDirty, setDirty] = useState(false);
    const [images, setImages] = useState<any[]>();
    const [title, setTitle] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { albumService } = useService();
    const { currentUser } = useAuth();

    const photoRef = useRef<any>(null)


    function save() {
        albumService.create({ title, createBy: currentUser?.uid }).then(res => {
            if (res) {
                photoRef.current.uploadPhotos(res.data._id);
                handleClose();
            }
        })
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
                            onChange={(event) => { setDirty(true); setTitle(event.target.value) }} />
                        <Form.Control.Feedback
                            type="invalid">
                            Please enter album title. {isDirty}
                        </Form.Control.Feedback>
                    </InputGroup>
                    <ChooseImg ref={photoRef} triggerReload={reloadAlbums} />
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