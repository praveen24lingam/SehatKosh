'use client'

import { useState, useEffect } from 'react'
import { Plus, BellRing, Sparkles } from 'lucide-react'
import { useLanguageStore } from '@/store/useLanguageStore'
import { SmartAISuggestion } from '@/components/reminders/SmartAISuggestion'
import { UnifiedReminderList } from '@/components/reminders/UnifiedReminderList'
import { ReminderAddModal } from '@/components/reminders/ReminderAddModal'
import { EmptyState } from '@/components/shared/EmptyState'

export default function ReminderCenterPage() {
  const { language } = useLanguageStore()
  const [showAddModal, setShowAddModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [reminders, setReminders] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/reminders')
        const data = await res.json()
        if (data.reminders) {
          setReminders(data.reminders)
        }
      } catch (error) {
        console.error('Failed to fetch reminders:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleReminderAdded = (newReminder: any) => {
    setReminders(prev => [newReminder, ...prev])
    setShowAddModal(false)
  }

  const handleMarkTaken = async (id: string) => {
    const today = new Date().toISOString().split('T')[0]
    
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
      setReminders(prev => prev.map(r => 
        r.id === id ? { ...r, last_taken_date: null } : r
      ))
    }
  }

  const hasReminders = reminders.length > 0

  return (
    <div style={{
      padding: '24px 16px',
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Header with Add Button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0A2540', margin: 0, letterSpacing: '-0.5px' }}>
            {language === 'hindi' ? 'रिमाइंडर सेंटर' : 'Reminder Center'}
          </h1>
          <p style={{ fontSize: '15px', color: '#425466', margin: '4px 0 0 0' }}>
            {language === 'hindi' ? 'अपनी दवाइयाँ और अपॉइंटमेंट मैनेज करें' : 'Manage your medicines and appointments'}
          </p>
        </div>

        <button 
          onClick={() => setShowAddModal(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px',
            background: 'linear-gradient(135deg, #635BFF 0%, #00D4FF 100%)',
            color: 'white', border: 'none', borderRadius: '14px', fontWeight: '700', fontSize: '14px',
            cursor: 'pointer', boxShadow: '0 8px 24px rgba(99,91,255,0.25)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <Plus size={18} strokeWidth={3} />
          {language === 'hindi' ? 'रिमाइंडर जोड़ें' : 'Add Reminder'}
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>
          <div style={{ height: '120px', background: '#F8FAFC', borderRadius: '20px' }} />
          <div style={{ height: '80px', background: '#F8FAFC', borderRadius: '16px' }} />
          <div style={{ height: '80px', background: '#F8FAFC', borderRadius: '16px' }} />
        </div>
      ) : (
        <>
          {/* Smart AI Suggestion */}
          <SmartAISuggestion />

          {/* Main Content */}
          {!hasReminders ? (
            <div style={{ background: 'white', padding: '48px 24px', borderRadius: '24px', textAlign: 'center', border: '1px solid rgba(10,37,64,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: 'linear-gradient(135deg, rgba(99,91,255,0.1) 0%, rgba(0,212,255,0.1) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#635BFF', marginBottom: '24px' }}>
                <BellRing size={40} />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0A2540', margin: '0 0 8px 0' }}>
                {language === 'hindi' ? 'अभी तक कोई रिमाइंडर नहीं' : 'No reminders yet'}
              </h2>
              <p style={{ fontSize: '15px', color: '#425466', margin: '0 0 32px 0', maxWidth: '400px' }}>
                {language === 'hindi' 
                  ? 'अपना पहला रिमाइंडर मैन्युअल रूप से बनाएं या एआई को आपके लिए यह करने दें।' 
                  : 'Create your first reminder manually or let AI do it for you.'}
              </p>
              
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button 
                  onClick={() => setShowAddModal(true)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px',
                    background: '#635BFF', color: 'white', border: 'none', borderRadius: '12px',
                    fontWeight: '600', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(99,91,255,0.2)'
                  }}
                >
                  <Sparkles size={18} />
                  {language === 'hindi' ? 'एआई से पूछें' : 'Ask AI'}
                </button>
                <button 
                  onClick={() => setShowAddModal(true)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px',
                    background: 'white', color: '#425466', border: '1px solid rgba(10,37,64,0.1)', borderRadius: '12px',
                    fontWeight: '600', fontSize: '14px', cursor: 'pointer'
                  }}
                >
                  <Plus size={18} />
                  {language === 'hindi' ? 'रिमाइंडर बनाएं' : 'Create Reminder'}
                </button>
              </div>
            </div>
          ) : (
            <UnifiedReminderList reminders={reminders} onMarkTaken={handleMarkTaken} />
          )}
        </>
      )}

      {/* Add Modal */}
      {showAddModal && <ReminderAddModal onClose={() => setShowAddModal(false)} onAdd={handleReminderAdded} />}
    </div>
  )
}
