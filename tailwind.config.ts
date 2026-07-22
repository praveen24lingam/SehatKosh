import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "stripe-dark": "var(--stripe-dark)",
        "stripe-darker": "var(--stripe-darker)",
        "stripe-purple": "var(--stripe-purple)",
        "stripe-purple-light": "var(--stripe-purple-light)",
        "stripe-purple-soft": "var(--stripe-purple-soft)",
        "stripe-cyan": "var(--stripe-cyan)",
        "stripe-green": "var(--stripe-green)",
        "stripe-white": "var(--stripe-white)",
        "stripe-offwhite": "var(--stripe-offwhite)",
        "stripe-text": "var(--stripe-text)",
        "stripe-muted": "var(--stripe-muted)",
        "stripe-light-muted": "var(--stripe-light-muted)",
        "border-light": "var(--border-light)",
        "border-dark": "var(--border-dark)",
        "surface-light": "var(--surface-page)",
        "surface-card": "var(--surface-card)",
        "surface-1": "var(--surface-card)",
        "muted-light": "var(--muted)",
        "muted-dark": "var(--muted)",
        "primary-light": "var(--heading)",
        "primary-dark": "var(--heading)",
        "background": "var(--surface-page)",
        "text-secondary": "var(--body)",
        "accent": "var(--accent)",
        "brand-saffron": "var(--accent)",
        "danger": "var(--danger)",
        "danger-soft": "rgba(220,38,38,0.10)",
      },
      // Font stacks pair the Latin display/body face with the Devanagari font as a
      // per-glyph fallback, so mixed Hindi + English text always renders correctly.
      fontFamily: {
        hindi: ["var(--font-hindi)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "var(--font-hindi)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-hindi)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        display: "-0.02em",
      },
    },
  },
  plugins: [],
}

export default config
