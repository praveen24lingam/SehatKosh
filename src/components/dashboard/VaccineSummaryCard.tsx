'use client'

import React, { useEffect, useState } from 'react'
import { Syringe, AlertCircle, CheckCircle2 } from 'lucide-react'
import { useLanguageStore } from '@/store/useLanguageStore'
import { FamilyMember } from '@/types/database'
import { ScheduledVaccine } from '@/types/vaccination'

interface VaccineSummary {
  memberName: string
  nextDue: string
  dueDate: string
  completed: number
  pending: number
}

export function VaccineSummaryCard() {
  const { language } = useLanguageStore()
  const [summary, setSummary] = useState<VaccineSummary | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch('/api/family')
        const data = await res.json()
        const children: FamilyMember[] = data.members?.filter((m: FamilyMember) => m.relation === 'child') || []

        if (children.length > 0) {
          // For simplicity, just show summary for the first child
          const child = children[0]

          const vacRes = await fetch(`/api/vaccinations/${child.id}`)
          const vacData = await vacRes.json()

          const schedule: ScheduledVaccine[] = vacData.schedule || []
          const completed = schedule.filter((v) => v.status === 'done').length
          const pending = schedule.filter((v) => v.status !== 'done')

          // Next due is the first pending one
          const nextDue = pending.length > 0 ? pending[0] : null

          setSummary({
            memberName: child.name,
            nextDue: nextDue ? `${nextDue.vaccineName} (Dose ${nextDue.doseNumber})` : 'All Caught Up',
            dueDate: nextDue ? new Date(nextDue.scheduledDate).toLocaleDateString() : '-',
            completed,
            pending: pending.length
          })
        }
      } catch (error) {
        console.error('Failed to fetch vaccine summary', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchSummary()
  }, [])

  if (loading || !summary) return null

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '24px',
      padding: '24px',
      border: '1px solid rgba(10,37,64,0.06)',
      boxShadow: '0 4px 16px rgba(10,37,64,0.02)',
      fontFamily: 'Inter, sans-serif',
      marginTop: '24px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <div style={{
          width: '42px', height: '42px', borderRadius: '14px',
          background: 'linear-gradient(135deg, rgba(236,72,153,0.1) 0%, rgba(219,39,119,0.05) 100%)',
          color: '#DB2777', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Syringe size={22} strokeWidth={2.5} />
        </div>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0A2540', margin: 0 }}>
            {language === 'hindi' ? 'टीकाकरण ट्रैकर' : 'Vaccination Tracker'}
          </h3>
          <p style={{ fontSize: '13px', color: '#64748B', margin: '2px 0 0 0', fontWeight: '500' }}>
            {summary.memberName}
          </p>
        </div>
      </div>

      <div style={{
        background: '#F8FAFC',
        borderRadius: '16px',
        padding: '16px',
        marginBottom: '16px',
        border: '1px solid rgba(10,37,64,0.04)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ fontSize: '12px', color: '#64748B', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px 0' }}>
              {language === 'hindi' ? 'अगला टीका' : 'Next Due'}
            </p>
            <p style={{ fontSize: '16px', fontWeight: '700', color: '#0A2540', margin: 0 }}>
              {summary.nextDue}
            </p>
            {summary.dueDate !== '-' && (
              <p style={{ fontSize: '13px', color: '#E02424', fontWeight: '600', margin: '4px 0 0 0', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <AlertCircle size={14} /> {summary.dueDate}
              </p>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <div style={{
          flex: 1, background: '#F0FDF4', borderRadius: '12px', padding: '12px',
          border: '1px solid rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center', gap: '8px'
        }}>
          <CheckCircle2 size={18} color="#22C55E" />
          <div>
            <p style={{ fontSize: '15px', fontWeight: '700', color: '#166534', margin: 0 }}>{summary.completed}</p>
            <p style={{ fontSize: '11px', color: '#15803D', fontWeight: '600', margin: 0 }}>{language === 'hindi' ? 'पूरे हुए' : 'Completed'}</p>
          </div>
        </div>
        <div style={{
          flex: 1, background: '#FFFBEB', borderRadius: '12px', padding: '12px',
          border: '1px solid rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', gap: '8px'
        }}>
          <AlertCircle size={18} color="#F59E0B" />
          <div>
            <p style={{ fontSize: '15px', fontWeight: '700', color: '#92400E', margin: 0 }}>{summary.pending}</p>
            <p style={{ fontSize: '11px', color: '#B45309', fontWeight: '600', margin: 0 }}>{language === 'hindi' ? 'बाकी' : 'Pending'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
