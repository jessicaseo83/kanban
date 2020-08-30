import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import ContextMenu from './ContextMenu';
import { Draggable } from 'react-beautiful-dnd';
import { BsFillTrashFill } from "react-icons/bs";


export default function Task(props) {
  const [contextMenu, setContextMenu] = useState({visible: false, x: 0, y: 0});
  const contextMenuStyle={
    position: 'absolute',
    top: `${contextMenu.y}px`,
    left: `${contextMenu.x+5}px`
  }

  function showContextMenu(event) {
    event.preventDefault();
    const clickX = event.clientX;
    const clickY = event.clientY;
    setContextMenu({visible: true, x: clickX, y: clickY});
    document.addEventListener('click', function(event) {
      event.preventDefault();
      setContextMenu({visible: false, x:0, y:0});
    })
  }

  return (
    <Draggable draggableId={props.task.id} index={props.index} >
      {(provided) => (
        <Accordion defaultActiveKey="1">

          <Card 
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onContextMenu = {showContextMenu}
            >
            {contextMenu.visible === true &&
              <div className='custom-context' id='text' style={contextMenuStyle}>
                <div className='custom-context-item'>
                  Move to a different column
                </div>
              </div>
            }
            <Accordion.Toggle as={Card.Header} eventKey="0">{props.task.title}<BsFillTrashFill onClick={props.onDelete}/></Accordion.Toggle>
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