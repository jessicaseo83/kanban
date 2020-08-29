import React, { useState } from 'react';
import Header from './components/Navbar';
import './styles/index.css';
import initialData from './data/Initialdata';
import Column from './components/Column';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';


function App() {
  const [ data, setData ] = useState(initialData);
  
  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result; 

    if(!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === 'column') {
      const newColumnOrder = Array.from(data.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newData = {
        ...data,
        columnOrder: newColumnOrder,
      }
      setData(newData);
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

  const newTask = (id, title, detail) => {
    const generateId = Math.random() * 3333;
    const newId = generateId();
    const newData = {
      tasks: {
        ...data.tasks,
        [newId]: {
          id: newId,
          title: title,
          detail: detail,
        }
      },
      columns: {
        ...data.columns,
        [id]: {
          ...data.columns[id],
          taskIds: [...data.columns[id].taskIds, newId]
        }
      }

    }
    console.log(newData);
    setData(newData);
  }

  return (
    <div className="App" id='pdf'>
      <Header />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-colums" direction="horizontal" type="column">
          {provided => (
            <div style={{display: "flex"}} 
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {data.columnOrder.map((columnId, index) => {
                const column = data.columns[columnId];
                const tasks = column.taskIds.map(taskId => data.tasks[taskId])
    
                return <Column key={column.id} column={column} tasks={tasks} index={index} newTask={newTask}/>
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
