import React from 'react'

export type TaskProps = {
  id: string
  description: string
  completed: boolean
  onToggleCompleted: (id: string) => void
}

const Task: React.FC<TaskProps> = ({
  description,
  completed,
  onToggleCompleted,
  id,
}) => {
  return (
    <div data-id={id}>
      <h3>{description}</h3>

      <label>
        Completed{' '}
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggleCompleted(id)}
        />
      </label>
    </div>
  )
}

export default Task
