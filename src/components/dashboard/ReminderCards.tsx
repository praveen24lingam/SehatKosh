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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: 'Inter, sans-serif' }}>
      <style dangerouslySetInnerHTML={{__html: `
        .reminder-card {
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reminder-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(10, 37, 64, 0.05) !important;
          border-color: var(--hover-border) !important;
        }
        .check-btn {
          transition: all 0.2s ease;
          border-radius: 50%;
        }
        .check-btn:hover:not(:disabled) {
          color: #00D924 !important;
          background-color: rgba(0, 217, 36, 0.08);
        }
      `}} />
      
      {reminders.map((reminder) => {
        const todayStr = new Date().toISOString().split('T')[0]
        const isTaken = reminder.last_taken_date === todayStr

        return (
          <div 
            key={reminder.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              borderRadius: '20px',
              border: isTaken ? '1px solid rgba(99, 91, 255, 0.15)' : '1px solid rgba(10, 37, 64, 0.06)',
              backgroundColor: isTaken ? '#F4F4FF' : 'white',
              boxShadow: isTaken ? 'none' : '0 4px 12px rgba(10,37,64,0.02)',
              opacity: isTaken ? 0.8 : 1,
              '--hover-border': '#00D924'
            } as React.CSSProperties}
            className={isTaken ? '' : 'reminder-card'}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                padding: '10px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isTaken ? 'rgba(99, 91, 255, 0.1)' : 'rgba(255, 153, 0, 0.1)',
                color: isTaken ? '#635BFF' : '#FF9900'
              }}>
                <Pill size={22} strokeWidth={2.5} />
              </div>
              <div>
                <p style={{
                  fontSize: '15px',
                  fontWeight: '700',
                  color: isTaken ? '#8898AA' : '#0A2540',
                  textDecoration: isTaken ? 'line-through' : 'none',
                  margin: 0
                }}>
                  {reminder.medicine_name}
                </p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginTop: '4px',
                  fontSize: '12px',
                  fontWeight: '500',
                  color: '#8898AA'
                }}>
                  <Clock size={13} />
                  <span>{reminder.time_label}</span>
                  <span style={{ opacity: 0.5 }}>•</span>
                  <span className={language === 'hindi' ? 'font-hindi' : ''}>
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
              className="check-btn"
              style={{
                border: 'none',
                background: 'transparent',
                padding: '6px',
                cursor: isTaken ? 'not-allowed' : 'pointer',
                color: isTaken ? '#635BFF' : '#D1D5DB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                outline: 'none'
              }}
            >
              <CheckCircle2 size={26} strokeWidth={2.5} />
            </button>
          </div>
        )
      })}
    </div>
  )
}
