import React, { useState } from 'react';
import Header from './components/Navbar';
import './styles/index.css';
import initialData from './data/Initialdata';
import Column from './components/Column';
import { DragDropContext } from 'react-beautiful-dnd';


function App() {
  const [ data, setData ] = useState(initialData);
  
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result; 

    if(!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];
    
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
          ...start,
          taskIds: newTaskIds,
        };

        const newData = {
          ...data,
          columns: {
            ...data.columns,
            [newColumn.id]: newColumn,
          }
        }

        setData(newData);
        return;
    }
    
    //Move to another column
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    }

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    }

    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      }
    }
    setData(newData);
  }

  return (
    <div className="App">
      <Header />
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{display: "flex"}} >
          {data.columnOrder.map(columnId => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map(taskId => data.tasks[taskId])

            return <Column key={column.id} column={column} tasks={tasks} />
          })}
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
