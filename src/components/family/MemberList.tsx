'use client'

import { FamilyMember } from '@/types/database'
import { MemberCard } from './MemberCard'
import { Plus } from 'lucide-react'
import { useLanguageStore } from '@/store/useLanguageStore'

interface MemberListProps {
  members: FamilyMember[]
  onAddMember: () => void
}

export function MemberList({ members, onAddMember }: MemberListProps) {
  const { language } = useLanguageStore()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {members.map(member => (
        <MemberCard key={member.id} member={member} />
      ))}
      
      <button 
        onClick={onAddMember}
        className="flex flex-col items-center justify-center bg-transparent border-2 border-dashed border-light rounded-xl p-8 hover:border-brand-saffron hover:bg-accent/10 transition-colors min-h-[120px]"
      >
        <div className="w-10 h-10 rounded-full bg-surface-card border border-light flex items-center justify-center text-muted-light mb-3">
          <Plus className="w-5 h-5" />
        </div>
        <span className={`text-primary-light font-medium ${language === 'hindi' ? 'font-hindi' : 'font-body'}`}>
          {language === 'hindi' ? 'नया सदस्य जोड़ें' : 'Add New Member'}
        </span>
      </button>
    </div>
  )
}
