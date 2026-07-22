'use client'

import type { CSSProperties } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Shared motion tokens.
 *
 * This is a health app, so motion stays calm: short durations, small offsets,
 * ease-out only. No bounce, no spring, no spin. The easing curve matches the
 * cubic-bezier used in the hand-written CSS transitions so JS-driven and
 * CSS-driven motion feel identical.
 *
 * Division of labour:
 *   - Entrance animations are CSS (`.app-enter` in globals.css) so that
 *     server-rendered content is visible even if JS never runs.
 *   - Framer Motion handles interaction only (hover / press), plus elements
 *     that cannot exist without JS anyway (chat messages).
 */
export const DURATION = {
  fast: 0.18,
  base: 0.28,
  slow: 0.35,
} as const

export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

/** How far a card lifts on hover. */
export const HOVER_LIFT = -3

/** Press feedback for primary controls. */
export const TAP_SCALE = 0.985

/** Gap between staggered entrance animations, in ms. */
export const ENTER_STAGGER_MS = 60

/**
 * Per-item delay for a staggered entrance group. Returned as an inline style so
 * it is present in the server-rendered HTML and needs no JS to take effect.
 */
export function enterDelay(index: number): CSSProperties {
  return index > 0 ? { animationDelay: `${index * ENTER_STAGGER_MS}ms` } : {}
}

/**
 * Interaction props. Both collapse to nothing when the user has asked for
 * reduced motion — Framer animates inline styles from JS, so the
 * prefers-reduced-motion CSS block cannot cover it.
 */
export function useAppMotion() {
  const reduce = useReducedMotion()

  return {
    reduce: Boolean(reduce),
    /** Spread onto a card to get hover lift + press feedback. */
    cardInteraction: reduce
      ? {}
      : {
          whileHover: { y: HOVER_LIFT },
          whileTap: { y: 0, scale: TAP_SCALE },
          transition: { duration: DURATION.fast, ease: EASE_OUT },
        },
    /** Spread onto a button that should only respond to press. */
    pressInteraction: reduce
      ? {}
      : {
          whileTap: { scale: TAP_SCALE },
          transition: { duration: DURATION.fast, ease: EASE_OUT },
        },
  }
}
