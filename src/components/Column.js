import React, {useState, useEffect} from 'react';
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
  const tasks = props.tasks.map((task, index) => (<Task key={task.id} task={task} index={index} onColumnChange={(columnId)=>props.onColumnChange(props.column.id, columnId, task.id)} columnNamesInOrder={props.columnNamesInOrder} onDelete={() => props.deleteTask(task.id, props.column.id)}></Task>))
  const propTasks = props.column.title;
  const [columnName, setColumnName] = useState(props.column.title);
  const [edit, setEdit] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const handleSubmit = () => {
    props.editColumnName(columnName);
    setEdit(false);
  }

  const handleClose = () => {
    setColumnName(propTasks);
    setEdit(false);
  }
  
  useEffect(()=>{
    window.addEventListener('resize', ()=>setWindowSize(window.innerWidth));
    
    }, []);
    
  let isDragDisabled = windowSize <= 620;
  return (
    <Draggable draggableId={props.column.id} index={props.index} isDragDisabled={isDragDisabled}>
      {(provided) => (
        <Card {...provided.draggableProps} ref={provided.innerRef} className="columns" >
          
          {edit === true &&
            <>
              <Card.Header {...provided.dragHandleProps} className="card-header">
                <Form.Control value={columnName} onChange={e=>setColumnName(e.target.value)}/>
              <div className="column-edit">
              <Button className="column-edit-btn" size="sm" onClick={handleSubmit}>Submit</Button>
              <Button className="column-edit-btn" size="sm" onClick={handleClose}>Close</Button>
              </div>
              </Card.Header>
            </>
          }
          {edit === false &&
            <>
             
              <Card.Header {...provided.dragHandleProps} className="column-header">
                <div className="edit-delete-btn">
                  <BsPencil onClick={()=>setEdit(true)}>Edit</BsPencil>
                  <BsFillTrashFill onClick={() => setModalShow(true)}/>
                  <AlertMsg
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    deleteComp={() => props.deleteColumn(props.column.id)}
                  />
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
              className="task-list"
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