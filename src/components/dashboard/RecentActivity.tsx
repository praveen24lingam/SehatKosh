'use client'

import { FileText, ShieldCheck, Activity } from 'lucide-react'
import { useLanguageStore } from '@/store/useLanguageStore'
import { formatDate } from '@/lib/utils/format'

export type ActivityItem = {
  id: string
  type: 'record' | 'scheme' | 'chat'
  title: string
  date: string
}

interface RecentActivityProps {
  activities: ActivityItem[]
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const { language } = useLanguageStore()

  if (activities.length === 0) return null

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className={`text-lg text-primary-light ${language === 'hindi' ? 'font-hindi font-bold' : 'font-body font-bold'}`}>
          {language === 'hindi' ? 'हाल की गतिविधि' : 'Recent Activity'}
        </h3>
      </div>
      
      <div className="space-y-3">
        {activities.map((activity) => {
          let Icon = Activity
          let colorClass = 'text-accent bg-accent/10'
          
          if (activity.type === 'record') {
            Icon = FileText
            colorClass = 'text-brand-gold bg-brand-gold-soft'
          } else if (activity.type === 'scheme') {
            Icon = ShieldCheck
            colorClass = 'text-success bg-success-soft'
          }

          return (
            <div 
              key={activity.id}
              className="flex items-center gap-4 p-4 rounded-xl bg-surface-card border border-light"
            >
              <div className={`p-2.5 rounded-full ${colorClass}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body font-medium text-primary-light truncate">
                  {activity.title}
                </p>
                <p className="text-xs text-text-secondary mt-0.5">
                  {formatDate(activity.date)}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
