'use client'

import { useState } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import { useLanguageStore } from '@/store/useLanguageStore'
import { LogOut, User, Globe, Bell, Shield, ChevronRight } from 'lucide-react'
import { LanguageToggle } from '@/components/shared/LanguageToggle'

export default function SettingsPage() {
  const { user, logout } = useAuthStore()
  const { language } = useLanguageStore()
  
  // Dummy toggle states
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [dataSharingEnabled, setDataSharingEnabled] = useState(false)

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className={`text-2xl md:text-3xl font-display font-semibold text-primary-light`}>
          {language === 'hindi' ? 'सेटिंग्स' : 'Settings'}
        </h1>
      </div>

      {/* Profile Section */}
      <section className="bg-surface-card border border-light rounded-xl p-4 md:p-6 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-surface-light border border-light flex items-center justify-center text-muted-light">
          {user?.name ? (
            <span className="font-display text-2xl text-brand-ink">{user.name.charAt(0)}</span>
          ) : (
            <User className="w-8 h-8" />
          )}
        </div>
        <div className="flex-1">
          <h2 className="font-body font-bold text-lg text-primary-light">
            {user?.name || (language === 'hindi' ? 'यूज़र' : 'User')}
          </h2>
          <p className="text-text-secondary font-body text-sm">+91 {user?.phone_number}</p>
        </div>
        <button className="text-accent hover:bg-accent/10 p-2 rounded-lg transition-colors font-medium text-sm">
          {language === 'hindi' ? 'एडिट' : 'Edit'}
        </button>
      </section>

      <div className="space-y-4">
        {/* Language Settings */}
        <section className="bg-surface-card border border-light rounded-xl divide-y divide-border overflow-hidden">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-surface-light rounded-lg text-text-secondary">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className={`font-body font-medium text-primary-light ${language === 'hindi' ? 'font-hindi' : ''}`}>
                  {language === 'hindi' ? 'भाषा (Language)' : 'Language'}
                </h3>
                <p className="text-xs text-muted-light font-body">
                  {language === 'hindi' ? 'ऐप की भाषा चुनें' : 'Choose app language'}
                </p>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </section>

        {/* Preferences */}
        <section className="bg-surface-card border border-light rounded-xl divide-y divide-border overflow-hidden">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-surface-light rounded-lg text-text-secondary">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className={`font-body font-medium text-primary-light ${language === 'hindi' ? 'font-hindi' : ''}`}>
                  {language === 'hindi' ? 'सूचनाएं (Notifications)' : 'Notifications'}
                </h3>
                <p className="text-xs text-muted-light font-body">
                  {language === 'hindi' ? 'दवा के लिए अलर्ट' : 'Alerts for medicines'}
                </p>
              </div>
            </div>
            {/* Custom Toggle Switch */}
            <button 
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notificationsEnabled ? 'bg-accent' : 'bg-border'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-surface-light rounded-lg text-text-secondary">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className={`font-body font-medium text-primary-light ${language === 'hindi' ? 'font-hindi' : ''}`}>
                  {language === 'hindi' ? 'डेटा शेयरिंग' : 'Data Sharing'}
                </h3>
                <p className="text-xs text-muted-light font-body">
                  {language === 'hindi' ? 'डॉक्टर के साथ डेटा शेयर करें' : 'Share data with doctor'}
                </p>
              </div>
            </div>
            <button 
              onClick={() => setDataSharingEnabled(!dataSharingEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                dataSharingEnabled ? 'bg-accent' : 'bg-border'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                dataSharingEnabled ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </section>

        {/* Links */}
        <section className="bg-surface-card border border-light rounded-xl divide-y divide-border overflow-hidden">
          <button className="w-full p-4 flex items-center justify-between hover:bg-surface-light transition-colors text-left">
            <span className={`font-body font-medium text-primary-light ${language === 'hindi' ? 'font-hindi' : ''}`}>
              {language === 'hindi' ? 'गोपनीयता नीति (Privacy Policy)' : 'Privacy Policy'}
            </span>
            <ChevronRight className="w-5 h-5 text-muted-light" />
          </button>
          <button className="w-full p-4 flex items-center justify-between hover:bg-surface-light transition-colors text-left">
            <span className={`font-body font-medium text-primary-light ${language === 'hindi' ? 'font-hindi' : ''}`}>
              {language === 'hindi' ? 'सहायता (Help & Support)' : 'Help & Support'}
            </span>
            <ChevronRight className="w-5 h-5 text-muted-light" />
          </button>
        </section>

        {/* Logout */}
        <button 
          onClick={logout}
          className="w-full mt-6 p-4 rounded-xl border border-danger/20 bg-danger-soft text-danger font-medium flex items-center justify-center gap-2 hover:bg-danger/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className={language === 'hindi' ? 'font-hindi' : 'font-body'}>
            {language === 'hindi' ? 'लॉग आउट' : 'Log Out'}
          </span>
        </button>
      </div>
    </div>
  )
}
