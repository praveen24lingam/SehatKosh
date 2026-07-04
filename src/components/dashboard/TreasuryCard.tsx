'use client'

import { useEffect, useState } from 'react'
import { IndianRupee } from 'lucide-react'
import { useLanguageStore } from '@/store/useLanguageStore'

interface TreasuryCardProps {
  savings: number
  lastUpdated?: string
}

export function TreasuryCard({ savings, lastUpdated }: TreasuryCardProps) {
  const { language } = useLanguageStore()
  const [displayValue, setDisplayValue] = useState(0)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    const start = displayValue
    const end = savings
    if (start === end) return
    requestAnimationFrame(() => setAnimating(true))

    let startTime: number | null = null
    const duration = 1000

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setDisplayValue(Math.floor(progress * (end - start) + start))
      if (progress < 1) {
        window.requestAnimationFrame(step)
      } else {
        setAnimating(false)
      }
    }

    window.requestAnimationFrame(step)
  }, [savings]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className="relative p-5 rounded-xl bg-white border border-border-light transition-all duration-300"
      style={{
        boxShadow: animating
          ? '0 0 0 3px rgba(99,91,255,0.2), 0 4px 16px rgba(99,91,255,0.15)'
          : '0 2px 8px rgba(10,37,64,0.06)',
        borderBottom: '2px solid var(--gold)',
      }}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className={`text-stripe-muted font-medium text-sm ${language === 'hindi' ? 'font-hindi' : 'font-body'}`}>
          {language === 'hindi' ? 'कुल बचत (Jan Aushadhi)' : 'Total Savings (Jan Aushadhi)'}
        </h3>
        <div className="p-1.5 rounded-full" style={{ background: 'rgba(196,154,26,0.1)' }}>
          <IndianRupee className="w-5 h-5" style={{ color: 'var(--gold)' }} />
        </div>
      </div>

      <div className="flex items-baseline gap-1 mt-3">
        <span className="text-2xl font-bold" style={{ color: 'var(--gold)' }}>₹</span>
        <span className="text-4xl font-extrabold text-stripe-text font-body">
          {displayValue.toLocaleString('en-IN')}
        </span>
      </div>

      {lastUpdated && (
        <p className="mt-3 text-xs text-stripe-light-muted font-body">
          {language === 'hindi' ? 'आखिरी अपडेट:' : 'Last updated:'} {lastUpdated}
        </p>
      )}
    </div>
  )
}
