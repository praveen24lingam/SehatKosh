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
    <aside className="desktop-flex" style={{
      width: '280px',
      height: '100vh',
      backgroundColor: '#F8FAFC',
      borderRight: '1px solid rgba(15,23,42,0.06)',
      position: 'sticky',
      top: 0,
      flexDirection: 'column',
      fontFamily: 'Inter, sans-serif'
    }}>
      <style dangerouslySetInnerHTML={{__html: `
        .sidebar-link {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .sidebar-link:hover:not(.active) {
          background-color: white !important;
          color: #0D9488 !important;
          transform: translateX(2px);
          box-shadow: 0 4px 12px rgba(15,23,42,0.04);
        }
        .profile-card {
          transition: transform 0.2s;
        }
        .profile-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(15,23,42,0.06) !important;
        }
      `}} />

      {/* Logo container */}
      <div style={{ padding: '32px 24px 20px', borderBottom: 'none' }}>
        <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 8px 20px rgba(13,148,136,0.35)'
          }}>
            <Activity size={22} strokeWidth={2.5} />
          </div>
          <span style={{ fontWeight: '800', fontSize: '24px', color: '#0F172A', letterSpacing: '-1px' }}>
            SehatKosh
          </span>
        </Link>
      </div>

      {/* Navigation links */}
      <nav style={{
        flex: 1,
        padding: '20px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
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
                backgroundColor: isActive ? 'white' : 'transparent',
                color: isActive ? '#0D9488' : '#475569',
                fontWeight: isActive ? '700' : '500',
                border: isActive ? '1px solid rgba(13,148,136,0.1)' : '1px solid transparent',
                boxShadow: isActive ? '0 6px 16px rgba(13,148,136,0.10)' : 'none',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {isActive && (
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '4px',
                  height: '60%',
                  backgroundColor: '#0D9488',
                  borderRadius: '0 4px 4px 0'
                }} />
              )}
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} style={{ flexShrink: 0, color: isActive ? '#0D9488' : '#94A3B8' }} />
              <span style={{ fontSize: '15px' }} className={language === 'hindi' ? 'font-hindi' : ''}>
                {language === 'hindi' ? item.labelHi : item.labelEn}
              </span>
            </Link>
          )
        })}
      </nav>

      {/* User profile section */}
      <div style={{ padding: '24px 16px', background: 'transparent' }}>
        <div 
          className="profile-card"
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '12px',
            borderRadius: '16px',
            backgroundColor: 'white',
            border: '1px solid rgba(15,23,42,0.06)',
            boxShadow: '0 4px 12px rgba(15,23,42,0.03)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
            {/* Avatar */}
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '700',
              fontSize: '16px',
              boxShadow: '0 4px 10px rgba(15,23,42,0.15)',
              flexShrink: 0
            }}>
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <span style={{ fontWeight: '700', color: '#0F172A', fontSize: '14px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user?.name || (language === 'hindi' ? 'यूज़र' : 'User')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
