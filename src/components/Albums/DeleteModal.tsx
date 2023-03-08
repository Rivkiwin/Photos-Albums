import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export type ItemType = 'photo' | 'album' | 'permissions'

function DeleteModal({ deleteFunction, itemType, disabled }: { deleteFunction: any, itemType: ItemType, disabled: boolean }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-secondary"
        onClick={handleShow}
        className="btn-sm"
        disabled={disabled}>
        Delete
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className={'bg-dark text-white'}>
          <Modal.Title>Delete {itemType}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={'bg-dark text-white'}>
          Are you sure you want to delete?
        </Modal.Body>
        <Modal.Footer className={'bg-dark text-white'}>
          <Button variant="outline-light btn-sm" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="outline-light  btn-sm" onClick={() => { handleClose(); deleteFunction() }}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal