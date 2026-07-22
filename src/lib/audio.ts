'use client'

/**
 * Browser-side audio capture helpers for voice input.
 *
 * The recorder produces whatever container the browser prefers (WebM/Opus on
 * Chrome, MP4/AAC on Safari), but Gemini's documented audio formats do not
 * include WebM. Rather than gamble on an undocumented container being accepted,
 * everything is decoded and re-encoded to 16 kHz mono 16-bit WAV before it
 * leaves the browser — a format Gemini definitely accepts, and the standard
 * shape for speech recognition. It also shrinks the payload: a phone recording
 * at 48 kHz stereo is ~6x larger than it needs to be for speech.
 */

/** Hard cap on a single recording. Also bounds the upload size. */
export const MAX_RECORDING_MS = 60_000

/** 16 kHz mono 16-bit ≈ 32 KB/s, so 60s ≈ 1.9 MB — inside serverless body limits. */
const TARGET_SAMPLE_RATE = 16_000

/** Refuse to upload anything larger, whatever the duration says. */
export const MAX_AUDIO_BYTES = 6 * 1024 * 1024

/**
 * Containers we ask MediaRecorder for, best first. Opus is the priority — it is
 * the best speech codec available in a browser. The empty string at the end
 * lets the browser fall back to its own default.
 */
const PREFERRED_MIME_TYPES = [
  'audio/webm;codecs=opus',
  'audio/webm',
  'audio/ogg;codecs=opus',
  'audio/mp4',
  '',
]

export function pickRecorderMimeType(): string {
  if (typeof MediaRecorder === 'undefined') return ''
  for (const type of PREFERRED_MIME_TYPES) {
    if (!type) return ''
    if (MediaRecorder.isTypeSupported(type)) return type
  }
  return ''
}

export function isRecordingSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof MediaRecorder !== 'undefined' &&
    !!navigator.mediaDevices?.getUserMedia
  )
}

type AudioContextCtor = typeof AudioContext

function getAudioContextCtor(): AudioContextCtor | null {
  if (typeof window === 'undefined') return null
  return (
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: AudioContextCtor }).webkitAudioContext ??
    null
  )
}

/**
 * Resample to mono at TARGET_SAMPLE_RATE.
 *
 * Safari has historically rejected OfflineAudioContext sample rates outside
 * 44.1/48 kHz, so a failure here falls back to the buffer's own rate — a larger
 * WAV, but still a valid one, which beats losing the feature entirely.
 */
async function toMono16k(buffer: AudioBuffer): Promise<AudioBuffer> {
  if (buffer.sampleRate === TARGET_SAMPLE_RATE && buffer.numberOfChannels === 1) {
    return buffer
  }

  const frames = Math.max(1, Math.ceil(buffer.duration * TARGET_SAMPLE_RATE))
  try {
    const offline = new OfflineAudioContext(1, frames, TARGET_SAMPLE_RATE)
    const source = offline.createBufferSource()
    source.buffer = buffer
    source.connect(offline.destination)
    source.start()
    return await offline.startRendering()
  } catch {
    return buffer
  }
}

/** Average all channels down to one Float32 track. */
function mixToMono(buffer: AudioBuffer): Float32Array {
  if (buffer.numberOfChannels === 1) return buffer.getChannelData(0)

  const length = buffer.length
  const mixed = new Float32Array(length)
  for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
    const data = buffer.getChannelData(channel)
    for (let i = 0; i < length; i++) mixed[i] += data[i]
  }
  for (let i = 0; i < length; i++) mixed[i] /= buffer.numberOfChannels
  return mixed
}

/** Standard 44-byte RIFF header followed by signed 16-bit little-endian PCM. */
function encodeWav(samples: Float32Array, sampleRate: number): Blob {
  const bytes = new ArrayBuffer(44 + samples.length * 2)
  const view = new DataView(bytes)

  const writeString = (offset: number, value: string) => {
    for (let i = 0; i < value.length; i++) view.setUint8(offset + i, value.charCodeAt(i))
  }

  writeString(0, 'RIFF')
  view.setUint32(4, 36 + samples.length * 2, true)
  writeString(8, 'WAVE')
  writeString(12, 'fmt ')
  view.setUint32(16, 16, true) // PCM chunk size
  view.setUint16(20, 1, true) // format: PCM
  view.setUint16(22, 1, true) // channels: mono
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, sampleRate * 2, true) // byte rate
  view.setUint16(32, 2, true) // block align
  view.setUint16(34, 16, true) // bits per sample
  writeString(36, 'data')
  view.setUint32(40, samples.length * 2, true)

  let offset = 44
  for (let i = 0; i < samples.length; i++) {
    // Clamp before scaling so loud input distorts rather than wrapping around.
    const sample = Math.max(-1, Math.min(1, samples[i]))
    view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true)
    offset += 2
  }

  return new Blob([bytes], { type: 'audio/wav' })
}

/** FileReader avoids the call-stack blowup of String.fromCharCode over a big array. */
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Failed to read audio blob'))
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : ''
      const base64 = result.split(',')[1]
      if (!base64) reject(new Error('Empty audio data'))
      else resolve(base64)
    }
    reader.readAsDataURL(blob)
  })
}

export interface PreparedAudio {
  base64: string
  mimeType: 'audio/wav'
  durationSec: number
}

/**
 * Decode a recorded blob and re-encode it as WAV, ready to send to Gemini.
 * Throws if the browser cannot decode the recording or it holds no audio.
 */
export async function prepareAudioForUpload(blob: Blob): Promise<PreparedAudio> {
  const Ctor = getAudioContextCtor()
  if (!Ctor) throw new Error('Web Audio API unavailable')

  const arrayBuffer = await blob.arrayBuffer()
  if (arrayBuffer.byteLength === 0) throw new Error('Empty recording')

  const context = new Ctor()
  let decoded: AudioBuffer
  try {
    decoded = await context.decodeAudioData(arrayBuffer)
  } finally {
    // Chrome caps concurrent AudioContexts, so release it either way.
    void context.close()
  }

  if (decoded.duration < 0.3) throw new Error('Recording too short')

  const resampled = await toMono16k(decoded)
  const wav = encodeWav(mixToMono(resampled), resampled.sampleRate)

  if (wav.size > MAX_AUDIO_BYTES) throw new Error('Recording too large')

  return {
    base64: await blobToBase64(wav),
    mimeType: 'audio/wav',
    durationSec: decoded.duration,
  }
}
