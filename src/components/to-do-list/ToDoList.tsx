import React from 'react'

type ToDoListProps = {
  tasks: Array<unknown>
}

const ToDoList: React.FC<ToDoListProps> = ({ tasks }) => {
  return (
    <div data-testid="to-do-list">
      <div>
        <h2>Completed tasks</h2>
      </div>

      <div>
        <h2>Pending tasks</h2>
      </div>

      {tasks.map((task, index) => (
        <div key={index}>
          <h3>Task #{index + 1}</h3>
        </div>
      ))}
    </div>
  )
}

export default ToDoList
