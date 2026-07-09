'use client'

import { useState, useEffect } from 'react'
import { X, Sparkles, PenLine, Send, CheckCircle2 } from 'lucide-react'
import { useLanguageStore } from '@/store/useLanguageStore'
import { ReminderManualForm } from './ReminderManualForm'
import { toast } from 'sonner'

type CreationMethod = 'none' | 'ai' | 'manual'

export function ReminderAddModal({ onClose, onAdd }: { onClose: () => void, onAdd?: (r: any) => void }) {
  const { language } = useLanguageStore()
  const [method, setMethod] = useState<CreationMethod>('none')
  
  // AI Flow state
  const [aiInput, setAiInput] = useState('')
  const [aiParsing, setAiParsing] = useState(false)
  const [aiResult, setAiResult] = useState<any>(null)

  // Family Members state
  const [members, setMembers] = useState<any[]>([])
  const [memberId, setMemberId] = useState('')

  useEffect(() => {
    fetch('/api/family')
      .then(res => res.json())
      .then(data => {
        if (data.members && data.members.length > 0) {
          setMembers(data.members)
          setMemberId(data.members[0].id)
        }
      })
      .catch(console.error)
  }, [])

  const handleAiSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!aiInput.trim()) return
    
    setAiParsing(true)
    try {
      const prompt = `Extract reminder details from this text: "${aiInput}". Return ONLY a JSON object with this exact format, no markdown, no other text: {"type": "medicine" or "appointment", "title": "name of medicine/doctor", "schedule": "e.g. Daily, 8:00 AM", "duration": "e.g. For 5 days"}`
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt, messageType: 'text' })
      })
      const data = await res.json()
      
      let parsed;
      try {
        const text = data.response.replace(/```json/g, '').replace(/```/g, '').trim();
        parsed = JSON.parse(text)
      } catch (e) {
        throw new Error('Failed to parse AI response')
      }
      
      setAiResult({
        type: parsed.type || 'medicine',
        title: parsed.title || 'Unknown',
        schedule: parsed.schedule || 'Unknown',
        duration: parsed.duration || ''
      })
    } catch (error) {
      console.error(error)
      toast.error(language === 'hindi' ? 'एआई समझने में विफल रहा, कृपया मैन्युअल रूप से जोड़ें।' : 'AI failed to parse, please add manually.')
      setMethod('manual')
    } finally {
      setAiParsing(false)
    }
  }

  const handleSave = async (data?: any) => {
    try {
      let payload: any = {}
      if (data) {
        payload = { ...data, memberId }
      } else {
        payload = {
          memberId,
          medicineName: aiResult?.title || 'Unknown',
          timeOfDay: 'morning',
          timeLabel: aiResult?.schedule || '8:00 AM',
          days: 'daily'
        }
      }
      
      const res = await fetch('/api/reminders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      
      if (res.ok) {
        const json = await res.json()
        if (onAdd && json.reminder) {
          onAdd(json.reminder)
        } else {
          onClose()
        }
      } else {
        onClose()
      }
    } catch (error) {
      console.error(error)
      onClose()
    }
  }

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100,
      background: 'rgba(10,37,64,0.4)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '16px'
    }}>
      <div style={{
        background: 'white', borderRadius: '24px', width: '100%', maxWidth: '500px',
        maxHeight: '90vh', overflowY: 'auto', position: 'relative',
        boxShadow: '0 24px 48px rgba(10,37,64,0.1)',
        fontFamily: 'Inter, sans-serif'
      }}>
        {/* Header */}
        <div style={{ padding: '24px', borderBottom: '1px solid rgba(10,37,64,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: 'white', zIndex: 10 }}>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#0A2540' }}>
            {method === 'none' ? (language === 'hindi' ? 'रिमाइंडर जोड़ें' : 'Add Reminder') 
             : method === 'ai' ? (language === 'hindi' ? 'एआई से बनाएं' : 'Create with AI')
             : (language === 'hindi' ? 'मैन्युअल रूप से बनाएं' : 'Create Manually')}
          </h2>
          <button onClick={onClose} style={{ background: '#F8FAFC', border: 'none', width: '32px', height: '32px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#425466', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '24px' }}>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#425466', marginBottom: '8px' }}>
              {language === 'hindi' ? 'परिवार का सदस्य' : 'Family Member'}
            </label>
            <select 
              value={memberId} 
              onChange={e => setMemberId(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid rgba(10,37,64,0.1)', outline: 'none', background: '#F8FAFC', fontSize: '15px' }}
            >
              {members.length === 0 && <option value="">Loading...</option>}
              {members.map(m => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>

          {method === 'none' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <button 
                onClick={() => setMethod('ai')}
                style={{
                  display: 'flex', alignItems: 'center', gap: '16px', padding: '20px',
                  borderRadius: '16px', border: '1px solid rgba(99,91,255,0.2)',
                  background: 'linear-gradient(135deg, rgba(99,91,255,0.05) 0%, rgba(0,212,255,0.05) 100%)',
                  cursor: 'pointer', textAlign: 'left', transition: 'transform 0.2s ease'
                }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #635BFF 0%, #00D4FF 100%)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sparkles size={24} />
                </div>
                <div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '700', color: '#0A2540' }}>
                    {language === 'hindi' ? 'एआई असिस्टेंट का उपयोग करें' : 'Create using AI Assistant'}
                  </h3>
                  <p style={{ margin: 0, fontSize: '13px', color: '#425466' }}>
                    {language === 'hindi' ? 'बस अपनी भाषा में टाइप करें या बोलें' : 'Describe your reminder in natural language'}
                  </p>
                </div>
              </button>

              <button 
                onClick={() => setMethod('manual')}
                style={{
                  display: 'flex', alignItems: 'center', gap: '16px', padding: '20px',
                  borderRadius: '16px', border: '1px solid rgba(10,37,64,0.1)',
                  background: 'white', cursor: 'pointer', textAlign: 'left', transition: 'transform 0.2s ease'
                }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#F8FAFC', color: '#425466', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <PenLine size={24} />
                </div>
                <div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '700', color: '#0A2540' }}>
                    {language === 'hindi' ? 'मैन्युअल रूप से बनाएं' : 'Create Manually'}
                  </h3>
                  <p style={{ margin: 0, fontSize: '13px', color: '#425466' }}>
                    {language === 'hindi' ? 'फॉर्म भरकर पूरी जानकारी दें' : 'Fill out a form with all details'}
                  </p>
                </div>
              </button>
            </div>
          )}

          {method === 'ai' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {!aiResult ? (
                <>
                  <p style={{ margin: 0, fontSize: '14px', color: '#425466', lineHeight: 1.5 }}>
                    {language === 'hindi' 
                      ? 'उदाहरण: "मुझे रोज़ाना सुबह 8 बजे क्रोसिन लेने की याद दिलाएं।"' 
                      : 'Example: "Remind me to take Crocin every morning at 8 AM for 5 days."'}
                  </p>
                  <form onSubmit={handleAiSubmit} style={{ display: 'flex', gap: '8px' }}>
                    <input 
                      type="text" 
                      value={aiInput}
                      onChange={(e) => setAiInput(e.target.value)}
                      disabled={aiParsing}
                      placeholder={language === 'hindi' ? 'अपना रिमाइंडर टाइप करें...' : 'Type your reminder here...'}
                      style={{
                        flex: 1, padding: '16px', borderRadius: '16px', border: '1px solid rgba(10,37,64,0.1)',
                        background: '#F8FAFC', fontSize: '15px', outline: 'none'
                      }}
                    />
                    <button 
                      type="submit" 
                      disabled={aiParsing || !aiInput.trim()}
                      style={{
                        width: '52px', borderRadius: '16px', border: 'none',
                        background: aiParsing || !aiInput.trim() ? '#E2E8F0' : '#635BFF',
                        color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: aiParsing || !aiInput.trim() ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {aiParsing ? <span className="animate-spin" style={{ display: 'inline-block', width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%' }} /> : <Send size={20} />}
                    </button>
                  </form>
                </>
              ) : (
                <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '20px', border: '1px solid rgba(10,37,64,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#00D924', marginBottom: '16px' }}>
                    <CheckCircle2 size={20} />
                    <span style={{ fontWeight: '600', fontSize: '14px' }}>{language === 'hindi' ? 'सफलतापूर्वक समझा गया' : 'Successfully parsed!'}</span>
                  </div>
                  
                  <div style={{ display: 'grid', gap: '12px', fontSize: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#425466' }}>{language === 'hindi' ? 'प्रकार' : 'Type'}</span>
                      <span style={{ fontWeight: '600', color: '#0A2540', textTransform: 'capitalize' }}>{aiResult.type}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#425466' }}>{language === 'hindi' ? 'शीर्षक' : 'Title'}</span>
                      <span style={{ fontWeight: '600', color: '#0A2540' }}>{aiResult.title}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#425466' }}>{language === 'hindi' ? 'शेड्यूल' : 'Schedule'}</span>
                      <span style={{ fontWeight: '600', color: '#0A2540' }}>{aiResult.schedule}</span>
                    </div>
                    {aiResult.duration && (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#425466' }}>{language === 'hindi' ? 'अवधि' : 'Duration'}</span>
                        <span style={{ fontWeight: '600', color: '#0A2540' }}>{aiResult.duration}</span>
                      </div>
                    )}
                  </div>

                  <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
                    <button onClick={() => setAiResult(null)} style={{ flex: 1, padding: '12px', borderRadius: '12px', background: 'white', border: '1px solid rgba(10,37,64,0.1)', fontWeight: '600', color: '#425466' }}>
                      {language === 'hindi' ? 'संपादित करें' : 'Edit'}
                    </button>
                    <button onClick={handleSave} style={{ flex: 2, padding: '12px', borderRadius: '12px', background: '#635BFF', border: 'none', fontWeight: '600', color: 'white' }}>
                      {language === 'hindi' ? 'पुष्टि करें और सेव करें' : 'Confirm & Save'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {method === 'manual' && (
            <ReminderManualForm onCancel={() => setMethod('none')} onSave={handleSave} />
          )}
        </div>
      </div>
    </div>
  )
}
