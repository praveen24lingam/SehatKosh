import { ShieldCheck, ExternalLink } from 'lucide-react'

interface SchemeItem {
  name: string
  amount: string
  reason: string
  link: string
}

interface YojanaCardProps {
  schemes: SchemeItem[]
}

export function YojanaCard({ schemes }: YojanaCardProps) {
  if (!schemes || schemes.length === 0) return null

  return (
    <div className="border border-light rounded-lg overflow-hidden bg-white mb-4">
      <div className="bg-brand-gold-soft px-4 py-3 border-b border-brand-gold/20 flex items-center gap-2">
        <ShieldCheck className="w-5 h-5 text-brand-gold-matte" />
        <h4 className="font-body font-semibold text-brand-gold-matte">सरकारी योजनाएं (Govt Schemes)</h4>
      </div>
      
      <div className="divide-y divide-border">
        {schemes.map((scheme, idx) => (
          <div key={idx} className="p-4 space-y-2">
            <div className="flex justify-between items-start gap-2">
              <h5 className="font-body font-bold text-primary-light text-sm">
                {scheme.name}
              </h5>
              <span className="inline-block bg-brand-gold-soft text-brand-gold-matte text-xs font-bold px-2 py-1 rounded-md whitespace-nowrap">
                {scheme.amount}
              </span>
            </div>
            
            <p className="text-xs text-text-secondary">
              <strong className="text-primary-light">Eligibility:</strong> {scheme.reason}
            </p>
            
            <a 
              href={scheme.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline mt-1"
            >
              Apply / More Info <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
