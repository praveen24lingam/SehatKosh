'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Camera, Paperclip, X, Mic, MicOff } from 'lucide-react'
import { toast } from 'sonner'
import { useLanguageStore } from '@/store/useLanguageStore'
import { useVoiceInput } from '@/hooks/useVoiceInput'
import { prepareImageForUpload, approxBytesOfDataUrl, MAX_UPLOAD_BYTES } from '@/lib/image'

interface ChatInputProps {
  onSendMessage: (text: string, imageBase64?: string) => void
  disabled?: boolean
}

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const { language } = useLanguageStore()
  const [message, setMessage] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [baseMessage, setBaseMessage] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const { isListening, transcript, startListening, stopListening, isSupported, error } = useVoiceInput(language === 'hindi' ? 'hi-IN' : 'en-IN')

  // Error handling for voice input
  useEffect(() => {
    if (error) {
      if (error === 'not-allowed') {
        toast.error('Mic permission denied. Please allow microphone access in browser settings.')
      } else if (error === 'no-speech') {
        toast.error(language === 'hindi' ? 'कुछ सुनाई नहीं दिया, दोबारा बोलें' : "Couldn't hear anything, please try again")
      } else {
        toast.error(language === 'hindi' ? 'माइक्रोफ़ोन में त्रुटि हुई' : 'Microphone error occurred')
      }
    }
  }, [error, language])

  // Real-time transcript append
  useEffect(() => {
    if (isListening && transcript) {
      const spacer = baseMessage && !baseMessage.endsWith(' ') ? ' ' : ''
      setMessage(baseMessage + spacer + transcript)
    }
  }, [transcript, isListening]) // we only want to update when transcript changes while listening

  const handleStartListening = () => {
    setBaseMessage(message)
    startListening()
  }

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
      backgroundColor: '#F8FAFC',
      borderTop: '1px solid #E2E8F0',
      padding: '16px',
      fontFamily: 'Inter, sans-serif'
    }}>
      <style dangerouslySetInnerHTML={{__html: `
        .chat-icon-btn {
          transition: all 0.2s ease;
        }
        .chat-icon-btn:hover:not(:disabled) {
          background-color: #CCFBF1 !important;
          color: #0D9488 !important;
        }
        .chat-send-btn {
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .chat-send-btn:hover:not(:disabled) {
          background-color: #0F766E !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(13,148,136,0.25);
        }
        .chat-send-btn:active:not(:disabled) {
          transform: translateY(0);
          box-shadow: none;
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}} />

      {isListening && (
        <div style={{ fontSize: '13px', color: '#DC2626', marginBottom: '8px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ display: 'inline-block', width: '8px', height: '8px', backgroundColor: '#DC2626', borderRadius: '50%', animation: 'pulse-ring 1s infinite' }} />
          {language === 'hindi' ? '🎙 सुन रहा हूँ...' : '🎙 Listening...'}
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
              border: '1px solid #E2E8F0',
              objectFit: 'cover'
            }}
          />
          <button
            onClick={() => setImage(null)}
            style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              backgroundColor: '#DC2626',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
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
        border: isFocused ? '1px solid #0D9488' : '1px solid #E2E8F0',
        borderRadius: '16px',
        padding: '6px 12px',
        boxShadow: isFocused ? '0 0 0 4px rgba(13,148,136,0.1)' : '0 4px 12px rgba(15,23,42,0.02)',
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
            color: '#94A3B8',
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
            color: '#94A3B8',
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
            color: '#0F172A',
            fontWeight: '500',
            resize: 'none',
            lineHeight: '1.4'
          }}
          rows={1}
        />

        {isSupported && (
          <button 
            onClick={isListening ? stopListening : handleStartListening}
            className="chat-icon-btn"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backgroundColor: isListening ? '#DC2626' : 'transparent',
              color: isListening ? 'white' : '#94A3B8',
              outline: 'none',
              flexShrink: 0,
              position: 'relative'
            }}
            title={isListening ? 'Stop listening' : 'Start listening'}
          >
            {isListening && (
              <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '12px',
                border: '2px solid #DC2626',
                animation: 'pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite'
              }} />
            )}
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          </button>
        )}

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
            backgroundColor: isBtnDisabled ? '#F8FAFC' : '#0D9488',
            color: isBtnDisabled ? '#94A3B8' : 'white',
            outline: 'none',
            flexShrink: 0,
            boxShadow: isBtnDisabled ? 'none' : '0 4px 12px rgba(13,148,136,0.2)'
          }}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  )
}
