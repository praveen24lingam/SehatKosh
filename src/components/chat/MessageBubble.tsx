'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Bot } from 'lucide-react'
import { ChatMessage } from '@/types/chat'
import { useLanguageStore } from '@/store/useLanguageStore'
import { DURATION, EASE_OUT } from '@/lib/motion'

interface MessageBubbleProps {
  message: ChatMessage
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const { language } = useLanguageStore()
  const reduce = useReducedMotion()
  const isUser = message.role === 'user'

  // Messages arrive one at a time, so each animates once on mount.
  const enter = {
    initial: { opacity: 0, y: reduce ? 0 : 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DURATION.base, ease: EASE_OUT },
  }

  if (isUser) {
    return (
      <motion.div {...enter} style={{
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
            background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
            color: 'white',
            borderRadius: '16px 16px 4px 16px',
            padding: '16px',
            boxShadow: '0 4px 12px rgba(13,148,136,0.12)'
          }}>
            {message.imageUrl && (
              // Base64 data-URI upload; next/image cannot optimize data URIs.
              // eslint-disable-next-line @next/next/no-img-element
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
      </motion.div>
    )
  }

  // AI Message - Prescription aesthetic
  return (
    <motion.div {...enter} style={{
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
          border: '1px solid rgba(15,23,42,0.06)',
          borderTop: '3px solid #14B8A6',
          borderRadius: '0 0 16px 16px',
          padding: '20px',
          boxShadow: '0 4px 12px rgba(15,23,42,0.02)'
        }}>
          {/* Header area */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            paddingBottom: '10px',
            borderBottom: '1px solid #E2E8F0',
            marginBottom: '16px'
          }}>
            <div style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 2px 6px rgba(13,148,136,0.15)'
            }}>
              <Bot size={16} />
            </div>
            <span style={{
              fontWeight: '700',
              fontSize: '14px',
              color: '#0F172A'
            }}>
              Sehat Saathi
            </span>
          </div>
          
          {/* Content area */}
          <div style={{
            color: '#475569',
            fontSize: '15px',
            lineHeight: '1.6'
          }}>
            {message.content.split('\n').map((line, i) => {
              // Basic markdown-like rendering for bold text
              const renderLine = () => {
                if (!line.includes('**')) return line
                const parts = line.split('**')
                return parts.map((part, index) => 
                  index % 2 === 1 ? <strong key={index} style={{ color: '#0F172A', fontWeight: '700' }}>{part}</strong> : part
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
    </motion.div>
  )
}
