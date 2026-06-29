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

  return (
    <div className="w-full bg-surface-1 border-t border-dark p-3 md:p-4">
      {image && (
        <div className="mb-3 relative inline-block">
          <img 
            src={image} 
            alt="Upload preview" 
            className="h-20 w-auto rounded-md border border-dark object-cover"
          />
          <button
            onClick={() => setImage(null)}
            className="absolute -top-2 -right-2 bg-danger text-white rounded-full p-1 hover:bg-danger/90"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      <div className="flex items-end gap-2 bg-background border border-dark rounded-xl p-1 shadow-sm focus-within:border-brand-saffron transition-colors">
        <button 
          className="p-3 text-muted-dark hover:text-accent transition-colors"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
        >
          <Camera className="w-5 h-5" />
        </button>
        <button 
          className="p-3 pl-0 text-muted-dark hover:text-accent transition-colors hidden sm:block"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
        >
          <Paperclip className="w-5 h-5" />
        </button>
        
        <input 
          type="file" 
          accept="image/*" 
          className="hidden" 
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
          className={`flex-1 max-h-[120px] bg-transparent resize-none py-3 outline-none text-primary-dark placeholder:text-muted-dark ${
            language === 'hindi' ? 'font-hindi' : 'font-body'
          }`}
          rows={1}
        />

        <button 
          onClick={handleSend}
          disabled={disabled || (!message.trim() && !image)}
          className={`p-3 rounded-lg transition-colors m-1 ${
            (!message.trim() && !image) || disabled
              ? 'text-muted-dark bg-transparent' 
              : 'text-white bg-accent hover:bg-accent/90'
          }`}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
