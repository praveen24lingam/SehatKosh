'use client'

import { useLanguageStore } from '@/store/useLanguageStore'
import { FileSearch, Bell, Stethoscope, Landmark, CalendarDays, MessageCircleQuestion } from 'lucide-react'

interface ChatActionCardsProps {
  onSelect: (text: string) => void
}

export function ChatActionCards({ onSelect }: ChatActionCardsProps) {
  const { language } = useLanguageStore()

  const actions = language === 'hindi' ? [
    { text: 'मेडिकल रिपोर्ट का विश्लेषण करें', icon: FileSearch, color: '#635BFF', bgColor: 'rgba(99,91,255,0.08)' },
    { text: 'दवा का रिमाइंडर लगाएं', icon: Bell, color: '#00D4FF', bgColor: 'rgba(0,212,255,0.08)' },
    { text: 'लक्षणों की जांच करें', icon: Stethoscope, color: '#FF9900', bgColor: 'rgba(255,153,0,0.08)' },
    { text: 'सरकारी स्वास्थ्य योजनाएं खोजें', icon: Landmark, color: '#E02424', bgColor: 'rgba(224,36,36,0.08)' },
    { text: 'अपॉइंटमेंट बुक करें', icon: CalendarDays, color: '#00D924', bgColor: 'rgba(0,217,36,0.08)' },
    { text: 'स्वास्थ्य से जुड़ा सवाल पूछें', icon: MessageCircleQuestion, color: '#0A2540', bgColor: 'rgba(10,37,64,0.08)' }
  ] : [
    { text: 'Analyze Medical Report', icon: FileSearch, color: '#635BFF', bgColor: 'rgba(99,91,255,0.08)' },
    { text: 'Set Medicine Reminder', icon: Bell, color: '#00D4FF', bgColor: 'rgba(0,212,255,0.08)' },
    { text: 'Check Symptoms', icon: Stethoscope, color: '#FF9900', bgColor: 'rgba(255,153,0,0.08)' },
    { text: 'Find Government Health Schemes', icon: Landmark, color: '#E02424', bgColor: 'rgba(224,36,36,0.08)' },
    { text: 'Book Appointment', icon: CalendarDays, color: '#00D924', bgColor: 'rgba(0,217,36,0.08)' },
    { text: 'Ask a Health Question', icon: MessageCircleQuestion, color: '#0A2540', bgColor: 'rgba(10,37,64,0.08)' }
  ]

  return (
    <div style={{
      width: '100%',
      fontFamily: 'Inter, sans-serif'
    }}>
      <style dangerouslySetInnerHTML={{__html: `
        .action-card {
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          background: white;
          border-radius: 16px;
          border: 1px solid rgba(10, 37, 64, 0.08);
          padding: 16px;
          display: flex;
          align-items: flex-start;
          gap: 12px;
          cursor: pointer;
          text-align: left;
          width: 100%;
          outline: none;
        }
        .action-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(10,37,64,0.06);
          border-color: rgba(99,91,255,0.3);
        }
        .action-icon-wrap {
          border-radius: 12px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .action-cards-grid {
          display: grid;
          gap: 12px;
          grid-template-columns: repeat(2, 1fr);
        }
        @media (max-width: 600px) {
          .action-cards-grid {
            grid-template-columns: 1fr;
          }
        }
      `}} />
      
      <div className="action-cards-grid">
        {actions.map((action, idx) => {
          const Icon = action.icon
          return (
            <button
              key={idx}
              onClick={() => onSelect(action.text)}
              className="action-card"
            >
              <div className="action-icon-wrap" style={{ backgroundColor: action.bgColor, color: action.color }}>
                <Icon size={20} strokeWidth={2.5} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', paddingTop: '2px' }}>
                <span style={{ 
                  fontSize: '14px', 
                  fontWeight: '700', 
                  color: '#0A2540',
                  lineHeight: '1.3'
                }}>
                  {action.text}
                </span>
                <span style={{ 
                  fontSize: '12px', 
                  color: '#8898AA',
                  lineHeight: '1.4'
                }}>
                  {language === 'hindi' ? 'एआई असिस्टेंट से शुरू करें' : 'Start with AI assistant'}
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
