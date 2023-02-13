import React from 'react'

export type CreateTaskFormProps = {
  onSubmitEvent: (description: string) => void
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ onSubmitEvent }) => {
  const [newTaskDescription, setNewTaskDescription] = React.useState('')

  const onSubmitNewTaskForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    onSubmitEvent(newTaskDescription)
  }

  return (
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
  )
}

export default CreateTaskForm
