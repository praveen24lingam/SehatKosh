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
    <div className="flex flex-col items-center justify-center p-8 text-center rounded-xl border border-dashed border-light bg-surface-light/50">
      <div className="w-12 h-12 rounded-full bg-surface-card border border-light flex items-center justify-center mb-4 text-muted-light">
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="text-base font-semibold font-body text-primary-light mb-1">
        {title}
      </h4>
      <p className="text-sm font-body text-text-secondary mb-4 max-w-sm">
        {description}
      </p>
      {action && (
        <div>{action}</div>
      )}
    </div>
  )
}
