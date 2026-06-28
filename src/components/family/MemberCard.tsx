'use client'

import Link from 'next/link'
import { User, Droplets, Calendar } from 'lucide-react'
import { FamilyMember } from '@/types/database'
import { useLanguageStore } from '@/store/useLanguageStore'

interface MemberCardProps {
  member: FamilyMember
}

export function MemberCard({ member }: MemberCardProps) {
  const { language } = useLanguageStore()

  const getRelationText = (relation: string) => {
    if (language === 'english') return relation.charAt(0).toUpperCase() + relation.slice(1)
    
    const relationMap: Record<string, string> = {
      'self': 'स्वयं',
      'father': 'पिता',
      'mother': 'माता',
      'child': 'बच्चा',
      'spouse': 'जीवनसाथी',
      'grandparent': 'दादा/दादी',
      'other': 'अन्य'
    }
    return relationMap[relation] || relation
  }

  // Calculate age if dob is present
  const getAge = (dob: string | null) => {
    if (!dob) return null
    const birthDate = new Date(dob)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const age = getAge(member.dob)

  return (
    <Link 
      href={`/family/${member.id}`}
      className="flex flex-col bg-surface-card border border-light rounded-xl p-4 hover:border-brand-saffron transition-colors"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-surface-light border border-light flex items-center justify-center text-brand-ink flex-shrink-0">
          <span className="font-display text-xl">{member.name.charAt(0).toUpperCase()}</span>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-body font-bold text-primary-light text-lg truncate">
            {member.name}
          </h3>
          <p className={`text-sm text-text-secondary ${language === 'hindi' ? 'font-hindi' : 'font-body'}`}>
            {getRelationText(member.relation)}
          </p>
        </div>
      </div>
      
      <div className="mt-4 flex gap-4 text-xs font-body text-text-secondary">
        {age !== null && (
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {age} {language === 'hindi' ? 'साल' : 'Years'}
          </div>
        )}
        
        {member.blood_group && (
          <div className="flex items-center gap-1.5">
            <Droplets className="w-3.5 h-3.5 text-danger" />
            <span className="font-medium text-primary-light">{member.blood_group}</span>
          </div>
        )}
      </div>
    </Link>
  )
}
