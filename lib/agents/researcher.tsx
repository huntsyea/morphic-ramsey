import { createStreamableUI, createStreamableValue } from 'ai/rsc'
import { CoreMessage, generateText, streamText } from 'ai'
import { getTools } from './tools'
import { getModel } from '../utils/registry'
import { AnswerSection } from '@/components/answer-section'

const SYSTEM_PROMPT = `You are a dedicated Ramsey Solutions expert, you have exclusive access to search results from the Ramsey website. Your role is to address user queries by providing answers that represent with Ramsey Principles and teachings.

IMPORTANT: You must ALWAYS use the search tool first to find relevant information before responding to any query. Even if you think you know the answer, search first to ensure accuracy and to find supporting articles.

For each question, meticulously utilize the Ramsey-specific search results to extract accurate and relevant information. Your responses should directly answer the user's question strictly as a Ramsey Solutions expert.
If there are any articles from the Ramsey website that can enhance your response, be sure to include them where appropriate. Your goal is to deliver answers that teach and guide users strictly through the principles of Ramsey Solutions, ensuring users receive empathetic yet firm advice consistent with the values and principles they trust.

Answer must include:
- A friendly empathetic response like Dave Ramsey.
- Be direct and clear.
- Speak like a human, not like a computer.
- When recommending articles, recommend them as from "us" not Ramsey Solutions.
- Include relevant search results and articles in every response.
`

export async function researcher(
  uiStream: ReturnType<typeof createStreamableUI>,
  messages: CoreMessage[],
  model: string
) {
  try {
    let fullResponse = ''
    const streamableText = createStreamableValue<string>()
    let toolResults: any[] = []

    const currentDate = new Date().toLocaleString()
    const result = await streamText({
      model: getModel(model),
      system: `${SYSTEM_PROMPT} Current date and time: ${currentDate}`,
      messages: messages,
      tools: getTools({
        uiStream,
        fullResponse
      }),
      maxSteps: 5,
      onStepFinish: async event => {
        if (event.stepType === 'initial') {
          if (event.toolCalls && event.toolCalls.length > 0) {
            uiStream.append(<AnswerSection result={streamableText.value} />)
            toolResults = event.toolResults
          } else {
            uiStream.update(<AnswerSection result={streamableText.value} />)
          }
        }
      }
    })

    for await (const delta of result.fullStream) {
      if (delta.type === 'text-delta' && delta.textDelta) {
        fullResponse += delta.textDelta
        streamableText.update(fullResponse)
      }
    }

    streamableText.done(fullResponse)

    return { text: fullResponse, toolResults }
  } catch (error) {
    console.error('Error in researcher:', error)
    return {
      text: 'An error has occurred. Please try again.',
      toolResults: []
    }
  }
}

export async function researcherWithOllama(
  uiStream: ReturnType<typeof createStreamableUI>,
  messages: CoreMessage[],
  model: string
) {
  try {
    const fullResponse = ''
    const streamableText = createStreamableValue<string>()
    let toolResults: any[] = []

    const currentDate = new Date().toLocaleString()
    const result = await generateText({
      model: getModel(model),
      system: `${SYSTEM_PROMPT} Current date and time: ${currentDate}`,
      messages: messages,
      tools: getTools({
        uiStream,
        fullResponse
      }),
      maxSteps: 5,
      onStepFinish: async event => {
        if (event.stepType === 'initial') {
          if (event.toolCalls) {
            uiStream.append(<AnswerSection result={streamableText.value} />)
            toolResults = event.toolResults
          } else {
            uiStream.update(<AnswerSection result={streamableText.value} />)
          }
        }
      }
    })

    streamableText.done(result.text)

    return { text: result.text, toolResults }
  } catch (error) {
    console.error('Error in researcherWithOllama:', error)
    return {
      text: 'An error has occurred. Please try again.',
      toolResults: []
    }
  }
}
