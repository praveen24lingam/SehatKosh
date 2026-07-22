'use client'

import { useUserStore } from '@/store/useUserStore'
import { useLanguageStore } from '@/store/useLanguageStore'
import { User, Globe } from 'lucide-react'
import { LanguageToggle } from '@/components/shared/LanguageToggle'
import { enterDelay } from '@/lib/motion'

export default function SettingsPage() {
  const { user } = useUserStore()
  const { language } = useLanguageStore()

  return (
    <div style={{ padding: '24px 16px', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px', fontFamily: 'Inter, sans-serif' }}>
      <div className="app-enter" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0F172A', letterSpacing: '-0.5px', margin: 0 }}>
          {language === 'hindi' ? 'सेटिंग्स' : 'Settings'}
        </h1>
      </div>

      {/* Profile Section */}
      <section className="app-enter" style={{
        ...enterDelay(1),
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '24px',
        borderRadius: '24px',
        backgroundColor: 'white',
        border: '1px solid rgba(15,23,42,0.06)',
        boxShadow: '0 8px 24px rgba(15,23,42,0.03)'
      }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '24px',
          fontWeight: '800',
          boxShadow: '0 8px 20px rgba(15,23,42,0.15)',
          flexShrink: 0
        }}>
          {user?.name ? user.name.charAt(0).toUpperCase() : <User size={32} />}
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
            {user?.name || (language === 'hindi' ? 'यूज़र' : 'User')}
          </h2>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        .setting-row { transition: background 0.2s ease; }
        .setting-row:hover { background-color: #F8FAFC; }
      `}} />

      <div className="app-enter" style={{ ...enterDelay(2), display: 'flex', flexDirection: 'column', gap: '24px' }}>

        <section style={{
          backgroundColor: 'white',
          borderRadius: '24px',
          border: '1px solid rgba(15,23,42,0.06)',
          boxShadow: '0 4px 16px rgba(15,23,42,0.02)',
          overflow: 'hidden'
        }}>
          <div className="setting-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ padding: '12px', borderRadius: '14px', background: 'linear-gradient(135deg, rgba(13,148,136,0.1) 0%, rgba(20,184,166,0.05) 100%)', color: '#0D9488' }}>
                <Globe size={22} strokeWidth={2.5} />
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', margin: '0 0 4px 0' }}>
                  {language === 'hindi' ? 'भाषा (Language)' : 'Language'}
                </h3>
                <p style={{ fontSize: '13px', color: '#94A3B8', margin: 0, fontWeight: '500' }}>
                  {language === 'hindi' ? 'ऐप की भाषा चुनें' : 'Choose app language'}
                </p>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </section>
      </div>
    </div>
  )
}
