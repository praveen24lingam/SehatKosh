import type { Metadata } from "next"
import { Inter, Noto_Sans_Devanagari, Plus_Jakarta_Sans } from 'next/font/google'
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

// Display / headings — Plus Jakarta Sans gives headings a warmer, more premium
// character while staying highly legible (a good fit for a healthcare product).
const plusJakarta = Plus_Jakarta_Sans({
  weight: ['500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

// Devanagari — used for Hindi content across the app.
const notoSansDevanagari = Noto_Sans_Devanagari({
  weight: ['400', '500', '600', '700'],
  subsets: ['devanagari'],
  variable: '--font-hindi',
  display: 'swap',
})

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
    <html lang="hi" className={`${inter.variable} ${plusJakarta.variable} ${notoSansDevanagari.variable}`}>
      <body className="font-body antialiased">
        {children}
        <Toaster position="top-center" richColors />
        <ServiceWorkerRegistrar />
      </body>
    </html>
  )
}
