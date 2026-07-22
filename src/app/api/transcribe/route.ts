import { NextResponse } from 'next/server'
import { audioModel } from '@/lib/gemini/client'
import { TRANSCRIPTION_PROMPT } from '@/lib/gemini/prompts'

/**
 * Speech-to-text for the chat mic button.
 *
 * Kept separate from /api/chat on purpose: this takes audio and returns raw
 * text with no conversation history, no system prompt and no health reasoning.
 * The transcript lands in the input box for the user to read and edit — it is
 * never treated as a sent message here.
 */

/** The client always sends WAV; the rest are accepted in case that changes. */
const ALLOWED_MIME_TYPES = new Set([
  'audio/wav',
  'audio/x-wav',
  'audio/mpeg',
  'audio/mp3',
  'audio/aac',
  'audio/ogg',
  'audio/flac',
])

const MAX_AUDIO_BYTES = 6 * 1024 * 1024

/** base64 inflates by ~4/3, so this is the decoded size. */
function approxDecodedBytes(base64: string): number {
  return Math.floor((base64.length * 3) / 4)
}

export async function POST(request: Request) {
  try {
    const { audioBase64, mimeType } = await request.json()

    if (typeof audioBase64 !== 'string' || !audioBase64) {
      return NextResponse.json({ error: 'No audio provided' }, { status: 400 })
    }

    const type = typeof mimeType === 'string' ? mimeType.split(';')[0].trim() : ''
    if (!ALLOWED_MIME_TYPES.has(type)) {
      return NextResponse.json({ error: `Unsupported audio format: ${type || 'unknown'}` }, { status: 400 })
    }

    // Tolerate a data URI even though the client strips the prefix itself.
    const data = audioBase64.includes(',') ? audioBase64.split(',')[1] : audioBase64

    if (approxDecodedBytes(data) > MAX_AUDIO_BYTES) {
      return NextResponse.json({ error: 'Audio too large' }, { status: 413 })
    }

    const result = await audioModel.generateContent([
      TRANSCRIPTION_PROMPT,
      { inlineData: { data, mimeType: type } },
    ])

    // Models like to wrap transcripts in quotes despite being told not to.
    const text = result.response
      .text()
      .trim()
      .replace(/^["'`]+|["'`]+$/g, '')
      .trim()

    // Empty is a valid outcome (silence, background noise). The client turns
    // this into a "didn't catch that" toast rather than an error.
    return NextResponse.json({ success: true, text })
  } catch (error: unknown) {
    console.error('Transcription API Error:', error)
    const message = error instanceof Error ? error.message : 'Failed to transcribe audio'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
