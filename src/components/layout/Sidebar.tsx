'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, MessageCircle, Settings, Activity } from 'lucide-react'
import { useUserStore } from '@/store/useUserStore'
import { useLanguageStore } from '@/store/useLanguageStore'

export function Sidebar() {
  const pathname = usePathname()
  const { user } = useUserStore()
  const { language } = useLanguageStore()

  const navItems = [
    { href: '/dashboard', icon: Home,          labelEn: 'Home',      labelHi: 'होम' },
    { href: '/chat',      icon: MessageCircle, labelEn: 'AI Chat',   labelHi: 'एआई चैट' },
    { href: '/settings',  icon: Settings,      labelEn: 'Settings',  labelHi: 'सेटिंग्स' },
  ]

  return (
    <aside
      className="desktop-flex"
      style={{
        width: 'var(--sidebar-w)',
        height: '100vh',
        backgroundColor: 'transparent',
        borderRight: '1px solid var(--border)',
        position: 'sticky',
        top: 0,
        flexDirection: 'column',
      }}
    >
      {/* Brand — same 64px height as the mobile top bar, so the two
          shells line up when you resize across the breakpoint. */}
      <div
        style={{
          height: 'var(--topbar-h)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 var(--space-4)',
          flexShrink: 0,
        }}
      >
        <Link
          href="/dashboard"
          style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', textDecoration: 'none' }}
        >
          <span
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-sm)',
              background: 'linear-gradient(135deg, var(--accent-light) 0%, var(--primary) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 4px 10px -2px rgb(var(--teal-rgb) / 0.45)',
              flexShrink: 0,
            }}
          >
            <Activity size={18} strokeWidth={2.5} />
          </span>
          <span style={{ fontWeight: 800, fontSize: '18px', color: 'var(--heading)', letterSpacing: '-0.03em' }}>
            SehatKosh
          </span>
        </Link>
      </div>

      {/* Navigation. Sits directly under the brand rather than being
          centred in the leftover space — the old layout pushed the links
          into the middle of the rail and left a void above them. */}
      <nav
        style={{
          flex: 1,
          padding: 'var(--space-3) var(--space-3) 0',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-1)',
          minHeight: 0,
        }}
      >
        <p className="sb-nav-label">{language === 'hindi' ? 'मेन्यू' : 'Menu'}</p>

        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={`sb-link ${isActive ? 'is-active' : ''}`}
            >
              <Icon className="sb-icon" size={18} strokeWidth={isActive ? 2.4 : 2} />
              <span className={language === 'hindi' ? 'font-hindi' : ''}>
                {language === 'hindi' ? item.labelHi : item.labelEn}
              </span>
            </Link>
          )
        })}
      </nav>

      {/* Profile — now a real link to Settings, matching the avatar in the
          mobile top bar. Was a non-interactive div with hover styling. */}
      <div style={{ padding: 'var(--space-3)', flexShrink: 0 }}>
        <Link href="/settings" className="sb-profile">
          <span
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '999px',
              background: 'linear-gradient(135deg, var(--foreground) 0%, var(--slate-800) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 700,
              fontSize: '14px',
              flexShrink: 0,
            }}
          >
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </span>
          <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0, gap: '1px' }}>
            <span
              className="t-label"
              style={{
                color: 'var(--heading)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {user?.name || (language === 'hindi' ? 'यूज़र' : 'User')}
            </span>
            <span className="t-meta">{language === 'hindi' ? 'प्रोफ़ाइल देखें' : 'View profile'}</span>
          </span>
        </Link>
      </div>
    </aside>
  )
}
