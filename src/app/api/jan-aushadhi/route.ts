import { NextResponse } from 'next/server'
import { chatModel } from '@/lib/gemini/client'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const JAN_AUSHADHI_PROMPT = `Tu ek Indian pharmacy expert hai jo Jan Aushadhi generic medicines ke baare mein jaanta hai.

Medicine: {MEDICINE_NAME}

Ye information do JSON mein, koi extra text nahi:
{
  "brandedName": "Full branded name with dosage",
  "genericName": "Generic/salt name",
  "saltComposition": "Active salt composition",
  "brandedPrice": 50,
  "genericPrice": 5,
  "monthlySavings": 45,
  "yearlySavings": 540,
  "uses": "Is dawai ke kya use hain",
  "nearestStoreLink": "https://janaushadhi.gov.in/KendraDetails.aspx"
}

Prices realistic Indian market prices honi chahiye (in INR, per strip/unit).
Generic price Jan Aushadhi price hona chahiye (branded ka roughly 1/10).`

export async function POST(request: Request) {
  try {
    const { medicineName, userId } = await request.json()

    const prompt = JAN_AUSHADHI_PROMPT.replace('{MEDICINE_NAME}', medicineName)

    const result = await chatModel.generateContent(prompt)
    const text = result.response.text().replace(/```json/g, '').replace(/```/g, '').trim()

    let data: Record<string, unknown> = {}
    try {
      data = JSON.parse(text)
    } catch {
      return NextResponse.json({ error: 'Medicine info parse nahi ho saka' }, { status: 500 })
    }

    // Save to jan_aushadhi_history if userId provided
    if (userId) {
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

      await supabase.from('jan_aushadhi_history').insert({
        user_id: userId,
        branded_name: data.brandedName,
        generic_name: data.genericName,
        salt_composition: data.saltComposition,
        branded_price: data.brandedPrice,
        generic_price: data.genericPrice,
        monthly_savings: data.monthlySavings,
        yearly_savings: data.yearlySavings,
      })
    }

    return NextResponse.json(data)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
