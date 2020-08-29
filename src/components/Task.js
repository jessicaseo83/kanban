import React from 'react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import { Draggable } from 'react-beautiful-dnd';

export default function Task(props) {
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided) => (
        <Accordion defaultActiveKey="1">

          <Card 
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            >
            <Accordion.Toggle as={Card.Header} eventKey="0">{props.task.title}</Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>{props.task.detail}</Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>

      )}
    </Draggable>
  )
}