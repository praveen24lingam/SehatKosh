import { Sidebar } from '@/components/layout/Sidebar'
import { BottomNav } from '@/components/layout/BottomNav'
import { TopHeader } from '@/components/layout/TopHeader'
import { OfflineBanner } from '@/components/layout/OfflineBanner'
import { FloatingAIButton } from '@/components/layout/FloatingAIButton'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>
      
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
          .desktop-flex { display: none !important; }
          .mobile-only { display: block !important; }
          .mobile-flex { display: flex !important; }
          .main-content { padding-bottom: 72px !important; }
        }
        @media (min-width: 769px) {
          .desktop-only { display: block !important; }
          .desktop-flex { display: flex !important; }
          .mobile-only { display: none !important; }
          .mobile-flex { display: none !important; }
          .main-content { padding-bottom: 0px !important; }
        }
      `}} />

      <Sidebar />

      <main className="main-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, position: 'relative', overflow: 'hidden' }}>
        {/* Stripe Light Background Pattern */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '100%', zIndex: 0,
          backgroundSize: '100px 100px',
          backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.02) 1px, transparent 1px)',
          pointerEvents: 'none'
        }}></div>

        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', flex: 1, height: '100%' }}>
          <OfflineBanner />
          <TopHeader />
          <div style={{ flex: 1, overflowX: 'hidden', overflowY: 'auto' }}>{children}</div>
        </div>
        
        <FloatingAIButton />
        <BottomNav />
      </main>
    </div>
  )
}
