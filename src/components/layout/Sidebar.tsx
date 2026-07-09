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
      borderRight: '1px solid rgba(10,37,64,0.06)',
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
          color: #635BFF !important;
          transform: translateX(4px);
          box-shadow: 0 4px 12px rgba(10,37,64,0.04);
        }
        .logout-btn {
          transition: all 0.2s ease;
        }
        .logout-btn:hover {
          background-color: #FFF0F0 !important;
          color: #E02424 !important;
          transform: scale(1.05);
        }
        .profile-card {
          transition: transform 0.2s;
        }
        .profile-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(10,37,64,0.06) !important;
        }
      `}} />

      {/* Logo container */}
      <div style={{ padding: '32px 24px 20px', borderBottom: 'none' }}>
        <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #7A73FF 0%, #00D4FF 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 8px 20px rgba(99,91,255,0.35)'
          }}>
            <Activity size={22} strokeWidth={2.5} />
          </div>
          <span style={{ fontWeight: '800', fontSize: '24px', color: '#0A2540', letterSpacing: '-1px' }}>
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
                gap: '14px',
                padding: '12px 18px',
                borderRadius: '16px',
                textDecoration: 'none',
                cursor: 'pointer',
                backgroundColor: isActive ? 'white' : 'transparent',
                color: isActive ? '#635BFF' : '#425466',
                fontWeight: isActive ? '700' : '500',
                border: isActive ? '1px solid rgba(99,91,255,0.1)' : '1px solid transparent',
                boxShadow: isActive ? '0 8px 24px rgba(99,91,255,0.12)' : 'none',
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
                  backgroundColor: '#635BFF',
                  borderRadius: '0 4px 4px 0'
                }} />
              )}
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} style={{ flexShrink: 0, color: isActive ? '#635BFF' : '#8898AA' }} />
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
            justifyContent: 'space-between',
            padding: '12px',
            borderRadius: '20px',
            backgroundColor: 'white',
            border: '1px solid rgba(10,37,64,0.06)',
            boxShadow: '0 4px 12px rgba(10,37,64,0.03)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
            {/* Avatar */}
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #0A2540 0%, #162D4A 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '700',
              fontSize: '16px',
              boxShadow: '0 4px 10px rgba(10,37,64,0.15)',
              flexShrink: 0
            }}>
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <span style={{ fontWeight: '700', color: '#0A2540', fontSize: '14px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user?.name || (language === 'hindi' ? 'यूज़र' : 'User')}
              </span>
              <span style={{ fontWeight: '500', color: '#8898AA', fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user?.phone_number ? `+91 ${user.phone_number}` : (language === 'hindi' ? 'कोई नंबर नहीं' : 'No phone')}
              </span>
            </div>
          </div>
          <button
            onClick={logout}
            className="logout-btn"
            style={{
              width: '36px',
              height: '36px',
              border: 'none',
              backgroundColor: '#FAFCFF',
              borderRadius: '10px',
              cursor: 'pointer',
              color: '#8898AA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
            title="Logout"
          >
            <LogOut size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </aside>
  )
}
