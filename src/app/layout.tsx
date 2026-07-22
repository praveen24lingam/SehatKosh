import type { Metadata } from "next"
import { Inter, Mukta, Sora } from 'next/font/google'
import { Toaster } from 'sonner'
import { ServiceWorkerRegistrar } from '@/components/shared/ServiceWorkerRegistrar'
import './globals.css'

// Body / UI text — Inter is the de-facto SaaS workhorse (clean at every size).
const inter = Inter({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

// Display / headings — Sora is geometric and slightly wide, which reads as
// modern and deliberate once tightened with negative tracking (see the
// heading rules in globals.css).
const sora = Sora({
  weight: ['600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

// Devanagari — this app is Hindi-first, so the Hindi face is a first-class
// choice, not a fallback. Mukta is a humanist Devanagari with a full weight
// range, so Hindi headings can actually be bold rather than faux-bolded.
//
// It is listed AFTER the Latin faces in every font stack (globals.css), which
// makes the browser resolve it per-glyph: Latin runs use Inter/Sora, and any
// Devanagari codepoint automatically falls through to Mukta. That is why Hindi
// renders correctly even in the many places that never got a `font-hindi`
// class — the class is a hint, not the mechanism.
const mukta = Mukta({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['devanagari', 'latin'],
  variable: '--font-hindi',
  display: 'swap',
})

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // A literal colour on purpose: this becomes a <meta name="theme-color">
  // for the browser/PWA chrome, which cannot resolve CSS custom properties.
  // Keep in sync with --primary (teal-600) and manifest.json's theme_color.
  themeColor: '#0D9488',
}

export const metadata: Metadata = {
  title: 'SehatKosh — स्वास्थ्य कोष',
  description: 'Apni medical report ki photo kheencho, AI use aasan Hindi mein samjhaayega. Sehat se jude sawaal poochho, saral jawab pao.',
  applicationName: 'SehatKosh',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  appleWebApp: {
    capable: true,
    title: 'SehatKosh',
    statusBarStyle: 'default',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hi" className={`${inter.variable} ${sora.variable} ${mukta.variable}`}>
      <body className="font-body antialiased app-bg">
        {children}
        <Toaster position="top-center" richColors />
        <ServiceWorkerRegistrar />
      </body>
    </html>
  )
}
