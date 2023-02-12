import React from 'react'

import { useState } from 'react'

import './App.css'
import ToDoList, { ToDoListProps } from './components/to-do-list/ToDoList'

function App() {
  const [taskList, setTaskList] = useState<ToDoListProps['tasks']>([])

  return (
    <div className="App">
      <ToDoList tasks={taskList} />
    </div>
  )
}

export default App
