'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, MessageCircle, Settings } from 'lucide-react'
import { useLanguageStore } from '@/store/useLanguageStore'

export function BottomNav() {
  const pathname = usePathname()
  const { language } = useLanguageStore()

  const navItems = [
    { href: '/dashboard', icon: Home,          labelEn: 'Home',      labelHi: 'होम' },
    { href: '/chat',      icon: MessageCircle, labelEn: 'Chat',      labelHi: 'चैट' },
    { href: '/settings',  icon: Settings,      labelEn: 'Settings',  labelHi: 'सेटिंग्स' },
  ]

  return (
    <nav
      className="mobile-only"
      style={{
        position: 'fixed',
        bottom: 'var(--space-3)',
        left: 'var(--space-3)',
        right: 'var(--space-3)',
        backgroundColor: 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        zIndex: 50,
        boxShadow: '0 2px 6px rgb(var(--slate-rgb) / 0.04), 0 12px 28px -8px rgb(var(--slate-rgb) / 0.16)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'stretch', gap: 'var(--space-1)', padding: 'var(--space-1)' }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={`bn-item ${isActive ? 'is-active' : ''}`}
            >
              <span className="bn-icon">
                <Icon size={18} strokeWidth={isActive ? 2.4 : 2} />
              </span>
              <span
                className={language === 'hindi' ? 'font-hindi' : ''}
                style={{ fontSize: '10.5px', fontWeight: isActive ? 700 : 500, lineHeight: 1.2 }}
              >
                {language === 'hindi' ? item.labelHi : item.labelEn}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
