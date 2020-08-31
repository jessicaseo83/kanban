const initialData = {
  tasks: {},
  columns: {
    'c1' : {
      id: 'c1',
      title: 'To do',
      taskIds: [],
      color: '#f6a6ff'
    },
    'c2' : {
      id: 'c2',
      title: 'In progress',
      taskIds: [],
      color: 'mintcream'
    },
    'c3' : {
      id: 'c3',
      title: 'Done',
      taskIds: [],
      color: '#ffffd1'
    }
  },
  columnOrder: ['c1', 'c2', 'c3']
}

export default initialData;