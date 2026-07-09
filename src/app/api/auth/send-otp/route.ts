import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const { phone } = await request.json()
    const supabase = await createClient()

    // Using Supabase Auth OTP
    // For phone auth, you need to configure an SMS provider like Twilio in Supabase
    // Using dummy +91 to test
    const { data, error } = await supabase.auth.signInWithOtp({
      phone: `+91${phone}`,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
