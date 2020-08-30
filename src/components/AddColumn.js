import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function AddColumn(props) {
  const [title, setTitle] = useState('');
  function addEvent(event) {
    event.preventDefault();
    props.onAdd(title);
    setTitle('');
  }

  return (
    <Accordion>
      <Card>
      <Accordion.Toggle as={Card.Header} eventKey="0">+</Accordion.Toggle>
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