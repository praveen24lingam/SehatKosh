'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { FamilyMember, HealthRecord } from '@/types/database'
import { useLanguageStore } from '@/store/useLanguageStore'
import { HealthCard } from '@/components/family/HealthCard'
import { HealthRecordList } from '@/components/family/HealthRecordList'

export default function MemberDetailPage() {
  const { memberId } = useParams()
  const router = useRouter()
  const { language } = useLanguageStore()
  
  const [member, setMember] = useState<FamilyMember | null>(null)
  const [records, setRecords] = useState<HealthRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const res = await fetch(`/api/family/${memberId}`)
        const data = await res.json()
        if (data.member) {
          setMember(data.member)
        }
        
        // Mock health records since we haven't built the Records API yet
        setRecords([
          {
            id: '1',
            member_id: memberId as string,
            record_type: 'blood_report',
            title: 'Complete Blood Count (CBC)',
            date: new Date().toISOString(),
            image_url: null,
            ai_summary: null,
            raw_data: null,
            created_at: new Date().toISOString()
          }
        ])
      } catch (error) {
        console.error('Failed to fetch member details:', error)
      } finally {
        setLoading(false)
      }
    }
    
    if (memberId) {
      fetchMemberData()
    }
  }, [memberId])

  const handleDelete = async () => {
    if (!window.confirm(language === 'hindi' ? 'क्या आप वाकई इस सदस्य को हटाना चाहते हैं?' : 'Are you sure you want to delete this member?')) {
      return
    }
    
    try {
      const res = await fetch(`/api/family/${memberId}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        router.push('/family')
      }
    } catch (error) {
      console.error(error)
      alert('Failed to delete member')
    }
  }

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>
  }

  if (!member) {
    return <div className="p-8 text-center">Member not found</div>
  }

  // App URL is needed for the QR code to point to the public profile
  const appUrl = typeof window !== 'undefined' ? window.location.origin : ''
  const publicProfileUrl = `${appUrl}/health-card/${member.id}`

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/family" className="p-2 -ml-2 rounded-full hover:bg-surface-light text-text-secondary">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-display font-semibold text-primary-light">
            {member.name}
          </h1>
        </div>
        
        <div className="flex gap-2">
          <button className="p-2 rounded-lg bg-surface-light text-text-secondary hover:text-accent transition-colors">
            <Edit className="w-5 h-5" />
          </button>
          <button 
            onClick={handleDelete}
            className="p-2 rounded-lg bg-danger-soft text-danger hover:bg-danger/20 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Health Card */}
        <div className="lg:col-span-4 lg:col-start-9 order-first lg:order-last space-y-4">
          <h3 className={`text-lg text-primary-light ${language === 'hindi' ? 'font-hindi font-bold' : 'font-body font-bold'}`}>
            {language === 'hindi' ? 'डिजिटल स्वास्थ्य कार्ड' : 'Digital Health Card'}
          </h3>
          <HealthCard member={member} qrUrl={publicProfileUrl} />
          
          <button className="w-full py-2.5 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 shadow-sm transition-colors">
            {language === 'hindi' ? 'कार्ड डाउनलोड करें' : 'Download Card'}
          </button>
        </div>

        {/* Right Column: Records */}
        <div className="lg:col-span-8 lg:col-start-1 order-last lg:order-first space-y-6">
          <div className="flex items-center justify-between">
            <h3 className={`text-lg text-primary-light ${language === 'hindi' ? 'font-hindi font-bold' : 'font-body font-bold'}`}>
              {language === 'hindi' ? 'स्वास्थ्य रिकॉर्ड' : 'Health Records'}
            </h3>
            <button className="text-sm font-medium text-accent hover:underline">
              {language === 'hindi' ? '+ नया जोड़ें' : '+ Add New'}
            </button>
          </div>
          
          <HealthRecordList records={records} />
        </div>
      </div>
    </div>
  )
}
