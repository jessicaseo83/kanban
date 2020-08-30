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
      <Accordion.Toggle className="add-task-btn" as={Card.Header} eventKey="0"> <BsFillPlusCircleFill /> </Accordion.Toggle>
      <Accordion.Collapse eventKey="0" >
      <Form>
        <Form.Group controlId="column-title">
          <Form.Label>Title</Form.Label>
          <Form.Control value={title} onChange={e=>setTitle(e.target.value)}/>
        </Form.Group>
        <Accordion.Toggle eventKey="0" as={Button} onClick={addEvent}>
          Add a column
        </Accordion.Toggle>
       
      </Form>
      </Accordion.Collapse>
      </Card>
    </Accordion>
  )
}