'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Send, Camera, Paperclip, X, Mic, Square, LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'
import { useLanguageStore } from '@/store/useLanguageStore'
import { useVoiceInput, VoiceErrorCode } from '@/hooks/useVoiceInput'
import { prepareImageForUpload, approxBytesOfDataUrl, MAX_UPLOAD_BYTES } from '@/lib/image'

interface ChatInputProps {
  onSendMessage: (text: string, imageBase64?: string) => void
  disabled?: boolean
}

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const { language } = useLanguageStore()
  const [message, setMessage] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [isFocused, setIsFocused] = useState(false)
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Voice input appends to whatever is already typed rather than replacing it,
  // and never sends on its own — the user reads and edits first.
  const handleTranscript = useCallback((text: string) => {
    setMessage((current) => {
      if (!current.trim()) return text
      return current.endsWith(' ') ? current + text : `${current} ${text}`
    })
    textareaRef.current?.focus()
  }, [])

  const handleVoiceError = useCallback((code: VoiceErrorCode) => {
    const hi = language === 'hindi'
    const messages: Record<VoiceErrorCode, string> = {
      'unsupported': hi
        ? 'इस ब्राउज़र में वॉइस इनपुट काम नहीं करता। कृपया टाइप करें।'
        : 'Voice input is not supported in this browser. Please type instead.',
      'permission-denied': hi
        ? 'माइक की अनुमति नहीं मिली। ब्राउज़र सेटिंग्स में माइक्रोफ़ोन चालू करें।'
        : 'Mic permission denied. Please allow microphone access in your browser settings.',
      'no-mic': hi
        ? 'कोई माइक्रोफ़ोन नहीं मिला।'
        : 'No microphone found on this device.',
      'no-speech': hi
        ? 'कुछ सुनाई नहीं दिया, दोबारा बोलें।'
        : "Couldn't hear anything, please try again.",
      'too-short': hi
        ? 'रिकॉर्डिंग बहुत छोटी थी। बटन दबाकर थोड़ा लंबा बोलें।'
        : 'That recording was too short. Hold on a moment longer and speak.',
      'transcribe-failed': hi
        ? 'आवाज़ समझने में दिक्कत हुई। कृपया दोबारा कोशिश करें।'
        : 'Could not transcribe that. Please try again.',
      'network': hi
        ? 'नेटवर्क की समस्या। कनेक्शन जाँच कर दोबारा कोशिश करें।'
        : 'Network problem. Check your connection and try again.',
    }
    toast.error(messages[code])
  }, [language])

  const { isRecording, isTranscribing, toggle } = useVoiceInput({
    onTranscript: handleTranscript,
    onError: handleVoiceError,
  })

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
    }
  }, [message])

  const handleSend = () => {
    if ((!message.trim() && !image) || disabled) return
    onSendMessage(message.trim(), image || undefined)
    setMessage('')
    setImage(null)
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    const file = input.files?.[0]
    // Always clear the input so picking the same file twice still fires onChange.
    input.value = ''
    if (!file) return

    if (file.size > MAX_UPLOAD_BYTES) {
      toast.error(language === 'hindi'
        ? 'Photo bahut badi hai. Kripya 15MB se chhoti photo bhejein.'
        : 'That photo is too large. Please use an image under 15MB.')
      return
    }

    try {
      // Phone photos are downscaled and re-encoded before they go over the wire.
      const prepared = await prepareImageForUpload(file)

      if (approxBytesOfDataUrl(prepared) > 4 * 1024 * 1024) {
        toast.error(language === 'hindi'
          ? 'Photo bahut badi hai. Kripya thodi chhoti photo lein.'
          : 'That photo is still too large to send. Please try a smaller one.')
        return
      }

      setImage(prepared)
    } catch (err) {
      console.error('Image upload failed:', err)
      toast.error(language === 'hindi'
        ? 'Photo padhne mein dikkat hui. Kripya dobara koshish karein.'
        : 'Could not read that image. Please try again.')
    }
  }

  const placeholder = language === 'hindi' 
    ? 'स्वास्थ्य से जुड़ा सवाल पूछें, या रिपोर्ट अपलोड करें...' 
    : 'Ask a health question, upload a report...'

  const isBtnDisabled = disabled || (!message.trim() && !image)

  return (
    <div style={{
      width: '100%',
      backgroundColor: 'var(--background)',
      borderTop: '1px solid var(--border)',
      padding: '16px',
      fontFamily: 'Inter, sans-serif'
    }}>
      <style dangerouslySetInnerHTML={{__html: `
        .chat-icon-btn {
          transition: all 0.2s ease;
        }
        .chat-icon-btn:hover:not(:disabled) {
          background-color: var(--primary-muted) !important;
          color: var(--primary) !important;
        }
        .chat-send-btn {
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .chat-send-btn:hover:not(:disabled) {
          background-color: var(--primary-hover) !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgb(var(--teal-rgb) / 0.25);
        }
        .chat-send-btn:active:not(:disabled) {
          transform: translateY(0);
          box-shadow: none;
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes rec-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        /* The recording button itself breathes, so the state is obvious even
           to someone who cannot read the banner above it. */
        @keyframes mic-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        @media (prefers-reduced-motion: reduce) {
          .chat-mic-recording { animation: none !important; }
          .chat-mic-recording .mic-halo { animation: none !important; }
        }
      `}} />

      {isRecording && (
        <div style={{ fontSize: '13px', color: 'var(--destructive)', marginBottom: '8px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ display: 'inline-block', width: '8px', height: '8px', backgroundColor: 'var(--destructive)', borderRadius: '50%', animation: 'rec-blink 1.2s ease-in-out infinite' }} />
          {language === 'hindi'
            ? 'सुन रहा हूँ... बोलकर फिर से बटन दबाएँ'
            : 'Listening... tap the button again when done'}
        </div>
      )}

      {isTranscribing && (
        <div style={{ fontSize: '13px', color: 'var(--primary)', marginBottom: '8px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <LoaderCircle size={13} style={{ animation: 'spin 1s linear infinite' }} />
          {language === 'hindi' ? 'आवाज़ को टेक्स्ट में बदल रहे हैं...' : 'Converting speech to text...'}
        </div>
      )}

      {image && (
        <div style={{
          position: 'relative',
          display: 'inline-block',
          marginBottom: '12px'
        }}>
          {/* Base64 data-URI preview; next/image cannot optimize data URIs. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt="Upload preview"
            style={{
              height: '80px',
              width: 'auto',
              borderRadius: '12px',
              border: '1px solid var(--border)',
              objectFit: 'cover'
            }}
          />
          <button
            onClick={() => setImage(null)}
            style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              backgroundColor: 'var(--destructive)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgb(var(--slate-rgb) / 0.12)'
            }}
          >
            <X size={12} />
          </button>
        </div>
      )}

      <div className="premium-input-container" style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: '6px',
        backgroundColor: 'white',
        border: isFocused ? '1px solid var(--primary)' : '1px solid var(--border)',
        borderRadius: '16px',
        padding: '6px 12px',
        boxShadow: isFocused ? '0 0 0 4px rgb(var(--teal-rgb) / 0.1)' : '0 4px 12px rgb(var(--slate-rgb) / 0.02)',
        transition: 'all 0.2s ease'
      }}>
        <button 
          className="chat-icon-btn"
          onClick={() => cameraInputRef.current?.click()}
          disabled={disabled}
          title={language === 'hindi' ? 'Camera se photo lein' : 'Take a photo'}
          style={{
            padding: '10px',
            border: 'none',
            background: 'transparent',
            color: 'var(--icon-muted)',
            cursor: 'pointer',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            outline: 'none',
            flexShrink: 0
          }}
        >
          <Camera size={20} />
        </button>
        <button 
          className="chat-icon-btn"
          onClick={() => galleryInputRef.current?.click()}
          disabled={disabled}
          title={language === 'hindi' ? 'Gallery se chunein' : 'Choose from gallery'}
          style={{
            padding: '10px',
            border: 'none',
            background: 'transparent',
            color: 'var(--icon-muted)',
            cursor: 'pointer',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            outline: 'none',
            flexShrink: 0
          }}
          // Note: Responsive control via local classes if necessary, let's keep it visible on mobile too for quick uploads!
        >
          <Paperclip size={20} />
        </button>
        
        {/* capture="environment" makes mobile open the rear camera directly. */}
        <input
          type="file"
          accept="image/*"
          capture="environment"
          style={{ display: 'none' }}
          ref={cameraInputRef}
          onChange={handleImageUpload}
        />
        {/* No capture attribute, so this one always opens the gallery/file picker. */}
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={galleryInputRef}
          onChange={handleImageUpload}
        />

        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          style={{
            flex: 1,
            maxHeight: '120px',
            minHeight: '24px',
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            padding: '10px 4px',
            fontSize: '15px',
            color: 'var(--foreground)',
            fontWeight: '500',
            resize: 'none',
            lineHeight: '1.4'
          }}
          rows={1}
        />

        <button
          onClick={toggle}
          disabled={disabled || isTranscribing}
          className={`chat-icon-btn ${isRecording ? 'chat-mic-recording' : ''}`}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: isTranscribing ? 'wait' : 'pointer',
            backgroundColor: isRecording ? 'var(--destructive)' : 'transparent',
            color: isRecording ? 'white' : 'var(--icon-muted)',
            outline: 'none',
            flexShrink: 0,
            position: 'relative',
            animation: isRecording ? 'mic-breathe 1.6s ease-in-out infinite' : undefined
          }}
          aria-label={
            isRecording
              ? (language === 'hindi' ? 'रिकॉर्डिंग बंद करें' : 'Stop recording')
              : (language === 'hindi' ? 'बोलकर लिखें' : 'Record voice')
          }
          aria-pressed={isRecording}
          title={
            isTranscribing
              ? (language === 'hindi' ? 'बदल रहे हैं...' : 'Transcribing...')
              : isRecording
                ? (language === 'hindi' ? 'रोकें' : 'Stop recording')
                : (language === 'hindi' ? 'बोलकर लिखें' : 'Speak instead of typing')
          }
        >
          {isRecording && (
            <div
              className="mic-halo"
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '12px',
                border: '2px solid var(--destructive)',
                animation: 'pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite'
              }}
            />
          )}
          {isTranscribing
            ? <LoaderCircle size={18} style={{ animation: 'spin 1s linear infinite' }} />
            : isRecording
              ? <Square size={16} fill="currentColor" />
              : <Mic size={18} />}
        </button>

        <button 
          onClick={handleSend}
          disabled={isBtnDisabled}
          className="chat-send-btn"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: isBtnDisabled ? 'not-allowed' : 'pointer',
            backgroundColor: isBtnDisabled ? 'var(--background)' : 'var(--primary)',
            color: isBtnDisabled ? 'var(--icon-muted)' : 'white',
            outline: 'none',
            flexShrink: 0,
            boxShadow: isBtnDisabled ? 'none' : '0 4px 12px rgb(var(--teal-rgb) / 0.2)'
          }}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  )
}
