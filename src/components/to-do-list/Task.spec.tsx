import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { describe, expect, it, beforeEach, vi } from 'vitest'
import Task from './Task'
import userEvent from '@testing-library/user-event'

const user = userEvent.setup()

const mock__taskID = '1234'

const spy__onToggleCompleted = vi.fn()

describe('The Task component', () => {
  beforeEach(() => {
    cleanup()
  })

  it('should render the task description', () => {
    const description = 'Task 1'

    render(
      <Task
        id={mock__taskID}
        description={description}
        completed={false}
        onToggleCompleted={spy__onToggleCompleted}
      />
    )

    expect(screen.getByText(description)).toBeInTheDocument()
  })

  it('should have an ID', () => {
    const description = 'Task 1'

    render(
      <Task
        id={mock__taskID}
        description={description}
        completed={false}
        onToggleCompleted={spy__onToggleCompleted}
      />
    )

    expect(screen.getByText(description).parentNode).toHaveAttribute(
      'data-id',
      mock__taskID
    )
  })

  describe('changing the task status', () => {
    describe('the checkbox', () => {
      it('should exist', () => {
        render(
          <Task
            id={mock__taskID}
            description="Task 1"
            completed={false}
            onToggleCompleted={spy__onToggleCompleted}
          />
        )

        expect(screen.getByLabelText(/Completed/)).toBeInTheDocument()
      })

      it('should be unchecked by default', () => {
        render(
          <Task
            id={mock__taskID}
            description="Task 1"
            completed={false}
            onToggleCompleted={spy__onToggleCompleted}
          />
        )

        expect(screen.getByLabelText(/Completed/)).not.toBeChecked()
      })

      it('should be checked when the task is completed', () => {
        render(
          <Task
            id={mock__taskID}
            description="Task 1"
            completed={true}
            onToggleCompleted={spy__onToggleCompleted}
          />
        )

        expect(screen.getByLabelText(/Completed/)).toBeChecked()
      })
    })

    describe('user interaction', () => {
      it('should call the callback when the checkbox value is changed', async () => {
        const spy__onChange = vi.fn()

        render(
          <Task
            id={mock__taskID}
            description="Task 1"
            completed={false}
            onToggleCompleted={spy__onChange}
          />
        )

        await user.click(screen.getByLabelText(/Completed/))

        expect(spy__onChange).toHaveBeenCalledTimes(1)
      })
    })
  })
})
