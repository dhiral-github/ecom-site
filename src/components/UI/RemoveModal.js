import React from 'react';
import { Button, Image, Modal } from 'react-bootstrap';
import './removeModal.css';

const RemoveModal = (props) => {
  const { removeItem, show, onHide, deleteCartItem } = props
  const { id, title, image } = removeItem;

  return (
    <div>
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>
            Are you sure to delete this item?
          </h4>
          <div className='delete-item'>
            <Image src={image} style={{ width: '70px', }} />
            <div style={{ marginLeft: '13px' }}>{title}</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
          <Button onClick={() => deleteCartItem(id)}>REMOVE</Button>
        </Modal.Footer>

      </Modal>
    </div>
  )
}


export default RemoveModal;