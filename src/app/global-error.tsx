'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCcw } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-surface-light flex flex-col items-center justify-center p-4 text-center">
          <div className="bg-surface-card border border-light p-8 rounded-xl max-w-md w-full shadow-sm">
            <div className="w-16 h-16 bg-danger-soft rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-danger" />
            </div>
            
            <h2 className="text-2xl font-display font-bold text-primary-light mb-2">
              Kuch Galat Ho Gaya
            </h2>
            <p className="text-text-secondary mb-8">
              (Something went wrong). Hum error theek karne ki koshish kar rahe hain. Kripya page refresh karein.
            </p>
            
            <button
              onClick={() => reset()}
              className="w-full flex items-center justify-center gap-2 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors"
            >
              <RefreshCcw className="w-5 h-5" />
              Refresh Page
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
