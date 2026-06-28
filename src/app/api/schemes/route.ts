import { NextResponse } from 'next/server'
import { chatModel } from '@/lib/gemini/client'

const SCHEMES_PROMPT = `Tu ek Indian government health schemes expert hai.
User ke jawab ke hisaab se eligible government health schemes suggest kar.

Ye schemes ke baare mein jaanta hai:
- Ayushman Bharat PM-JAY: BPL families, ₹5 lakh/year health coverage
- PMMVY: Pregnant women, ₹5000 maternity benefit
- Janani Suraksha Yojana: Institutional delivery, ₹1400 rural, ₹600 urban
- PM Suraksha Bima Yojana: ₹20/year premium, ₹2 lakh accident insurance
- PM Jeevan Jyoti Bima Yojana: ₹436/year premium, ₹2 lakh life insurance
- Rashtriya Swasthya Bima Yojana: BPL workers, ₹30000/year
- Chief Minister relief funds: State-specific, serious illness
- ESI: Organized sector workers

User ke answers:
{ANSWERS}

Sirf JSON array mein jawab do, koi extra text nahi:
[
  {
    "name": "Scheme Name",
    "nameHindi": "योजना का नाम",
    "benefit": "₹X lakh coverage / specific benefit",
    "eligibilityReason": "Aap eligible hain kyunki...",
    "officialLink": "https://official-site.gov.in",
    "lastVerified": "June 2026"
  }
]`

export async function POST(request: Request) {
  try {
    const { answers } = await request.json()

    const answersText = Object.entries(answers as Record<string, string>)
      .map(([q, a]) => `${q}: ${a}`)
      .join('\n')

    const prompt = SCHEMES_PROMPT.replace('{ANSWERS}', answersText)

    const result = await chatModel.generateContent(prompt)
    const text = result.response.text().replace(/```json/g, '').replace(/```/g, '').trim()

    let schemes: unknown[] = []
    try {
      schemes = JSON.parse(text)
    } catch {
      schemes = []
    }

    return NextResponse.json({ schemes })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
