'use client'

import { useEffect } from 'react'

/**
 * Registers the service worker so mobile browsers offer "Add to home screen".
 *
 * Registration is skipped in development — a cached SW during dev makes HMR
 * behave unpredictably, and installability only matters for the built app.
 */
export function ServiceWorkerRegistrar() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return
    if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return

    const register = () => {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.error('Service worker registration failed:', err)
      })
    }

    // Wait for load so registration never competes with first paint.
    if (document.readyState === 'complete') {
      register()
    } else {
      window.addEventListener('load', register)
      return () => window.removeEventListener('load', register)
    }
  }, [])

  return null
}
