'use client'

import { useState } from 'react'
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
      alert(language === 'hindi' ? 'कुछ गलत हो गया' : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-surface-card p-6 rounded-xl border border-light">
      <h3 className={`text-xl font-bold mb-6 ${language === 'hindi' ? 'font-hindi text-accent' : 'font-body text-accent'}`}>
        {language === 'hindi' ? 'नया सदस्य जोड़ें' : 'Add Family Member'}
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className={`block text-sm mb-1 text-text-secondary ${language === 'hindi' ? 'font-hindi' : 'font-body'}`}>
            {language === 'hindi' ? 'पूरा नाम *' : 'Full Name *'}
          </label>
          <input 
            required
            type="text" 
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            className="w-full bg-surface-light border border-light rounded-lg px-4 py-2 outline-none focus:border-brand-saffron transition-colors text-primary-light"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm mb-1 text-text-secondary ${language === 'hindi' ? 'font-hindi' : 'font-body'}`}>
              {language === 'hindi' ? 'रिश्ता *' : 'Relation *'}
            </label>
            <select 
              value={formData.relation}
              onChange={e => setFormData({...formData, relation: e.target.value})}
              className="w-full bg-surface-light border border-light rounded-lg px-4 py-2 outline-none focus:border-brand-saffron text-primary-light"
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
          
          <div>
            <label className={`block text-sm mb-1 text-text-secondary ${language === 'hindi' ? 'font-hindi' : 'font-body'}`}>
              {language === 'hindi' ? 'लिंग' : 'Gender'}
            </label>
            <select 
              value={formData.gender}
              onChange={e => setFormData({...formData, gender: e.target.value})}
              className="w-full bg-surface-light border border-light rounded-lg px-4 py-2 outline-none focus:border-brand-saffron text-primary-light"
            >
              <option value="male">{language === 'hindi' ? 'पुरुष' : 'Male'}</option>
              <option value="female">{language === 'hindi' ? 'महिला' : 'Female'}</option>
              <option value="other">{language === 'hindi' ? 'अन्य' : 'Other'}</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm mb-1 text-text-secondary ${language === 'hindi' ? 'font-hindi' : 'font-body'}`}>
              {language === 'hindi' ? 'जन्म तिथि' : 'Date of Birth'}
            </label>
            <input 
              type="date" 
              value={formData.dob}
              onChange={e => setFormData({...formData, dob: e.target.value})}
              className="w-full bg-surface-light border border-light rounded-lg px-4 py-2 outline-none focus:border-brand-saffron text-primary-light"
            />
          </div>
          
          <div>
            <label className={`block text-sm mb-1 text-text-secondary ${language === 'hindi' ? 'font-hindi' : 'font-body'}`}>
              {language === 'hindi' ? 'ब्लड ग्रुप' : 'Blood Group'}
            </label>
            <select 
              value={formData.blood_group}
              onChange={e => setFormData({...formData, blood_group: e.target.value})}
              className="w-full bg-surface-light border border-light rounded-lg px-4 py-2 outline-none focus:border-brand-saffron text-primary-light"
            >
              <option value="">{language === 'hindi' ? 'चुनें' : 'Select'}</option>
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex gap-3">
        <button 
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="flex-1 py-3 border border-light rounded-lg font-medium text-text-secondary hover:bg-surface-light transition-colors"
        >
          {language === 'hindi' ? 'रद्द करें' : 'Cancel'}
        </button>
        <button 
          type="submit"
          disabled={loading}
          className="flex-1 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors disabled:opacity-70"
        >
          {loading 
            ? (language === 'hindi' ? 'जोड़ रहे हैं...' : 'Adding...')
            : (language === 'hindi' ? 'सेव करें' : 'Save Member')}
        </button>
      </div>
    </form>
  )
}
