'use client'

import { LucideIcon } from 'lucide-react'
import { ReactNode } from 'react'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: ReactNode
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 32px',
      textAlign: 'center',
      borderRadius: '20px',
      backgroundColor: '#F8FAFC',
      border: '1px dashed rgba(15,23,42, 0.12)',
      boxShadow: '0 4px 20px rgba(15,23,42,0.02)',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(13,148,136,0.08) 0%, rgba(20,184,166,0.04) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px',
        boxShadow: '0 4px 12px rgba(13,148,136,0.05)'
      }}>
        <Icon size={28} strokeWidth={2} style={{ color: '#0D9488' }} />
      </div>
      <h4 style={{
        fontSize: '18px',
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: '8px'
      }}>
        {title}
      </h4>
      <p style={{
        fontSize: '14px',
        color: '#475569',
        marginBottom: '24px',
        maxWidth: '320px',
        lineHeight: '1.5'
      }}>
        {description}
      </p>
      {action && (
        <div style={{ marginTop: '8px' }}>{action}</div>
      )}
    </div>
  )
}
