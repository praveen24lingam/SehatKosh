'use client'

import { useState } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import { useLanguageStore } from '@/store/useLanguageStore'
import { LogOut, User, Globe, Bell, Shield } from 'lucide-react'
import { useSettingsStore } from '@/store/useSettingsStore'
import { LanguageToggle } from '@/components/shared/LanguageToggle'

export default function SettingsPage() {
  const { user, logout } = useAuthStore()
  const { language } = useLanguageStore()
  
  const { notificationsEnabled, dataSharingEnabled, setNotificationsEnabled, setDataSharingEnabled } = useSettingsStore()

  return (
    <div style={{ padding: '24px 16px', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px', fontFamily: 'Inter, sans-serif' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0A2540', letterSpacing: '-0.5px', margin: 0 }}>
          {language === 'hindi' ? 'सेटिंग्स' : 'Settings'}
        </h1>
      </div>

      {/* Profile Section */}
      <section style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '24px',
        borderRadius: '24px',
        backgroundColor: 'white',
        border: '1px solid rgba(10,37,64,0.06)',
        boxShadow: '0 8px 24px rgba(10,37,64,0.03)'
      }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #0A2540 0%, #162D4A 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '24px',
          fontWeight: '800',
          boxShadow: '0 8px 20px rgba(10,37,64,0.15)',
          flexShrink: 0
        }}>
          {user?.name ? user.name.charAt(0).toUpperCase() : <User size={32} />}
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0A2540', margin: '0 0 4px 0' }}>
            {user?.name || (language === 'hindi' ? 'यूज़र' : 'User')}
          </h2>
          <p style={{ fontSize: '14px', fontWeight: '500', color: '#8898AA', margin: 0 }}>
            +91 {user?.phone_number}
          </p>
        </div>
        <button style={{
          padding: '10px 20px',
          backgroundColor: 'rgba(99,91,255,0.1)',
          color: '#635BFF',
          border: 'none',
          borderRadius: '12px',
          fontWeight: '700',
          fontSize: '14px',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
        onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#635BFF'; e.currentTarget.style.color = 'white' }}
        onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgba(99,91,255,0.1)'; e.currentTarget.style.color = '#635BFF' }}
        >
          {language === 'hindi' ? 'एडिट' : 'Edit'}
        </button>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        .setting-row { transition: background 0.2s ease; }
        .setting-row:hover { background-color: #F8FAFC; }
      `}} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Settings Group 1 */}
        <section style={{
          backgroundColor: 'white',
          borderRadius: '24px',
          border: '1px solid rgba(10,37,64,0.06)',
          boxShadow: '0 4px 16px rgba(10,37,64,0.02)',
          overflow: 'hidden'
        }}>
          <div className="setting-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid rgba(10,37,64,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ padding: '12px', borderRadius: '14px', background: 'linear-gradient(135deg, rgba(99,91,255,0.1) 0%, rgba(0,212,255,0.05) 100%)', color: '#635BFF' }}>
                <Globe size={22} strokeWidth={2.5} />
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0A2540', margin: '0 0 4px 0' }}>
                  {language === 'hindi' ? 'भाषा (Language)' : 'Language'}
                </h3>
                <p style={{ fontSize: '13px', color: '#8898AA', margin: 0, fontWeight: '500' }}>
                  {language === 'hindi' ? 'ऐप की भाषा चुनें' : 'Choose app language'}
                </p>
              </div>
            </div>
            <LanguageToggle />
          </div>

          <div className="setting-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid rgba(10,37,64,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ padding: '12px', borderRadius: '14px', background: 'linear-gradient(135deg, rgba(255,153,0,0.1) 0%, rgba(255,153,0,0.05) 100%)', color: '#FF9900' }}>
                <Bell size={22} strokeWidth={2.5} />
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0A2540', margin: '0 0 4px 0' }}>
                  {language === 'hindi' ? 'सूचनाएं (Notifications)' : 'Notifications'}
                </h3>
                <p style={{ fontSize: '13px', color: '#8898AA', margin: 0, fontWeight: '500' }}>
                  {language === 'hindi' ? 'दवा के लिए अलर्ट' : 'Alerts for medicines'}
                </p>
              </div>
            </div>
            <button 
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              style={{
                width: '48px', height: '26px', borderRadius: '999px', border: 'none',
                background: notificationsEnabled ? 'linear-gradient(135deg, #7A73FF 0%, #635BFF 100%)' : '#E6EBF1',
                position: 'relative', cursor: 'pointer', transition: 'all 0.3s ease'
              }}
            >
              <div style={{
                width: '20px', height: '20px', borderRadius: '50%', background: 'white',
                position: 'absolute', top: '3px', left: notificationsEnabled ? '25px' : '3px',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }} />
            </button>
          </div>

          <div className="setting-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ padding: '12px', borderRadius: '14px', background: 'linear-gradient(135deg, rgba(0,217,36,0.1) 0%, rgba(0,217,36,0.05) 100%)', color: '#00D924' }}>
                <Shield size={22} strokeWidth={2.5} />
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0A2540', margin: '0 0 4px 0' }}>
                  {language === 'hindi' ? 'डेटा शेयरिंग' : 'Data Sharing'}
                </h3>
                <p style={{ fontSize: '13px', color: '#8898AA', margin: 0, fontWeight: '500' }}>
                  {language === 'hindi' ? 'डॉक्टर के साथ डेटा शेयर करें' : 'Share data with doctor'}
                </p>
              </div>
            </div>
            <button 
              onClick={() => setDataSharingEnabled(!dataSharingEnabled)}
              style={{
                width: '48px', height: '26px', borderRadius: '999px', border: 'none',
                background: dataSharingEnabled ? 'linear-gradient(135deg, #00D924 0%, #00B31E 100%)' : '#E6EBF1',
                position: 'relative', cursor: 'pointer', transition: 'all 0.3s ease'
              }}
            >
              <div style={{
                width: '20px', height: '20px', borderRadius: '50%', background: 'white',
                position: 'absolute', top: '3px', left: dataSharingEnabled ? '25px' : '3px',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }} />
            </button>
          </div>
        </section>

        {/* Logout */}
        <button 
          onClick={logout}
          style={{
            marginTop: '16px',
            padding: '16px',
            borderRadius: '20px',
            border: '1px solid rgba(224,36,36,0.15)',
            backgroundColor: '#FFF5F5',
            color: '#E02424',
            fontWeight: '700',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontFamily: 'Inter, sans-serif'
          }}
          onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#FFE5E5'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#FFF5F5'; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          <LogOut size={20} strokeWidth={2.5} />
          {language === 'hindi' ? 'लॉग आउट' : 'Log Out'}
        </button>
      </div>
    </div>
  )
}
