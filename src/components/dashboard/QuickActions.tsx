'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ScanLine, MessageCircle, PhoneCall } from 'lucide-react'
import { useLanguageStore } from '@/store/useLanguageStore'
import { useAppMotion, enterDelay } from '@/lib/motion'

const MotionLink = motion.create(Link)

export function QuickActions() {
  const { language } = useLanguageStore()
  const { cardInteraction } = useAppMotion()

  const actions = [
    {
      href: '/chat',
      icon: ScanLine,
      labelHi: 'Report / Prescription Scan karein',
      labelEn: 'Report / Prescription Scan karein',
      color: '#0D9488',
      gradient: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
      shadow: 'rgba(13,148,136,0.3)'
    },
    {
      href: '/chat',
      icon: MessageCircle,
      labelHi: 'Sehat se sawaal poochein',
      labelEn: 'Sehat se sawaal poochein',
      color: '#14B8A6',
      gradient: 'linear-gradient(135deg, #14B8A6 0%, #0F766E 100%)',
      shadow: 'rgba(20,184,166,0.3)'
    },
    {
      href: 'tel:102',
      icon: PhoneCall,
      labelHi: 'इमरजेंसी',
      labelEn: 'Emergency',
      color: '#DC2626',
      gradient: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
      shadow: 'rgba(220,38,38,0.3)'
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
          /* Transform is driven by Framer Motion. */
          transition: box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease;
          background: white;
          border-radius: 20px;
          border: 1px solid rgba(15,23,42, 0.06);
          box-shadow: 0 4px 16px rgba(15,23,42, 0.03);
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 16px;
          min-height: 140px;
          text-decoration: none;
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
          box-shadow: 0 16px 32px var(--qa-shadow) !important;
          border-color: transparent !important;
        }
        .qa-card:hover::before {
          opacity: 1;
        }
        .qa-icon-wrapper {
          width: 48px;
          height: 48px;
          flex-shrink: 0;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--qa-gradient);
          color: white;
          box-shadow: 0 4px 12px var(--qa-shadow);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .qa-card:hover .qa-icon-wrapper {
          transform: scale(1.1);
        }
        .qa-text {
          font-size: 16px;
          font-weight: 700;
          line-height: 1.35;
          text-align: left;
          color: #0F172A;
          transition: color 0.3s ease;
        }
        .qa-card:hover .qa-text {
          color: #0D9488;
        }
        .qa-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 16px;
          width: 100%;
        }
      `}} />

      <div className="qa-grid">
        {actions.map((action, idx) => {
          const Icon = action.icon
          return (
            <MotionLink
              key={idx}
              href={action.href}
              className="qa-card app-enter"
              style={{
                '--qa-gradient': action.gradient,
                '--qa-shadow': action.shadow,
                ...enterDelay(idx),
              } as React.CSSProperties}
              {...cardInteraction}
            >
              <div className="qa-icon-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={24} strokeWidth={2.5} />
              </div>
              <span className={`qa-text ${language === 'hindi' ? 'font-hindi' : ''}`}>
                {language === 'hindi' ? action.labelHi : action.labelEn}
              </span>
            </MotionLink>
          )
        })}
      </div>
    </div>
  )
}
