'use client'

import { QuickActions } from '@/components/dashboard/QuickActions'
import { InfoCardGrid, InfoCardItem } from '@/components/dashboard/InfoCardGrid'
import { useUserStore } from '@/store/useUserStore'
import { useLanguageStore } from '@/store/useLanguageStore'
import { BookOpenCheck, Landmark, ScanLine, Sparkles } from 'lucide-react'
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
      padding: 'var(--space-4) var(--space-3) var(--space-5)',
      maxWidth: '1120px',
      margin: '0 auto',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }}>
      {/* Header — compact and purposeful: greeting, identity, and the one
          line that tells you what this app is for. The right side carries a
          scan glyph and dot texture so the band reads as designed rather
          than as an empty block of green. */}
      <header className="app-enter" style={{
        padding: 'var(--space-4)',
        borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent-light) 100%)',
        boxShadow: '0 2px 6px rgb(var(--slate-rgb) / 0.06), 0 14px 32px -12px rgb(var(--teal-rgb) / 0.45)',
        position: 'relative',
        overflow: 'hidden',
        color: 'white'
      }}>
        {/* Decorative layers, all pointer-inert. */}
        <div aria-hidden style={{ position: 'absolute', right: '-4%', top: '-45%', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.5,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.22) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
          maskImage: 'linear-gradient(to left, #000 0%, transparent 62%)',
          WebkitMaskImage: 'linear-gradient(to left, #000 0%, transparent 62%)'
        }} />
        <ScanLine
          aria-hidden
          size={148}
          strokeWidth={1.1}
          style={{ position: 'absolute', right: '24px', top: '50%', transform: 'translateY(-50%) rotate(-8deg)', opacity: 0.13, pointerEvents: 'none' }}
        />

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: '13px', fontWeight: 500, opacity: 0.9, margin: '0 0 var(--space-1)', letterSpacing: '-0.005em' }}>
              {getGreeting()} {user?.name || ''}
            </p>
            <h1 className="t-page-title" style={{ margin: 0, color: 'inherit' }}>
              {language === 'hindi' ? 'आपका सेहत साथी' : 'Your Health Assistant'}
            </h1>
            <p style={{ fontSize: '13.5px', fontWeight: 500, opacity: 0.9, margin: 'var(--space-2) 0 0', lineHeight: 1.5, maxWidth: '38ch' }}>
              {language === 'hindi'
                ? 'Report scan karein ya sehat ka sawaal poochein'
                : 'Scan a report or ask a health question'}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.16)', padding: '6px 12px', borderRadius: '999px', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.24)', flexShrink: 0 }}>
            <Sparkles size={13} />
            <span style={{ fontSize: '11.5px', fontWeight: 700, letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
              {language === 'hindi' ? 'एआई तैयार है' : 'AI Assistant Ready'}
            </span>
          </div>
        </div>
      </header>

      {/* 2. Primary actions */}
      <div className="app-enter" style={enterDelay(1)}>
        <QuickActions />
      </div>

      {/* 3. Government health schemes (static)
          Extra top margin marks the step down from primary actions to
          reference material. */}
      <div className="app-enter" style={{ ...enterDelay(2), marginTop: 'var(--space-2)' }}>
        <InfoCardGrid
          title={language === 'hindi' ? 'Sarkari Swasthya Yojana' : 'Government Health Schemes'}
          icon={Landmark}
          cards={SCHEME_CARDS}
        />
      </div>

      {/* 4. Trusted health information (static) */}
      <div className="app-enter" style={enterDelay(3)}>
        <InfoCardGrid
          title={language === 'hindi' ? 'Bharosemand Swasthya Jaankari' : 'Trusted Health Info'}
          icon={BookOpenCheck}
          cards={HEALTH_INFO_CARDS}
        />
      </div>
    </div>
  )
}
