import { Sidebar } from '@/components/layout/Sidebar'
import { BottomNav } from '@/components/layout/BottomNav'
import { TopHeader } from '@/components/layout/TopHeader'
import { OfflineBanner } from '@/components/layout/OfflineBanner'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-stripe-offwhite">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 pb-[72px] md:pb-0">
        <OfflineBanner />
        <TopHeader />
        <div className="flex-1 overflow-x-hidden">{children}</div>
        <BottomNav />
      </main>
    </div>
  )
}
