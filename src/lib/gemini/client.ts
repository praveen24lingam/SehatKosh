import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY

if (!apiKey) {
  console.warn('GEMINI_API_KEY is not defined in environment variables')
}

export const genAI = new GoogleGenerativeAI(apiKey || 'dummy-key')

// Models
// Use gemini-3.5-flash for faster responses
export const chatModel = genAI.getGenerativeModel({ model: 'gemini-3.5-flash' })

// Use gemini-3.5-flash for complex document analysis if needed, 
// though flash is usually good enough and much faster.
export const visionModel = genAI.getGenerativeModel({ model: 'gemini-3.5-flash' })
