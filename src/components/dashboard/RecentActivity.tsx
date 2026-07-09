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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontFamily: 'Inter, sans-serif' }}>
      <style dangerouslySetInnerHTML={{__html: `
        .activity-card {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }
        .activity-card::after {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background: var(--hover-border);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .activity-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 32px rgba(10, 37, 64, 0.08) !important;
          border-color: transparent !important;
        }
        .activity-card:hover::after {
          opacity: 1;
        }
      `}} />
      
      {activities.map((activity) => {
        let Icon = Activity
        let bgGradient = 'linear-gradient(135deg, rgba(99, 91, 255, 0.12) 0%, rgba(0, 212, 255, 0.04) 100%)'
        let iconColor = '#635BFF'
        let accentLine = 'linear-gradient(to bottom, #7A73FF, #635BFF)'
        
        if (activity.type === 'record') {
          Icon = FileText
          bgGradient = 'linear-gradient(135deg, #FFF4E5 0%, rgba(255,153,0,0.05) 100%)'
          iconColor = '#FF9900'
          accentLine = 'linear-gradient(to bottom, #FFB84D, #FF9900)'
        } else if (activity.type === 'scheme') {
          Icon = ShieldCheck
          bgGradient = 'linear-gradient(135deg, #E6FFEA 0%, rgba(0,217,36,0.05) 100%)'
          iconColor = '#00D924'
          accentLine = 'linear-gradient(to bottom, #33FF55, #00D924)'
        }

        return (
          <div 
            key={activity.id}
            className="activity-card"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '16px 20px',
              borderRadius: '20px',
              backgroundColor: 'white',
              border: '1px solid rgba(10, 37, 64, 0.04)',
              boxShadow: '0 4px 12px rgba(10,37,64,0.03)',
              cursor: 'pointer',
              '--hover-border': accentLine
            } as React.CSSProperties}
          >
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: bgGradient,
              flexShrink: 0
            }}>
              <Icon size={22} style={{ color: iconColor }} strokeWidth={2.5} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                fontWeight: '700',
                fontSize: '15px',
                color: '#0A2540',
                margin: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {activity.title}
              </p>
              <p style={{
                fontSize: '13px',
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
