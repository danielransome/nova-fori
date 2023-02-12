import React from 'react'

export type Task = {
  description: string
  completed: boolean
}

type ToDoListProps = {
  tasks: Task[]
}

const ToDoList: React.FC<ToDoListProps> = ({ tasks }) => {
  return (
    <div data-testid="to-do-list">
      <div>
        <h2>Completed tasks</h2>
        {tasks
          .filter((t) => t.completed)
          .map((task, index) => (
            <div key={index}>
              <h3>Task #{index + 1}</h3>
            </div>
          ))}
      </div>

      <div>
        <h2>Pending tasks</h2>
        {tasks
          .filter((t) => !t.completed)
          .map((task, index) => (
            <div key={index}>
              <h3>Task #{index + 1}</h3>
            </div>
          ))}
      </div>
    </div>
  )
}

export default ToDoList
