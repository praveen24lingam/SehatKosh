'use client'

import { Bot } from 'lucide-react'

export function LoadingBubble() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'flex-start',
      marginBottom: '24px',
      width: '100%',
      fontFamily: 'Inter, sans-serif'
    }}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes chatBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .chat-loading-dot {
          width: 8px;
          height: 8px;
          background-color: #635BFF;
          border-radius: 50%;
          display: inline-block;
          animation: chatBounce 1.2s infinite ease-in-out;
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
          
          {/* Animated loading dots */}
          <div style={{ display: 'flex', gap: '6px', padding: '8px 4px' }}>
            <div className="chat-loading-dot chat-dot-1" />
            <div className="chat-loading-dot chat-dot-2" />
            <div className="chat-loading-dot" />
          </div>
        </div>
      </div>
    </div>
  )
}
