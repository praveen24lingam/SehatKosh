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
    <div className="flex overflow-x-auto hide-scrollbar gap-2 px-4 py-2 mb-2 w-full">
      {chips.map((chip, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(chip)}
          className={`whitespace-nowrap px-4 py-2 rounded-full border border-light bg-surface-card text-sm transition-colors hover:border-brand-saffron hover:text-accent ${
            language === 'hindi' ? 'font-hindi' : 'font-body'
          }`}
        >
          {chip}
        </button>
      ))}
    </div>
  )
}
