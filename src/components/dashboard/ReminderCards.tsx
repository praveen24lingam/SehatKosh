'use client'

import { Pill, CheckCircle2, Clock } from 'lucide-react'
import { useLanguageStore } from '@/store/useLanguageStore'
import { DoseReminder } from '@/types/database'

interface ReminderCardsProps {
  reminders: DoseReminder[]
  onMarkTaken: (id: string) => void
}

export function ReminderCards({ reminders, onMarkTaken }: ReminderCardsProps) {
  const { language } = useLanguageStore()

  if (reminders.length === 0) return null

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className={`text-lg text-primary-light ${language === 'hindi' ? 'font-hindi font-bold' : 'font-body font-bold'}`}>
          {language === 'hindi' ? 'आज की दवा' : "Today's Medicines"}
        </h3>
      </div>
      
      <div className="space-y-3">
        {reminders.map((reminder) => {
          // Assume today if last_taken_date is today
          const todayStr = new Date().toISOString().split('T')[0]
          const isTaken = reminder.last_taken_date === todayStr

          return (
            <div 
              key={reminder.id}
              className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                isTaken 
                  ? 'bg-success-soft border-success/20 opacity-75' 
                  : 'bg-surface-card border-light shadow-sm'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-full ${isTaken ? 'bg-success/20 text-success' : 'bg-accent/10 text-accent'}`}>
                  <Pill className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-body font-semibold text-primary-light line-clamp-1">
                    {reminder.medicine_name}
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-text-secondary">
                    <Clock className="w-3 h-3" />
                    <span className="font-body">{reminder.time_label}</span>
                    <span className="mx-1">•</span>
                    <span className={language === 'hindi' ? 'font-hindi' : 'font-body'}>
                      {language === 'hindi' 
                        ? (reminder.time_of_day === 'morning' ? 'सुबह' : 
                           reminder.time_of_day === 'afternoon' ? 'दोपहर' : 
                           reminder.time_of_day === 'evening' ? 'शाम' : 'रात')
                        : reminder.time_of_day}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onMarkTaken(reminder.id)}
                disabled={isTaken}
                className={`p-2 rounded-full transition-colors ${
                  isTaken 
                    ? 'text-success cursor-not-allowed' 
                    : 'text-border-dark hover:text-success hover:bg-success-soft'
                }`}
              >
                <CheckCircle2 className="w-7 h-7" />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
