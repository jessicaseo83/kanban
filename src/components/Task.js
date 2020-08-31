import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import { Draggable } from 'react-beautiful-dnd';
import { BsFillTrashFill, BsCaretDownFill } from "react-icons/bs";
import AlertMsg from './AlertMsg';
import ChangeColumnModal from './ChangeColumnModal';
import './Task.css'


export default function Task(props) {
  const [contextMenu, setContextMenu] = useState({visible: false, x: 0, y: 0});
  const [changeColumnModal, setChangeColumnModal] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const contextMenuStyle={
    position: 'fixed',
    top: `${contextMenu.y}px`,
    left: `${contextMenu.x+5}px`
  }

  function showContextMenu(event) {
    event.preventDefault();
    const clickX = event.clientX;
    const clickY = event.clientY;
    setContextMenu(prev=>({...prev, visible: true, x: clickX, y: clickY}));
    const closeContextMenu = (event) => {
      event.preventDefault();
      setContextMenu({visible: false, x:0, y:0});
    }
    document.addEventListener('click', closeContextMenu);
  }

  function showColumnChangeModal(event){
    event.preventDefault();
    setChangeColumnModal(true);
  }

  return (
    <Draggable draggableId={props.task.id} index={props.index} >
      {(provided) => (
        <Accordion className="task-cards">

          <Card 
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="task-card"
            onContextMenu = {showContextMenu}
            >
            {contextMenu.visible === true &&
              <div className='custom-context' style={contextMenuStyle} onClick={showColumnChangeModal}>
                Move
              </div>
            }
            <ChangeColumnModal
              show={changeColumnModal}
              onHide={()=>setChangeColumnModal(false)}
              changeColumns={props.onColumnChange}
              columnNamesInOrder={props.columnNamesInOrder}
            />
            <Accordion.Toggle as={Card.Header} eventKey="0" className="task-header">
              <div className="delete-task-btn"><BsFillTrashFill onClick={() => setModalShow(true)}/></div>
              <AlertMsg
                show={modalShow}
                onHide={() => setModalShow(false)}
                deleteComp={props.onDelete}
              />
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