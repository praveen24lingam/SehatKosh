import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { uipSchedule } from '@/lib/constants/uipSchedule'
export async function GET() {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
        },
      }
    )

    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data, error } = await supabase
      .from('family_members')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: true })

    if (error) throw error

    return NextResponse.json({ members: data })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
        },
      }
    )

    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    
    const { data, error } = await supabase
      .from('family_members')
      .insert({
        ...body,
        user_id: session.user.id
      })
      .select()
      .single()

    if (error) throw error

    // Auto-generate vaccination schedule for children <= 5 years
    if (data.relation === 'child' && data.dob) {
      const dobDate = new Date(data.dob)
      // Only generate if age is 5 or under
      const ageDiffMs = Date.now() - dobDate.getTime()
      const ageInYears = ageDiffMs / (1000 * 60 * 60 * 24 * 365.25)
      
      if (ageInYears <= 5) {
        const vaccinationsToInsert = uipSchedule.map(vaccine => {
          const scheduledDate = new Date(dobDate.getTime() + vaccine.offsetDays * 24 * 60 * 60 * 1000)
          const isPast = scheduledDate < new Date()
          
          return {
            member_id: data.id,
            vaccine_name: vaccine.name,
            dose_number: vaccine.doseNumber,
            scheduled_date: scheduledDate.toISOString().split('T')[0],
            status: isPast ? 'overdue' : 'upcoming',
            notes: vaccine.notes
          }
        })
        
        await supabase.from('vaccinations').insert(vaccinationsToInsert)
      }
    }

    return NextResponse.json({ member: data })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
