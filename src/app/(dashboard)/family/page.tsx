'use client'

import { useState, useEffect } from 'react'
import { MemberList } from '@/components/family/MemberList'
import { AddMemberForm } from '@/components/family/AddMemberForm'
import { EmptyState } from '@/components/shared/EmptyState'
import { Users } from 'lucide-react'
import { FamilyMember } from '@/types/database'
import { useLanguageStore } from '@/store/useLanguageStore'

export default function FamilyPage() {
  const { language } = useLanguageStore()
  const [members, setMembers] = useState<FamilyMember[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch('/api/family')
        const data = await res.json()
        if (data.members) setMembers(data.members)
      } catch (error) {
        console.error('Failed to fetch members:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchMembers()
  }, [])

  const handleAddSuccess = (newMember: FamilyMember) => {
    setMembers([...members, newMember])
    setShowAddForm(false)
  }

  if (loading) {
    return (
      <div className="p-4 md:p-8 max-w-5xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-surface-light rounded w-1/4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1,2,3].map(i => <div key={i} className="h-32 bg-surface-light rounded-xl"></div>)}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl md:text-3xl font-display font-semibold text-primary-light`}>
          {language === 'hindi' ? 'परिवार' : 'Family Vault'}
        </h1>
      </div>

      {showAddForm ? (
        <div className="max-w-2xl mx-auto">
          <AddMemberForm 
            onSuccess={handleAddSuccess}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      ) : (
        <>
          {members.length === 0 ? (
            <div className="max-w-2xl mx-auto pt-8">
              <EmptyState 
                icon={Users}
                title={language === 'hindi' ? 'कोई सदस्य नहीं' : 'No Family Members'}
                description={language === 'hindi' 
                  ? 'अपने परिवार के सदस्यों को जोड़ें ताकि आप उनका स्वास्थ्य रिकॉर्ड रख सकें।' 
                  : 'Add family members to keep track of their health records.'}
                action={
                  <button 
                    onClick={() => setShowAddForm(true)}
                    className="mt-6 px-6 py-2.5 bg-accent text-white rounded-lg font-medium hover:bg-accent/90"
                  >
                    {language === 'hindi' ? 'नया सदस्य जोड़ें' : 'Add New Member'}
                  </button>
                }
              />
            </div>
          ) : (
            <MemberList members={members} onAddMember={() => setShowAddForm(true)} />
          )}
        </>
      )}
    </div>
  )
}
