'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { useLanguageStore } from '@/store/useLanguageStore'
import { FamilyMember } from '@/types/database'

interface AddMemberFormProps {
  onSuccess: (member: FamilyMember) => void
  onCancel: () => void
}

export function AddMemberForm({ onSuccess, onCancel }: AddMemberFormProps) {
  const { language } = useLanguageStore()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    relation: 'other',
    dob: '',
    blood_group: '',
    gender: 'male',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch('/api/family', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          relation: formData.relation,
          dob: formData.dob || null,
          blood_group: formData.blood_group || null,
          gender: formData.gender,
          allergies: [],
          chronic_conditions: []
        })
      })
      
      const data = await response.json()
      if (data.member) {
        onSuccess(data.member)
      } else {
        throw new Error(data.error || 'Failed to add member')
      }
    } catch (error) {
      console.error(error)
      toast.error(language === 'hindi' ? 'कुछ गलत हो गया' : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{
      backgroundColor: 'white',
      padding: '32px',
      borderRadius: '24px',
      border: '1px solid rgba(10,37,64,0.06)',
      boxShadow: '0 12px 32px rgba(10,37,64,0.04)',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Decorative background glow */}
      <div style={{ position: 'absolute', top: -40, right: -40, width: 120, height: 120, background: 'radial-gradient(circle, rgba(99,91,255,0.1) 0%, transparent 70%)', borderRadius: '50%' }} />

      <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0A2540', marginBottom: '24px' }} className={language === 'hindi' ? 'font-hindi' : 'font-body'}>
        {language === 'hindi' ? 'नया सदस्य जोड़ें' : 'Add Family Member'}
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#425466', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }} className={language === 'hindi' ? 'font-hindi' : 'font-body'}>
            {language === 'hindi' ? 'पूरा नाम *' : 'Full Name *'}
          </label>
          <input 
            required
            type="text" 
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            style={{
              width: '100%', backgroundColor: '#F8FAFC', border: '1px solid rgba(10,37,64,0.1)',
              borderRadius: '12px', padding: '14px 16px', fontSize: '15px', color: '#0A2540',
              outline: 'none', transition: 'all 0.2s ease', boxSizing: 'border-box'
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = '#635BFF'; e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99,91,255,0.1)' }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(10,37,64,0.1)'; e.currentTarget.style.backgroundColor = '#F8FAFC'; e.currentTarget.style.boxShadow = 'none' }}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#425466', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }} className={language === 'hindi' ? 'font-hindi' : 'font-body'}>
              {language === 'hindi' ? 'रिश्ता *' : 'Relation *'}
            </label>
            <select 
              value={formData.relation}
              onChange={e => setFormData({...formData, relation: e.target.value})}
              style={{
                width: '100%', backgroundColor: '#F8FAFC', border: '1px solid rgba(10,37,64,0.1)',
                borderRadius: '12px', padding: '14px 16px', fontSize: '15px', color: '#0A2540',
                outline: 'none', transition: 'all 0.2s ease', cursor: 'pointer', appearance: 'none',
                backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23425466%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
                backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px top 50%', backgroundSize: '10px auto'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#635BFF'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(10,37,64,0.1)'}
            >
              <option value="self">{language === 'hindi' ? 'स्वयं' : 'Self'}</option>
              <option value="father">{language === 'hindi' ? 'पिता' : 'Father'}</option>
              <option value="mother">{language === 'hindi' ? 'माता' : 'Mother'}</option>
              <option value="spouse">{language === 'hindi' ? 'जीवनसाथी' : 'Spouse'}</option>
              <option value="child">{language === 'hindi' ? 'बच्चा' : 'Child'}</option>
              <option value="grandparent">{language === 'hindi' ? 'दादा/दादी' : 'Grandparent'}</option>
              <option value="other">{language === 'hindi' ? 'अन्य' : 'Other'}</option>
            </select>
          </div>
          
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#425466', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }} className={language === 'hindi' ? 'font-hindi' : 'font-body'}>
              {language === 'hindi' ? 'लिंग' : 'Gender'}
            </label>
            <select 
              value={formData.gender}
              onChange={e => setFormData({...formData, gender: e.target.value})}
              style={{
                width: '100%', backgroundColor: '#F8FAFC', border: '1px solid rgba(10,37,64,0.1)',
                borderRadius: '12px', padding: '14px 16px', fontSize: '15px', color: '#0A2540',
                outline: 'none', transition: 'all 0.2s ease', cursor: 'pointer', appearance: 'none',
                backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23425466%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
                backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px top 50%', backgroundSize: '10px auto'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#635BFF'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(10,37,64,0.1)'}
            >
              <option value="male">{language === 'hindi' ? 'पुरुष' : 'Male'}</option>
              <option value="female">{language === 'hindi' ? 'महिला' : 'Female'}</option>
              <option value="other">{language === 'hindi' ? 'अन्य' : 'Other'}</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#425466', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }} className={language === 'hindi' ? 'font-hindi' : 'font-body'}>
              {language === 'hindi' ? 'जन्म तिथि' : 'Date of Birth'}
            </label>
            <input 
              type="date" 
              value={formData.dob}
              onChange={e => setFormData({...formData, dob: e.target.value})}
              style={{
                width: '100%', backgroundColor: '#F8FAFC', border: '1px solid rgba(10,37,64,0.1)',
                borderRadius: '12px', padding: '14px 16px', fontSize: '15px', color: '#0A2540',
                outline: 'none', transition: 'all 0.2s ease', boxSizing: 'border-box'
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#635BFF'; e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99,91,255,0.1)' }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(10,37,64,0.1)'; e.currentTarget.style.backgroundColor = '#F8FAFC'; e.currentTarget.style.boxShadow = 'none' }}
            />
          </div>
          
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#425466', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }} className={language === 'hindi' ? 'font-hindi' : 'font-body'}>
              {language === 'hindi' ? 'ब्लड ग्रुप' : 'Blood Group'}
            </label>
            <select 
              value={formData.blood_group}
              onChange={e => setFormData({...formData, blood_group: e.target.value})}
              style={{
                width: '100%', backgroundColor: '#F8FAFC', border: '1px solid rgba(10,37,64,0.1)',
                borderRadius: '12px', padding: '14px 16px', fontSize: '15px', color: '#0A2540',
                outline: 'none', transition: 'all 0.2s ease', cursor: 'pointer', appearance: 'none',
                backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23425466%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
                backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px top 50%', backgroundSize: '10px auto'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#635BFF'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(10,37,64,0.1)'}
            >
              <option value="">{language === 'hindi' ? 'चुनें' : 'Select'}</option>
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: '32px', display: 'flex', gap: '12px' }}>
        <button 
          type="button"
          onClick={onCancel}
          disabled={loading}
          style={{
            flex: 1, padding: '14px', borderRadius: '12px', border: '1px solid rgba(10,37,64,0.1)',
            backgroundColor: 'white', color: '#425466', fontWeight: '600', fontSize: '15px',
            cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s ease', opacity: loading ? 0.7 : 1
          }}
          onMouseEnter={(e) => { if (!loading) e.currentTarget.style.backgroundColor = '#F8FAFC' }}
          onMouseLeave={(e) => { if (!loading) e.currentTarget.style.backgroundColor = 'white' }}
        >
          {language === 'hindi' ? 'रद्द करें' : 'Cancel'}
        </button>
        <button 
          type="submit"
          disabled={loading}
          style={{
            flex: 1, padding: '14px', borderRadius: '12px', border: 'none',
            background: loading ? '#A0AEC0' : 'linear-gradient(135deg, #7A73FF 0%, #635BFF 100%)',
            color: 'white', fontWeight: '600', fontSize: '15px',
            cursor: loading ? 'not-allowed' : 'pointer', 
            boxShadow: loading ? 'none' : '0 4px 12px rgba(99,91,255,0.25)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => { if (!loading) e.currentTarget.style.transform = 'translateY(-2px)' }}
          onMouseLeave={(e) => { if (!loading) e.currentTarget.style.transform = 'translateY(0)' }}
        >
          {loading 
            ? (language === 'hindi' ? 'जोड़ रहे हैं...' : 'Adding...')
            : (language === 'hindi' ? 'सेव करें' : 'Save Member')}
        </button>
      </div>
    </form>
  )
}
