import React from 'react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import { Draggable } from 'react-beautiful-dnd';
import { BsFillTrashFill, BsCaretDownFill } from "react-icons/bs";
import './Task.css'


export default function Task(props) {
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided) => (
        <Accordion className="task-cards">

          <Card 
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="task-card"
            >
            <Accordion.Toggle as={Card.Header} eventKey="0">
              <div className="delete-task-btn"><BsFillTrashFill  onClick={props.onDelete}/></div>
              <h5>{props.task.title}</h5>
              <div className="open-detail-btn"><BsCaretDownFill /></div>
              </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                {props.task.detail}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>

      )}
    </Draggable>
  )
}