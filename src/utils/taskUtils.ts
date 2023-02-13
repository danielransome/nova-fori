import { v4 as uuidv4 } from 'uuid'

function generateTaskId(): string {
  return uuidv4()
}

export { generateTaskId }
