'use client'

import Link from 'next/link'
import { Bell, Activity } from 'lucide-react'
import { useUserStore } from '@/store/useUserStore'

export function TopHeader() {
  const { user } = useUserStore()

  return (
    <header
      className="mobile-flex"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        width: '100%',
        height: 'var(--topbar-h)',
        backgroundColor: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        display: 'none', // Overridden to display: flex by mobile-flex in mobile view
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 var(--space-3)',
        flexShrink: 0,
      }}
    >
      <Link
        href="/dashboard"
        style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', textDecoration: 'none' }}
      >
        <span
          style={{
            width: '30px',
            height: '30px',
            borderRadius: 'var(--radius-sm)',
            background: 'linear-gradient(135deg, var(--accent-light) 0%, var(--primary) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 4px 10px -2px rgb(var(--teal-rgb) / 0.45)',
          }}
        >
          <Activity size={17} strokeWidth={2.5} />
        </span>
        <span style={{ fontWeight: 800, fontSize: '17px', color: 'var(--heading)', letterSpacing: '-0.03em' }}>
          SehatKosh
        </span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
        <button className="btn-icon" type="button" aria-label="Notifications" style={{ position: 'relative' }}>
          <Bell size={19} strokeWidth={2} />
          <span
            aria-hidden
            style={{
              position: 'absolute',
              top: '7px',
              right: '7px',
              width: '7px',
              height: '7px',
              backgroundColor: 'var(--accent)',
              borderRadius: '50%',
              border: '2px solid white',
            }}
          />
        </button>

        <Link
          href="/settings"
          aria-label="Profile settings"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '34px',
            height: '34px',
            borderRadius: '999px',
            background: 'linear-gradient(135deg, var(--accent-light) 0%, var(--primary) 100%)',
            color: 'white',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '14px',
            boxShadow: '0 4px 10px -2px rgb(var(--teal-rgb) / 0.4)',
          }}
        >
          {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
        </Link>
      </div>
    </header>
  )
}
