import { type } from 'os';
import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function SharedAlbum() {
    let shareDetails: { name: string, permission: number } = {} as any;
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleChangeSubmit() {
        console.log(shareDetails);
    }

    return (
        <>
            <Button variant="primary" size="sm" onClick={handleShow} className="btn btn-secondary">
                Share Album
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Share Album</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleChangeSubmit}>
                        <div className="mb-3">
                            <label>User name</label>
                            <input
                                required
                                onChange={(event) => shareDetails.name = event.target.value}
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Enter name"
                            />
                        </div>
                        <div key={`inline-checkbox`} className="mb-3">
                           <div> <label>Permission</label></div>
                            <Form.Check
                                inline
                                className='d-inline-flex'
                                label="Delete Photos"
                                name="Delete Photos"
                                type={"checkbox"}
                                id={`inline-checkbox-1`}
                            />
                            <Form.Check
                                inline
                                className='d-inline-flex'
                                label="Add Photos"
                                name="group1"
                                type="checkbox"
                                id={`inline-checkbox-2`}
                            />
                            <Form.Check
                                inline
                                className='d-inline-flex'
                                label="View"
                                type="checkbox"
                                id={`inline-checkbox-3`}
                            />
                             <Form.Check
                                inline
                                label="Sharing"
                                className='d-inline-flex'
                                type="checkbox"
                                id={`inline-checkbox-4`}
                            />
                        </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-secondary">
                            Submit
                        </button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
        </>)
}

export default SharedAlbum