import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, beforeEach, vi } from 'vitest'
import CreateTaskForm from './CreateTaskForm'

const user = userEvent.setup()

const submitButtonLabel = 'Add task'

describe('The CreateTaskForm component', () => {
  beforeEach(() => {
    cleanup()
  })

  it('should have a text input for the task description', () => {
    render(<CreateTaskForm onSubmitEvent={vi.fn()} />)

    expect(screen.getByLabelText(/Task description/)).toBeInTheDocument()
  })

  it('should have a submit button', () => {
    render(<CreateTaskForm onSubmitEvent={vi.fn()} />)

    expect(screen.getByText(submitButtonLabel)).toBeInTheDocument()
  })

  it('should call the onSubmitNewTask callback when the submit button is clicked', async () => {
    const spy__onSubmitNewTask = vi.fn()

    render(<CreateTaskForm onSubmitEvent={spy__onSubmitNewTask} />)

    await user.click(screen.getByText(submitButtonLabel))

    expect(spy__onSubmitNewTask).toHaveBeenCalled()
  })

  it('should call the onSubmitNewTask callback with the task description when the submit button is clicked', async () => {
    const spy__onSubmitNewTask = vi.fn()

    render(<CreateTaskForm onSubmitEvent={spy__onSubmitNewTask} />)

    const description = 'Task 1'

    await user.type(screen.getByLabelText(/Task description/), description)

    await user.click(screen.getByText(submitButtonLabel))

    expect(spy__onSubmitNewTask).toHaveBeenCalledWith(description)
  })
})
