'use client'

import { FileText, Image as ImageIcon } from 'lucide-react'
import { HealthRecord } from '@/types/database'
import { useLanguageStore } from '@/store/useLanguageStore'
import { formatDate } from '@/lib/utils/format'

interface HealthRecordListProps {
  records: HealthRecord[]
}

export function HealthRecordList({ records }: HealthRecordListProps) {
  const { language } = useLanguageStore()

  if (!records || records.length === 0) {
    return (
      <div className="text-center p-6 border border-dashed border-light rounded-xl bg-surface-light/50">
        <FileText className="w-8 h-8 text-muted-light mx-auto mb-3" />
        <p className="text-sm text-text-secondary font-body">
          {language === 'hindi' ? 'कोई स्वास्थ्य रिकॉर्ड नहीं' : 'No health records found'}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {records.map(record => (
        <div key={record.id} className="flex items-center gap-4 p-4 rounded-xl bg-surface-card border border-light">
          <div className="w-10 h-10 rounded-lg bg-brand-gold-soft flex items-center justify-center text-brand-gold-matte flex-shrink-0">
            {record.image_url ? <ImageIcon className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-body font-semibold text-primary-light truncate">
              {record.title}
            </h4>
            <div className="flex gap-2 text-xs text-text-secondary mt-1">
              <span>{formatDate(record.date)}</span>
              <span>•</span>
              <span className="capitalize">{record.record_type.replace('_', ' ')}</span>
            </div>
          </div>
          {record.image_url && (
            <button className="text-accent hover:underline text-sm font-medium">
              {language === 'hindi' ? 'देखें' : 'View'}
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
