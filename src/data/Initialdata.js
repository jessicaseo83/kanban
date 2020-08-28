const initialData = {
  tasks: {
    'task-1': {id: 'task-1', title: 'Take out the garbage', detail: 'Take out the stinky garbage!!!'},
    'task-2': {id: 'task-2', title: 'Go for a walk with my dog', detail: ''},
    'task-3': {id: 'task-3', title: 'Write a song',
  detail: ''}
  },
  columns: {
    'column-1' : {
      id: 'c1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3'],
    },
    'column-2' : {
      id: 'c2',
      title: 'In progress',
      taskIds: [],
    },
    'column-3' : {
      id: 'c3',
      title: 'Done',
      taskIds: [],
    }
  },
  columnOrder: ['column-1', 'column-2', 'column-3']
}

export default initialData;