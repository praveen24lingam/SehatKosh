'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Camera, Paperclip, X } from 'lucide-react'
import { useLanguageStore } from '@/store/useLanguageStore'

interface ChatInputProps {
  onSendMessage: (text: string, imageBase64?: string) => void
  disabled?: boolean
}

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const { language } = useLanguageStore()
  const [message, setMessage] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      setImage(event.target?.result as string)
    }
    reader.readAsDataURL(file)
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const placeholder = language === 'hindi' 
    ? 'अपना सवाल यहाँ लिखें...' 
    : 'Type your question here...'

  const isBtnDisabled = disabled || (!message.trim() && !image)

  return (
    <div style={{
      width: '100%',
      backgroundColor: '#FAFCFF',
      borderTop: '1px solid #E6EBF1',
      padding: '16px',
      fontFamily: 'Inter, sans-serif'
    }}>
      <style dangerouslySetInnerHTML={{__html: `
        .chat-icon-btn {
          transition: all 0.2s ease;
        }
        .chat-icon-btn:hover:not(:disabled) {
          background-color: #F4F4FF !important;
          color: #635BFF !important;
        }
        .chat-send-btn {
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .chat-send-btn:hover:not(:disabled) {
          background-color: #5249F5 !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(99,91,255,0.25);
        }
        .chat-send-btn:active:not(:disabled) {
          transform: translateY(0);
          box-shadow: none;
        }
      `}} />

      {image && (
        <div style={{
          position: 'relative',
          display: 'inline-block',
          marginBottom: '12px'
        }}>
          <img 
            src={image} 
            alt="Upload preview" 
            style={{
              height: '80px',
              width: 'auto',
              borderRadius: '12px',
              border: '1px solid #E6EBF1',
              objectFit: 'cover'
            }}
          />
          <button
            onClick={() => setImage(null)}
            style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              backgroundColor: '#E02424',
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
        border: '1px solid #E6EBF1',
        borderRadius: '16px',
        padding: '6px 12px',
        boxShadow: '0 4px 12px rgba(10,37,64,0.02)',
        transition: 'all 0.2s ease'
      }}>
        <button 
          className="chat-icon-btn"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          style={{
            padding: '10px',
            border: 'none',
            background: 'transparent',
            color: '#8898AA',
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
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          style={{
            padding: '10px',
            border: 'none',
            background: 'transparent',
            color: '#8898AA',
            cursor: 'pointer',
            borderRadius: '10px',
            display: 'none', // Shown as flex on larger screen view
            alignItems: 'center',
            justifyContent: 'center',
            outline: 'none',
            flexShrink: 0
          }}
          // Note: Responsive control via local classes if necessary, let's keep it visible on mobile too for quick uploads!
        >
          <Paperclip size={20} />
        </button>
        
        <input 
          type="file" 
          accept="image/*" 
          style={{ display: 'none' }} 
          ref={fileInputRef}
          onChange={handleImageUpload}
        />

        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
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
            color: '#0A2540',
            fontWeight: '500',
            resize: 'none',
            lineHeight: '1.4'
          }}
          rows={1}
        />

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
            backgroundColor: isBtnDisabled ? '#F6F9FC' : '#635BFF',
            color: isBtnDisabled ? '#8898AA' : 'white',
            outline: 'none',
            flexShrink: 0,
            boxShadow: isBtnDisabled ? 'none' : '0 4px 12px rgba(99,91,255,0.2)'
          }}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  )
}
