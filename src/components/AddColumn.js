import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import './AddColumn.css';

export default function AddColumn(props) {
  const [title, setTitle] = useState('');
  function addEvent(event) {
    event.preventDefault();
    props.onAdd(title);
    setTitle('');
  }

  return (
    <Accordion className="add-columns">
      <Card>
      <Accordion.Toggle className="add-column" as={Card.Header} eventKey="0"> <BsFillPlusCircleFill /> </Accordion.Toggle>
      <Accordion.Collapse eventKey="0" >
      <Form className="add-column-form">
        <Form.Group controlId="column-title">
          <Form.Label>New Column Name</Form.Label>
          <Form.Control value={title} onChange={e=>setTitle(e.target.value)}/>
        </Form.Group>
        <div className="add-column-btn">
        <Accordion.Toggle className="add-column-confirm" eventKey="0" as={Button} size="sm" onClick={addEvent}>
          Add column
        </Accordion.Toggle>
        </div>
       
      </Form>
      </Accordion.Collapse>
      </Card>
    </Accordion>
  )
}