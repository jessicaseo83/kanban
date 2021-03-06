import React, { useState, useEffect } from 'react';
import Header from './components/Navbar';
import './styles/index.css';
import initialData from './data/Initialdata';
import Column from './components/Column';
import AddColumn from './components/AddColumn';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';


function App() {
  const [ data, setData ] = useState(window.localStorage.getItem('kanban') ? JSON.parse(window.localStorage.getItem('kanban')) : initialData);
  
  useEffect(()=> {
    localStorage.setItem('kanban', JSON.stringify(data))
  }, [data]);

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
    const newId = (Math.random() * 3333).toString();
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
      },
      columnOrder: [...data.columnOrder]
    }
    setData(newData);
  }

  const editColumnName = (columnId, newName) => {
    const newData = {
      tasks: {
        ...data.tasks
      },
      columns: {
        ...data.columns,
        [columnId]: {
          ...data.columns[columnId],
          title: newName
        }
      },
      columnOrder: [...data.columnOrder]
    }
    setData(newData);
  }

  const newColumn = (title) => {
    const newId = (Math.random() * 9999).toString();
    const headerColorArray = ['#ffbebc','#85e3ff','#8ffcc6','#a79aff','#ff9cee','#ffb5e8','#ffc9de','#bffcc6','#dbffd6','seafoam', 'mint','lavender','mango', 'butter','baby blue'];
    const randomColor = headerColorArray[Math.floor(Math.random() * headerColorArray.length)];
    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [newId]: {
          id: newId,
          title: title,
          taskIds: [],
          color: randomColor
        }
      },
      columnOrder: [...data.columnOrder, newId]
    }
    setData(newData);
  }

  const deleteTask = (taskId, columnId) => {
    const newTasks = {
      ...data.tasks,
    }
    delete newTasks[taskId];
    const columnToEdit = [...data.columns[columnId].taskIds];
    const index = columnToEdit.indexOf(taskId);
    if (index > -1) {
      columnToEdit.splice(index, 1);
    }
    setData({
      ...data,
      tasks: newTasks,
      columns: {
        ...data.columns,
        [columnId]: {
          ...data.columns[columnId],
          taskIds: columnToEdit,
      }
    }});
  }
  
  const columnNamesInOrder = data.columnOrder.map((columnId)=> {
    return {columnId, columnName: data.columns[columnId].title};
  })

  const changeTaskColumn = (oldColumnId, newColumnId, taskId) =>{
    const oldColumnNewTaskIds = [...data.columns[oldColumnId].taskIds];
    const index = oldColumnNewTaskIds.indexOf(taskId);
    if (index > -1) {
      oldColumnNewTaskIds.splice(index, 1);
    }
    const newColumnNewTaskIds = [...data.columns[newColumnId].taskIds]
    newColumnNewTaskIds.push(taskId);
    const newColumns = {
      ...data.columns,
      [oldColumnId]: {
        ...data.columns[oldColumnId],
        taskIds: oldColumnNewTaskIds
      },
      [newColumnId]: {
        ...data.columns[newColumnId],
        taskIds: newColumnNewTaskIds
      }
    }
    setData({...data, columns: newColumns});
  }

  const deleteColumn = (columnId) => {
    const newColumns = {
      ...data.columns,
    }
    const newTasks = {
      ...data.tasks,
    }
    const taskstoDelete = [...data.columns[columnId].taskIds];

    taskstoDelete.forEach(taskId => delete newTasks[taskId]);
    delete newColumns[columnId];

    const newColumnOrder = [...data.columnOrder];
    const index = newColumnOrder.indexOf(columnId);
    if (index > -1) {
      newColumnOrder.splice(index, 1);
    }

    setData({
      ...data,
      tasks: newTasks,
      columns: newColumns,
      columnOrder: newColumnOrder
    })
  }

  function clearBoard() {
    setData({
      tasks: {},
      columns: {'c1' : {
        id: 'c1',
        title: 'To do',
        taskIds: [],
        color: '#afcbff'
      },
      'c2' : {
        id: 'c2',
        title: 'In progress',
        taskIds: [],
        color: 'mint'
      },
      'c3' : {
        id: 'c3',
        title: 'Done',
        taskIds: [],
        color: '#ffffd1'
      }},
      columnOrder: ['c1', 'c2', 'c3']
    })
  }
  

  return (
    <div className="App" id='pdf'>
      
      <Header clearBoard={clearBoard}/>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-colums" direction="horizontal" type="column" className="column-container">
          {provided => (
            <div className="column-list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {data.columnOrder.map((columnId, index) => {
                const column = data.columns[columnId];
                const tasks = column.taskIds.map(taskId => data.tasks[taskId])
                return (
                  <Column
                    key={column.id}
                    column={column}
                    tasks={tasks}
                    index={index}
                    newTask={newTask}
                    deleteTask={deleteTask}
                    editColumnName={(newName)=>editColumnName(column.id, newName)}
                    deleteColumn={deleteColumn}
                    columnNamesInOrder={columnNamesInOrder}
                    onColumnChange={changeTaskColumn}
                  />
                )
              })}
              {provided.placeholder}
              {data.columnOrder.length < 5 && <AddColumn onAdd={newColumn}/>}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      
    </div>

  );
}

export default App;
