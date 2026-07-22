'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  MAX_RECORDING_MS,
  isRecordingSupported,
  pickRecorderMimeType,
  prepareAudioForUpload,
} from '@/lib/audio'

/**
 * Voice input via MediaRecorder + Gemini transcription.
 *
 * This replaced the Web Speech API version. `webkitSpeechRecognition` is
 * Chrome-only, silently unavailable in several Android webviews, and its Hindi
 * recognition was poor — Hinglish in particular came back mangled. Recording
 * the audio ourselves and sending it to Gemini keeps transcription on the same
 * provider as the rest of the app and handles Hindi/Hinglish far better.
 *
 * The transcript is handed back through `onTranscript` rather than held as
 * state here, so the caller decides how to merge it with whatever the user has
 * already typed. Nothing is ever auto-sent.
 */

export type VoiceStatus = 'idle' | 'recording' | 'transcribing'

export type VoiceErrorCode =
  | 'unsupported'      // no MediaRecorder / getUserMedia (or insecure origin)
  | 'permission-denied'
  | 'no-mic'
  | 'no-speech'        // recorded fine, but nothing intelligible came back
  | 'too-short'
  | 'transcribe-failed'
  | 'network'

interface UseVoiceInputOptions {
  /** Called with the transcript. Only fires for non-empty results. */
  onTranscript: (text: string) => void
  onError?: (code: VoiceErrorCode) => void
}

export function useVoiceInput({ onTranscript, onError }: UseVoiceInputOptions) {
  const [status, setStatus] = useState<VoiceStatus>('idle')

  const recorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const autoStopRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const mountedRef = useRef(true)
  const statusRef = useRef<VoiceStatus>('idle')

  // Callbacks live in refs so starting a recording never captures a stale
  // closure, and so they are not dependencies of the start/stop callbacks.
  // Assigned in an effect rather than during render — by the time a recording
  // can be started (an event handler), effects have already flushed.
  const onTranscriptRef = useRef(onTranscript)
  const onErrorRef = useRef(onError)
  useEffect(() => {
    onTranscriptRef.current = onTranscript
    onErrorRef.current = onError
  })

  const setStatusSafely = useCallback((next: VoiceStatus) => {
    statusRef.current = next
    if (mountedRef.current) setStatus(next)
  }, [])

  const fail = useCallback((code: VoiceErrorCode) => {
    onErrorRef.current?.(code)
  }, [])

  /** Release the mic. Without this the browser tab keeps its recording indicator on. */
  const releaseStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
    recorderRef.current = null
    if (autoStopRef.current) {
      clearTimeout(autoStopRef.current)
      autoStopRef.current = null
    }
  }, [])

  const transcribe = useCallback(async (blob: Blob) => {
    setStatusSafely('transcribing')

    let payload: { base64: string; mimeType: string }
    try {
      const prepared = await prepareAudioForUpload(blob)
      payload = { base64: prepared.base64, mimeType: prepared.mimeType }
    } catch (err) {
      console.error('Audio preparation failed:', err)
      setStatusSafely('idle')
      fail(err instanceof Error && err.message === 'Recording too short' ? 'too-short' : 'transcribe-failed')
      return
    }

    try {
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ audioBase64: payload.base64, mimeType: payload.mimeType }),
      })

      const data = await response.json()
      setStatusSafely('idle')

      if (!response.ok || !data.success) {
        console.error('Transcription failed:', data?.error)
        fail('transcribe-failed')
        return
      }

      const text = typeof data.text === 'string' ? data.text.trim() : ''
      if (!text) {
        fail('no-speech')
        return
      }

      onTranscriptRef.current(text)
    } catch (err) {
      console.error('Transcription request failed:', err)
      setStatusSafely('idle')
      fail('network')
    }
  }, [fail, setStatusSafely])

  const start = useCallback(async () => {
    if (statusRef.current !== 'idle') return

    if (!isRecordingSupported()) {
      fail('unsupported')
      return
    }

    let stream: MediaStream
    try {
      // Prompts for permission the first time; resolves instantly once granted.
      stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true },
      })
    } catch (err) {
      const name = err instanceof DOMException ? err.name : ''
      if (name === 'NotAllowedError' || name === 'SecurityError') fail('permission-denied')
      else if (name === 'NotFoundError' || name === 'DevicesNotFoundError') fail('no-mic')
      else {
        console.error('getUserMedia failed:', err)
        fail('unsupported')
      }
      return
    }

    // The component may have unmounted while the permission dialog was open.
    if (!mountedRef.current) {
      stream.getTracks().forEach((track) => track.stop())
      return
    }

    try {
      const mimeType = pickRecorderMimeType()
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined)

      chunksRef.current = []
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data)
      }
      recorder.onerror = (event) => {
        console.error('MediaRecorder error:', event)
        releaseStream()
        setStatusSafely('idle')
        fail('transcribe-failed')
      }
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' })
        chunksRef.current = []
        releaseStream()

        if (blob.size === 0) {
          setStatusSafely('idle')
          fail('too-short')
          return
        }
        void transcribe(blob)
      }

      streamRef.current = stream
      recorderRef.current = recorder
      recorder.start()
      setStatusSafely('recording')

      // Bound the recording so a forgotten mic cannot produce a huge upload.
      autoStopRef.current = setTimeout(() => {
        if (recorderRef.current?.state === 'recording') recorderRef.current.stop()
      }, MAX_RECORDING_MS)
    } catch (err) {
      console.error('Failed to start recording:', err)
      stream.getTracks().forEach((track) => track.stop())
      setStatusSafely('idle')
      fail('unsupported')
    }
  }, [fail, releaseStream, setStatusSafely, transcribe])

  /** Stop and transcribe. The result arrives via onTranscript. */
  const stop = useCallback(() => {
    if (recorderRef.current?.state === 'recording') {
      recorderRef.current.stop() // onstop handles the rest
    }
  }, [])

  const toggle = useCallback(() => {
    if (statusRef.current === 'recording') stop()
    else if (statusRef.current === 'idle') void start()
    // 'transcribing' is deliberately inert — the button is disabled then too.
  }, [start, stop])

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      const recorder = recorderRef.current
      if (recorder?.state === 'recording') {
        // Drop the audio rather than transcribing into an unmounted component.
        recorder.onstop = null
        recorder.stop()
      }
      releaseStream()
    }
  }, [releaseStream])

  return {
    status,
    isRecording: status === 'recording',
    isTranscribing: status === 'transcribing',
    start,
    stop,
    toggle,
  }
}
