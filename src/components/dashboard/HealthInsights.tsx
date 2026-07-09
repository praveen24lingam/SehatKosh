'use client'

import { Sparkles, ArrowRight } from 'lucide-react'
import { useLanguageStore } from '@/store/useLanguageStore'

export function HealthInsights() {
  const { language } = useLanguageStore()

  return (
    <div style={{
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #0A2540 0%, #162D4A 100%)',
      borderRadius: '24px',
      borderTop: '3px solid #00D4FF',
      padding: '32px',
      boxShadow: '0 16px 32px rgba(10, 37, 64, 0.15)',
      fontFamily: 'Inter, sans-serif'
    }}>
      
      {/* Background Ornaments (Dual glow orbs) */}
      <div style={{
        position: 'absolute',
        top: '-60px',
        right: '-60px',
        width: '240px',
        height: '240px',
        background: 'radial-gradient(circle, rgba(99,91,255,0.3) 0%, transparent 70%)',
        pointerEvents: 'none',
        borderRadius: '50%'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-60px',
        left: '-60px',
        width: '240px',
        height: '240px',
        background: 'radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
        borderRadius: '50%'
      }} />
      
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '24px',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '999px',
            }}>
              <Sparkles size={14} style={{ color: '#00D4FF' }} />
              <span style={{
                fontSize: '11px',
                fontWeight: '700',
                color: 'white',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}>
                {language === 'hindi' ? 'एआई हेल्थ इनसाइट्स' : 'AI Health Insights'}
              </span>
            </div>
            
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '6px 12px',
              backgroundColor: 'rgba(0, 217, 36, 0.1)',
              border: '1px solid rgba(0, 217, 36, 0.2)',
              borderRadius: '999px',
            }}>
              <span style={{
                fontSize: '11px',
                fontWeight: '700',
                color: '#00D924',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}>
                {language === 'hindi' ? 'जोखिम स्तर: कम' : 'Risk Level: Low'}
              </span>
            </div>
          </div>
          
          <h2 style={{
            fontSize: '22px',
            fontWeight: '800',
            color: 'white',
            lineHeight: '1.3',
            margin: 0,
            letterSpacing: '-0.3px'
          }}>
            {language === 'hindi'
              ? 'आपकी सेहत स्थिर है। आज का सुझाव:'
              : 'Your health is stable. Today\'s Recommendation:'}
          </h2>
          
          <p style={{
            color: '#A0AEC0',
            fontSize: '15px',
            lineHeight: '1.6',
            margin: 0,
            maxWidth: '520px',
            fontWeight: '400'
          }}>
            {language === 'hindi'
              ? 'नियमित रूप से अपनी दवाइयाँ लेते रहें। आपके सभी रिकॉर्ड्स सामान्य दिख रहे हैं। अधिक सटीक सुझावों के लिए अपनी दैनिक गतिविधियों को लॉग करना जारी रखें।'
              : "Keep taking your medications regularly. Your records appear normal. Continue logging your daily activities for more precise recommendations."}
          </p>
        </div>
        
        <button 
          onClick={() => window.location.href = '/chat'}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            backgroundColor: '#635BFF',
            background: 'linear-gradient(135deg, #7A73FF 0%, #635BFF 100%)',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '12px',
            fontWeight: '700',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: '0 8px 20px rgba(99,91,255,0.3)',
            flexShrink: 0
          }}
          className="premium-btn"
        >
          <Sparkles size={16} />
          {language === 'hindi' ? 'एआई से पूछें' : 'Ask AI about this'}
        </button>
      </div>
    </div>
  )
}
