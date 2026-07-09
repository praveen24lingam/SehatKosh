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
        "surface-light": "#F8FAFC",
        "surface-card": "#FFFFFF",
        "muted-light": "#94A3B8",
        "primary-light": "#0A2540",
        "text-secondary": "#425466",
        "accent": "#635BFF",
        "brand-saffron": "#FF9900",
      },
      fontFamily: {
        hindi: ["var(--font-hindi)"],
        body: ["var(--font-body)"],
        display: ["var(--font-display)"],
      },
    },
  },
  plugins: [],
}

export default config
