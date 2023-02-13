import React from 'react'

import { useState } from 'react'

import './App.css'
import { TaskProps } from './components/to-do-list/Task'
import ToDoList from './components/to-do-list/ToDoList'
import { generateTaskId } from './utils/taskUtils'

function createNewTask(
  description: TaskProps['description']
): Omit<TaskProps, 'onToggleCompleted'> {
  const id = generateTaskId()

  return {
    id,
    description,
    completed: false,
  }
}

function App() {
  const [taskList, setTaskList] = useState<
    Omit<TaskProps, 'onToggleCompleted'>[]
  >([])

  const onSubmitNewTask = (description: string) => {
    setTaskList((tasks) => [...tasks, createNewTask(description)])
  }

  const onToggleCompleted = (id: string) => {
    setTaskList((tasks) =>
      tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: !task.completed,
          }
        }

        return task
      })
    )
  }

  return (
    <div className="App">
      <ToDoList
        tasks={taskList}
        onSubmitNewTask={onSubmitNewTask}
        onToggleCompleted={onToggleCompleted}
      />
    </div>
  )
}

export default App
