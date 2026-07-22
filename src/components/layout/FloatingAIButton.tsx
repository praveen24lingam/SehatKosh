'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sparkles } from 'lucide-react'
import { useLanguageStore } from '@/store/useLanguageStore'

export function FloatingAIButton() {
  const { language } = useLanguageStore()
  const pathname = usePathname()

  if (pathname === '/chat') return null

  return (
    <Link 
      href="/chat"
      style={{
        position: 'fixed',
        bottom: '90px', // Above bottom nav
        right: '24px',
        width: '56px',
        height: '56px',
        borderRadius: '28px',
        background: 'linear-gradient(135deg, #0D9488 0%, #14B8A6 100%)',
        boxShadow: '0 8px 24px rgba(13,148,136,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        zIndex: 50,
        textDecoration: 'none',
        transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease',
      }}
      className="floating-ai-button"
    >
      <style dangerouslySetInnerHTML={{__html: `
        .floating-ai-button:active {
          transform: scale(0.92);
          box-shadow: 0 4px 12px rgba(13,148,136,0.3);
        }
        .floating-ai-button:hover {
          transform: scale(1.05);
        }
        .floating-ai-tooltip {
          position: absolute;
          right: 70px;
          background: #0F172A;
          color: white;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          opacity: 0;
          visibility: hidden;
          transition: all 0.2s ease;
          white-space: nowrap;
          pointer-events: none;
          box-shadow: 0 4px 12px rgba(15,23,42,0.1);
        }
        .floating-ai-button:hover .floating-ai-tooltip {
          opacity: 1;
          visibility: visible;
          transform: translateX(-4px);
        }
      `}} />
      <div className="floating-ai-tooltip">
        {language === 'hindi' ? 'एआई से पूछें' : 'Ask AI'}
      </div>
      <Sparkles size={24} strokeWidth={2} />
    </Link>
  )
}
