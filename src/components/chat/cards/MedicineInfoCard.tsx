import { Info, AlertTriangle } from 'lucide-react'

interface MedicineInfoCardProps {
  name: string
  uses: string
  sideEffects: string
  whenToTake: string
}

export function MedicineInfoCard({ name, uses, sideEffects, whenToTake }: MedicineInfoCardProps) {
  return (
    <div className="border border-light rounded-lg overflow-hidden bg-white mb-4">
      <div className="bg-accent/10 px-4 py-3 border-b border-light flex items-center gap-2">
        <Info className="w-5 h-5 text-accent" />
        <h4 className="font-body font-semibold text-primary-light">{name}</h4>
      </div>
      
      <div className="p-4 space-y-4">
        <div>
          <h5 className="text-xs font-bold text-muted-light uppercase mb-1">Uses (उपयोग)</h5>
          <p className="text-sm text-primary-light">{uses}</p>
        </div>
        
        <div className="flex items-start gap-2 bg-surface-light p-3 rounded-lg border border-brand-gold/20">
          <AlertTriangle className="w-4 h-4 text-brand-gold mt-0.5 flex-shrink-0" />
          <div>
            <h5 className="text-xs font-bold text-brand-ink mb-1">Side Effects (दुष्प्रभाव)</h5>
            <p className="text-xs text-brand-ink/80">{sideEffects}</p>
          </div>
        </div>

        <div>
          <h5 className="text-xs font-bold text-muted-light uppercase mb-1">When to take (कब लें)</h5>
          <p className="text-sm text-primary-light">{whenToTake}</p>
        </div>
      </div>
    </div>
  )
}
