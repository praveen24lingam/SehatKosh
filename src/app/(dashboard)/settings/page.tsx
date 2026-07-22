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
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--foreground)', letterSpacing: '-0.5px', margin: 0 }}>
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
        background: 'var(--surface-gradient)',
        border: '1px solid var(--border-strong)',
        boxShadow: 'var(--shadow-card)'
      }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, var(--foreground) 0%, var(--slate-800) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '24px',
          fontWeight: '800',
          boxShadow: '0 8px 20px rgb(var(--slate-rgb) / 0.15)',
          flexShrink: 0
        }}>
          {user?.name ? user.name.charAt(0).toUpperCase() : <User size={32} />}
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--foreground)', margin: 0 }}>
            {user?.name || (language === 'hindi' ? 'यूज़र' : 'User')}
          </h2>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        .setting-row { transition: background 0.2s ease; }
        .setting-row:hover { background-color: var(--background); }
      `}} />

      <div className="app-enter" style={{ ...enterDelay(2), display: 'flex', flexDirection: 'column', gap: '24px' }}>

        <section style={{
          background: 'var(--surface-gradient)',
          borderRadius: '24px',
          border: '1px solid var(--border-strong)',
          boxShadow: 'var(--shadow-card)',
          overflow: 'hidden'
        }}>
          <div className="setting-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ padding: '12px', borderRadius: '14px', background: 'linear-gradient(135deg, rgb(var(--teal-rgb) / 0.1) 0%, rgb(var(--teal-light-rgb) / 0.05) 100%)', color: 'var(--primary)' }}>
                <Globe size={22} strokeWidth={2.5} />
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--foreground)', margin: '0 0 4px 0' }}>
                  {language === 'hindi' ? 'भाषा (Language)' : 'Language'}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--icon-muted)', margin: 0, fontWeight: '500' }}>
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
