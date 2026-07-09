import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const { phone, token } = await request.json()
    const supabase = await createClient()

    const { data, error } = await supabase.auth.verifyOtp({
      phone: `+91${phone}`,
      token,
      type: 'sms',
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Check if user exists in our users table, if not, create
    const { data: userData } = await supabase
      .from('users')
      .select('*')
      .eq('phone_number', phone)
      .single()

    if (!userData && data.user) {
      await supabase.from('users').insert({
        id: data.user.id,
        phone_number: phone,
      })
    }

    return NextResponse.json({ success: true, user: data.user })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
