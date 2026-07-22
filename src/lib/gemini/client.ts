import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY

if (!apiKey) {
  throw new Error('GEMINI_API_KEY is not defined in environment variables')
}

export const genAI = new GoogleGenerativeAI(apiKey)

// Models
// Use gemini-2.5-flash for faster responses
//
// No `tools` on purpose. There used to be two function declarations
// (check_government_schemes, search_generic_medicines) but nothing backed them
// with real data — the handler returned hardcoded strings, so the model was
// being told fabricated facts and then presenting them as if looked up.
// Scheme and Jan Aushadhi questions are now answered from the system prompt,
// which covers them honestly and points at the official sites instead.
export const chatModel = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash',
})

// Use gemini-2.5-flash for complex document analysis if needed
export const visionModel = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

// Same model again, named for its job: speech-to-text on recorded voice input.
// gemini-2.5-flash takes audio inline, which keeps voice input on the one
// provider the app already depends on and handles Hindi/Hinglish far better
// than the browser's built-in speech recognition did.
export const audioModel = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
