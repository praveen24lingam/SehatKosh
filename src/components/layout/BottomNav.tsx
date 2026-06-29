'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, MessageCircle, Users, Settings } from 'lucide-react'
import { useLanguageStore } from '@/store/useLanguageStore'

export function BottomNav() {
  const pathname = usePathname()
  const { language } = useLanguageStore()

  const navItems = [
    { href: '/dashboard', icon: Home,          labelEn: 'Home',    labelHi: 'होम' },
    { href: '/chat',      icon: MessageCircle, labelEn: 'Chat',    labelHi: 'चैट', isPrimary: true },
    { href: '/family',    icon: Users,         labelEn: 'Family',  labelHi: 'परिवार' },
    { href: '/settings',  icon: Settings,      labelEn: 'Settings',labelHi: 'सेटिंग्स' },
  ]

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 h-[72px] border-t border-white/[0.08] z-50 flex items-center justify-around px-2"
      style={{ background: 'rgba(10,37,64,0.97)', backdropFilter: 'blur(16px)' }}
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
        const Icon = item.icon

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors ${
              item.isPrimary ? '-mt-6' : ''
            }`}
          >
            {item.isPrimary ? (
              <div className="w-12 h-12 rounded-full bg-stripe-purple flex items-center justify-center shadow-[0_4px_16px_rgba(99,91,255,0.4)] mb-1">
                <Icon className="w-6 h-6 text-white" />
              </div>
            ) : (
              <Icon
                className={`w-6 h-6 ${isActive ? 'text-stripe-purple' : 'text-stripe-light-muted'}`}
              />
            )}

            <span
              className={`text-[10px] text-center font-medium ${
                language === 'hindi' ? 'font-hindi' : 'font-body'
              } ${
                item.isPrimary
                  ? 'text-stripe-purple'
                  : isActive
                    ? 'text-stripe-purple'
                    : 'text-stripe-light-muted'
              }`}
            >
              {language === 'hindi' ? item.labelHi : item.labelEn}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
