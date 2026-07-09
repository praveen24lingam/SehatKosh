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
      borderRadius: '24px',
      backgroundColor: '#FAFCFF',
      border: '1px dashed rgba(10, 37, 64, 0.12)',
      boxShadow: '0 4px 20px rgba(10,37,64,0.02)',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(99,91,255,0.08) 0%, rgba(0,212,255,0.04) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px',
        boxShadow: '0 4px 12px rgba(99,91,255,0.05)'
      }}>
        <Icon size={28} strokeWidth={2} style={{ color: '#635BFF' }} />
      </div>
      <h4 style={{
        fontSize: '18px',
        fontWeight: '700',
        color: '#0A2540',
        marginBottom: '8px'
      }}>
        {title}
      </h4>
      <p style={{
        fontSize: '14px',
        color: '#425466',
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
