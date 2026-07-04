'use client'

import { useEffect, useState } from 'react'
import { WifiOff } from 'lucide-react'
import { useLanguageStore } from '@/store/useLanguageStore'

export function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(false)
  const { language } = useLanguageStore()

  useEffect(() => {
    // Check initial state
    setTimeout(() => setIsOffline(!navigator.onLine), 0)

    // Listen to network changes
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (!isOffline) return null

  return (
    <div className="bg-danger text-white px-4 py-2 flex items-center justify-center gap-2 text-sm z-50 sticky top-0 md:top-auto">
      <WifiOff className="w-4 h-4" />
      <span className={language === 'hindi' ? 'font-hindi font-medium' : 'font-body font-medium'}>
        {language === 'hindi' 
          ? 'आप ऑफलाइन हैं। कुछ फीचर्स काम नहीं करेंगे।' 
          : 'You are offline. Some features may be unavailable.'}
      </span>
    </div>
  )
}
