'use client'

import { Bot } from 'lucide-react'

export function LoadingBubble() {
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
          
          {/* Animated loading dots */}
          <div className="flex space-x-1.5 p-2">
            <div className="w-2 h-2 bg-accent/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-accent/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-accent/40 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
