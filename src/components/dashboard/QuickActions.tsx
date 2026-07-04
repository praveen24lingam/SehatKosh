'use client'

import Link from 'next/link'
import { MessageCircle, FileUp, Pill, Calendar, PhoneCall } from 'lucide-react'
import { useLanguageStore } from '@/store/useLanguageStore'

export function QuickActions() {
  const { language } = useLanguageStore()

  const actions = [
    { 
      href: '/chat', 
      icon: MessageCircle, 
      labelHi: 'एआई असिस्टेंट', 
      labelEn: 'AI Assistant',
      color: '#635BFF',
      shadowGlow: '0 8px 20px rgba(99,91,255,0.25)',
      bgGradient: 'linear-gradient(135deg, rgba(122,115,255,0.12) 0%, rgba(0,212,255,0.04) 100%)'
    },
    { 
      href: '#', 
      icon: Calendar, 
      labelHi: 'अपॉइंटमेंट', 
      labelEn: 'Book Appt',
      color: '#00D4FF',
      shadowGlow: '0 8px 20px rgba(0,212,255,0.25)',
      bgGradient: 'linear-gradient(135deg, rgba(0,212,255,0.12) 0%, rgba(0,212,255,0.04) 100%)'
    },
    { 
      href: '/chat?action=upload', 
      icon: FileUp, 
      labelHi: 'रिपोर्ट अपलोड', 
      labelEn: 'Upload Reports',
      color: '#FF9900',
      shadowGlow: '0 8px 20px rgba(255,153,0,0.25)',
      bgGradient: 'linear-gradient(135deg, rgba(255,153,0,0.12) 0%, rgba(255,153,0,0.04) 100%)'
    },
    { 
      href: '#', 
      icon: Pill, 
      labelHi: 'प्रिस्क्रिप्शन', 
      labelEn: 'Prescriptions',
      color: '#00D924',
      shadowGlow: '0 8px 20px rgba(0,217,36,0.25)',
      bgGradient: 'linear-gradient(135deg, rgba(0, 217, 36, 0.12) 0%, rgba(0, 217, 36, 0.04) 100%)'
    },
    { 
      href: '#', 
      icon: PhoneCall, 
      labelHi: 'इमरजेंसी', 
      labelEn: 'Emergency',
      color: '#E02424',
      shadowGlow: '0 8px 20px rgba(224,36,36,0.25)',
      bgGradient: 'linear-gradient(135deg, rgba(224, 36, 36, 0.12) 0%, rgba(224, 36, 36, 0.04) 100%)'
    },
  ]

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '24px',
      padding: '24px',
      border: '1px solid rgba(10, 37, 64, 0.06)',
      boxShadow: '0 8px 24px rgba(10, 37, 64, 0.02)',
      width: '100%',
      fontFamily: 'Inter, sans-serif'
    }}>
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .action-card {
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .action-icon-box {
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .action-card:hover .action-icon-box {
          transform: translateY(-4px) scale(1.04);
          box-shadow: var(--shadow-glow) !important;
          border-color: var(--color-accent) !important;
        }
        .action-card:hover span {
          color: #0A2540 !important;
        }
      `}} />

      <div 
        className="hide-scrollbar"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          gap: '16px',
          overflowX: 'auto',
          width: '100%'
        }}
      >
        {actions.map((action, idx) => {
          const Icon = action.icon
          return (
            <Link 
              key={idx} 
              href={action.href}
              className="action-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                textDecoration: 'none',
                cursor: 'pointer',
                flexShrink: 0,
                width: '90px',
                '--shadow-glow': action.shadowGlow,
                '--color-accent': action.color
              } as React.CSSProperties}
            >
              <div 
                className="action-icon-box"
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: action.bgGradient,
                  border: '1px solid rgba(10, 37, 64, 0.05)',
                  boxShadow: 'none'
                }}
              >
                <Icon size={24} style={{ color: action.color }} strokeWidth={2.2} />
              </div>
              <span style={{
                fontSize: '12px',
                fontWeight: '700',
                textAlign: 'center',
                color: '#637381',
                transition: 'color 0.2s'
              }} className={language === 'hindi' ? 'font-hindi' : ''}>
                {language === 'hindi' ? action.labelHi : action.labelEn}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
