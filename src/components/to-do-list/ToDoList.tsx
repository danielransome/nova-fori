import React from 'react'
import Task, { TaskProps } from './Task'

export type ToDoListProps = {
  tasks: TaskProps[]
  onSubmitNewTask: (description: string) => void
}

const ToDoList: React.FC<ToDoListProps> = ({ tasks, onSubmitNewTask }) => {
  const [newTaskDescription, setNewTaskDescription] = React.useState('')

  const onSubmitNewTaskForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    onSubmitNewTask(newTaskDescription)
    setNewTaskDescription('')
  }

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

      <form onSubmit={onSubmitNewTaskForm}>
        <label>
          Task description:{' '}
          <input
            type="text"
            value={newTaskDescription}
            onChange={({ target }) => setNewTaskDescription(target.value)}
          />
        </label>

        <button type="submit">Add task</button>
      </form>
    </>
  )
}

export default ToDoList
