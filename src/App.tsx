import React from 'react'

import { useState } from 'react'

import './App.css'
import ToDoList, { ToDoListProps } from './components/to-do-list/ToDoList'

function App() {
  const [taskList, setTaskList] = useState<ToDoListProps['tasks']>([])

  const onSubmitNewTask = (description: string) => {
    setTaskList((tasks) => [
      ...tasks,
      {
        description,
        completed: false,
      },
    ])
  }

  return (
    <div className="App">
      <ToDoList tasks={taskList} onSubmitNewTask={onSubmitNewTask} />
    </div>
  )
}

export default App
