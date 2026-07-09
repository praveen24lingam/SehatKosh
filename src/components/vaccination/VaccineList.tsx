'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { VaccineItem } from './VaccineItem'
import { useLanguageStore } from '@/store/useLanguageStore'
import { ScheduledVaccine } from '@/types/vaccination'

interface VaccineListProps {
  schedule: ScheduledVaccine[]
  memberId: string
  onUpdate: () => void
}

export function VaccineList({ schedule, memberId, onUpdate }: VaccineListProps) {
  const { language } = useLanguageStore()
  const [marking, setMarking] = useState<string | null>(null)

  const handleMarkDone = async (vaccine: ScheduledVaccine) => {
    const key = `${vaccine.vaccineName}-${vaccine.doseNumber}`
    setMarking(key)
    
    try {
      const res = await fetch('/api/vaccinations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          memberId,
          vaccineName: vaccine.vaccineName,
          doseNumber: vaccine.doseNumber,
          givenDate: new Date().toISOString().split('T')[0]
        })
      })
      
      const data = await res.json()
      if (data.vaccination) {
        onUpdate()
      }
    } catch (error) {
      console.error(error)
      toast.error(language === 'hindi' ? 'अपडेट करने में विफल' : 'Failed to update')
    } finally {
      setMarking(null)
    }
  }

  // Group by age bracket
  const grouped = schedule.reduce<Record<string, ScheduledVaccine[]>>((acc, item) => {
    const group = item.description
    if (!acc[group]) acc[group] = []
    acc[group].push(item)
    return acc
  }, {})

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([group, vaccines]) => {
        const vaxList = vaccines;
        return (
        <div key={group} className="border border-light rounded-xl overflow-hidden bg-surface-card">
          <div className={`bg-surface-light px-4 py-2 border-b border-light text-sm font-semibold text-text-secondary ${language === 'hindi' ? 'font-hindi' : 'font-body'}`}>
            {group}
          </div>
          <div className="divide-y divide-border">
            {vaxList.map((vaccine, idx) => (
              <div key={idx} className="relative">
                {marking === `${vaccine.vaccineName}-${vaccine.doseNumber}` && (
                  <div className="absolute inset-0 bg-surface-card/50 backdrop-blur-[1px] z-10 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-brand-saffron border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                <VaccineItem 
                  vaccine={vaccine} 
                  onMarkDone={handleMarkDone} 
                />
              </div>
            ))}
          </div>
        </div>
        );
      })}
    </div>
  )
}
