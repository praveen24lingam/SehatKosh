'use client'

import { FileText, ShieldCheck, Activity } from 'lucide-react'
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
  if (activities.length === 0) return null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: 'Inter, sans-serif' }}>
      <style dangerouslySetInnerHTML={{__html: `
        .activity-card {
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .activity-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(10, 37, 64, 0.05) !important;
          border-color: var(--hover-border) !important;
        }
      `}} />
      
      {activities.map((activity) => {
        let Icon = Activity
        let bgGradient = 'linear-gradient(135deg, rgba(99, 91, 255, 0.12) 0%, rgba(0, 212, 255, 0.04) 100%)'
        let iconColor = '#635BFF'
        
        if (activity.type === 'record') {
          Icon = FileText
          bgGradient = 'linear-gradient(135deg, rgba(255, 153, 0, 0.12) 0%, rgba(255, 153, 0, 0.04) 100%)'
          iconColor = '#FF9900'
        } else if (activity.type === 'scheme') {
          Icon = ShieldCheck
          bgGradient = 'linear-gradient(135deg, rgba(0, 217, 36, 0.12) 0%, rgba(0, 217, 36, 0.04) 100%)'
          iconColor = '#00D924'
        }

        return (
          <div 
            key={activity.id}
            className="activity-card"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '16px',
              borderRadius: '20px',
              backgroundColor: 'white',
              border: '1px solid rgba(10, 37, 64, 0.06)',
              boxShadow: '0 4px 12px rgba(10,37,64,0.02)',
              cursor: 'pointer',
              '--hover-border': iconColor
            } as React.CSSProperties}
          >
            <div style={{
              padding: '10px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: bgGradient
            }}>
              <Icon size={20} style={{ color: iconColor }} strokeWidth={2.5} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                fontWeight: '700',
                fontSize: '14px',
                color: '#0A2540',
                margin: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {activity.title}
              </p>
              <p style={{
                fontSize: '12px',
                fontWeight: '500',
                color: '#8898AA',
                margin: '4px 0 0 0'
              }}>
                {formatDate(activity.date)}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
