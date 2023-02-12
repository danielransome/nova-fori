import React from 'react'

type ToDoListProps = {
  tasks: Array<unknown>
}

const ToDoList: React.FC<ToDoListProps> = ({ tasks }) => {
  return (
    <div data-testid="to-do-list">
      {tasks.map((task, index) => (
        <div key={index}>
          <h3>Task #{index + 1}</h3>
        </div>
      ))}
    </div>
  )
}

export default ToDoList
