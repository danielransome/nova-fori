import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { describe, expect, it, beforeEach } from 'vitest'
import Task from './Task'

describe('The Task component', () => {
  beforeEach(() => {
    cleanup()
  })

  it('should render the task description', () => {
    const description = 'Task 1'

    render(<Task description={description} completed={false} />)

    expect(screen.getByText(description)).toBeInTheDocument()
  })

  describe('changing the task status', () => {
    describe('the checkbox', () => {
      it('should exist', () => {
        render(<Task description="Task 1" completed={false} />)

        expect(screen.getByLabelText(/Completed/)).toBeInTheDocument()
      })

      it('should be unchecked by default', () => {
        render(<Task description="Task 1" completed={false} />)

        expect(screen.getByLabelText(/Completed/)).not.toBeChecked()
      })

      it('should be checked when the task is completed', () => {
        render(<Task description="Task 1" completed={true} />)

        expect(screen.getByLabelText(/Completed/)).toBeChecked()
      })
    })
  })
})
