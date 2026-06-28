import type { Metadata } from "next"
import { Inter, Noto_Sans_Devanagari } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'

const inter = Inter({ 
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const notoSansDevanagari = Noto_Sans_Devanagari({
  weight: ['400', '600', '700'],
  subsets: ['devanagari'],
  variable: '--font-hindi',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SehatKosh — स्वास्थ्य कोष',
  description: 'Apni family ki sehat ka poora hisaab. AI se poochho, records rakho, schemes dhundho.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hi" className={`${inter.variable} ${notoSansDevanagari.variable}`}>
      <body className="font-body antialiased">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
