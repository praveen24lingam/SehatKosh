'use client'

import { useState } from 'react'
import { Sparkles, Clock, X } from 'lucide-react'
import { useLanguageStore } from '@/store/useLanguageStore'

export function SmartAISuggestion() {
  const { language } = useLanguageStore()
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(99,91,255,0.05) 0%, rgba(0,212,255,0.05) 100%)',
      border: '1px solid rgba(99,91,255,0.2)',
      borderRadius: '20px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ position: 'absolute', top: -30, right: -30, width: 100, height: 100, background: 'radial-gradient(circle, rgba(99,91,255,0.1) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
      
      <button 
        onClick={() => setIsVisible(false)}
        style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', color: '#425466', cursor: 'pointer', padding: '4px' }}
      >
        <X size={16} />
      </button>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #635BFF 0%, #00D4FF 100%)',
          width: '32px', height: '32px', borderRadius: '10px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', flexShrink: 0
        }}>
          <Sparkles size={16} />
        </div>
        <div>
          <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#0A2540', margin: '0 0 4px 0' }}>
            {language === 'hindi' ? 'दवा मिली' : 'Medicine Detected'}
          </h4>
          <p style={{ fontSize: '14px', color: '#425466', margin: 0, lineHeight: 1.5, paddingRight: '20px' }}>
            {language === 'hindi' 
              ? 'हमें हाल ही की रिपोर्ट में "Metformin 500 mg" मिली है। क्या हम आपके लिए रोज़ाना का रिमाइंडर सेट कर दें?' 
              : 'We found "Metformin 500 mg" in your recent report. Would you like us to create a daily reminder?'}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
        <button style={{
          padding: '10px 16px', borderRadius: '10px', border: 'none',
          background: '#635BFF', color: 'white', fontWeight: '600', fontSize: '13px',
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
          boxShadow: '0 4px 12px rgba(99,91,255,0.2)'
        }}>
          <Clock size={14} />
          {language === 'hindi' ? 'रिमाइंडर बनाएं' : 'Create Reminder'}
        </button>
        <button style={{
          padding: '10px 16px', borderRadius: '10px', border: '1px solid rgba(10,37,64,0.1)',
          background: 'white', color: '#425466', fontWeight: '600', fontSize: '13px',
          cursor: 'pointer'
        }}>
          {language === 'hindi' ? 'समय बदलें' : 'Edit Time'}
        </button>
        <button 
          onClick={() => setIsVisible(false)}
          style={{
            padding: '10px 16px', borderRadius: '10px', border: 'none',
            background: 'transparent', color: '#425466', fontWeight: '600', fontSize: '13px',
            cursor: 'pointer'
          }}
        >
          {language === 'hindi' ? 'अभी नहीं' : 'Ignore'}
        </button>
      </div>
    </div>
  )
}
