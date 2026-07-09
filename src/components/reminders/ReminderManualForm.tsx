'use client'

import { useState } from 'react'
import { Pill, Calendar, Bell } from 'lucide-react'
import { useLanguageStore } from '@/store/useLanguageStore'

type FormTab = 'medicine' | 'appointment'

export function ReminderManualForm({ onCancel, onSave }: { onCancel: () => void, onSave: (data: any) => void }) {
  const { language } = useLanguageStore()
  const [activeTab, setActiveTab] = useState<FormTab>('medicine')

  // Form states
  const [medicineName, setMedicineName] = useState('')
  const [dosage, setDosage] = useState('')
  const [frequency, setFrequency] = useState('1 time a day')
  const [time, setTime] = useState('08:00')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const [doctorName, setDoctorName] = useState('')
  const [hospital, setHospital] = useState('')
  const [date, setDate] = useState('')
  const [appointmentTime, setAppointmentTime] = useState('')
  const [notes, setNotes] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (activeTab === 'medicine') {
      onSave({
        type: 'medicine',
        medicineName,
        dosage,
        frequency,
        timeLabel: time,
        timeOfDay: 'morning', // simplistic mapping
        days: 'daily',
        startDate,
        endDate
      })
    } else {
      onSave({
        type: 'appointment',
        doctorName,
        hospital,
        date,
        timeLabel: appointmentTime,
        notes
      })
    }
  }

  const inputStyle = {
    width: '100%', backgroundColor: '#F8FAFC', border: '1px solid rgba(10,37,64,0.1)',
    borderRadius: '12px', padding: '14px 16px', fontSize: '15px', color: '#0A2540',
    outline: 'none', transition: 'all 0.2s ease', boxSizing: 'border-box' as const
  }

  const labelStyle = {
    display: 'block', fontSize: '13px', fontWeight: '600', color: '#425466', 
    marginBottom: '8px', textTransform: 'uppercase' as const, letterSpacing: '0.5px'
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Tabs */}
      <div style={{ display: 'flex', background: '#F8FAFC', padding: '4px', borderRadius: '14px', border: '1px solid rgba(10,37,64,0.05)' }}>
        <button
          onClick={() => setActiveTab('medicine')}
          style={{
            flex: 1, padding: '10px', borderRadius: '10px', border: 'none',
            background: activeTab === 'medicine' ? 'white' : 'transparent',
            boxShadow: activeTab === 'medicine' ? '0 2px 8px rgba(10,37,64,0.06)' : 'none',
            color: activeTab === 'medicine' ? '#0A2540' : '#425466',
            fontWeight: activeTab === 'medicine' ? '700' : '500',
            fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            transition: 'all 0.2s ease'
          }}
        >
          <Pill size={16} color={activeTab === 'medicine' ? '#635BFF' : '#425466'} />
          {language === 'hindi' ? 'दवा' : 'Medicine'}
        </button>
        <button
          onClick={() => setActiveTab('appointment')}
          style={{
            flex: 1, padding: '10px', borderRadius: '10px', border: 'none',
            background: activeTab === 'appointment' ? 'white' : 'transparent',
            boxShadow: activeTab === 'appointment' ? '0 2px 8px rgba(10,37,64,0.06)' : 'none',
            color: activeTab === 'appointment' ? '#0A2540' : '#425466',
            fontWeight: activeTab === 'appointment' ? '700' : '500',
            fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            transition: 'all 0.2s ease'
          }}
        >
          <Calendar size={16} color={activeTab === 'appointment' ? '#00D4FF' : '#425466'} />
          {language === 'hindi' ? 'अपॉइंटमेंट' : 'Appointment'}
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {activeTab === 'medicine' && (
          <>
            <div>
              <label style={labelStyle}>{language === 'hindi' ? 'दवा का नाम' : 'Medicine Name'}</label>
              <input required type="text" value={medicineName} onChange={e => setMedicineName(e.target.value)} placeholder="e.g. Paracetamol" style={inputStyle} />
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>{language === 'hindi' ? 'खुराक' : 'Dosage'}</label>
                <input required type="text" value={dosage} onChange={e => setDosage(e.target.value)} placeholder="e.g. 500mg" style={inputStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>{language === 'hindi' ? 'दिन में कितनी बार' : 'Frequency'}</label>
                <select value={frequency} onChange={e => setFrequency(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                  <option value="1 time a day">1 {language === 'hindi' ? 'बार' : 'time a day'}</option>
                  <option value="2 times a day">2 {language === 'hindi' ? 'बार' : 'times a day'}</option>
                  <option value="3 times a day">3 {language === 'hindi' ? 'बार' : 'times a day'}</option>
                  <option value="As needed">{language === 'hindi' ? 'ज़रूरत पर' : 'As needed'}</option>
                </select>
              </div>
            </div>
            
            {/* Multiple Times - simplified for UI */}
            <div>
              <label style={labelStyle}>{language === 'hindi' ? 'रिमाइंडर का समय' : 'Reminder Time(s)'}</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input required type="time" value={time} onChange={e => setTime(e.target.value)} style={{ ...inputStyle, width: 'auto', flex: 1 }} />
                <button type="button" style={{ ...inputStyle, width: 'auto', background: 'transparent', border: '1px dashed rgba(10,37,64,0.2)', color: '#635BFF', fontWeight: '600' }}>+ Add Time</button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>{language === 'hindi' ? 'कब से' : 'Start Date'}</label>
                <input required type="date" value={startDate} onChange={e => setStartDate(e.target.value)} style={inputStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>{language === 'hindi' ? 'कब तक (वैकल्पिक)' : 'End Date (Optional)'}</label>
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} style={inputStyle} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: '#F8FAFC', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: '#E0E7FF', padding: '8px', borderRadius: '8px', color: '#635BFF' }}>
                  <Bell size={18} />
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#0A2540' }}>{language === 'hindi' ? 'पुश नोटिफिकेशन' : 'Push Notification'}</p>
                  <p style={{ margin: 0, fontSize: '12px', color: '#425466' }}>{language === 'hindi' ? 'रिमाइंडर के समय अलर्ट पाएं' : 'Get alerted at reminder time'}</p>
                </div>
              </div>

              <div style={{ width: '44px', height: '24px', background: '#635BFF', borderRadius: '12px', position: 'relative', cursor: 'pointer' }}>
                <div style={{ width: '20px', height: '20px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', right: '2px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
              </div>
            </div>
          </>
        )}

        {activeTab === 'appointment' && (
          <>
            <div>
              <label style={labelStyle}>{language === 'hindi' ? 'डॉक्टर का नाम' : 'Doctor Name'}</label>
              <input required type="text" value={doctorName} onChange={e => setDoctorName(e.target.value)} placeholder="e.g. Dr. Sharma" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>{language === 'hindi' ? 'अस्पताल/क्लिनिक' : 'Hospital/Clinic'}</label>
              <input type="text" value={hospital} onChange={e => setHospital(e.target.value)} placeholder="e.g. City Hospital" style={inputStyle} />
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>{language === 'hindi' ? 'तारीख' : 'Date'}</label>
                <input required type="date" value={date} onChange={e => setDate(e.target.value)} style={inputStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>{language === 'hindi' ? 'समय' : 'Time'}</label>
                <input required type="time" value={appointmentTime} onChange={e => setAppointmentTime(e.target.value)} style={inputStyle} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>{language === 'hindi' ? 'रिमाइंडर दें' : 'Remind Before'}</label>
              <select style={{ ...inputStyle, cursor: 'pointer' }}>
                <option>30 {language === 'hindi' ? 'मिनट पहले' : 'minutes before'}</option>
                <option>1 {language === 'hindi' ? 'घंटे पहले' : 'hour before'}</option>
                <option>1 {language === 'hindi' ? 'दिन पहले' : 'day before'}</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>{language === 'hindi' ? 'नोट्स (वैकल्पिक)' : 'Notes (Optional)'}</label>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder={language === 'hindi' ? 'कुछ और जानकारी...' : 'Any extra information...'} style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} />
            </div>
          </>
        )}

        {/* Form Actions */}
        <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
          <button 
            type="button"
            onClick={onCancel}
            style={{
              flex: 1, padding: '14px', borderRadius: '12px', border: '1px solid rgba(10,37,64,0.1)',
              backgroundColor: 'white', color: '#425466', fontWeight: '600', fontSize: '15px', cursor: 'pointer'
            }}
          >
            {language === 'hindi' ? 'रद्द करें' : 'Cancel'}
          </button>
          <button 
            type="submit"
            style={{
              flex: 1, padding: '14px', borderRadius: '12px', border: 'none',
              background: 'linear-gradient(135deg, #7A73FF 0%, #635BFF 100%)',
              color: 'white', fontWeight: '600', fontSize: '15px',
              cursor: 'pointer', boxShadow: '0 4px 12px rgba(99,91,255,0.25)'
            }}
          >
            {language === 'hindi' ? 'सेव करें' : 'Save Reminder'}
          </button>
        </div>

      </form>
    </div>
  )
}
