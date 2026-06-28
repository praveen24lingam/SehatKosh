import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { generateVaccinationSchedule } from '@/lib/utils/vaccination'
import { ScheduledVaccine } from '@/types/vaccination'

export async function GET(request: Request, { params }: { params: Promise<{ memberId: string }> }) {
  try {
    const { memberId } = await params;
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) { return cookieStore.get(name)?.value },
        },
      }
    )

    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // 1. Fetch member to verify ownership and get DOB
    const { data: member, error: memberError } = await supabase
      .from('family_members')
      .select('dob')
      .eq('id', memberId)
      .eq('user_id', session.user.id)
      .single()

    if (memberError || !member) throw new Error('Member not found or unauthorized')

    // 2. Fetch completed vaccinations
    const { data: vaccinations, error: vacError } = await supabase
      .from('vaccinations')
      .select('*')
      .eq('member_id', memberId)
      
    if (vacError) throw vacError

    // 3. Generate schedule based on DOB
    let schedule: ScheduledVaccine[] = []
    if (member.dob) {
      schedule = generateVaccinationSchedule(new Date(member.dob)) as ScheduledVaccine[]

      schedule = schedule.map(item => {
        const completed = vaccinations?.find(
          (v: { vaccine_name: string; dose_number: number; given_date: string | null }) =>
            v.vaccine_name === item.vaccineName && v.dose_number === item.doseNumber
        )
        if (completed) {
          return { ...item, status: 'done' as const, given_date: completed.given_date }
        }
        return item
      })
    }

    return NextResponse.json({ vaccinations, schedule })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
