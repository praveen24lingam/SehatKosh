'use client'

import { useState, useEffect } from 'react'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { ReminderCards } from '@/components/dashboard/ReminderCards'
import { RecentActivity, ActivityItem } from '@/components/dashboard/RecentActivity'
import { HealthInsights } from '@/components/dashboard/HealthInsights'
import { VaccineSummaryCard } from '@/components/dashboard/VaccineSummaryCard'
import { EmptyState } from '@/components/shared/EmptyState'
import { useAuthStore } from '@/store/useAuthStore'
import { useLanguageStore } from '@/store/useLanguageStore'
import { Pill, Activity, Sparkles, CalendarCheck, CheckCircle } from 'lucide-react'
import { DoseReminder } from '@/types/database'
import Link from 'next/link'

export default function DashboardPage() {
  const { user } = useAuthStore()
  const { language } = useLanguageStore()
  
  const [reminders, setReminders] = useState<DoseReminder[]>([])
  const [activities] = useState<ActivityItem[]>([])

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const res = await fetch('/api/reminders')
        const data = await res.json()
        if (data.reminders) {
          setReminders(data.reminders)
        }
      } catch (err) {
        console.error('Failed to fetch reminders:', err)
      }
    }
    fetchReminders()
  }, [])

  const handleMarkTaken = (id: string) => {
    setReminders(prev => prev.map(r => 
      r.id === id 
        ? { ...r, last_taken_date: new Date().toISOString().split('T')[0] } 
        : r
    ))
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (language === 'hindi') {
      if (hour < 12) return 'सुप्रभात'
      if (hour < 17) return 'नमस्कार'
      return 'शुभ संध्या'
    } else {
      if (hour < 12) return 'Good Morning'
      if (hour < 17) return 'Good Afternoon'
      return 'Good Evening'
    }
  }

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
      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 992px) {
          .dashboard-grid {
            display: grid !important;
            grid-template-columns: 2fr 1fr !important;
            gap: 32px !important;
          }
        }
        @media (max-width: 991px) {
          .dashboard-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 32px !important;
          }
        }
      `}} />
      
      {/* Premium Hero Header */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '20px',
        padding: '24px 32px',
        borderRadius: '24px',
        background: 'linear-gradient(135deg, #635BFF 0%, #00D4FF 100%)',
        boxShadow: '0 12px 32px rgba(99,91,255,0.2)',
        position: 'relative',
        overflow: 'hidden',
        color: 'white'
      }}>
        {/* Subtle decorative elements */}
        <div style={{ position: 'absolute', right: '-5%', top: '-20%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)' }} />
        
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <p style={{ fontSize: '15px', fontWeight: '500', opacity: 0.9, margin: 0, marginBottom: '6px' }}>
              {getGreeting()} {user?.name || ''}
            </p>
            <h1 style={{ fontSize: '28px', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>
              {language === 'hindi' ? 'आज का स्वास्थ्य सारांश' : "Today's Health Summary"}
            </h1>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.15)', padding: '8px 16px', borderRadius: '999px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <Sparkles size={16} />
            <span style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '0.5px' }}>
              {language === 'hindi' ? 'एआई तैयार है' : 'AI Assistant Ready'}
            </span>
          </div>
        </div>

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '8px' }}>
           <div style={{ flex: '1 1 120px', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Pill size={16} opacity={0.9} />
                <p style={{ fontSize: '13px', opacity: 0.9, margin: 0, fontWeight: 600 }}>{language === 'hindi' ? 'दवाइयाँ बाकी' : 'Medicines Due'}</p>
              </div>
              <p style={{ fontSize: '24px', fontWeight: '800', margin: 0 }}>{reminders.length}</p>
           </div>
           
           <div style={{ flex: '1 1 120px', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <CheckCircle size={16} opacity={0.9} />
                <p style={{ fontSize: '13px', opacity: 0.9, margin: 0, fontWeight: 600 }}>{language === 'hindi' ? 'पूरी हुई' : 'Completed'}</p>
              </div>
              <p style={{ fontSize: '24px', fontWeight: '800', margin: 0 }}>0</p>
           </div>

           <div style={{ flex: '1 1 120px', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <CalendarCheck size={16} opacity={0.9} />
                <p style={{ fontSize: '13px', opacity: 0.9, margin: 0, fontWeight: 600 }}>{language === 'hindi' ? 'अपॉइंटमेंट' : 'Appointments'}</p>
              </div>
              <p style={{ fontSize: '24px', fontWeight: '800', margin: 0 }}>0</p>
           </div>
        </div>
      </div>

      {/* 2. AI Health Insights */}
      <HealthInsights />

      {/* 3. Quick Actions */}
      <QuickActions />

      {/* 4 & 5. Main Content Grid */}
      <div className="dashboard-grid">
        
        {/* Left Column: Reminders */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '18px', color: '#0A2540', fontWeight: '800', margin: 0 }} className={language === 'hindi' ? 'font-hindi' : ''}>
            {language === 'hindi' ? 'आज की दवा' : "Today's Medicines"}
          </h3>
          {reminders.length > 0 ? (
            <ReminderCards reminders={reminders} onMarkTaken={handleMarkTaken} />
          ) : (
            <EmptyState 
              icon={Pill}
              title={language === 'hindi' ? 'कोई दवा नहीं' : 'No medicines scheduled today'}
              description={language === 'hindi' ? 'आपकी आज के लिए कोई भी दवा शेड्यूल नहीं है। स्वस्थ रहें!' : 'You have no medicines scheduled for today. Stay healthy!'}
              action={
                <Link href="/reminders" style={{
                  display: 'inline-block',
                  backgroundColor: '#0A2540',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '12px',
                  fontWeight: 600,
                  fontSize: '14px',
                  textDecoration: 'none',
                  marginTop: '12px',
                  boxShadow: '0 4px 12px rgba(10,37,64,0.1)'
                }}>
                  {language === 'hindi' ? 'दवा जोड़ें' : 'Add Reminder'}
                </Link>
              }
            />
          )}
        </div>

        {/* Right Column: Recent Activity & Vaccines */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <VaccineSummaryCard />
          
          <h3 style={{ fontSize: '18px', color: '#0A2540', fontWeight: '800', margin: 0, marginTop: '16px' }} className={language === 'hindi' ? 'font-hindi' : ''}>
            {language === 'hindi' ? 'हाल की गतिविधि' : 'Recent Activity'}
          </h3>
          {activities.length > 0 ? (
            <RecentActivity activities={activities} />
          ) : (
            <EmptyState 
              icon={Activity}
              title={language === 'hindi' ? 'कोई गतिविधि नहीं' : 'No recent activity'}
              description={language === 'hindi' ? 'आपके चैट इतिहास, अपलोड और स्वास्थ्य अलर्ट यहाँ दिखाई देंगे।' : 'Your chat history, uploads, and health alerts will appear here.'}
            />
          )}
        </div>

      </div>
    </div>
  )
}
