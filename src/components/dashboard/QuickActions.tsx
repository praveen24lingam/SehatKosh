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
      gradient: 'linear-gradient(135deg, #7A73FF 0%, #635BFF 100%)',
      shadow: 'rgba(99,91,255,0.3)'
    },
    { 
      href: '/reminders', 
      icon: Pill, 
      labelHi: 'रिमाइंडर', 
      labelEn: 'Reminders',
      color: '#00D4FF',
      gradient: 'linear-gradient(135deg, #00D4FF 0%, #00B3E6 100%)',
      shadow: 'rgba(0,212,255,0.3)'
    },
    { 
      href: '/family', 
      icon: FileUp, 
      labelHi: 'परिवार के रिकॉर्ड', 
      labelEn: 'Family Records',
      color: '#FF9900',
      gradient: 'linear-gradient(135deg, #FF9900 0%, #E68A00 100%)',
      shadow: 'rgba(255,153,0,0.3)'
    },
    { 
      href: 'tel:102', 
      icon: PhoneCall, 
      labelHi: 'इमरजेंसी', 
      labelEn: 'Emergency',
      color: '#E02424',
      gradient: 'linear-gradient(135deg, #FF4D4D 0%, #E02424 100%)',
      shadow: 'rgba(224,36,36,0.3)'
    },
  ]

  return (
    <div style={{
      width: '100%',
      fontFamily: 'Inter, sans-serif',
      position: 'relative'
    }}>
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .qa-card {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          background: white;
          border-radius: 20px;
          border: 1px solid rgba(10, 37, 64, 0.05);
          box-shadow: 0 4px 12px rgba(10, 37, 64, 0.03);
          padding: 16px 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          min-width: 110px;
          position: relative;
          overflow: hidden;
        }
        .qa-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 3px;
          background: var(--qa-gradient);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .qa-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 32px var(--qa-shadow) !important;
          border-color: transparent !important;
        }
        .qa-card:hover::before {
          opacity: 1;
        }
        .qa-icon-wrapper {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justifyContent: center;
          background: var(--qa-gradient);
          color: white;
          box-shadow: 0 6px 16px var(--qa-shadow);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .qa-card:hover .qa-icon-wrapper {
          transform: scale(1.1);
        }
        .qa-text {
          font-size: 14px;
          font-weight: 700;
          text-align: center;
          color: #425466;
          transition: color 0.3s ease;
        }
        .qa-card:hover .qa-text {
          color: #0A2540;
        }
        .qa-grid {
          display: grid;
          gap: 16px;
          width: 100%;
        }
        @media (max-width: 599px) {
          .qa-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 600px) {
          .qa-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          }
        }
      `}} />

      <div className="qa-grid">
        {actions.map((action, idx) => {
          const Icon = action.icon
          return (
            <Link 
              key={idx} 
              href={action.href}
              className="qa-card"
              style={{
                '--qa-gradient': action.gradient,
                '--qa-shadow': action.shadow,
              } as React.CSSProperties}
            >
              <div className="qa-icon-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={28} strokeWidth={2.5} />
              </div>
              <span className={`qa-text ${language === 'hindi' ? 'font-hindi' : ''}`}>
                {language === 'hindi' ? action.labelHi : action.labelEn}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
