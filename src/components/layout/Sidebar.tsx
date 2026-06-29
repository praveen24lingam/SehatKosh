'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, MessageCircle, Users, Bell, Settings, LogOut } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'
import { useLanguageStore } from '@/store/useLanguageStore'

export function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuthStore()
  const { language } = useLanguageStore()

  const navItems = [
    { href: '/dashboard', icon: Home,          labelEn: 'Home',      labelHi: 'होम' },
    { href: '/chat',      icon: MessageCircle, labelEn: 'AI Chat',   labelHi: 'एआई चैट' },
    { href: '/family',    icon: Users,         labelEn: 'Family',    labelHi: 'परिवार' },
    { href: '/reminders', icon: Bell,          labelEn: 'Reminders', labelHi: 'दवा याद' },
    { href: '/settings',  icon: Settings,      labelEn: 'Settings',  labelHi: 'सेटिंग्स' },
  ]

  return (
    <aside className="hidden md:flex flex-col w-[280px] h-screen bg-stripe-dark border-r border-white/[0.08] sticky top-0">
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="font-hindi font-bold text-2xl text-white">स्वास्थ्य कोष</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-stripe-purple/10 text-stripe-purple font-medium'
                  : 'text-stripe-light-muted hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className={language === 'hindi' ? 'font-hindi' : 'font-body'}>
                {language === 'hindi' ? item.labelHi : item.labelEn}
              </span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/[0.08]">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex flex-col min-w-0">
            <span className="font-body font-medium text-white text-sm truncate">
              {user?.name || (language === 'hindi' ? 'यूज़र' : 'User')}
            </span>
            <span className="font-body text-xs text-stripe-light-muted truncate">
              +91 {user?.phone_number}
            </span>
          </div>
          <button
            onClick={logout}
            className="p-2 text-stripe-light-muted hover:text-white transition-colors shrink-0"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>
  )
}
