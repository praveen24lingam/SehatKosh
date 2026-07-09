'use client'

// Currently unused — intended for future /health-card route
import { FamilyMember } from '@/types/database'
import { useLanguageStore } from '@/store/useLanguageStore'
import { QRCodeDisplay } from './QRCodeDisplay'

interface HealthCardProps {
  member: FamilyMember
  qrUrl?: string
}

export function HealthCard({ member, qrUrl }: HealthCardProps) {
  const { language } = useLanguageStore()
  
  // Date of birth formatted
  const dob = member.dob ? new Date(member.dob).toLocaleDateString(language === 'hindi' ? 'hi-IN' : 'en-IN') : 'N/A'

  return (
    <div 
      className="w-full max-w-sm mx-auto rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(45,31,14,0.12)] border border-light"
      style={{ background: 'var(--surface-paper)', color: 'var(--brand-ink)' }}
    >
      {/* Top Strip */}
      <div 
        className="h-16 px-4 flex items-center justify-between"
        style={{ background: 'linear-gradient(135deg, #E05C00 0%, #2D1F0E 100%)' }}
      >
        <div className="flex flex-col">
          <span className="text-white/80 text-xs font-body uppercase tracking-wider">SehatKosh</span>
          <span className="text-white font-hindi font-bold">स्वास्थ्य कार्ड</span>
        </div>
        {member.blood_group && (
          <div 
            className="flex items-center justify-center shadow-sm"
            style={{ 
              background: '#DC2626', 
              color: 'white', 
              borderRadius: '50%', 
              width: '36px', 
              height: '36px',
              fontFamily: 'Instrument Serif, serif',
              fontSize: '14px'
            }}
          >
            {member.blood_group}
          </div>
        )}
      </div>

      <div className="p-5 flex gap-4">
        {/* Info Area */}
        <div className="flex-1 space-y-0">
          <div className="pb-[10px]" style={{ borderBottom: '1px solid rgba(45, 31, 14, 0.12)' }}>
            <p className="text-[10px] text-brand-ink/60 uppercase font-body mb-0.5">Name / नाम</p>
            <p className="text-xl font-display leading-none">{member.name}</p>
          </div>
          
          <div className="py-[10px]" style={{ borderBottom: '1px solid rgba(45, 31, 14, 0.12)' }}>
            <p className="text-[10px] text-brand-ink/60 uppercase font-body mb-0.5">DOB / जन्म तिथि</p>
            <p className="text-[13px] font-body font-medium">{dob}</p>
          </div>
          
          <div className="py-[10px]" style={{ borderBottom: '1px solid rgba(45, 31, 14, 0.12)' }}>
            <p className="text-[10px] text-brand-ink/60 uppercase font-body mb-0.5">Emergency / आपातकालीन</p>
            <p className="text-[13px] font-body font-medium">{member.emergency_contact || 'N/A'}</p>
          </div>

          <div className="pt-[10px]">
            <p className="text-[10px] text-brand-ink/60 uppercase font-body mb-0.5">Allergies / एलर्जी</p>
            <p className="text-[13px] font-body font-medium text-danger">
              {member.allergies && member.allergies.length > 0 ? member.allergies.join(', ') : 'None'}
            </p>
          </div>
        </div>

        {/* QR Code Area */}
        {qrUrl && (
          <div className="w-24 flex-shrink-0 flex flex-col items-center justify-start pt-2">
            <div className="bg-white p-1.5 rounded-lg border border-light/50 shadow-sm">
              <QRCodeDisplay url={qrUrl} size={80} />
            </div>
            <p className="text-[8px] text-center mt-2 text-brand-ink/60 font-body leading-tight">
              Scan for full<br/>medical history
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
