import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { HealthCard } from '@/components/family/HealthCard'
import { HealthRecordList } from '@/components/family/HealthRecordList'
import { AlertCircle } from 'lucide-react'

// This is a public page, so we fetch data server-side
// Normally, we'd use a service role key if public RLS isn't open, 
// but assuming there's a policy for viewing public profiles or we use a secure token.
// For MVP, we'll assume we can fetch it, or use the service role.

export default async function PublicHealthCardPage({ params }: { params: Promise<{ memberId: string }> }) {
  const { memberId } = await params;
  const cookieStore = await cookies();
    const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return cookieStore.get(name)?.value },
      },
    }
  )

  const { data: member, error } = await supabase
    .from('family_members')
    .select('*')
    .eq('id', memberId)
    .single()

  if (error || !member) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-light p-4 text-center">
        <div className="max-w-md w-full p-6 bg-surface-card border border-light rounded-xl">
          <AlertCircle className="w-10 h-10 text-danger mx-auto mb-4" />
          <h1 className="text-xl font-body font-bold text-primary-light mb-2">Profile Not Found</h1>
          <p className="text-sm text-text-secondary">The health profile you are trying to view does not exist or has been removed.</p>
        </div>
      </div>
    )
  }

  // Fetch records
  const { data: records } = await supabase
    .from('health_records')
    .select('*')
    .eq('member_id', memberId)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-surface-light p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-2xl font-display font-semibold text-accent">SehatKosh</h1>
          <p className="text-sm text-text-secondary">Verified Digital Health Record</p>
        </div>

        <HealthCard member={member} />

        <div className="bg-surface-card rounded-xl border border-light p-4 md:p-6 space-y-4">
          <h2 className="text-lg font-body font-bold text-primary-light border-b border-light pb-2">
            Medical History
          </h2>
          <HealthRecordList records={records || []} />
        </div>
      </div>
    </div>
  )
}
