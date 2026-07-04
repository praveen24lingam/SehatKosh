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
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '999px',
            alignSelf: 'flex-start'
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
          
          <h2 style={{
            fontSize: '22px',
            fontWeight: '800',
            color: 'white',
            lineHeight: '1.3',
            margin: 0,
            letterSpacing: '-0.3px'
          }}>
            {language === 'hindi'
              ? 'आपकी सेहत के लिए आज का सुझाव'
              : 'Your personalized health tip for today'}
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
              ? 'आपकी पिछली रिपोर्ट के अनुसार, आज कम से कम 2.5 लीटर पानी पीने की कोशिश करें। इससे आपको ऊर्जा मिलेगी।'
              : "Based on your recent reports, try to drink at least 2.5L of water today to keep your energy levels up and support digestion."}
          </p>
        </div>
        
        <button 
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
          {language === 'hindi' ? 'और सुझाव देखें' : 'View all insights'}
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}
