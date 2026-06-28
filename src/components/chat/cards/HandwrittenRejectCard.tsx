import { AlertOctagon } from 'lucide-react'

export function HandwrittenRejectCard() {
  return (
    <div className="border border-danger/20 rounded-lg overflow-hidden bg-danger-soft mb-4">
      <div className="p-4 flex items-start gap-3">
        <AlertOctagon className="w-5 h-5 text-danger mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="font-body font-semibold text-danger mb-1">
            Handwritten Document Detected
          </h4>
          <p className="text-sm text-danger/80">
            Maaf karein, main haath se likha hua parcha (handwritten prescription) nahi padh sakta. 
            Kripya dawai ka naam type karke poochhein.
          </p>
        </div>
      </div>
    </div>
  )
}
