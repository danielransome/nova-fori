import React from 'react'
import Task, { TaskProps } from './Task'

export type ToDoListProps = {
  tasks: TaskProps[]
}

const ToDoList: React.FC<ToDoListProps> = ({ tasks }) => {
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

      <form>
        <label>
          Task description: <input type="text" />
        </label>

        <button type="submit">Add task</button>
      </form>
    </>
  )
}

export default ToDoList
