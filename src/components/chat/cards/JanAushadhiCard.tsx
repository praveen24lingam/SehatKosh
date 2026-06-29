import { Pill, IndianRupee, MapPin } from 'lucide-react'

interface JanAushadhiCardProps {
  brandedName: string
  genericName: string
  savings: string
  storeLink: string
}

export function JanAushadhiCard({ brandedName, genericName, savings, storeLink }: JanAushadhiCardProps) {
  return (
    <div className="border border-light rounded-lg overflow-hidden bg-white mb-4">
      <div className="bg-success-soft px-4 py-3 border-b border-success/20 flex items-center gap-2">
        <Pill className="w-5 h-5 text-success" />
        <h4 className="font-body font-semibold text-success">सस्ती दवा (Jan Aushadhi)</h4>
      </div>
      
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-light mb-1">Branded Medicine</p>
            <p className="font-body font-medium text-primary-light line-through opacity-70">
              {brandedName}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-light mb-1">Generic Alternative</p>
            <p className="font-body font-bold text-success">
              {genericName}
            </p>
          </div>
        </div>
        
        <div className="bg-success/5 p-3 rounded-lg border border-success/20 flex items-center justify-between">
          <span className="text-sm font-medium text-success">Estimated Savings</span>
          <div className="flex items-center text-success font-bold text-lg">
            <IndianRupee className="w-4 h-4" />
            {savings}
          </div>
        </div>
        
        <a 
          href={storeLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-surface-light border border-light rounded-lg text-sm font-medium text-primary-light hover:bg-surface-light transition-colors"
        >
          <MapPin className="w-4 h-4 text-accent" />
          Find Nearest Jan Aushadhi Kendra
        </a>
      </div>
    </div>
  )
}
