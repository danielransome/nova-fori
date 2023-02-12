import React from 'react'

export type Task = {
  description: string
}

type ToDoListProps = {
  tasks: Task[]
}

const ToDoList: React.FC<ToDoListProps> = ({ tasks }) => {
  return (
    <div data-testid="to-do-list">
      <div>
        <h2>Completed tasks</h2>
      </div>

      <div>
        <h2>Pending tasks</h2>
        {tasks.map((task, index) => (
          <div key={index}>
            <h3>Task #{index + 1}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ToDoList
