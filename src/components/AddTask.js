import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';


export default function AddTask(props) {
  const title = "hello";
  const detail = "bye";

  function addEvent(event) {
    event.preventDefault();
    props.onAdd(title, detail)
  }

  return (
    <Accordion defaultActiveKey="1">
    <Card>
    <Accordion.Toggle as={Card.Header} eventKey="0">+</Accordion.Toggle>
    <Accordion.Collapse eventKey="0">
      <Form>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control placeholder="title" />
        </Form.Group>
        <Form.Group controlId="detail">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows="3" />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={addEvent}>Add</Button>
      </Form>
      </Accordion.Collapse>
    </Card>
    </Accordion>
  )
}