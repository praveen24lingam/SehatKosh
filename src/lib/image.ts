'use client'

/** Reject anything larger than this before we even try to decode it. */
export const MAX_UPLOAD_BYTES = 15 * 1024 * 1024 // 15 MB

/** Longest edge after downscaling. Plenty for OCR on a report photo. */
const MAX_EDGE = 1600

/** JPEG quality used when re-encoding. */
const QUALITY = 0.82

/**
 * Roughly how many bytes a base64 data URI represents (base64 inflates by ~4/3).
 * Used to keep the JSON request body inside typical serverless limits.
 */
export function approxBytesOfDataUrl(dataUrl: string): number {
  const base64 = dataUrl.split(',')[1] || ''
  return Math.floor((base64.length * 3) / 4)
}

function readAsDataUrl(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error ?? new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Failed to decode image'))
    img.src = src
  })
}

/**
 * Downscale and re-encode a phone photo before it goes over the wire.
 *
 * Modern phone cameras produce 4–12 MB images; base64-encoding one into a JSON
 * body will blow past serverless request limits and fail server-side. This
 * caps the longest edge and re-encodes as JPEG.
 *
 * Re-encoding through a canvas also normalises formats — an HEIC that the
 * browser can decode comes back out as JPEG, which the vision API accepts.
 * If anything in the pipeline fails (e.g. a browser that cannot decode HEIC),
 * we fall back to the original data URI rather than blocking the upload.
 */
export async function prepareImageForUpload(file: File): Promise<string> {
  const original = await readAsDataUrl(file)

  try {
    const img = await loadImage(original)
    const { width, height } = img
    if (!width || !height) return original

    const scale = Math.min(1, MAX_EDGE / Math.max(width, height))
    // Already small and already a format the API handles — leave it alone.
    if (scale === 1 && file.type === 'image/jpeg') return original

    const canvas = document.createElement('canvas')
    canvas.width = Math.round(width * scale)
    canvas.height = Math.round(height * scale)

    const ctx = canvas.getContext('2d')
    if (!ctx) return original

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    const compressed = canvas.toDataURL('image/jpeg', QUALITY)

    // Guard against a "compression" that made things worse.
    return compressed.length < original.length ? compressed : original
  } catch {
    return original
  }
}
