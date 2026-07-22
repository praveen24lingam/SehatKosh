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
      backgroundColor: 'var(--background)',
      border: '1px dashed rgb(var(--slate-rgb) / 0.12)',
      boxShadow: '0 4px 20px rgb(var(--slate-rgb) / 0.02)',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgb(var(--teal-rgb) / 0.08) 0%, rgb(var(--teal-light-rgb) / 0.04) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px',
        boxShadow: '0 4px 12px rgb(var(--teal-rgb) / 0.05)'
      }}>
        <Icon size={28} strokeWidth={2} style={{ color: 'var(--primary)' }} />
      </div>
      <h4 style={{
        fontSize: '18px',
        fontWeight: '700',
        color: 'var(--foreground)',
        marginBottom: '8px'
      }}>
        {title}
      </h4>
      <p style={{
        fontSize: '14px',
        color: 'var(--foreground-secondary)',
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
