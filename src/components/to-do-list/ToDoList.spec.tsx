import React from 'react'
import { render, screen, cleanup, within } from '@testing-library/react'
import { describe, expect, it, beforeEach } from 'vitest'
import ToDoList, { ToDoListProps } from './ToDoList'

describe('The ToDo list container', () => {
  beforeEach(() => {
    cleanup()
  })

  describe('when there are no tasks to display', () => {
    it('should have an empty list', () => {
      render(<ToDoList tasks={[]} />)

      expect(screen.queryByText(/Task/)).toBeNull()
    })
  })

  describe('when tasks exist', () => {
    it('should display all tasks', () => {
      const tasks: ToDoListProps['tasks'] = [
        { description: 'Task 1', completed: false },
        { description: 'Task 2', completed: false },
        { description: 'Task 3', completed: false },
      ]

      render(<ToDoList tasks={tasks} />)

      expect(screen.getAllByText(/Task/)).toHaveLength(tasks.length)
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
        const tasks: ToDoListProps['tasks'] = [
          { description: 'Task 1', completed: false },
          { description: 'Task 2', completed: false },
          { description: 'Task 3', completed: false },
        ]

        render(<ToDoList tasks={tasks} />)

        const pendingSection =
          screen.getByText(/Pending tasks/).parentElement ?? null
        expect(pendingSection).not.toBeNull()

        const pendingTasks = within(pendingSection as HTMLElement).getAllByText(
          /Task/
        )

        expect(pendingTasks).toHaveLength(3)
      })

      it('should display completed tasks in the completed area', () => {
        const tasks: ToDoListProps['tasks'] = [
          { description: 'Task 1', completed: true },
          { description: 'Task 2', completed: true },
          { description: 'Task 3', completed: true },
        ]

        render(<ToDoList tasks={tasks} />)

        const completedSection =
          screen.getByText(/Completed tasks/).parentElement ?? null
        expect(completedSection).not.toBeNull()

        const completedTasks = within(
          completedSection as HTMLElement
        ).getAllByText(/Task/)

        expect(completedTasks).toHaveLength(3)
      })
    })

    it('should display tasks in the order they were added', () => {
      const tasks: ToDoListProps['tasks'] = [
        { description: 'Task 1', completed: false },
        { description: 'Task 2', completed: true },
        { description: 'Task 3', completed: false },
        { description: 'Task 4', completed: true },
      ]

      render(<ToDoList tasks={tasks} />)

      const pendingSection =
        screen.getByText(/Pending tasks/).parentElement ?? null
      expect(pendingSection).not.toBeNull()

      const completedSection =
        screen.getByText(/Completed tasks/).parentElement ?? null
      expect(completedSection).not.toBeNull()

      const pendingTasks = within(pendingSection as HTMLElement).getAllByText(
        /Task/
      )

      const completedTasks = within(
        completedSection as HTMLElement
      ).getAllByText(/Task/)

      expect(pendingTasks[0]).toHaveTextContent('Task 1')
      expect(completedTasks[0]).toHaveTextContent('Task 2')
      expect(pendingTasks[1]).toHaveTextContent('Task 3')
      expect(completedTasks[1]).toHaveTextContent('Task 4')
    })
  })

  describe('adding new tasks', () => {
    describe('the interface for adding new tasks', () => {
      it.todo('should allow the user to enter a task description')

      it.todo('should display a button to submit the task')

      it.todo('should display the new task in the pending tasks area')
    })
  })
})
