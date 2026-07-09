import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const memberId = searchParams.get('memberId')

    const cookieStore = await cookies()
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

    let query = supabase
      .from('health_records')
      .select('*')
      .order('created_at', { ascending: false })

    if (memberId) {
      query = query.eq('member_id', memberId)
    }

    const { data, error } = await query
    if (error) throw error

    return NextResponse.json({ records: data })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
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
    const { memberId, recordType, title, imageBase64, aiSummary, rawData, date } = body

    let imageUrl: string | null = null

    if (imageBase64) {
      const base64Data = imageBase64.split(',')[1] || imageBase64
      const buffer = Buffer.from(base64Data, 'base64')
      const fileName = `${session.user.id}/${memberId}/${Date.now()}.jpg`

      // IMPORTANT: Create bucket 'health-records' in Supabase dashboard before deploying
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('health-records')
        .upload(fileName, buffer, { contentType: 'image/jpeg', upsert: false })

      if (!uploadError && uploadData) {
        const { data: urlData } = supabase.storage
          .from('health-records')
          .getPublicUrl(fileName)
        imageUrl = urlData.publicUrl
      }
    }

    const { data, error } = await supabase
      .from('health_records')
      .insert({
        member_id: memberId,
        record_type: recordType,
        title,
        date: date || new Date().toISOString().split('T')[0],
        image_url: imageUrl,
        ai_summary: aiSummary || null,
        raw_data: rawData || null,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ record: data })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
