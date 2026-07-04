'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, MessageCircle, Users, Bell, Settings, LogOut, Activity } from 'lucide-react'
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
    <aside className="desktop-flex" style={{
      width: '280px',
      height: '100vh',
      backgroundColor: '#FAFCFF',
      borderRight: '1px solid rgba(10,37,64,0.05)',
      position: 'sticky',
      top: 0,
      flexDirection: 'column',
      fontFamily: 'Inter, sans-serif'
    }}>
      <style dangerouslySetInnerHTML={{__html: `
        .sidebar-link {
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .sidebar-link:hover:not(.active) {
          background-color: #F4F4FF !important;
          color: #635BFF !important;
          transform: translateX(4px);
        }
        .logout-btn {
          transition: all 0.2s ease;
        }
        .logout-btn:hover {
          background-color: #FFF0F0 !important;
          color: #E02424 !important;
        }
      `}} />

      {/* Logo container */}
      <div style={{ padding: '28px 24px', borderBottom: '1px solid rgba(10,37,64,0.04)' }}>
        <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #7A73FF 0%, #00D4FF 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 4px 12px rgba(99,91,255,0.25)'
          }}>
            <Activity size={20} />
          </div>
          <span style={{ fontWeight: '800', fontSize: '22px', color: '#0A2540', letterSpacing: '-1.2px' }}>
            SehatKosh
          </span>
        </Link>
      </div>

      {/* Navigation links */}
      <nav style={{
        flex: 1,
        padding: '28px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
      }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-link ${isActive ? 'active' : ''}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '12px',
                textDecoration: 'none',
                cursor: 'pointer',
                backgroundColor: isActive ? '#635BFF' : 'transparent',
                background: isActive ? 'linear-gradient(135deg, #7A73FF 0%, #635BFF 100%)' : 'transparent',
                color: isActive ? 'white' : '#425466',
                fontWeight: isActive ? '700' : '500',
                boxShadow: isActive ? '0 8px 24px rgba(99,91,255,0.22)' : 'none'
              }}
            >
              <Icon size={20} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '15px' }} className={language === 'hindi' ? 'font-hindi' : ''}>
                {language === 'hindi' ? item.labelHi : item.labelEn}
              </span>
            </Link>
          )
        })}
      </nav>

      {/* User profile section */}
      <div style={{ padding: '16px', borderTop: '1px solid rgba(10,37,64,0.04)', backgroundColor: 'white' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px',
          borderRadius: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
            {/* Ring around avatar */}
            <div style={{
              border: '2px solid rgba(99,91,255,0.15)',
              padding: '2px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #7A73FF 0%, #00D4FF 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '700',
                fontSize: '14px',
                boxShadow: '0 2px 6px rgba(99,91,255,0.1)'
              }}>
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <span style={{ fontWeight: '700', color: '#0A2540', fontSize: '14px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user?.name || (language === 'hindi' ? 'यूज़र' : 'User')}
              </span>
              <span style={{ fontWeight: '500', color: '#8898AA', fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: '2px' }}>
                {user?.phone_number ? `+91 ${user.phone_number}` : (language === 'hindi' ? 'कोई नंबर नहीं' : 'No phone')}
              </span>
            </div>
          </div>
          <button
            onClick={logout}
            className="logout-btn"
            style={{
              padding: '8px',
              border: 'none',
              background: 'transparent',
              borderRadius: '8px',
              cursor: 'pointer',
              color: '#8898AA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  )
}
