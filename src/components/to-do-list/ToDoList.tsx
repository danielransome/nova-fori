import React from 'react'
import CreateTaskForm from './CreateTaskForm'
import Task, { TaskProps } from './Task'

export type ToDoListProps = {
  tasks: TaskProps[]
  onSubmitNewTask: (description: string) => void
}

const ToDoList: React.FC<ToDoListProps> = ({ tasks, onSubmitNewTask }) => {
  return (
    <>
      <div data-testid="to-do-list">
        <div>
          <h2>Completed tasks</h2>
          {tasks
            .filter((t) => t.completed)
            .map((task, index) => (
              <Task key={index} {...task} />
            ))}
        </div>

        <div>
          <h2>Pending tasks</h2>
          {tasks
            .filter((t) => !t.completed)
            .map((task, index) => (
              <Task key={index} {...task} />
            ))}
        </div>
      </div>

      <CreateTaskForm onSubmitEvent={onSubmitNewTask} />
    </>
  )
}

export default ToDoList
