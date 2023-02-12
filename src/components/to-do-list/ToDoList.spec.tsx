import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ToDoList from './ToDoList'

describe('The ToDo list container', () => {
  describe('the list should initially be empty', () => {
    it('should have an empty list', () => {
      render(<ToDoList />)

      expect(screen.getByTestId('to-do-list').children.length).toBe(0)
    })
  })
})

export {}
