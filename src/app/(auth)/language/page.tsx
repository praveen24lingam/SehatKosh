'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { useLanguageStore } from '@/store/useLanguageStore'

export default function LanguageSelectPage() {
  const router = useRouter()
  const { language, setLanguage } = useLanguageStore()

  const handleSelect = (lang: 'hindi' | 'english') => {
    setLanguage(lang)
    router.push('/')
  }

  return (
    <div className="relative min-h-screen bg-background text-primary-dark flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Background Gradient replacing BackgroundBeams */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(224, 92, 0, 0.12) 0%, transparent 70%)'
        }}
      />
      
      <motion.div 
        className="relative z-10 w-full max-w-sm flex flex-col items-center gap-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="text-center space-y-2">
          <h1 className="font-hindi font-bold text-3xl text-accent">स्वास्थ्य कोष</h1>
          <p className="font-body font-semibold tracking-display text-muted-dark">SehatKosh</p>
        </div>

        <div className="text-center space-y-2">
          <h2 className="font-body text-xl font-medium">Apni bhasha chuniye</h2>
          <h2 className="font-hindi text-xl font-medium">अपनी भाषा चुनिए</h2>
        </div>

        <div className="w-full space-y-4">
          <Card 
            className={`cursor-pointer p-4 transition-all duration-200 border bg-surface-1/50 flex items-center justify-center gap-3 ${
              language === 'hindi' 
                ? 'border-brand-saffron bg-accent/10 text-accent' 
                : 'border-dark hover:border-brand-saffron/50 text-primary-dark'
            }`}
            onClick={() => handleSelect('hindi')}
          >
            <span className="text-2xl">🇮🇳</span>
            <span className="font-hindi text-lg font-medium">हिंदी</span>
          </Card>

          <Card 
            className={`cursor-pointer p-4 transition-all duration-200 border bg-surface-1/50 flex items-center justify-center gap-3 ${
              language === 'english' 
                ? 'border-brand-saffron bg-accent/10 text-accent' 
                : 'border-dark hover:border-brand-saffron/50 text-primary-dark'
            }`}
            onClick={() => handleSelect('english')}
          >
            <span className="text-2xl">🇬🇧</span>
            <span className="font-body text-lg font-medium">English</span>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}
