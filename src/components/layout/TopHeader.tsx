'use client'

import Link from 'next/link'
import { Bell, Activity } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'

export function TopHeader() {
  const { user } = useAuthStore()

  return (
    <header className="mobile-flex" style={{
      position: 'sticky',
      top: 0,
      zIndex: 40,
      width: '100%',
      height: '72px',
      backgroundColor: 'white',
      borderBottom: '1px solid #E6EBF1',
      display: 'none', // Overridden to display: flex by mobile-flex in mobile view
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      boxShadow: '0 4px 20px rgba(10,37,64,0.02)',
      fontFamily: 'Inter, sans-serif'
    }}>
      <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          background: 'linear-gradient(135deg, #7A73FF 0%, #00D4FF 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          boxShadow: '0 2px 4px rgba(99,91,255,0.2)'
        }}>
          <Activity size={18} />
        </div>
        <span style={{ fontWeight: '800', fontSize: '20px', color: '#0A2540', letterSpacing: '-0.5px' }}>SehatKosh</span>
      </Link>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button style={{
          position: 'relative',
          padding: '8px',
          border: 'none',
          background: 'transparent',
          color: '#8898AA',
          cursor: 'pointer',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Bell size={20} />
          <span style={{
            position: 'absolute',
            top: '4px',
            right: '4px',
            width: '8px',
            height: '8px',
            backgroundColor: '#E02424',
            borderRadius: '50%',
            border: '2px solid white'
          }}></span>
        </button>
        
        <Link href="/settings" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #7A73FF 0%, #00D4FF 100%)',
          color: 'white',
          textDecoration: 'none',
          fontWeight: '700',
          fontSize: '14px',
          boxShadow: '0 2px 4px rgba(99,91,255,0.2)'
        }}>
          {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
        </Link>
      </div>
    </header>
  )
}
