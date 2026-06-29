import { cn } from '@/lib/utils'

type Status = 'done' | 'due' | 'overdue' | 'upcoming'

interface StatusBadgeProps {
  status: Status
  className?: string
}

const STATUS_CONFIG: Record<Status, { label: string; labelHi: string; className: string }> = {
  done: {
    label: 'Done',
    labelHi: 'हो गया',
    className: 'bg-[var(--success-soft)] text-[var(--success)] border border-[var(--success)]/20',
  },
  due: {
    label: 'Due Soon',
    labelHi: 'जल्द देना है',
    className: 'bg-[var(--warning-soft)] text-[var(--warning)] border border-[var(--warning)]/20',
  },
  overdue: {
    label: 'Overdue',
    labelHi: 'देर हो गई',
    className: 'bg-[var(--danger-soft)] text-[var(--danger)] border border-[var(--danger)]/20',
  },
  upcoming: {
    label: 'Upcoming',
    labelHi: 'आने वाला',
    className: 'bg-[var(--border)] text-[var(--text-secondary)] border border-[var(--border)]',
  },
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status]
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  )
}
