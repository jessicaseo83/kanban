import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Task from './Task'
import { Droppable, Draggable } from 'react-beautiful-dnd';
import AddTask from './AddTask';


export default function Column(props) {
  const tasks = props.tasks.map((task, index) => <Task key={task.id} task={task} index={index} onDelete={() => props.deleteTask(task.id, props.column.id)}></Task>)
  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => (
        <Card {...provided.draggableProps} ref={provided.innerRef}>
        <Card.Body>
          <Card.Title {...provided.dragHandleProps}>{props.column.title}</Card.Title>
          <Droppable droppableId={props.column.id} type="task">
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
          <AddTask onAdd={(title, detail) => props.newTask(props.column.id, title, detail)}/>
        </Card.Body>
      </Card>
      )}
    </Draggable>
    
    

  )
}