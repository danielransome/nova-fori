import React from 'react'
import { render, screen, cleanup, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, beforeEach, vi } from 'vitest'
import ToDoList, { ToDoListProps } from './ToDoList'
import { TaskProps } from './Task'

const user = userEvent.setup()

const spy__onSubmitNewTask = vi.fn()
const spy__onToggleCompleted = vi.fn()

describe('The ToDo list container', () => {
  beforeEach(() => {
    cleanup()
  })

  describe('when there are no tasks to display', () => {
    it('should have an empty list', () => {
      render(
        <ToDoList
          tasks={[]}
          onSubmitNewTask={spy__onSubmitNewTask}
          onToggleCompleted={spy__onToggleCompleted}
        />
      )

      expect(
        within(screen.getByTestId('to-do-list')).queryByText(/Task/)
      ).toBeNull()
    })
  })

  describe('when tasks exist', () => {
    it('should display all tasks', () => {
      const tasks: ToDoListProps['tasks'] = generateTasks(3)

      render(
        <ToDoList
          tasks={tasks}
          onSubmitNewTask={spy__onSubmitNewTask}
          onToggleCompleted={spy__onToggleCompleted}
        />
      )

      expect(
        within(screen.getByTestId('to-do-list')).queryAllByText(/Task/)
      ).toHaveLength(tasks.length)
    })

    describe('should display tasks in two groups: completed and pending', () => {
      it('should have an area for completed tasks', () => {
        render(
          <ToDoList
            tasks={[]}
            onSubmitNewTask={spy__onSubmitNewTask}
            onToggleCompleted={spy__onToggleCompleted}
          />
        )

        expect(screen.getByText(/Completed tasks/)).toBeInTheDocument()
      })

      it('should have an area for pending tasks', () => {
        render(
          <ToDoList
            tasks={[]}
            onSubmitNewTask={spy__onSubmitNewTask}
            onToggleCompleted={spy__onToggleCompleted}
          />
        )

        expect(screen.getByText(/Pending tasks/)).toBeInTheDocument()
      })

      it('should display pending tasks in the pending area', () => {
        const tasks: ToDoListProps['tasks'] = generateTasks(3)

        render(
          <ToDoList
            tasks={tasks}
            onSubmitNewTask={spy__onSubmitNewTask}
            onToggleCompleted={spy__onToggleCompleted}
          />
        )

        const pendingSection =
          screen.getByText(/Pending tasks/).parentElement ?? null
        expect(pendingSection).not.toBeNull()

        const pendingTasks = within(pendingSection as HTMLElement).getAllByText(
          /Task/
        )

        expect(pendingTasks).toHaveLength(3)
      })

      it('should display completed tasks in the completed area', () => {
        const tasks: ToDoListProps['tasks'] = generateTasks(3, true)

        render(
          <ToDoList
            tasks={tasks}
            onSubmitNewTask={spy__onSubmitNewTask}
            onToggleCompleted={spy__onToggleCompleted}
          />
        )

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
        {
          id: '1',
          description: 'Task 1',
          completed: false,
        },
        {
          id: '2',
          description: 'Task 2',
          completed: true,
        },
        {
          id: '3',
          description: 'Task 3',
          completed: false,
        },
        {
          id: '4',
          description: 'Task 4',
          completed: true,
        },
      ]

      render(
        <ToDoList
          tasks={tasks}
          onSubmitNewTask={spy__onSubmitNewTask}
          onToggleCompleted={spy__onToggleCompleted}
        />
      )

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
      it('should allow the user to input a description, click the submit button and see the newly created pending task in the pending area', async () => {
        let mock__tasks: ToDoListProps['tasks'] = []

        spy__onSubmitNewTask.mockImplementation((desc) => {
          mock__tasks = [...mock__tasks, generateTasks(1)[0]]
        })

        const { rerender } = render(
          <ToDoList
            tasks={mock__tasks}
            onSubmitNewTask={spy__onSubmitNewTask}
            onToggleCompleted={spy__onToggleCompleted}
          />
        )

        const description = 'Task 1'
        const input = screen.getByLabelText(
          /Task description/
        ) as HTMLInputElement
        const button = screen.getByText(/Add task/, { selector: 'button' })

        await user.type(input, description)
        await user.click(button)

        rerender(
          <ToDoList
            tasks={mock__tasks}
            onSubmitNewTask={spy__onSubmitNewTask}
            onToggleCompleted={spy__onToggleCompleted}
          />
        )

        const pendingSection =
          screen.getByText(/Pending tasks/).parentElement ?? null

        const pendingTasks = within(pendingSection as HTMLElement).getAllByText(
          description
        )

        expect(pendingTasks).toHaveLength(1)
      })
    })
  })

  describe('toggling the completion status of a task', () => {
    it('should move the task from the pending area to the completed area when the task is marked as completed', async () => {
      const tasks: ToDoListProps['tasks'] = generateTasks(1)
      const taskDescription = tasks[0].description
      const checkboxLabel = 'Completed'

      spy__onToggleCompleted.mockImplementation(() => {
        tasks[0].completed = true
      })

      const { rerender } = render(
        <ToDoList
          tasks={tasks}
          onSubmitNewTask={spy__onSubmitNewTask}
          onToggleCompleted={spy__onToggleCompleted}
        />
      )

      const pendingSection = screen.getByText(/Pending tasks/).parentElement

      const pendingTasks = within(pendingSection as HTMLElement).getAllByText(
        taskDescription
      )
      expect(pendingTasks).toHaveLength(1)

      const completedSection = screen.getByText(/Completed tasks/).parentElement

      const completedTasks = within(
        completedSection as HTMLElement
      ).queryAllByText(taskDescription)

      expect(completedTasks).toHaveLength(0)

      const taskToClick = screen.getByText(taskDescription).parentElement
      await user.click(
        within(taskToClick as HTMLElement).getByLabelText(checkboxLabel)
      )

      rerender(
        <ToDoList
          tasks={tasks}
          onSubmitNewTask={spy__onSubmitNewTask}
          onToggleCompleted={spy__onToggleCompleted}
        />
      )

      expect(spy__onToggleCompleted).toHaveBeenCalledTimes(1)

      expect(
        within(pendingSection as HTMLElement).queryAllByText(taskDescription)
      ).toHaveLength(0)

      expect(
        within(completedSection as HTMLElement).getAllByText(taskDescription)
      ).toHaveLength(1)
    })
  })
})

function generateTasks(n: number, completed = false): TaskProps[] {
  const tasks: TaskProps[] = []

  for (let i = 0; i < n; i++) {
    tasks.push({
      id: i.toString(),
      description: `Task ${i + 1}`,
      completed,
      onToggleCompleted: spy__onToggleCompleted,
    })
  }

  return tasks
}
