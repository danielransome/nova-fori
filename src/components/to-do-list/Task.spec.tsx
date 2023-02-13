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
    it('should have a checkbox to mark the task as completed', () => {
      render(<Task description="Task 1" completed={false} />)

      expect(screen.getByLabelText(/Completed/)).toBeInTheDocument()
    })
  })
})
