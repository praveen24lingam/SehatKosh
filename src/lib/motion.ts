'use client'

import type { CSSProperties } from 'react'
import type { Variants } from 'framer-motion'
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

/** Distance a revealed element travels on the way in. */
const REVEAL_Y = 16

/**
 * Reveal variants shared by every landing section, so a card entering on the
 * Problem grid moves exactly like one entering on Features.
 */
const revealItem: Variants = {
  hidden: { opacity: 0, y: REVEAL_Y },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_OUT },
  },
}

/** No-op pair used when the user has asked for reduced motion. */
const staticItem: Variants = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0 },
}

/** Standard viewport trigger: fire once, slightly before the element is flush. */
export const REVEAL_VIEWPORT = { once: true, margin: '-80px' } as const

/**
 * Staggered reveal for a group. Spread `parent` onto the wrapper and `item`
 * onto each child; the parent orchestrates, the children inherit `hidden` /
 * `show` automatically.
 *
 * Hero-style groups animate on load (`animate="show"`); scroll-triggered
 * groups use `whileInView="show"` with {@link REVEAL_VIEWPORT}.
 */
export function useReveal(stagger = 0.07) {
  const reduce = useReducedMotion()

  return {
    reduce: Boolean(reduce),
    viewport: REVEAL_VIEWPORT,
    parent: {
      hidden: {},
      show: reduce ? {} : { transition: { staggerChildren: stagger } },
    } satisfies Variants,
    item: reduce ? staticItem : revealItem,
  }
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
