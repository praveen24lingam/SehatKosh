'use client'

import { QuickActions } from '@/components/dashboard/QuickActions'
import { InfoCardGrid, InfoCardItem } from '@/components/dashboard/InfoCardGrid'
import { useUserStore } from '@/store/useUserStore'
import { useLanguageStore } from '@/store/useLanguageStore'
import { Sparkles } from 'lucide-react'
import { enterDelay } from '@/lib/motion'

// Static, verified government health information. Nothing here is fetched.
const SCHEME_CARDS: InfoCardItem[] = [
  {
    title: 'Ayushman Bharat (PM-JAY)',
    description: '₹5 lakh tak ka free cashless ilaaj har parivaar ke liye, sarkari aur private empanelled hospitals mein. Family size ya age ki koi limit nahi. 70+ senior citizens ke liye alag Vay Vandana card.',
    linkLabel: 'Official Website',
    href: 'https://pmjay.gov.in'
  },
  {
    title: 'Jan Aushadhi',
    description: 'Sarkari Jan Aushadhi Kendra par generic dawaiyan branded se kaafi sasti milti hain. Same salt ki dawai kam daam mein.',
    linkLabel: 'Jaankari',
    href: 'https://janaushadhi.gov.in'
  }
]

const HEALTH_INFO_CARDS: InfoCardItem[] = [
  {
    title: 'Health Ministry (MoHFW)',
    description: 'Bharat sarkar ke Swasthya Mantralay ki official health jaankari, advisories aur guidelines.',
    linkLabel: 'Visit',
    href: 'https://www.mohfw.gov.in'
  },
  {
    title: 'National Health Portal',
    description: 'Bimariyon, ilaaj aur healthy jeevan ke baare mein saral, bharosemand jaankari.',
    linkLabel: 'Visit',
    href: 'https://www.nhp.gov.in'
  }
]

export default function DashboardPage() {
  const { user } = useUserStore()
  const { language } = useLanguageStore()

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (language === 'hindi') {
      if (hour < 12) return 'सुप्रभात'
      if (hour < 17) return 'नमस्कार'
      return 'शुभ संध्या'
    } else {
      if (hour < 12) return 'Good Morning'
      if (hour < 17) return 'Good Afternoon'
      return 'Good Evening'
    }
  }

  return (
    <div style={{
      padding: '20px 16px',
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Premium Hero Header */}
      <div className="app-enter" style={{
        display: 'flex', 
        flexDirection: 'column', 
        gap: '16px',
        padding: '20px 24px',
        borderRadius: '20px',
        background: 'linear-gradient(135deg, #0D9488 0%, #14B8A6 100%)',
        boxShadow: '0 12px 32px rgba(13,148,136,0.2)',
        position: 'relative',
        overflow: 'hidden',
        color: 'white'
      }}>
        {/* Subtle decorative elements */}
        <div style={{ position: 'absolute', right: '-5%', top: '-20%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)' }} />
        
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <p style={{ fontSize: '14px', fontWeight: '500', opacity: 0.9, margin: 0, marginBottom: '4px' }}>
              {getGreeting()} {user?.name || ''}
            </p>
            <h1 style={{ fontSize: '24px', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>
              {language === 'hindi' ? 'आपका सेहत साथी' : 'Your Health Assistant'}
            </h1>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.15)', padding: '6px 12px', borderRadius: '999px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <Sparkles size={14} />
            <span style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '0.5px' }}>
              {language === 'hindi' ? 'एआई तैयार है' : 'AI Assistant Ready'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Primary actions */}
      <div className="app-enter" style={enterDelay(1)}>
        <QuickActions />
      </div>

      {/* 3. Government health schemes (static) */}
      <div className="app-enter" style={enterDelay(2)}>
        <InfoCardGrid
          title={language === 'hindi' ? 'Sarkari Swasthya Yojana' : 'Government Health Schemes'}
          cards={SCHEME_CARDS}
        />
      </div>

      {/* 4. Trusted health information (static) */}
      <div className="app-enter" style={enterDelay(3)}>
        <InfoCardGrid
          title={language === 'hindi' ? 'Bharosemand Swasthya Jaankari' : 'Trusted Health Info'}
          cards={HEALTH_INFO_CARDS}
        />
      </div>
    </div>
  )
}
