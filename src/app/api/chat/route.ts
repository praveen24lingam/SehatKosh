import { NextResponse } from 'next/server'
import { chatModel, visionModel } from '@/lib/gemini/client'
import { SEHAT_KOSH_SYSTEM_PROMPT, DOCUMENT_DETECTION_PROMPT } from '@/lib/gemini/prompts'

interface DocumentDetection {
  documentType: string
  hasPrintedText: boolean
  isFullyHandwritten: boolean
  confidence: 'high' | 'low'
}

/**
 * What we assume when detection tells us nothing useful: an ordinary printed
 * medical document that should be analysed. Rejecting a real report is the
 * expensive failure here — the user's actual lab result gets refused — while
 * analysing a handwritten page we failed to classify only costs one bad answer
 * that the system prompt still guards.
 */
const DETECTION_FALLBACK: DocumentDetection = {
  documentType: 'other_medical',
  hasPrintedText: true,
  isFullyHandwritten: false,
  confidence: 'low',
}

/** Only a real `true` (or the string form models sometimes emit) counts. */
function asBool(value: unknown): boolean {
  if (typeof value === 'boolean') return value
  if (typeof value === 'string') return value.trim().toLowerCase() === 'true'
  return false
}

/**
 * Pull the detection JSON out of the model's reply.
 *
 * The model is told to return bare JSON but in practice wraps it in ```json
 * fences or a sentence, so we strip fences and then take the first {...} block
 * rather than parsing the whole string. Any failure returns the fallback.
 */
function parseDetection(raw: string): DocumentDetection {
  const cleaned = raw.replace(/```json/gi, '').replace(/```/g, '')
  const match = /\{[\s\S]*\}/.exec(cleaned)
  if (!match) {
    console.error('Document detection: no JSON object in response')
    return DETECTION_FALLBACK
  }

  let parsed: Record<string, unknown>
  try {
    parsed = JSON.parse(match[0])
  } catch {
    console.error('Document detection: failed to parse JSON')
    return DETECTION_FALLBACK
  }

  const documentType =
    typeof parsed.documentType === 'string' && parsed.documentType.trim()
      ? parsed.documentType.trim()
      : DETECTION_FALLBACK.documentType

  // `hasPrintedText` defaults to true when absent: a missing field must not
  // read as "no printed text found", which would push us toward a rejection.
  const hasPrintedText =
    'hasPrintedText' in parsed ? asBool(parsed.hasPrintedText) : true

  return {
    documentType,
    hasPrintedText,
    isFullyHandwritten: asBool(parsed.isFullyHandwritten),
    confidence: parsed.confidence === 'high' ? 'high' : 'low',
  }
}

/**
 * The handwritten gate, deliberately narrow.
 *
 * Refusing handwritten prescriptions is a real safety feature — misreading a
 * hand-scrawled drug name can hurt someone — so it stays. But it now needs all
 * three signals to agree: the model says the page is entirely handwriting, it
 * found no printed text anywhere, and it is confident. Anything short of that
 * (mixed pages, screen photos, glare, blur, an unparseable answer) is analysed.
 *
 * This used to be `if (docInfo.isHandwritten)`, a bare truthiness check against
 * a field the prompt also allowed to be the string "printed" or "mixed" — and
 * every non-empty string is truthy, so a printed report could reject itself.
 */
function shouldRejectAsHandwritten(doc: DocumentDetection): boolean {
  return doc.isFullyHandwritten && !doc.hasPrintedText && doc.confidence === 'high'
}

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
      // Straight request/response — no function-calling round trip.
      //
      // This used to loop over `result.response.functionCalls()` and answer
      // them from a switch that returned hardcoded strings ("Upto 70% cheaper
      // at Jan Aushadhi", a canned scheme list). Nothing queried a real source,
      // so the model was handed invented facts and relayed them as if they had
      // been looked up. Both tools are gone; the system prompt now handles
      // scheme and generic-medicine questions honestly.
      const result = await chat.sendMessage(message)
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
      
      // Detection failures must never block a real report, so every unknown
      // path in parseDetection() lands on this shape: analyse it.
      const docInfo = parseDetection(detectResult.response.text())

      if (shouldRejectAsHandwritten(docInfo)) {
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
