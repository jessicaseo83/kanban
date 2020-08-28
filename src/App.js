import React, { useState } from 'react';
import Header from './components/Navbar';
import './styles/index.css';
import initialData from './data/Initialdata';

function App() {
  const [ data, setData ] = useState(initialData);
  const columns = data.columnOrder.map(columnId => {
    const column = data.columns[columnId];
    const tasks = column.taskIds.map(taskId => data.tasks[taskId])

    return column.title;
  })
  return (
    <div className="App">
      <Header />
      {columns}
    </div>
  );
}

export default App;
