import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function ChangeColumnModal(props) {
  const [columnToChange, setColumnToChange] = useState(null);

  const menuChangeDropdown = props.columnNamesInOrder.map((columnObject)=>(
      <option value={columnObject.columnId} key={`dropdown-${columnObject.columnName}`}>
        {columnObject.columnName}
      </option> 
    )
  )
  
  const handleSubmit = function(){
    if (columnToChange === null) {
      props.onHide();
    } else {
      props.changeColumns(columnToChange);
    }
  }

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
          <Form.Control as="select" onChange={e=>setColumnToChange(e.target.value)}>
            <option>select:</option>
            {menuChangeDropdown}
          </Form.Control>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit}>Change</Button>
        <Button onClick={props.onHide}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  )
}