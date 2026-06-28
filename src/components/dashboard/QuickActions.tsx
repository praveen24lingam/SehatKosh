'use client'

import Link from 'next/link'
import { MessageCircle, FileUp, ShieldCheck, Pill } from 'lucide-react'
import { useLanguageStore } from '@/store/useLanguageStore'

export function QuickActions() {
  const { language } = useLanguageStore()

  const actions = [
    { 
      href: '/chat', 
      icon: MessageCircle, 
      labelHi: 'सवाल पूछें', 
      labelEn: 'Ask AI',
      color: 'text-accent',
      bg: 'bg-accent/10'
    },
    { 
      href: '/chat?action=upload', 
      icon: FileUp, 
      labelHi: 'रिपोर्ट सेव', 
      labelEn: 'Save Record',
      color: 'text-brand-gold',
      bg: 'bg-brand-gold-soft'
    },
    { 
      href: '/chat?action=scheme', 
      icon: ShieldCheck, 
      labelHi: 'योजना खोजें', 
      labelEn: 'Find Scheme',
      color: 'text-success',
      bg: 'bg-success-soft'
    },
    { 
      href: '/chat?action=medicine', 
      icon: Pill, 
      labelHi: 'सस्ती दवा', 
      labelEn: 'Find Meds',
      color: 'text-warning',
      bg: 'bg-warning-soft'
    },
  ]

  return (
    <div className="grid grid-cols-4 gap-3 md:gap-4">
      {actions.map((action, idx) => {
        const Icon = action.icon
        return (
          <Link 
            key={idx} 
            href={action.href}
            className="flex flex-col items-center gap-2 group"
          >
            <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:-translate-y-1 ${action.bg}`}>
              <Icon className={`w-6 h-6 md:w-7 md:h-7 ${action.color}`} />
            </div>
            <span className={`text-xs md:text-sm text-center text-primary-light ${language === 'hindi' ? 'font-hindi font-medium' : 'font-body font-medium'}`}>
              {language === 'hindi' ? action.labelHi : action.labelEn}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
