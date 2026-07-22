'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Bot } from 'lucide-react'
import { DURATION, EASE_OUT } from '@/lib/motion'

export function LoadingBubble() {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.base, ease: EASE_OUT }}
      style={{
      display: 'flex',
      justifyContent: 'flex-start',
      marginBottom: '24px',
      width: '100%',
      fontFamily: 'Inter, sans-serif'
    }}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes chatThinking {
          0%, 100% { transform: translateY(0); opacity: 0.45; }
          50% { transform: translateY(-3px); opacity: 1; }
        }
        .chat-loading-dot {
          width: 7px;
          height: 7px;
          background-color: var(--primary);
          border-radius: 50%;
          display: inline-block;
          animation: chatThinking 1.3s infinite ease-in-out;
        }
        /* Keep a legible resting state rather than a frozen mid-bounce dot. */
        @media (prefers-reduced-motion: reduce) {
          .chat-loading-dot {
            animation: none;
            opacity: 0.55;
          }
        }
        .chat-dot-1 { animation-delay: -0.3s; }
        .chat-dot-2 { animation-delay: -0.15s; }
      `}} />

      <div style={{
        maxWidth: '85%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
      }}>
        <div style={{
          background: 'white',
          border: '1px solid var(--border-strong)',
          borderTop: '3px solid var(--accent-light)',
          borderRadius: '0 0 16px 16px',
          padding: '20px',
          boxShadow: '0 4px 12px rgb(var(--slate-rgb) / 0.02)'
        }}>
          {/* Header area */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            paddingBottom: '10px',
            borderBottom: '1px solid var(--border)',
            marginBottom: '16px'
          }}>
            <div style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent-light) 0%, var(--primary) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 2px 6px rgb(var(--teal-rgb) / 0.15)'
            }}>
              <Bot size={16} />
            </div>
            <span style={{
              fontWeight: '700',
              fontSize: '14px',
              color: 'var(--foreground)'
            }}>
              Sehat Saathi
            </span>
          </div>
          
          {/* Animated loading dots */}
          <div style={{ display: 'flex', gap: '6px', padding: '8px 4px' }}>
            <div className="chat-loading-dot chat-dot-1" />
            <div className="chat-loading-dot chat-dot-2" />
            <div className="chat-loading-dot" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
