const initialData = {
  tasks: {
    'task-1': {id: 'task-1', title: 'Take out the garbage', detail: 'Take out the stinky garbage!!!'},
    'task-2': {id: 'task-2', title: 'Go for a walk with my dog', detail: ''},
    'task-3': {id: 'task-3', title: 'Write a song',
  detail: ''},
    'task-4': {id: 'task-4', title: 'Drink some wine',
    detail: 'Drink 1 bottle of chardonnay'},
    'task-5': {id: 'task-5', title: 'Sleep like a baby',
    detail: 'Sleep for 10 hours'}
  },
  columns: {
    'c1' : {
      id: 'c1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3'],
      color: '#f6a6ff'
    },
    'c2' : {
      id: 'c2',
      title: 'In progress',
      taskIds: ['task-4'],
      color: 'mint'
    },
    'c3' : {
      id: 'c3',
      title: 'Done',
      taskIds: ['task-5'],
      color: '#ffffd1'
    }
  },
  columnOrder: ['c1', 'c2', 'c3']
}

export default initialData;