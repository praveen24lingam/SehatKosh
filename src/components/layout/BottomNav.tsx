'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, MessageCircle, Users, Bell, Settings } from 'lucide-react'
import { useLanguageStore } from '@/store/useLanguageStore'

export function BottomNav() {
  const pathname = usePathname()
  const { language } = useLanguageStore()

  const navItems = [
    { href: '/dashboard', icon: Home,          labelEn: 'Home',      labelHi: 'होम' },
    { href: '/chat',      icon: MessageCircle, labelEn: 'Chat',      labelHi: 'चैट' },
    { href: '/family',    icon: Users,         labelEn: 'Family',    labelHi: 'परिवार' },
    { href: '/reminders', icon: Bell,          labelEn: 'Alerts',    labelHi: 'अलर्ट' },
    { href: '/settings',  icon: Settings,      labelEn: 'Settings',  labelHi: 'सेटिंग्स' },
  ]

  return (
    <nav className="mobile-only" style={{
      position: 'fixed',
      bottom: '16px',
      left: '16px',
      right: '16px',
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(10, 37, 64, 0.06)',
      borderRadius: '20px',
      zIndex: 50,
      boxShadow: '0 12px 32px rgba(10, 37, 64, 0.08)',
      paddingBottom: '0px',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '6px' }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '6px 10px',
                minWidth: '56px',
                textDecoration: 'none',
                color: isActive ? '#635BFF' : '#8898AA',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer'
              }}
            >
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                marginBottom: '2px',
                backgroundColor: isActive ? '#F4F4FF' : 'transparent',
                transition: 'all 0.25s ease'
              }}>
                <Icon size={18} style={{ transform: isActive ? 'scale(1.1)' : 'scale(1)', color: isActive ? '#635BFF' : '#8898AA' }} />
              </div>
              <span style={{
                fontSize: '9px',
                fontWeight: isActive ? '800' : '500',
                lineHeight: '1.2'
              }} className={language === 'hindi' ? 'font-hindi' : ''}>
                {language === 'hindi' ? item.labelHi : item.labelEn}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
