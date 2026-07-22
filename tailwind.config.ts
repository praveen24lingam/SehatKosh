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
        /* ── Semantic tokens (prefer these) ──
           Mirrors the CSS custom properties in globals.css so utilities
           like `bg-surface` / `text-foreground-muted` resolve to the same
           values as the inline styles elsewhere in the app. */
        background: "var(--background)",
        surface: "var(--surface)",
        "surface-sunken": "var(--surface-sunken)",
        foreground: "var(--foreground)",
        "foreground-secondary": "var(--foreground-secondary)",
        "foreground-muted": "var(--foreground-muted)",
        "icon-muted": "var(--icon-muted)",

        primary: {
          DEFAULT: "var(--primary)",
          hover: "var(--primary-hover)",
          active: "var(--primary-active)",
          foreground: "var(--primary-foreground)",
          subtle: "var(--primary-subtle)",
          muted: "var(--primary-muted)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          hover: "var(--secondary-hover)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted-surface)",
          foreground: "var(--muted-foreground)",
        },
        success: {
          DEFAULT: "var(--success)",
          strong: "var(--success-strong)",
          foreground: "var(--success-foreground)",
          subtle: "var(--success-subtle)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          strong: "var(--warning-strong)",
          foreground: "var(--warning-foreground)",
          subtle: "var(--warning-subtle)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          strong: "var(--destructive-strong)",
          foreground: "var(--destructive-foreground)",
          subtle: "var(--destructive-subtle)",
        },
        border: {
          DEFAULT: "var(--border)",
          strong: "var(--border-strong)",
          primary: "var(--border-primary)",
        },

        /* ── Legacy aliases (kept so existing markup keeps resolving) ── */
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
        "border-light": "var(--border)",
        "border-dark": "var(--border-dark)",
        "surface-light": "var(--surface-page)",
        "surface-card": "var(--surface-card)",
        "surface-1": "var(--surface-card)",
        "muted-light": "var(--muted)",
        "muted-dark": "var(--muted)",
        "primary-light": "var(--foreground)",
        "primary-dark": "var(--foreground)",
        "text-secondary": "var(--foreground-secondary)",
        "accent": "var(--primary)",
        "brand-saffron": "var(--primary)",
        "danger": "var(--destructive)",
        "danger-soft": "var(--destructive-subtle)",
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
