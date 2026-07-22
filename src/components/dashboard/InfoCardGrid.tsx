'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { useAppMotion, enterDelay } from '@/lib/motion'

export interface InfoCardItem {
  title: string
  description: string
  linkLabel: string
  href: string
}

interface InfoCardGridProps {
  title: string
  cards: InfoCardItem[]
}

/**
 * Static informational cards. Content is hardcoded by the caller and each card
 * links out to an official government site — nothing here is fetched.
 */
export function InfoCardGrid({ title, cards }: InfoCardGridProps) {
  const { cardInteraction, pressInteraction } = useAppMotion()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: 'Inter, sans-serif' }}>
      <style dangerouslySetInnerHTML={{__html: `
        /* Transform is driven by Framer Motion. */
        .info-card {
          transition: box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .info-card:hover {
          box-shadow: 0 16px 32px rgba(15,23,42, 0.06) !important;
        }
        .info-link {
          transition: all 0.2s ease;
        }
        .info-link:hover {
          background-color: #0D9488 !important;
          color: white !important;
        }
      `}} />

      <h3 style={{ fontSize: '18px', color: '#0F172A', fontWeight: '800', margin: 0, letterSpacing: '-0.3px' }}>
        {title}
      </h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px'
      }}>
        {cards.map((card, idx) => (
          <motion.div
            key={card.href}
            className="info-card app-enter"
            {...cardInteraction}
            style={{
              ...enterDelay(idx),
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              padding: '24px',
              backgroundColor: 'white',
              borderRadius: '20px',
              border: '1px solid rgba(15,23,42,0.06)',
              boxShadow: '0 4px 16px rgba(15,23,42,0.03)'
            }}
          >
            <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
              {card.title}
            </h4>

            <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.6', margin: 0, flex: 1 }}>
              {card.description}
            </p>

            <motion.a
              {...pressInteraction}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              className="info-link"
              style={{
                alignSelf: 'flex-start',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                marginTop: '4px',
                padding: '10px 18px',
                borderRadius: '12px',
                backgroundColor: 'rgba(13,148,136,0.1)',
                color: '#0D9488',
                fontSize: '14px',
                fontWeight: '700',
                textDecoration: 'none'
              }}
            >
              {card.linkLabel}
              <ExternalLink size={14} strokeWidth={2.5} />
            </motion.a>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
