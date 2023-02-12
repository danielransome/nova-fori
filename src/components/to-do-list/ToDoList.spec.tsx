import React from 'react'

import { render, screen, cleanup, within } from '@testing-library/react'
import { describe, expect, it, afterEach, beforeEach } from 'vitest'
import ToDoList, { Task } from './ToDoList'

describe('The ToDo list container', () => {
  beforeEach(() => {
    cleanup()
  })

  describe('when there are no tasks to display', () => {
    it('should have an empty list', () => {
      render(<ToDoList tasks={[]} />)

      expect(screen.queryByText(/Task #/)).toBeNull()
    })
  })

  describe('when tasks exist', () => {
    it('should display all tasks', () => {
      render(<ToDoList tasks={Array(5).fill(0)} />)

      expect(screen.getAllByText(/Task #/)).toHaveLength(5)
    })

    describe('should display tasks in two groups: completed and pending', () => {
      it('should have an area for completed tasks', () => {
        render(<ToDoList tasks={[]} />)

        expect(screen.getByText(/Completed tasks/)).toBeInTheDocument()
      })

      it('should have an area for pending tasks', () => {
        render(<ToDoList tasks={[]} />)

        expect(screen.getByText(/Pending tasks/)).toBeInTheDocument()
      })

      it('should display pending tasks in the pending area', () => {
        const tasks: Task[] = [
          { description: 'Task 1' },
          { description: 'Task 2' },
          { description: 'Task 3' },
        ]

        render(<ToDoList tasks={tasks} />)

        const pendingSection =
          screen.getByText(/Pending tasks/).parentElement ?? null
        expect(pendingSection).not.toBeNull()

        const pendingTasks = within(pendingSection as HTMLElement).getAllByText(
          /Task #/,
          {}
        )

        expect(pendingTasks).toHaveLength(3)
      })
    })

    it.todo('should display tasks in the order they were added')

    it.todo('show diplay a text description for each task')
  })
})
