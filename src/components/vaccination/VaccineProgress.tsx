'use client'

import { useLanguageStore } from '@/store/useLanguageStore'

interface VaccineProgressProps {
  total: number
  completed: number
}

export function VaccineProgress({ total, completed }: VaccineProgressProps) {
  const { language } = useLanguageStore()
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <div className="bg-surface-card border border-light p-4 rounded-xl space-y-3">
      <div className="flex justify-between items-end">
        <div>
          <h4 className="font-body font-bold text-primary-light text-sm">
            {language === 'hindi' ? 'टीकाकरण प्रगति' : 'Vaccination Progress'}
          </h4>
          <p className="text-xs text-text-secondary mt-0.5">
            {completed} of {total} {language === 'hindi' ? 'टीके पूरे हुए' : 'vaccines completed'}
          </p>
        </div>
        <span className="text-2xl font-display font-semibold text-accent">
          {percentage}%
        </span>
      </div>
      
      <div className="h-2 w-full bg-background/5 rounded-full overflow-hidden">
        <div 
          className="h-full bg-accent transition-all duration-1000 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
