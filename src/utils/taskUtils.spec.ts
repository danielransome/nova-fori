import { describe, expect, it } from 'vitest'

import { generateTaskId } from './taskUtils'

import { validate as uuidValidate } from 'uuid'

describe('Task utils', () => {
  describe('Generating a task ID', () => {
    it('should generate a task ID', () => {
      expect(uuidValidate(generateTaskId())).toBeTruthy()
    })
  })
})
