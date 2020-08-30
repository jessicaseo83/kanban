import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function ChangeColumnModal(props) {

  const menuChangeDropdown = props.columnNamesInOrder.map((columnObject)=>(
      <option value={columnObject.columnId} key={`dropdown-${columnObject.columnName}`}>
        {columnObject.columnName}
      </option> 
    )
  )

  return(
    <Modal
      show={props.show}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={props.onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Move To Different Column
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group title="Column">
          <Form.Label>Column:</Form.Label>
          <Form.Control as="select">
            {menuChangeDropdown}
          </Form.Control>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.deleteComp}>Change</Button>
        <Button onClick={props.onHide}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  )
}