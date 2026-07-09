'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { FamilyMember, HealthRecord } from '@/types/database'
import { useLanguageStore } from '@/store/useLanguageStore'
import { HealthRecordList } from '@/components/family/HealthRecordList'
import { toast } from 'sonner'

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
        const recordsRes = await fetch(`/api/records?memberId=${memberId}`)
        const recordsData = await recordsRes.json()
        if (recordsData.records) {
          setRecords(recordsData.records)
        }
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
      toast.error('Failed to delete member')
    }
  }

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>
  }

  if (!member) {
    return <div className="p-8 text-center">Member not found</div>
  }

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
        {/* Right Column: Records */}
        <div className="lg:col-span-8 lg:col-start-1 order-last lg:order-first space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`text-lg text-primary-light ${language === 'hindi' ? 'font-hindi font-bold' : 'font-body font-bold'}`}>
                {language === 'hindi' ? 'स्वास्थ्य रिकॉर्ड' : 'Health Records'}
              </h3>
              <p className="text-xs text-text-secondary mt-1">
                Note: Supabase Storage bucket &quot;health-records&quot; must be created manually to support uploads.
              </p>
            </div>
            <label className="text-sm font-medium text-accent hover:underline cursor-pointer">
              {language === 'hindi' ? '+ नया जोड़ें' : '+ Add New'}
              <input 
                type="file" 
                accept="image/*,application/pdf"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  const reader = new FileReader();
                  reader.onload = async (event) => {
                    const base64 = event.target?.result;
                    if (typeof base64 !== 'string') return;

                    try {
                      const res = await fetch('/api/records', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          memberId: memberId,
                          recordType: 'other',
                          title: file.name,
                          imageBase64: base64,
                          date: new Date().toISOString().split('T')[0]
                        })
                      });
                      
                      const data = await res.json();
                      if (data.record) {
                        setRecords(prev => [data.record, ...prev]);
                      } else {
                        console.error('Failed to upload record:', data.error);
                        toast.error('Failed to upload record');
                      }
                    } catch (err) {
                      console.error('Upload error:', err);
                      toast.error('Error uploading record');
                    }
                  };
                  reader.readAsDataURL(file);
                }}
              />
            </label>
          </div>
          
          <HealthRecordList records={records} />
        </div>
      </div>
    </div>
  )
}
