'use client'

import { Bot, User } from 'lucide-react'
import { ChatMessage } from '@/types/chat'
import { useLanguageStore } from '@/store/useLanguageStore'

interface MessageBubbleProps {
  message: ChatMessage
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const { language } = useLanguageStore()
  const isUser = message.role === 'user'

  if (isUser) {
    return (
      <div className="flex justify-end mb-4">
        <div className="max-w-[85%] sm:max-w-[75%] flex flex-col items-end gap-1">
          <div 
            className="p-4"
            style={{
              background: 'var(--background-dark)',
              color: 'var(--text-on-dark)',
              borderRadius: '16px 16px 4px 16px',
            }}
          >
            {message.imageUrl && (
              <img 
                src={message.imageUrl} 
                alt="Uploaded" 
                className="w-full max-w-[240px] rounded-lg mb-3 border border-white/10"
              />
            )}
            <p className={`whitespace-pre-wrap ${language === 'hindi' ? 'font-hindi' : 'font-body'}`}>
              {message.content}
            </p>
          </div>
        </div>
      </div>
    )
  }

  // AI Message - Prescription aesthetic
  return (
    <div className="flex justify-start mb-6">
      <div className="max-w-[90%] sm:max-w-[85%] w-full flex flex-col gap-1">
        <div 
          className="p-4 shadow-sm"
          style={{
            background: '#FEFEFE',
            borderTop: '2px solid var(--brand-saffron)',
            borderRadius: '0 0 12px 12px',
          }}
        >
          {/* Header area */}
          <div 
            className="flex items-center gap-2 mb-3"
            style={{
              paddingBottom: '8px',
              borderBottom: '1px solid var(--border)',
            }}
          >
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
              <Bot className="w-5 h-5 text-accent" />
            </div>
            <span className="font-body font-semibold text-primary-light">
              Sehat Saathi
            </span>
          </div>
          
          {/* Content area */}
          <div className={`prose prose-sm max-w-none text-primary-light whitespace-pre-wrap ${language === 'hindi' ? 'font-hindi' : 'font-body'}`}>
            {message.content.split('\n').map((line, i) => {
              // Basic markdown-like rendering for bold text
              const renderLine = () => {
                if (!line.includes('**')) return line
                const parts = line.split('**')
                return parts.map((part, index) => 
                  index % 2 === 1 ? <strong key={index}>{part}</strong> : part
                )
              }
              return <p key={i} className="mb-2 last:mb-0">{renderLine()}</p>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
