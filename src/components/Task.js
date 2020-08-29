import React from 'react';
import Card from 'react-bootstrap/Card';
import { Draggable } from 'react-beautiful-dnd';

export default function Task(props) {
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided) => (
        <Card 
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {props.task.title}
        </Card>

      )}
    </Draggable>
  )
}