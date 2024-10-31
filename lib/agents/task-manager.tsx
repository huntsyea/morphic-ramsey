import { CoreMessage, generateObject } from 'ai'
import { nextActionSchema } from '../schema/next-action'
import { getModel } from '../utils/registry'

// Decide whether inquiry is required for the user input
export async function taskManager(messages: CoreMessage[], model: string) {
  // Always return proceed
  return {
    object: {
      next: 'proceed'
    }
  }
}
