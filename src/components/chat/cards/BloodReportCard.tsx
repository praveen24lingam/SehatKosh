import { FileText, AlertCircle } from 'lucide-react'

interface BloodReportCardProps {
  summary: string
  abnormalValues?: { name: string; value: string; range: string }[]
  doctorConsultation: string
}

export function BloodReportCard({ summary, abnormalValues = [], doctorConsultation }: BloodReportCardProps) {
  return (
    <div className="border border-light rounded-lg overflow-hidden bg-white mb-4">
      <div className="bg-accent/10 px-4 py-3 border-b border-light flex items-center gap-2">
        <FileText className="w-5 h-5 text-accent" />
        <h4 className="font-body font-semibold text-primary-light">ब्लड रिपोर्ट एनालिसिस</h4>
      </div>
      
      <div className="p-4 space-y-4">
        <p className="text-sm font-body text-text-secondary">
          {summary}
        </p>
        
        {abnormalValues.length > 0 && (
          <div className="bg-danger-soft p-3 rounded-lg border border-danger/20">
            <h5 className="text-sm font-semibold text-danger flex items-center gap-1.5 mb-2">
              <AlertCircle className="w-4 h-4" />
              ध्यान दें (Abnormal Values)
            </h5>
            <div className="space-y-2">
              {abnormalValues.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="font-medium text-primary-light">{item.name}</span>
                  <div className="text-right">
                    <span className="text-danger font-bold">{item.value}</span>
                    <span className="text-xs text-muted-light block">Normal: {item.range}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="bg-surface-light p-3 rounded-lg border border-brand-gold/20 text-sm">
          <strong className="text-brand-ink">Doctor Consultation:</strong> {doctorConsultation}
        </div>
      </div>
    </div>
  )
}
