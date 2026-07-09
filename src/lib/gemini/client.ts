import { GoogleGenerativeAI } from '@google/generative-ai'
import { sehatTools } from './tools'

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY

if (!apiKey) {
  throw new Error('GEMINI_API_KEY is not defined in environment variables')
}

export const genAI = new GoogleGenerativeAI(apiKey)

// Models
// Use gemini-2.5-flash for faster responses
export const chatModel = genAI.getGenerativeModel({ 
  model: 'gemini-2.5-flash',
  tools: [{ functionDeclarations: sehatTools }]
})

// Use gemini-2.5-flash for complex document analysis if needed
export const visionModel = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
