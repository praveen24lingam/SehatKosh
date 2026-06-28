'use client'

import { useState } from 'react'
import { TreasuryCard } from '@/components/dashboard/TreasuryCard'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { ReminderCards } from '@/components/dashboard/ReminderCards'
import { RecentActivity, ActivityItem } from '@/components/dashboard/RecentActivity'
import { EmptyState } from '@/components/shared/EmptyState'
import { useAuthStore } from '@/store/useAuthStore'
import { useLanguageStore } from '@/store/useLanguageStore'
import { Pill, Activity } from 'lucide-react'
import { DoseReminder } from '@/types/database'

export default function DashboardPage() {
  const { user } = useAuthStore()
  const { language } = useLanguageStore()

  // Mock data for UI development
  const [savings] = useState(1240)
  
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
    },
    {
      id: '2',
      user_id: 'user1',
      member_id: 'member1',
      medicine_name: 'Metformin 500mg',
      time_of_day: 'evening',
      time_label: '9:00 PM',
      days: 'daily',
      is_active: true,
      last_taken_date: new Date().toISOString().split('T')[0], // taken today
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
    <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-display font-semibold text-primary-light">
          {getGreeting()}, {user?.name || (language === 'hindi' ? 'दोस्त' : 'Friend')}!
        </h1>
        <p className="font-body text-text-secondary">
          {language === 'hindi' 
            ? 'आपकी फैमिली की सेहत का खजाना।' 
            : "Your family's health treasury."}
        </p>
      </div>

      {/* Treasury Card */}
      <TreasuryCard 
        savings={savings} 
        lastUpdated={new Date().toLocaleDateString(language === 'hindi' ? 'hi-IN' : 'en-IN', {
          day: 'numeric', month: 'short', year: 'numeric'
        })}
      />

      {/* Quick Actions Grid */}
      <QuickActions />

      {/* Main Content Grid (2 columns on laptop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        {/* Left Column: Reminders */}
        <div>
          {reminders.length > 0 ? (
            <ReminderCards reminders={reminders} onMarkTaken={handleMarkTaken} />
          ) : (
            <div className="space-y-3">
              <h3 className={`text-lg text-primary-light ${language === 'hindi' ? 'font-hindi font-bold' : 'font-body font-bold'}`}>
                {language === 'hindi' ? 'आज की दवा' : "Today's Medicines"}
              </h3>
              <EmptyState 
                icon={Pill}
                title={language === 'hindi' ? 'कोई दवा नहीं' : 'No medicines for today'}
                description={language === 'hindi' ? 'आज के लिए कोई दवा शेड्यूल नहीं है।' : 'No medicines are scheduled for today.'}
              />
            </div>
          )}
        </div>

        {/* Right Column: Recent Activity */}
        <div>
          {activities.length > 0 ? (
            <RecentActivity activities={activities} />
          ) : (
            <div className="space-y-3">
              <h3 className={`text-lg text-primary-light ${language === 'hindi' ? 'font-hindi font-bold' : 'font-body font-bold'}`}>
                {language === 'hindi' ? 'हाल की गतिविधि' : 'Recent Activity'}
              </h3>
              <EmptyState 
                icon={Activity}
                title={language === 'hindi' ? 'कोई गतिविधि नहीं' : 'No recent activity'}
                description={language === 'hindi' ? 'अभी तक कोई रिकॉर्ड या चैट नहीं है।' : 'You have no recent records or chats.'}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
