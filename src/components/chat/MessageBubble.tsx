'use client'

import { Bot } from 'lucide-react'
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
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '16px',
        width: '100%',
        fontFamily: 'Inter, sans-serif'
      }}>
        <div style={{
          maxWidth: '75%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '4px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #7A73FF 0%, #635BFF 100%)',
            color: 'white',
            borderRadius: '16px 16px 4px 16px',
            padding: '16px',
            boxShadow: '0 4px 12px rgba(99,91,255,0.12)'
          }}>
            {message.imageUrl && (
              <img 
                src={message.imageUrl} 
                alt="Uploaded" 
                style={{
                  width: '100%',
                  maxWidth: '240px',
                  borderRadius: '10px',
                  marginBottom: '12px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  display: 'block'
                }}
              />
            )}
            <p style={{
              margin: 0,
              fontSize: '15px',
              lineHeight: '1.5',
              whiteSpace: 'pre-wrap',
              fontWeight: '500'
            }} className={language === 'hindi' ? 'font-hindi' : ''}>
              {message.content}
            </p>
          </div>
        </div>
      </div>
    )
  }

  // AI Message - Prescription aesthetic
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'flex-start',
      marginBottom: '24px',
      width: '100%',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{
        maxWidth: '85%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
      }}>
        <div style={{
          background: 'white',
          border: '1px solid rgba(10,37,64,0.06)',
          borderTop: '3px solid #00D4FF',
          borderRadius: '0 0 16px 16px',
          padding: '20px',
          boxShadow: '0 4px 12px rgba(10,37,64,0.02)'
        }}>
          {/* Header area */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            paddingBottom: '10px',
            borderBottom: '1px solid #E6EBF1',
            marginBottom: '16px'
          }}>
            <div style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #7A73FF 0%, #00D4FF 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 2px 6px rgba(99,91,255,0.15)'
            }}>
              <Bot size={16} />
            </div>
            <span style={{
              fontWeight: '700',
              fontSize: '14px',
              color: '#0A2540'
            }}>
              Sehat Saathi
            </span>
          </div>
          
          {/* Content area */}
          <div style={{
            color: '#425466',
            fontSize: '15px',
            lineHeight: '1.6'
          }}>
            {message.content.split('\n').map((line, i) => {
              // Basic markdown-like rendering for bold text
              const renderLine = () => {
                if (!line.includes('**')) return line
                const parts = line.split('**')
                return parts.map((part, index) => 
                  index % 2 === 1 ? <strong key={index} style={{ color: '#0A2540', fontWeight: '700' }}>{part}</strong> : part
                )
              }
              return (
                <p 
                  key={i} 
                  style={{ margin: '0 0 10px 0' }} 
                  className={`last:mb-0 ${language === 'hindi' ? 'font-hindi' : ''}`}
                >
                  {renderLine()}
                </p>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
