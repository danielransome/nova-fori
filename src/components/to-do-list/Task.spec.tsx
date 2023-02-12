import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { describe, expect, it, beforeEach } from 'vitest'

describe('The Task component', () => {
  beforeEach(() => {
    cleanup()
  })

  it('should render the task description', () => {
    render(<Task description="Task 1" completed={false} />)
    expect(screen.getByText(/Task 1/)).toBeInTheDocument()
  })
})
