'use client'

import type { ComponentType } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
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
  /** Small accent glyph shown in the section heading's tinted chip. */
  icon: ComponentType<{ size?: number; strokeWidth?: number }>
}

/**
 * Static informational cards. Content is hardcoded by the caller and each card
 * links out to an official government site — nothing here is fetched.
 *
 * This is the dashboard's SECONDARY tier: flat at rest, no standing shadow,
 * text links rather than filled buttons. It should read as reference material
 * sitting underneath the action cards, never as a competing call to action.
 */
export function InfoCardGrid({ title, cards, icon: Icon }: InfoCardGridProps) {
  const { cardInteraction, pressInteraction } = useAppMotion()

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      {/* Section heading: chip + title + hairline that runs out to the edge,
          so each group is visibly bounded without adding another box. */}
      <header style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
        <span className="section-chip">
          <Icon size={15} strokeWidth={2.4} />
        </span>
        <h3 className="t-section" style={{ margin: 0, whiteSpace: 'nowrap' }}>
          {title}
        </h3>
        <span
          aria-hidden
          style={{
            flex: 1,
            height: '1px',
            background:
              'linear-gradient(to right, rgb(var(--teal-rgb) / 0.22), transparent)',
          }}
        />
      </header>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(272px, 1fr))',
          gap: 'var(--space-3)',
        }}
      >
        {cards.map((card, idx) => (
          <motion.div
            key={card.href}
            className="info-card app-enter"
            {...cardInteraction}
            style={enterDelay(idx)}
          >
            <h4 className="t-card-title" style={{ margin: 0 }}>
              {card.title}
            </h4>

            {/* flex:1 pushes the CTA to a shared baseline, so links line up
                across cards of unequal description length. */}
            <p className="t-body" style={{ margin: 0, flex: 1 }}>
              {card.description}
            </p>

            <motion.a
              {...pressInteraction}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              className="info-link"
            >
              {card.linkLabel}
              <ArrowUpRight size={14} strokeWidth={2.5} />
            </motion.a>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
