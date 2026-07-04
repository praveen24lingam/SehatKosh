'use client'

import { Activity, Heart, Droplets, Moon, Footprints } from 'lucide-react'

export function HealthSummary() {
  const metrics = [
    {
      title: 'Health Score',
      value: '840',
      unit: '/1000',
      status: 'Excellent',
      statusColor: '#00D924',
      icon: Heart,
      gradient: 'linear-gradient(135deg, rgba(0, 217, 36, 0.12) 0%, rgba(0, 217, 36, 0.04) 100%)',
      iconColor: '#00D924',
      accentColor: '#00D924'
    },
    {
      title: 'BMI',
      value: '22.5',
      unit: 'Normal',
      status: '-0.5 from last month',
      statusColor: '#8898AA',
      icon: Activity,
      gradient: 'linear-gradient(135deg, rgba(99, 91, 255, 0.12) 0%, rgba(0, 212, 255, 0.04) 100%)',
      iconColor: '#635BFF',
      accentColor: '#635BFF'
    },
    {
      title: 'Water Intake',
      value: '1.2',
      unit: 'Liters',
      status: 'Goal: 2.5L',
      statusColor: '#8898AA',
      icon: Droplets,
      gradient: 'linear-gradient(135deg, rgba(0, 212, 255, 0.12) 0%, rgba(0, 212, 255, 0.04) 100%)',
      iconColor: '#00D4FF',
      accentColor: '#00D4FF'
    },
    {
      title: 'Daily Steps',
      value: '4,230',
      unit: 'Steps',
      status: 'Goal: 8,000',
      statusColor: '#8898AA',
      icon: Footprints,
      gradient: 'linear-gradient(135deg, rgba(255, 153, 0, 0.12) 0%, rgba(255, 153, 0, 0.04) 100%)',
      iconColor: '#FF9900',
      accentColor: '#FF9900'
    },
    {
      title: 'Sleep',
      value: '6.5',
      unit: 'Hours',
      status: 'Fair',
      statusColor: '#FF9900',
      icon: Moon,
      gradient: 'linear-gradient(135deg, rgba(122, 115, 255, 0.12) 0%, rgba(122, 115, 255, 0.04) 100%)',
      iconColor: '#7A73FF',
      accentColor: '#7A73FF'
    }
  ]

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: '20px',
      width: '100%',
      fontFamily: 'Inter, sans-serif'
    }}>
      <style dangerouslySetInnerHTML={{__html: `
        .metric-card {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .metric-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -10px rgba(10,37,64,0.08) !important;
          border-color: var(--hover-border) !important;
        }
      `}} />
      
      {metrics.map((metric, i) => {
        const Icon = metric.icon
        return (
          <div 
            key={i} 
            className="metric-card"
            style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              padding: '20px',
              border: '1px solid rgba(10, 37, 64, 0.06)',
              boxShadow: '0 8px 24px rgba(10, 37, 64, 0.02)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              cursor: 'pointer',
              minHeight: '150px',
              '--hover-border': '#635BFF'
            } as React.CSSProperties}
          >

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: metric.gradient
              }}>
                <Icon size={20} style={{ color: metric.iconColor }} />
              </div>
            </div>
            
            <div>
              <p style={{ color: '#425466', fontSize: '13px', fontWeight: '700', margin: '0 0 6px 0' }}>{metric.title}</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '6px' }}>
                <span style={{ fontSize: '26px', fontWeight: '800', color: '#0A2540', letterSpacing: '-0.8px', lineHeight: 1 }}>{metric.value}</span>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#8898AA' }}>{metric.unit}</span>
              </div>
              <p style={{ fontSize: '12px', fontWeight: '700', color: metric.statusColor, margin: 0 }}>{metric.status}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
