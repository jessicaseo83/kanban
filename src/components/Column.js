import React, {useState} from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Task from './Task'
import { Droppable, Draggable } from 'react-beautiful-dnd';
import AddTask from './AddTask';
import { BsFillTrashFill, BsPencil } from "react-icons/bs";
import AlertMsg from './AlertMsg';
import './Column.css'

export default function Column(props) {
  const tasks = props.tasks.map((task, index) => <Task key={task.id} task={task} index={index} onDelete={() => props.deleteTask(task.id, props.column.id)}></Task>)
  const propTasks = props.column.title;
  const [columnName, setColumnName] = useState(props.column.title);
  const [edit, setEdit] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const handleSubmit = () => {
    props.editColumnName(columnName);
    setEdit(false);
  }

  const handleClose = () => {
    setColumnName(propTasks);
    setEdit(false);
  }
  
  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => (
        <Card {...provided.draggableProps} ref={provided.innerRef}className="columns" style={{ width: '18rem' }}>
        
          {edit === true &&
            <>
              <Card.Header {...provided.dragHandleProps} className="card-header">
                <Form.Control value={columnName} onChange={e=>setColumnName(e.target.value)}/>
              </Card.Header>
              <Button onClick={handleSubmit}>Submit</Button>
              <Button onClick={handleClose}>Close</Button>
            </>
          }
          {edit === false &&
            <>
             
              <Card.Header {...provided.dragHandleProps} className="card-header">
                <div className="edit-delete-btn">
                  <BsPencil onClick={()=>setEdit(true)}>Edit</BsPencil>
                  <BsFillTrashFill onClick={() => setModalShow(true)}/>
                  {/* <AlertMsg
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    deleteColumn={() => props.deleteColumn(props.column.id)}
                  /> */}
                </div>
                <h3>{columnName}</h3>
              </Card.Header>
            </>
          }
          <Card.Body className="card-body">
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
          <AddTask columnId={props.column.id} onAdd={(title, detail) => props.newTask(props.column.id, title, detail)}/>
        </Card.Body>
      </Card>
      )}
    </Draggable>
    
    

  )
}