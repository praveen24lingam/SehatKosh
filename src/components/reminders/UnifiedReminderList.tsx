'use client'

import { Pill, Calendar, Edit2, Trash2, CheckCircle2, Circle } from 'lucide-react'
import { useLanguageStore } from '@/store/useLanguageStore'

export function UnifiedReminderList({ reminders = [], onMarkTaken }: { reminders?: any[], onMarkTaken?: (id: string) => void }) {
  const { language } = useLanguageStore()

  if (reminders.length === 0) return null

  // Assuming all fetched from DB are currently medicine reminders, but we can separate them if there's a type field.
  // For now, API returns dose reminders. So they are all 'medicine'.
  const medicineReminders = reminders.filter(r => r.type !== 'appointment')
  const appointmentReminders = reminders.filter(r => r.type === 'appointment')

  const renderCard = (reminder: any) => {
    const isMedicine = reminder.type !== 'appointment'
    const Icon = isMedicine ? Pill : Calendar
    const color = isMedicine ? '#635BFF' : '#00D4FF'

    const title = reminder.medicine_name || reminder.title || 'Unknown Reminder'
    const schedule = reminder.time_label || reminder.schedule || 'No time set'
    
    const today = new Date().toISOString().split('T')[0]
    const completedToday = reminder.completedToday ?? (reminder.last_taken_date === today)
    const active = reminder.active ?? true

    return (
      <div key={reminder.id} style={{
        background: 'white', borderRadius: '16px', padding: '16px',
        border: '1px solid rgba(10,37,64,0.06)', boxShadow: '0 4px 12px rgba(10,37,64,0.02)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
        opacity: reminder.active ? 1 : 0.6, transition: 'all 0.2s ease'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${color}15`, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon size={24} />
          </div>
          <div>
            <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: '700', color: '#0A2540' }}>{title}</h4>
            <p style={{ margin: 0, fontSize: '13px', color: '#425466' }}>{schedule}</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Status icon */}
          <button 
            onClick={() => onMarkTaken && onMarkTaken(reminder.id)}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px', color: completedToday ? '#00D924' : '#E2E8F0' }}>
            {completedToday ? <CheckCircle2 size={24} /> : <Circle size={24} />}
          </button>

          {/* Toggle */}
          <div style={{ width: '40px', height: '22px', background: active ? color : '#E2E8F0', borderRadius: '11px', position: 'relative', cursor: 'pointer', transition: 'background 0.2s ease' }}>
            <div style={{ width: '18px', height: '18px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: active ? '20px' : '2px', transition: 'left 0.2s ease', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }} />
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '4px', borderLeft: '1px solid rgba(10,37,64,0.1)', paddingLeft: '12px', marginLeft: '4px' }}>
            <button style={{ background: 'transparent', border: 'none', color: '#425466', cursor: 'pointer', padding: '6px', borderRadius: '6px' }}>
              <Edit2 size={16} />
            </button>
            <button style={{ background: 'transparent', border: 'none', color: '#E02424', cursor: 'pointer', padding: '6px', borderRadius: '6px' }}>
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {medicineReminders.length > 0 && (
        <section>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0A2540', marginBottom: '16px' }}>
            {language === 'hindi' ? 'सक्रिय रिमाइंडर' : 'Active Reminders'}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {medicineReminders.map(renderCard)}
          </div>
        </section>
      )}

      {appointmentReminders.length > 0 && (
        <section>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0A2540', marginBottom: '16px' }}>
            {language === 'hindi' ? 'आगामी अपॉइंटमेंट' : 'Upcoming Appointments'}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {appointmentReminders.map(renderCard)}
          </div>
        </section>
      )}
    </div>
  )
}
