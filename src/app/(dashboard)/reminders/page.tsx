'use client'

import { useState, useEffect } from 'react'
import { ReminderCards } from '@/components/dashboard/ReminderCards'
import { EmptyState } from '@/components/shared/EmptyState'
import { Pill, Plus } from 'lucide-react'
import { DoseReminder, FamilyMember } from '@/types/database'
import { useLanguageStore } from '@/store/useLanguageStore'

export default function RemindersPage() {
  const { language } = useLanguageStore()
  const [reminders, setReminders] = useState<DoseReminder[]>([])
  const [members, setMembers] = useState<FamilyMember[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    memberId: '',
    medicineName: '',
    timeOfDay: 'morning',
    timeLabel: '8:00 AM',
    days: 'daily'
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [remRes, memRes] = await Promise.all([
          fetch('/api/reminders'),
          fetch('/api/family')
        ])
        
        const remData = await remRes.json()
        const memData = await memRes.json()
        
        if (remData.reminders) setReminders(remData.reminders)
        if (memData.members) {
          setMembers(memData.members)
          if (memData.members.length > 0) {
            setFormData(prev => ({ ...prev, memberId: memData.members[0].id }))
          }
        }
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleMarkTaken = async (id: string) => {
    const today = new Date().toISOString().split('T')[0]
    
    // Optimistic update
    setReminders(prev => prev.map(r => 
      r.id === id ? { ...r, last_taken_date: today } : r
    ))

    try {
      await fetch(`/api/reminders/${id}/taken`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: today })
      })
    } catch (error) {
      console.error(error)
      // Revert on error
      setReminders(prev => prev.map(r => 
        r.id === id ? { ...r, last_taken_date: null } : r
      ))
    }
  }

  const handleAddReminder = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const res = await fetch('/api/reminders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      
      if (data.reminder) {
        setReminders([data.reminder, ...reminders])
        setShowAddForm(false)
        setFormData({
          ...formData,
          medicineName: '',
          timeLabel: '8:00 AM'
        })
      }
    } catch (error) {
      console.error(error)
      alert('Failed to add reminder')
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl md:text-3xl font-display font-semibold text-primary-light`}>
          {language === 'hindi' ? 'दवा की याद' : 'Dose Reminders'}
        </h1>
        {!showAddForm && (
          <button 
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-1 px-4 py-2 bg-accent text-white rounded-lg font-medium text-sm hover:bg-accent/90"
          >
            <Plus className="w-4 h-4" />
            {language === 'hindi' ? 'नई दवा' : 'Add New'}
          </button>
        )}
      </div>

      {showAddForm && (
        <form onSubmit={handleAddReminder} className="bg-surface-card p-6 rounded-xl border border-light">
          <h3 className={`text-xl font-bold mb-6 ${language === 'hindi' ? 'font-hindi text-accent' : 'font-body text-accent'}`}>
            {language === 'hindi' ? 'नई दवा का रिमाइंडर' : 'New Dose Reminder'}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1 text-text-secondary">
                {language === 'hindi' ? 'किसके लिए?' : 'For whom?'}
              </label>
              <select 
                value={formData.memberId}
                onChange={e => setFormData({...formData, memberId: e.target.value})}
                className="w-full bg-surface-light border border-light rounded-lg px-4 py-2 outline-none"
              >
                {members.map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm mb-1 text-text-secondary">
                {language === 'hindi' ? 'दवा का नाम' : 'Medicine Name'}
              </label>
              <input 
                required
                type="text" 
                value={formData.medicineName}
                onChange={e => setFormData({...formData, medicineName: e.target.value})}
                className="w-full bg-surface-light border border-light rounded-lg px-4 py-2 outline-none focus:border-brand-saffron"
                placeholder="e.g. Paracetamol 500mg"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1 text-text-secondary">
                  {language === 'hindi' ? 'समय का पहर' : 'Time of day'}
                </label>
                <select 
                  value={formData.timeOfDay}
                  onChange={e => setFormData({...formData, timeOfDay: e.target.value})}
                  className="w-full bg-surface-light border border-light rounded-lg px-4 py-2 outline-none"
                >
                  <option value="morning">{language === 'hindi' ? 'सुबह' : 'Morning'}</option>
                  <option value="afternoon">{language === 'hindi' ? 'दोपहर' : 'Afternoon'}</option>
                  <option value="evening">{language === 'hindi' ? 'शाम' : 'Evening'}</option>
                  <option value="night">{language === 'hindi' ? 'रात' : 'Night'}</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm mb-1 text-text-secondary">
                  {language === 'hindi' ? 'सटीक समय' : 'Exact Time'}
                </label>
                <input 
                  required
                  type="time" 
                  value={
                    // basic conversion logic for MVP
                    formData.timeLabel.includes('AM') 
                      ? formData.timeLabel.replace(' AM', '').padStart(5, '0') 
                      : String((parseInt(formData.timeLabel) % 12) + 12).padStart(2, '0') + ':00'
                  }
                  onChange={e => {
                    // Very basic MVP conversion to 12h label
                    const [h, m] = e.target.value.split(':')
                    const hour = parseInt(h)
                    const ampm = hour >= 12 ? 'PM' : 'AM'
                    const displayHour = hour % 12 || 12
                    setFormData({...formData, timeLabel: `${displayHour}:${m} ${ampm}`})
                  }}
                  className="w-full bg-surface-light border border-light rounded-lg px-4 py-2 outline-none focus:border-brand-saffron"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex gap-3">
            <button 
              type="button"
              onClick={() => setShowAddForm(false)}
              className="flex-1 py-3 border border-light rounded-lg font-medium text-text-secondary hover:bg-surface-light"
            >
              {language === 'hindi' ? 'रद्द करें' : 'Cancel'}
            </button>
            <button 
              type="submit"
              className="flex-1 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90"
            >
              {language === 'hindi' ? 'सेव करें' : 'Save Reminder'}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-20 bg-surface-light rounded-xl"></div>
          <div className="h-20 bg-surface-light rounded-xl"></div>
        </div>
      ) : (
        <>
          {reminders.length === 0 ? (
            <EmptyState 
              icon={Pill}
              title={language === 'hindi' ? 'कोई दवा रिमाइंडर नहीं' : 'No Dose Reminders'}
              description={language === 'hindi' 
                ? 'अभी तक कोई दवा नहीं जोड़ी गई है।' 
                : 'You have not added any medicines yet.'}
            />
          ) : (
            <ReminderCards reminders={reminders} onMarkTaken={handleMarkTaken} />
          )}
        </>
      )}
    </div>
  )
}
