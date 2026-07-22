'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ScanLine, MessageCircle, PhoneCall } from 'lucide-react'
import { useLanguageStore } from '@/store/useLanguageStore'
import { useAppMotion, enterDelay } from '@/lib/motion'

const MotionLink = motion.create(Link)

/**
 * The dashboard's primary actions.
 *
 * Styling lives in `.action-card` (globals.css); per-card colour is passed in
 * as custom properties so Emergency can be red without forking the rule set.
 */
export function QuickActions() {
  const { language } = useLanguageStore()
  const { cardInteraction } = useAppMotion()

  /* Only two colour roles here, not three. Both AI actions carry the one
     brand teal — they used to differ by a shade, which is what made the
     palette read as several unrelated greens. What distinguishes them is
     the icon and the label, not the hue. Emergency is the sole exception,
     because "call for help" must never look like an ordinary action. */
  const PRIMARY_ROLE = {
    color: 'var(--primary)',
    gradient: 'var(--primary-gradient)',
    tint: 'rgb(var(--teal-rgb) / 0.07)',
    border: 'rgb(var(--teal-rgb) / 0.16)',
    borderHover: 'rgb(var(--teal-rgb) / 0.38)',
    shadow: 'rgb(var(--teal-rgb) / 0.26)',
  }

  const actions = [
    {
      href: '/chat',
      icon: ScanLine,
      labelHi: 'Report / Prescription Scan karein',
      labelEn: 'Report / Prescription Scan karein',
      ...PRIMARY_ROLE,
    },
    {
      href: '/chat',
      icon: MessageCircle,
      labelHi: 'Sehat se sawaal poochein',
      labelEn: 'Sehat se sawaal poochein',
      ...PRIMARY_ROLE,
    },
    {
      href: 'tel:102',
      icon: PhoneCall,
      labelHi: 'इमरजेंसी',
      labelEn: 'Emergency',
      color: 'var(--destructive)',
      gradient: 'var(--destructive-gradient)',
      tint: 'rgb(var(--red-rgb) / 0.06)',
      border: 'rgb(var(--red-rgb) / 0.16)',
      borderHover: 'rgb(var(--red-rgb) / 0.36)',
      shadow: 'rgb(var(--red-rgb) / 0.22)',
    },
  ]

  return (
    <div className="action-grid">
      {actions.map((action, idx) => {
        const Icon = action.icon
        return (
          <MotionLink
            key={idx}
            href={action.href}
            className="action-card app-enter"
            style={{
              '--action-color': action.color,
              '--action-gradient': action.gradient,
              '--action-tint': action.tint,
              '--action-border': action.border,
              '--action-border-hover': action.borderHover,
              '--action-shadow': action.shadow,
              ...enterDelay(idx),
            } as React.CSSProperties}
            {...cardInteraction}
          >
            <span className="action-icon">
              <Icon size={25} strokeWidth={2.4} />
            </span>

            <span className={`action-label ${language === 'hindi' ? 'font-hindi' : ''}`}>
              {language === 'hindi' ? action.labelHi : action.labelEn}
            </span>

            <span className="action-arrow" aria-hidden>
              <ArrowRight size={15} strokeWidth={2.75} />
            </span>
          </MotionLink>
        )
      })}
    </div>
  )
}
