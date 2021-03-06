import React, { useState, useEffect } from 'react';

export default function ContextMenu(){
  const [state, setState] = useState({visible: false, x: 0, y: 0});
  

  
  const contextMenuStyle={
    position: 'absolute',
    top: `${state.y}px`,
    left: `${state.x+5}px`
  }
  if (state.visible === true) {
    return (
      <div className='custom-context' id='text' style={contextMenuStyle}>
        <div className='custom-context-item'>
          Move to a different column
        </div>
      </div>
    )
  } else return null;
}