import { NextResponse } from 'next/server'
import { chatModel, visionModel } from '@/lib/gemini/client'
import { SEHAT_KOSH_SYSTEM_PROMPT, DOCUMENT_DETECTION_PROMPT } from '@/lib/gemini/prompts'

export async function POST(request: Request) {
  try {
    const { message, messageType, imageBase64, conversationHistory } = await request.json()

    const enhancedSystemPrompt = SEHAT_KOSH_SYSTEM_PROMPT

    // Base context setup
    const chat = chatModel.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: "System Instructions: " + enhancedSystemPrompt }]
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
      let result = await chat.sendMessage(message)
      let calls = result.response.functionCalls()
      
      while (calls && calls.length > 0) {
        const call = calls[0]
        let actionResult = { success: true, message: 'Action executed successfully', data: {} }

        try {
          switch (call.name) {
            case 'search_generic_medicines':
              actionResult.data = { generic: 'Generic Alternative Available', savings: 'Upto 70% cheaper at Jan Aushadhi' }
              break

            case 'check_government_schemes':
              actionResult.data = { schemes: ['Ayushman Bharat PM-JAY (Up to 5 Lakhs)', 'State Specific Health Scheme'] }
              break

            default:
              actionResult = { success: false, message: 'Unknown action', data: {} }
          }
        } catch (e: unknown) {
          const msg = e instanceof Error ? e.message : 'Action failed'
          actionResult = { success: false, message: msg, data: {} }
        }

        // Send function response back to model
        result = await chat.sendMessage([{
          functionResponse: {
            name: call.name,
            response: actionResult
          }
        }])
        
        calls = result.response.functionCalls()
      }

      const responseText = result.response.text()
      
      let responseType = 'health_qa'
      if (responseText.includes('MEDICINE:')) responseType = 'jan_aushadhi'
      if (responseText.includes('Structured list')) responseType = 'yojana'
      
      return NextResponse.json({
        success: true,
        response: responseText,
        responseType
      })
    }
    
    if (messageType === 'image' && imageBase64) {
      // First detect document type
      // Read the real MIME type off the data URI instead of assuming JPEG, so
      // PNG / WebP / HEIC uploads are described correctly to the vision model.
      const mimeMatch = /^data:([a-zA-Z0-9.+-]+\/[a-zA-Z0-9.+-]+);base64,/.exec(imageBase64)
      const imagePart = {
        inlineData: {
          data: imageBase64.split(',')[1] || imageBase64,
          mimeType: mimeMatch?.[1] ?? 'image/jpeg'
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
      } catch {
        console.error('Failed to parse document detection JSON')
      }

      if (docInfo.isHandwritten) {
        return NextResponse.json({
          success: true,
          response: "Main haath se likha hua document nahi padh sakta. Kripya dawai ka naam type karein.",
          responseType: 'handwritten_reject'
        })
      }

      // The vision model has no chat session, so the system prompt has to be
      // passed inline — otherwise the language and safety rules do not apply
      // to document analysis.
      const prompt = `System Instructions: ${SEHAT_KOSH_SYSTEM_PROMPT}

Ab is ${docInfo.documentType} image ko upar di gayi instructions ke hisaab se samjhao.
User ka sawaal: ${message || "Is report mein kya likha hai?"}`

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
