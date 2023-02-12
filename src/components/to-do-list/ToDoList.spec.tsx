import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ToDoList from './ToDoList'

describe('The ToDo list container', () => {
  describe('when there are no tasks to display', () => {
    it('should have an empty list', () => {
      render(<ToDoList />)

      expect(screen.getByTestId('to-do-list').children.length).toBe(0)
    })
  })

  describe('when tasks exist', () => {
    it('should display all tasks', () => {
      render(<ToDoList />)
    })

    it.todo('should display tasks in two groups: completed and pending')

    it.todo('should display tasks in the order they were added')

    it.todo('show diplay a text description for each task')
  })
})

export {}
