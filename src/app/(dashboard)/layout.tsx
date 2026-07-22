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
    // Transparent on purpose: the app-wide glow + dot grid lives on <body>
    // (.app-bg), so every shell above it must let it through.
    <div style={{ display: 'flex', minHeight: '100vh', background: 'transparent' }}>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
          .desktop-flex { display: none !important; }
          .mobile-only { display: block !important; }
          .mobile-flex { display: flex !important; }
          /* Clear the floating bottom nav: its height + its 16px offset + breathing room. */
          .main-content { padding-bottom: calc(var(--bottomnav-h) + var(--space-4)) !important; }
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
        {/* The old per-page grid overlay was removed — .app-bg on <body> now
            provides the dot texture for every page, so this was doubling it. */}
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
