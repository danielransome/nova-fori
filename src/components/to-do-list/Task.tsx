import React from 'react'

export type TaskProps = {
  description: string
  completed: boolean
  onToggleCompleted: () => void
}

const Task: React.FC<TaskProps> = ({
  description,
  completed,
  onToggleCompleted,
}) => {
  return (
    <div>
      <h3>{description}</h3>

      <label>
        Completed{' '}
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggleCompleted()}
        />
      </label>
    </div>
  )
}

export default Task
