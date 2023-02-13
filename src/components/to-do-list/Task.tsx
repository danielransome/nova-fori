import React from 'react'

export type TaskProps = {
  description: string
  completed: boolean
}

const Task: React.FC<TaskProps> = ({ description, completed }) => {
  return (
    <div>
      <h3>{description}</h3>

      <label>
        Completed <input type="checkbox" />
      </label>
    </div>
  )
}

export default Task
