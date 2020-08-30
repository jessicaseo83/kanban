import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { FormControl } from 'react-bootstrap';

export default function ChangeColumnModal(props) {
  return(
    <Modal
      show={props.show}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Are you sure??
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Change column to:
        </p>
        <FormControl>

      
        </FormControl>
      </Modal.Body>
      <Modal.Footer>
      <Button onClick={props.deleteComp}>Delete</Button>
        <Button onClick={props.onHide}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  )
}