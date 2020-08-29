import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Task from './Task'
import { Droppable } from 'react-beautiful-dnd';

export default function Column(props) {
  const tasks = props.tasks.map((task, index) => <Task key={task.id} task={task} index={index}></Task>)
  return (
 
    <Card>
      <Card.Body>
        <Card.Title>{props.column.title}</Card.Title>
        <Droppable droppableId={props.column.id}>
          {(provided) => (
            <CardGroup 
              ref={provided.innerRef}
              {...provided.droppableProps} 
              style={{display: "flex", flexDirection: "column", flexGrow: 1}}
            
            >
              {tasks}
              {provided.placeholder}
            </CardGroup>
          )}
        </Droppable>
      </Card.Body>
    </Card>
    

  )
}