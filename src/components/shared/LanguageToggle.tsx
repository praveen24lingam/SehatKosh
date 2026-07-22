'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useLanguageStore } from '@/store/useLanguageStore'

export function LanguageToggle() {
  const { language, setLanguage } = useLanguageStore()

  return (
    <div 
      style={{
        display: 'flex',
        alignItems: 'center',
        background: '#F1F5F9',
        borderRadius: '12px',
        padding: '4px',
        position: 'relative',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
      }}
    >
      <button
        onClick={() => setLanguage('hindi')}
        style={{
          position: 'relative',
          padding: '6px 16px',
          fontSize: '14px',
          fontWeight: language === 'hindi' ? '700' : '500',
          color: language === 'hindi' ? '#0D9488' : '#475569',
          background: 'transparent',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          zIndex: 1,
          transition: 'color 0.3s ease',
          fontFamily: 'Inter, sans-serif'
        }}
      >
        {language === 'hindi' && (
          <motion.div
            layoutId="activeLanguageTab"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'white',
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(13,148,136,0.15)',
              zIndex: -1
            }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        हिंदी
      </button>

      <button
        onClick={() => setLanguage('english')}
        style={{
          position: 'relative',
          padding: '6px 16px',
          fontSize: '14px',
          fontWeight: language === 'english' ? '700' : '500',
          color: language === 'english' ? '#0D9488' : '#475569',
          background: 'transparent',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          zIndex: 1,
          transition: 'color 0.3s ease',
          fontFamily: 'Inter, sans-serif'
        }}
      >
        {language === 'english' && (
          <motion.div
            layoutId="activeLanguageTab"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'white',
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(13,148,136,0.15)',
              zIndex: -1
            }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        English
      </button>
    </div>
  )
}
