'use client'

import { useState } from 'react'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { ReminderCards } from '@/components/dashboard/ReminderCards'
import { RecentActivity, ActivityItem } from '@/components/dashboard/RecentActivity'
import { HealthInsights } from '@/components/dashboard/HealthInsights'
import { EmptyState } from '@/components/shared/EmptyState'
import { useAuthStore } from '@/store/useAuthStore'
import { useLanguageStore } from '@/store/useLanguageStore'
import { Pill, Activity } from 'lucide-react'
import { DoseReminder } from '@/types/database'

export default function DashboardPage() {
  const { user } = useAuthStore()
  const { language } = useLanguageStore()
  
  const [reminders, setReminders] = useState<DoseReminder[]>([
    {
      id: '1',
      user_id: 'user1',
      member_id: 'member1',
      medicine_name: 'Telmisartan 40mg',
      time_of_day: 'morning',
      time_label: '8:00 AM',
      days: 'daily',
      is_active: true,
      last_taken_date: null,
      created_at: new Date().toISOString()
    }
  ])

  const [activities] = useState<ActivityItem[]>([
    {
      id: 'a1',
      type: 'record',
      title: 'Blood Test Report saved',
      date: new Date().toISOString()
    },
    {
      id: 'a2',
      type: 'scheme',
      title: 'Checked PM-JAY eligibility',
      date: new Date(Date.now() - 86400000).toISOString()
    }
  ])

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
      
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0A2540', letterSpacing: '-0.5px', margin: 0 }}>
          {getGreeting()}, <span style={{ color: '#635BFF' }}>{user?.name ? user.name.split(' ')[0] : (language === 'hindi' ? 'दोस्त' : 'Friend')}!</span>
        </h1>
        <p style={{ color: '#425466', fontSize: '15px', fontWeight: '500', margin: 0 }}>
          {language === 'hindi' 
            ? 'आपकी फैमिली की सेहत का खजाना।' 
            : "Here's your family's health overview."}
        </p>
      </div>

      {/* Health Summary Metrics - Removed by request */}

      {/* Quick Actions */}
      <QuickActions />

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        
        {/* Left Column: Reminders & Insights */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* Health Insights */}
          <HealthInsights />

          {/* Today's Medicine Reminders */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '18px', color: '#0A2540', fontWeight: '800', margin: 0 }} className={language === 'hindi' ? 'font-hindi' : ''}>
              {language === 'hindi' ? 'आज की दवा' : "Today's Medicines"}
            </h3>
            {reminders.length > 0 ? (
              <ReminderCards reminders={reminders} onMarkTaken={handleMarkTaken} />
            ) : (
              <EmptyState 
                icon={Pill}
                title={language === 'hindi' ? 'कोई दवा नहीं' : 'No medicines for today'}
                description={language === 'hindi' ? 'आज के लिए कोई दवा शेड्यूल नहीं है।' : 'No medicines are scheduled for today.'}
              />
            )}
          </div>
        </div>

        {/* Right Column: Recent Activity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '18px', color: '#0A2540', fontWeight: '800', margin: 0 }} className={language === 'hindi' ? 'font-hindi' : ''}>
            {language === 'hindi' ? 'हाल की गतिविधि' : 'Recent Activity'}
          </h3>
          {activities.length > 0 ? (
            <RecentActivity activities={activities} />
          ) : (
            <EmptyState 
              icon={Activity}
              title={language === 'hindi' ? 'कोई गतिविधि नहीं' : 'No recent activity'}
              description={language === 'hindi' ? 'अभी तक कोई रिकॉर्ड या चैट नहीं है।' : 'You have no recent records or chats.'}
            />
          )}
        </div>

      </div>
    </div>
  )
}
