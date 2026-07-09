import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { chatModel, visionModel } from '@/lib/gemini/client'
import { SEHAT_KOSH_SYSTEM_PROMPT, DOCUMENT_DETECTION_PROMPT } from '@/lib/gemini/prompts'

export async function POST(request: Request) {
  try {
    const { message, messageType, imageBase64, conversationHistory } = await request.json()

    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) { return cookieStore.get(name)?.value }
        }
      }
    )

    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const userId = session.user.id

    let childContext = ""
    if (userId) {
      try {
        const { data: members } = await supabase.from('family_members').select('*').eq('user_id', userId)
        const { data: reminders } = await supabase.from('dose_reminders').select('*').eq('user_id', userId)
        
        let allContext = "\n\nUser's Profile & Context:\n"
        if (members && members.length > 0) {
          const { data: vaccinations } = await supabase.from('vaccinations').select('*').in('member_id', members.map(m => m.id)).neq('status', 'done')
          
          allContext += "Family Members:\n"
          members.forEach(m => {
            allContext += `- Name: ${m.name}, Relation: ${m.relation}, DOB: ${m.dob}\n`
            const vax = vaccinations?.filter(v => v.member_id === m.id)
            if (vax && vax.length > 0) {
              allContext += `  Pending Vaccines:\n`
              vax.forEach(v => {
                allContext += `  * ${v.vaccine_name} Dose ${v.dose_number}: Due ${v.scheduled_date}\n`
              })
            }
          })
        }
        
        if (reminders && reminders.length > 0) {
          allContext += "\nActive Reminders:\n"
          reminders.forEach(r => {
            allContext += `- ${r.medicine_name} at ${r.time_label || r.time_of_day} [${r.days}]\n`
          })
        }
        childContext = allContext
      } catch (e) {
        console.error('Failed to fetch vaccination context', e)
      }
    }

    const enhancedSystemPrompt = SEHAT_KOSH_SYSTEM_PROMPT + childContext

    // Base context setup
    const chat = chatModel.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: "System Instructions: " + enhancedSystemPrompt }]
        },
        {
          role: 'model',
          parts: [{ text: "Understood. I am Sehat Saathi, ready to help." }]
        },
        // Map frontend history to gemini format
        ...(conversationHistory || []).map((msg: { role: string; content: string }) => ({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        }))
      ],
    })

    if (messageType === 'text') {
      let result = await chat.sendMessage(message)
      let calls = result.response.functionCalls()
      
      while (calls && calls.length > 0) {
        const call = calls[0]
        const args = call.args as Record<string, string>
        let actionResult = { success: true, message: 'Action executed successfully', data: {} }

        try {
          const cookieStore = await cookies()
          const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            { cookies: { get(name: string) { return cookieStore.get(name)?.value } } }
          )

          switch (call.name) {
            case 'add_family_member':
              await supabase.from('family_members').insert({
                user_id: userId,
                name: args.name,
                relation: args.relation,
                gender: args.gender,
                dob: args.dob,
                blood_group: args.blood_group
              })
              actionResult.message = 'Member added successfully'
              break
              
            case 'add_reminder': {
              // Map the requested HH:MM time to a time-of-day bucket that matches the DB schema.
              const hour = parseInt((args.time || '').split(':')[0], 10)
              let timeOfDay = 'morning'
              if (!isNaN(hour)) {
                if (hour >= 12 && hour < 17) timeOfDay = 'afternoon'
                else if (hour >= 17 && hour < 21) timeOfDay = 'evening'
                else if (hour >= 21 || hour < 5) timeOfDay = 'night'
              }
              await supabase.from('dose_reminders').insert({
                user_id: userId,
                medicine_name: args.title,
                time_of_day: timeOfDay,
                time_label: args.time,
                days: 'daily',
                is_active: true
              })
              actionResult.message = 'Reminder added successfully'
              break
            }

            case 'update_vaccine_status':
              const { data: mems } = await supabase.from('family_members').select('id').ilike('name', `%${args.member_name}%`).eq('user_id', userId).limit(1).single()
              if (mems) {
                await supabase.from('vaccinations')
                  .update({ status: 'done', given_date: new Date().toISOString().split('T')[0] })
                  .eq('member_id', mems.id)
                  .ilike('vaccine_name', `%${args.vaccine_name}%`)
              } else {
                actionResult = { success: false, message: 'Member not found', data: {} }
              }
              break

            case 'search_generic_medicines':
              actionResult.data = { generic: 'Generic Alternative Available', savings: 'Upto 70% cheaper at Jan Aushadhi' }
              break
              
            case 'check_government_schemes':
              actionResult.data = { schemes: ['Ayushman Bharat PM-JAY (Up to 5 Lakhs)', 'State Specific Health Scheme'] }
              break
              
            case 'save_health_record': {
              const { data: mems } = await supabase.from('family_members').select('id').ilike('name', `%${args.member_name || ''}%`).eq('user_id', userId).limit(1).single()
              const targetMemberId = mems?.id || (await supabase.from('family_members').select('id').eq('user_id', userId).limit(1).single()).data?.id;
              
              if (targetMemberId) {
                await supabase.from('health_records').insert({
                  member_id: targetMemberId,
                  record_type: 'other',
                  title: args.record_title || 'Health Record',
                  date: new Date().toISOString().split('T')[0],
                  ai_summary: args.summary || null
                })
                actionResult.message = 'Health record saved successfully to the digital locker.'
              } else {
                actionResult = { success: false, message: 'Member not found to attach the record to.', data: {} }
              }
              break
            }
            default:
              actionResult = { success: false, message: 'Unknown action', data: {} }
          }
        } catch (e: unknown) {
          const msg = e instanceof Error ? e.message : 'Action failed'
          actionResult = { success: false, message: msg, data: {} }
        }

        // Send function response back to model
        result = await chat.sendMessage([{
          functionResponse: {
            name: call.name,
            response: actionResult
          }
        }])
        
        calls = result.response.functionCalls()
      }

      const responseText = result.response.text()
      
      let responseType = 'health_qa'
      if (responseText.includes('MEDICINE:')) responseType = 'jan_aushadhi'
      if (responseText.includes('Structured list')) responseType = 'yojana'
      
      return NextResponse.json({
        success: true,
        response: responseText,
        responseType
      })
    }
    
    if (messageType === 'image' && imageBase64) {
      // First detect document type
      const imagePart = {
        inlineData: {
          data: imageBase64.split(',')[1] || imageBase64,
          mimeType: 'image/jpeg' // assuming jpeg for now, can be extracted from base64
        }
      }
      
      const detectResult = await visionModel.generateContent([
        DOCUMENT_DETECTION_PROMPT,
        imagePart
      ])
      
      let docInfo = { documentType: 'other', canProcess: true, isHandwritten: false }
      try {
        const text = detectResult.response.text().replace(/```json/g, '').replace(/```/g, '')
        docInfo = JSON.parse(text)
      } catch {
        console.error('Failed to parse document detection JSON')
      }

      if (docInfo.isHandwritten) {
        return NextResponse.json({
          success: true,
          response: "Main haath se likha hua document nahi padh sakta. Kripya dawai ka naam type karein.",
          responseType: 'handwritten_reject'
        })
      }

      // Process document with chat history context
      const prompt = `Please analyze this ${docInfo.documentType} image according to your system instructions. User's question: ${message || "Is report mein kya likha hai?"}`
      
      const result = await visionModel.generateContent([
        prompt,
        imagePart
      ])
      
      return NextResponse.json({
        success: true,
        response: result.response.text(),
        responseType: 'document_analysis',
        data: {
          documentType: docInfo.documentType
        }
      })
    }

    return NextResponse.json({ error: "Invalid message type" }, { status: 400 })
    
  } catch (error: unknown) {
    console.error('Chat API Error:', error)
    const message = error instanceof Error ? error.message : 'Failed to process chat'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
