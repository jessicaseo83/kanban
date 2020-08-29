import React, {useState} from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Task from './Task'
import { Droppable, Draggable } from 'react-beautiful-dnd';
import AddTask from './AddTask';

export default function Column(props) {
  const tasks = props.tasks.map((task, index) => <Task key={task.id} task={task} index={index}></Task>)
  const [columnName, setColumnName] = useState(props.column.title);
  const [edit, setEdit] = useState(false);
  const handleSubmit = () => {
    props.editColumnName(columnName);
    setEdit(false)
  }
  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => (
        <Card {...provided.draggableProps} ref={provided.innerRef}>
        <Card.Body>
          {edit === true &&
            <>
              <Form.Control value={columnName} onChange={e=>setColumnName(e.target.value)}/>
              <Button onClick={handleSubmit}>Submit</Button>
              <Button onClick={()=>setEdit(false)}>Close</Button>
            </>
          }
          {edit === false &&
            <>
              <Card.Title {...provided.dragHandleProps}>{columnName}</Card.Title>
              <Button onClick={()=>setEdit(true)}>Edit</Button>
            </>
          }
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