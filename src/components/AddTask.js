import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';


export default function AddTask(props) {
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');

  function addEvent(event) {
    event.preventDefault();
    props.onAdd(title, detail);
    setTitle('');
    setDetail('');
  }

  return (
    <Accordion defaultActiveKey="1">
    <Card>
    <Accordion.Toggle as={Card.Header} eventKey="0">+</Accordion.Toggle>
    <Accordion.Collapse eventKey="0" >
      <Form>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control value={title} onChange={e=>setTitle(e.target.value)}/>
        </Form.Group>
        <Form.Group controlId="detail">
          <Form.Label>Description</Form.Label>
          <Form.Control value={detail} onChange={e=>setDetail(e.target.value)} as="textarea" rows="3" />
        </Form.Group>
        <Accordion.Toggle eventKey="0" as={Button} onClick={addEvent}>
          Add
        </Accordion.Toggle>
      </Form>
      </Accordion.Collapse>
    </Card>
    </Accordion>
  )
}