'use client'

import { CheckCircle2, Circle, Clock, AlertCircle } from 'lucide-react'
import { useLanguageStore } from '@/store/useLanguageStore'
import { formatDate } from '@/lib/utils/format'

import { ScheduledVaccine } from '@/types/vaccination'

interface VaccineItemProps {
  vaccine: ScheduledVaccine
  onMarkDone: (vaccine: ScheduledVaccine) => void
}

export function VaccineItem({ vaccine, onMarkDone }: VaccineItemProps) {
  const { language } = useLanguageStore()
  
  let statusColor = 'text-muted-light'
  let StatusIcon = Circle
  
  if (vaccine.status === 'done') {
    statusColor = 'text-success'
    StatusIcon = CheckCircle2
  } else if (vaccine.status === 'due') {
    statusColor = 'text-warning'
    StatusIcon = Clock
  } else if (vaccine.status === 'overdue') {
    statusColor = 'text-danger'
    StatusIcon = AlertCircle
  }

  return (
    <div className={`flex items-start gap-3 p-4 border-b border-light last:border-0 ${vaccine.status === 'done' ? 'bg-surface-light/50 opacity-70' : 'bg-surface-card'}`}>
      <button 
        onClick={() => vaccine.status !== 'done' && onMarkDone(vaccine)}
        disabled={vaccine.status === 'done'}
        className={`mt-0.5 flex-shrink-0 transition-colors ${statusColor} ${vaccine.status !== 'done' ? 'hover:text-success' : 'cursor-default'}`}
      >
        <StatusIcon className="w-5 h-5" />
      </button>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-body font-semibold text-primary-light text-sm flex justify-between">
          <span>{vaccine.vaccineName} <span className="text-muted-light font-normal text-xs ml-1">(Dose {vaccine.doseNumber})</span></span>
        </h4>
        
        <p className={`text-xs text-text-secondary mt-1 ${language === 'hindi' ? 'font-hindi' : 'font-body'}`}>
          {vaccine.description}
        </p>
        
        <div className="mt-2 flex gap-3 text-[11px] font-body">
          <span className="text-muted-light">
            Due: {formatDate(vaccine.scheduledDate)}
          </span>
          {vaccine.given_date && (
            <span className="text-success font-medium">
              Given: {formatDate(vaccine.given_date)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
