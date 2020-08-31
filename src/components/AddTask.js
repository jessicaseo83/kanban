import React, { useState, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import './AddTask.css'

export default function AddTask(props) {
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const node = useRef();

  function addEvent(event) {
    event.preventDefault();
    props.onAdd(title, detail);
    setTitle('');
    setDetail('');
  }
  const cancelEvent = (event) => {
    event.preventDefault();
    setTitle('');
    setDetail('');
  }

  return (
    <Accordion className="add-task-dropdown" ref={node}>
    <Card>
    <Accordion.Toggle className="add-task" as={Card.Header} eventKey="0"> <BsFillPlusCircleFill /> </Accordion.Toggle>
    <Accordion.Collapse eventKey="0" >
      <Form className="add-task-form">
        <Form.Group controlId={`editTitleForColumn${props.columnId}`}>
          <Form.Label>Task Title</Form.Label>
          <Form.Control value={title} onChange={e=>setTitle(e.target.value)}/>
        </Form.Group>
        <Form.Group controlId={`addTaskDetailColumn${props.columnId}`}>
          <Form.Label>Description</Form.Label>
          <Form.Control value={detail} onChange={e=>setDetail(e.target.value)} as="textarea" rows="3" />
        </Form.Group>
        <div className="add-task-btn">
        <Accordion.Toggle className="add-task-confirm" eventKey="0" as={Button} size="sm" onClick={addEvent}>
          Add Task
        </Accordion.Toggle>
        <Accordion.Toggle className="add-task-confirm" eventKey="0" as={Button} size="sm" onClick={cancelEvent}>
          Cancel
        </Accordion.Toggle>
        </div>
      </Form>
      </Accordion.Collapse>
    </Card>
    </Accordion>
  )
}