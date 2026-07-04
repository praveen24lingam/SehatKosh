'use client'

import { useLanguageStore } from '@/store/useLanguageStore'

interface QuickChipsProps {
  onSelect: (text: string) => void
}

export function QuickChips({ onSelect }: QuickChipsProps) {
  const { language } = useLanguageStore()

  const chips = language === 'hindi' ? [
    'यह ब्लड रिपोर्ट समझाएं',
    'सस्ती दवा खोजें',
    'PM-JAY योजना क्या है?',
    'डायबिटीज के लक्षण'
  ] : [
    'Explain this blood report',
    'Find cheaper medicine',
    'What is PM-JAY scheme?',
    'Diabetes symptoms'
  ]

  return (
    <div 
      className="hide-scrollbar"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        overflowX: 'auto',
        padding: '12px 16px 4px',
        width: '100%',
        fontFamily: 'Inter, sans-serif'
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .quick-chip-btn {
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .quick-chip-btn:hover {
          border-color: #635BFF !important;
          color: #635BFF !important;
          background-color: #F4F4FF !important;
          transform: translateY(-1px);
        }
      `}} />
      
      {chips.map((chip, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(chip)}
          className="quick-chip-btn"
          style={{
            whiteSpace: 'nowrap',
            padding: '8px 16px',
            borderRadius: '999px',
            border: '1px solid #E6EBF1',
            backgroundColor: 'white',
            color: '#425466',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            outline: 'none'
          }}
        >
          {chip}
        </button>
      ))}
    </div>
  )
}
