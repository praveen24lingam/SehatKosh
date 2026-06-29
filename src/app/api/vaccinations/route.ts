import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
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

    const body = await request.json()
    
    // Verify member belongs to user
    const { data: member } = await supabase
      .from('family_members')
      .select('id')
      .eq('id', body.memberId)
      .eq('user_id', session.user.id)
      .single()

    if (!member) {
      return NextResponse.json({ error: 'Unauthorized to modify this member' }, { status: 403 })
    }

    const { data, error } = await supabase
      .from('vaccinations')
      .insert({
        member_id: body.memberId,
        vaccine_name: body.vaccineName,
        dose_number: body.doseNumber,
        given_date: body.givenDate,
        status: 'done',
        notes: body.notes
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ vaccination: data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
