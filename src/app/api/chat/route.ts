import { NextResponse } from 'next/server'
import { chatModel, visionModel } from '@/lib/gemini/client'
import { SEHAT_KOSH_SYSTEM_PROMPT, DOCUMENT_DETECTION_PROMPT } from '@/lib/gemini/prompts'

export async function POST(request: Request) {
  try {
    const { message, messageType, imageBase64, userId, conversationHistory } = await request.json()

    // Base context setup
    const chat = chatModel.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: "System Instructions: " + SEHAT_KOSH_SYSTEM_PROMPT }]
        },
        {
          role: 'model',
          parts: [{ text: "Understood. I am Sehat Saathi, ready to help." }]
        },
        // Map frontend history to gemini format
        ...(conversationHistory || []).map((msg: { role: string; content: string }) => ({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        }))
      ],
    })

    if (messageType === 'text') {
      const result = await chat.sendMessage(message)
      const responseText = result.response.text()
      
      // Determine response type simply (in a real app, you might use function calling or more parsing)
      let responseType = 'health_qa'
      if (responseText.includes('MEDICINE:')) responseType = 'jan_aushadhi'
      if (responseText.includes('Structured list of eligible schemes')) responseType = 'yojana'
      
      return NextResponse.json({
        success: true,
        response: responseText,
        responseType
      })
    } 
    
    if (messageType === 'image' && imageBase64) {
      // First detect document type
      const imagePart = {
        inlineData: {
          data: imageBase64.split(',')[1] || imageBase64,
          mimeType: 'image/jpeg' // assuming jpeg for now, can be extracted from base64
        }
      }
      
      const detectResult = await visionModel.generateContent([
        DOCUMENT_DETECTION_PROMPT,
        imagePart
      ])
      
      let docInfo = { documentType: 'other', canProcess: true, isHandwritten: false }
      try {
        const text = detectResult.response.text().replace(/```json/g, '').replace(/```/g, '')
        docInfo = JSON.parse(text)
      } catch (e) {
        console.error('Failed to parse document detection JSON')
      }

      if (docInfo.isHandwritten) {
        return NextResponse.json({
          success: true,
          response: "Main haath se likha hua document nahi padh sakta. Kripya dawai ka naam type karein.",
          responseType: 'handwritten_reject'
        })
      }

      // Process document with chat history context
      const prompt = `Please analyze this ${docInfo.documentType} image according to your system instructions. User's question: ${message || "Is report mein kya likha hai?"}`
      
      const result = await visionModel.generateContent([
        prompt,
        imagePart
      ])
      
      return NextResponse.json({
        success: true,
        response: result.response.text(),
        responseType: 'document_analysis',
        data: {
          documentType: docInfo.documentType
        }
      })
    }

    return NextResponse.json({ error: "Invalid message type" }, { status: 400 })
    
  } catch (error: unknown) {
    console.error('Chat API Error:', error)
    const message = error instanceof Error ? error.message : 'Failed to process chat'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
