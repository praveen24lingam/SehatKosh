'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sparkles } from 'lucide-react'
import { useLanguageStore } from '@/store/useLanguageStore'

export function FloatingAIButton() {
  const { language } = useLanguageStore()
  const pathname = usePathname()

  if (pathname === '/chat') return null

  const label = language === 'hindi' ? 'एआई से पूछें' : 'Ask AI'

  return (
    <Link href="/chat" className="fab" aria-label={label}>
      <span className="fab-tooltip" aria-hidden>
        {label}
      </span>
      <Sparkles size={21} strokeWidth={2.2} />
    </Link>
  )
}
