'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowRight, User, Calendar, Activity, 
  Heart, Flame, Coffee, Target, ShieldCheck
} from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'
import { createClient } from '@/lib/supabase/client'

const steps = [
  { id: 1, title: 'Welcome' },
  { id: 2, title: 'Personal Details' },
  { id: 3, title: 'Health Profile' },
  { id: 4, title: 'Lifestyle' },
  { id: 5, title: 'Medical History' },
  { id: 6, title: 'Goals' },
  { id: 7, title: 'Review' }
]

export default function OnboardingPage() {
  const router = useRouter()
  const { user, setUser } = useAuthStore()
  
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  // Form Data
  const [formData, setFormData] = useState({
    name: user?.name || '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    bloodGroup: '',
    activityLevel: '',
    diet: '',
    sleep: '',
    conditions: [] as string[],
    allergies: '',
    primaryGoal: ''
  })

  const updateData = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleCondition = (condition: string) => {
    setFormData(prev => ({
      ...prev,
      conditions: prev.conditions.includes(condition) 
        ? prev.conditions.filter(c => c !== condition)
        : [...prev.conditions, condition]
    }))
  }

  const handleNext = () => {
    if (step < 7) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleFinish = async () => {
    setErrorMsg('')
    setIsSubmitting(true)
    try {
      const supabase = createClient()
      
      const { data: userData, error } = await supabase.auth.updateUser({
        data: { 
          full_name: formData.name,
          onboarding_data: formData 
        }
      })

      if (error) throw error

      if (userData?.user) {
        // Safety net: ensure user exists in public.users table
        const { error: insertError } = await supabase.from('users').insert({
          id: userData.user.id,
          email: userData.user.email,
        })
        if (insertError && insertError.code !== '23505') {
          console.error("Failed to insert user into users table", insertError)
        }
      }

      if (user) {
        setUser({ ...user, name: formData.name })
      }
      router.push('/dashboard')
    } catch (error: unknown) {
      console.error('Failed to update profile:', error)
      setErrorMsg((error instanceof Error ? error.message : '') || 'Failed to save your profile. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Common Button Styles (Inline CSS Objects)
  const primaryBtnStyle: React.CSSProperties = {
    width: '100%',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    backgroundColor: '#635BFF',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontWeight: '700',
    fontSize: '15px',
    cursor: 'pointer',
    outline: 'none'
  }

  const secondaryBtnStyle: React.CSSProperties = {
    width: '100%',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    backgroundColor: '#F6F9FC',
    color: '#425466',
    border: '1px solid #E6EBF1',
    borderRadius: '12px',
    fontWeight: '700',
    fontSize: '15px',
    cursor: 'pointer',
    outline: 'none'
  }

  const getPrimaryBtnStyle = (disabled: boolean): React.CSSProperties => ({
    ...primaryBtnStyle,
    backgroundColor: disabled ? '#E6EBF1' : '#635BFF',
    color: disabled ? '#8898AA' : 'white',
    cursor: disabled ? 'not-allowed' : 'pointer'
  })

  // Select Option Style
  interface OptionCardProps {
    selected: boolean
    onClick: () => void
    icon: React.ElementType
    title: string
    desc: string
  }
  const OptionCard = ({ selected, onClick, icon: Icon, title, desc }: OptionCardProps) => (
    <div 
      onClick={onClick}
      style={{
        padding: '16px',
        borderRadius: '12px',
        border: selected ? '2px solid #635BFF' : '2px solid #E6EBF1',
        backgroundColor: selected ? '#F4F4FF' : 'white',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'start',
        gap: '16px',
        boxShadow: selected ? '0 4px 12px rgba(99,91,255,0.08)' : 'none'
      }}
      className="hover-lift"
    >
      <div style={{
        padding: '8px',
        borderRadius: '8px',
        backgroundColor: selected ? '#635BFF' : '#F6F9FC',
        color: selected ? 'white' : '#8898AA',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Icon size={20} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{
          fontWeight: '700',
          fontSize: '15px',
          color: selected ? '#635BFF' : '#0A2540'
        }}>{title}</div>
        <div style={{
          fontSize: '13px',
          color: '#425466',
          marginTop: '4px',
          lineHeight: '1.4'
        }}>{desc}</div>
      </div>
    </div>
  )

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ textAlign: 'center', marginBottom: '8px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #7A73FF 0%, #00D4FF 100%)',
                borderRadius: '50%',
                margin: '0 auto 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                boxShadow: '0 8px 24px rgba(99,91,255,0.25)'
              }}>
                <Heart size={32} />
              </div>
              <h2 style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#0A2540',
                letterSpacing: '-1px',
                marginBottom: '12px'
              }}>Welcome to SehatKosh</h2>
              <p style={{
                color: '#425466',
                fontSize: '16px',
                lineHeight: '1.6',
                maxWidth: '400px',
                margin: '0 auto'
              }}>
                Let&apos;s set up your personalized health vault. We just need a few details to tailor the experience for you.
              </p>
            </div>
            <button onClick={handleNext} style={primaryBtnStyle} className="premium-btn">
              Let&apos;s get started <ArrowRight size={18} />
            </button>
          </div>
        )
      case 2:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ textAlign: 'center', marginBottom: '8px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0A2540', letterSpacing: '-0.5px', marginBottom: '8px' }}>Personal Details</h2>
              <p style={{ color: '#425466', fontSize: '15px' }}>Basic information about you.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#0A2540' }}>Full Name</label>
                <div className="premium-input-container" style={{ display: 'flex', alignItems: 'center', border: '1px solid #E6EBF1', borderRadius: '12px', background: 'white', padding: '0 16px', height: '48px' }}>
                  <User size={18} style={{ color: '#8898AA', marginRight: '12px' }} />
                  <input 
                    type="text" 
                    value={formData.name} 
                    onChange={e => updateData('name', e.target.value)} 
                    placeholder="Apna naam likhein..." 
                    style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '15px', color: '#0A2540', fontWeight: '500' }} 
                  />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '700', color: '#0A2540' }}>Age</label>
                  <div className="premium-input-container" style={{ display: 'flex', alignItems: 'center', border: '1px solid #E6EBF1', borderRadius: '12px', background: 'white', padding: '0 16px', height: '48px' }}>
                    <Calendar size={18} style={{ color: '#8898AA', marginRight: '12px' }} />
                    <input 
                      type="number" 
                      value={formData.age} 
                      onChange={e => updateData('age', e.target.value)} 
                      placeholder="e.g. 30" 
                      style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '15px', color: '#0A2540', fontWeight: '500' }} 
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '700', color: '#0A2540' }}>Gender</label>
                  <div className="premium-input-container" style={{ display: 'flex', alignItems: 'center', border: '1px solid #E6EBF1', borderRadius: '12px', background: 'white', padding: '0 16px', height: '48px', position: 'relative' }}>
                    <select 
                      value={formData.gender} 
                      onChange={e => updateData('gender', e.target.value)} 
                      style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontSize: '15px', color: '#0A2540', fontWeight: '500', appearance: 'none', cursor: 'pointer' }}
                    >
                      <option value="" disabled>Select...</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    <div style={{ position: 'absolute', right: '16px', pointerEvents: 'none', color: '#8898AA', fontSize: '12px' }}>▼</div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', paddingTop: '16px' }}>
              <button onClick={handleBack} style={secondaryBtnStyle} className="premium-btn">Back</button>
              <button 
                onClick={handleNext} 
                disabled={!formData.name} 
                style={getPrimaryBtnStyle(!formData.name)} 
                className="premium-btn"
              >
                Continue
              </button>
            </div>
          </div>
        )
      case 3:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ textAlign: 'center', marginBottom: '8px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0A2540', letterSpacing: '-0.5px', marginBottom: '8px' }}>Health Profile</h2>
              <p style={{ color: '#425466', fontSize: '15px' }}>Help us calculate your BMI and insights.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '700', color: '#0A2540' }}>Height (cm)</label>
                  <div className="premium-input-container" style={{ display: 'flex', alignItems: 'center', border: '1px solid #E6EBF1', borderRadius: '12px', background: 'white', padding: '0 16px', height: '48px' }}>
                    <input 
                      type="number" 
                      value={formData.height} 
                      onChange={e => updateData('height', e.target.value)} 
                      placeholder="170" 
                      style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '15px', color: '#0A2540', fontWeight: '500' }} 
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '700', color: '#0A2540' }}>Weight (kg)</label>
                  <div className="premium-input-container" style={{ display: 'flex', alignItems: 'center', border: '1px solid #E6EBF1', borderRadius: '12px', background: 'white', padding: '0 16px', height: '48px' }}>
                    <input 
                      type="number" 
                      value={formData.weight} 
                      onChange={e => updateData('weight', e.target.value)} 
                      placeholder="70" 
                      style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '15px', color: '#0A2540', fontWeight: '500' }} 
                    />
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#0A2540' }}>Blood Group</label>
                <div className="premium-input-container" style={{ display: 'flex', alignItems: 'center', border: '1px solid #E6EBF1', borderRadius: '12px', background: 'white', padding: '0 16px', height: '48px', position: 'relative' }}>
                  <select 
                    value={formData.bloodGroup} 
                    onChange={e => updateData('bloodGroup', e.target.value)} 
                    style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontSize: '15px', color: '#0A2540', fontWeight: '500', appearance: 'none', cursor: 'pointer' }}
                  >
                    <option value="" disabled>Select...</option>
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                  <div style={{ position: 'absolute', right: '16px', pointerEvents: 'none', color: '#8898AA', fontSize: '12px' }}>▼</div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', paddingTop: '16px' }}>
              <button onClick={handleBack} style={secondaryBtnStyle} className="premium-btn">Back</button>
              <button onClick={handleNext} style={getPrimaryBtnStyle(false)} className="premium-btn">Continue</button>
            </div>
          </div>
        )
      case 4:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ textAlign: 'center', marginBottom: '8px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0A2540', letterSpacing: '-0.5px', marginBottom: '8px' }}>Lifestyle</h2>
              <p style={{ color: '#425466', fontSize: '15px' }}>Daily habits shape your health.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <OptionCard 
                selected={formData.activityLevel === 'low'} 
                onClick={() => updateData('activityLevel', 'low')} 
                icon={Coffee} title="Low Activity" desc="Desk job, little to no exercise." 
              />
              <OptionCard 
                selected={formData.activityLevel === 'moderate'} 
                onClick={() => updateData('activityLevel', 'moderate')} 
                icon={Activity} title="Moderate" desc="Light exercise 2-3 times a week." 
              />
              <OptionCard 
                selected={formData.activityLevel === 'high'} 
                onClick={() => updateData('activityLevel', 'high')} 
                icon={Flame} title="Very Active" desc="Intense exercise 4+ times a week." 
              />
            </div>
            <div style={{ display: 'flex', gap: '12px', paddingTop: '16px' }}>
              <button onClick={handleBack} style={secondaryBtnStyle} className="premium-btn">Back</button>
              <button onClick={handleNext} style={getPrimaryBtnStyle(false)} className="premium-btn">Continue</button>
            </div>
          </div>
        )
      case 5:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ textAlign: 'center', marginBottom: '8px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0A2540', letterSpacing: '-0.5px', marginBottom: '8px' }}>Medical History</h2>
              <p style={{ color: '#425466', fontSize: '15px' }}>Select any existing conditions.</p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {['Diabetes', 'Hypertension', 'Asthma', 'Thyroid', 'Cholesterol', 'None'].map(condition => {
                const isSelected = formData.conditions.includes(condition) || (condition === 'None' && formData.conditions.length === 0);
                return (
                  <button
                    key={condition}
                    onClick={() => condition === 'None' ? updateData('conditions', []) : toggleCondition(condition)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '999px',
                      border: isSelected ? '1px solid #635BFF' : '1px solid #E6EBF1',
                      backgroundColor: isSelected ? '#635BFF' : 'white',
                      color: isSelected ? 'white' : '#425466',
                      fontWeight: '700',
                      fontSize: '14px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      outline: 'none'
                    }}
                    className="hover-lift"
                  >
                    {condition}
                  </button>
                )
              })}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '16px' }}>
              <label style={{ fontSize: '13px', fontWeight: '700', color: '#0A2540' }}>Any Allergies? (Optional)</label>
              <div className="premium-input-container" style={{ display: 'flex', alignItems: 'center', border: '1px solid #E6EBF1', borderRadius: '12px', background: 'white', padding: '0 16px', height: '48px' }}>
                <input 
                  type="text" 
                  value={formData.allergies} 
                  onChange={e => updateData('allergies', e.target.value)} 
                  placeholder="E.g. Peanuts, Penicillin..." 
                  style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '15px', color: '#0A2540', fontWeight: '500' }} 
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', paddingTop: '16px' }}>
              <button onClick={handleBack} style={secondaryBtnStyle} className="premium-btn">Back</button>
              <button onClick={handleNext} style={getPrimaryBtnStyle(false)} className="premium-btn">Continue</button>
            </div>
          </div>
        )
      case 6:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ textAlign: 'center', marginBottom: '8px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0A2540', letterSpacing: '-0.5px', marginBottom: '8px' }}>Your Goal</h2>
              <p style={{ color: '#425466', fontSize: '15px' }}>What do you want to achieve?</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <OptionCard 
                selected={formData.primaryGoal === 'lose_weight'} 
                onClick={() => updateData('primaryGoal', 'lose_weight')} 
                icon={Flame} title="Lose Weight" desc="Reduce body fat safely." 
              />
              <OptionCard 
                selected={formData.primaryGoal === 'maintain'} 
                onClick={() => updateData('primaryGoal', 'maintain')} 
                icon={ShieldCheck} title="Maintain Health" desc="Keep my current fitness level." 
              />
              <OptionCard 
                selected={formData.primaryGoal === 'muscle'} 
                onClick={() => updateData('primaryGoal', 'muscle')} 
                icon={Target} title="Build Muscle" desc="Gain strength and mass." 
              />
            </div>
            <div style={{ display: 'flex', gap: '12px', paddingTop: '16px' }}>
              <button onClick={handleBack} style={secondaryBtnStyle} className="premium-btn">Back</button>
              <button onClick={handleNext} style={getPrimaryBtnStyle(false)} className="premium-btn">Review</button>
            </div>
          </div>
        )
      case 7:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ textAlign: 'center', marginBottom: '8px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                backgroundColor: 'rgba(0, 217, 36, 0.1)',
                color: '#00D924',
                borderRadius: '50%',
                margin: '0 auto 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0, 217, 36, 0.1)'
              }}>
                <ShieldCheck size={32} />
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0A2540', letterSpacing: '-0.5px', marginBottom: '8px' }}>All Set, {formData.name || 'Friend'}!</h2>
              <p style={{ color: '#425466', fontSize: '15px' }}>Review your details before finishing.</p>
            </div>
            <div style={{ backgroundColor: '#FAFCFF', border: '1px solid #E6EBF1', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E6EBF1', paddingBottom: '8px' }}>
                <span style={{ color: '#8898AA', fontWeight: '500' }}>Age & Gender</span>
                <span style={{ color: '#0A2540', fontWeight: '700' }}>{formData.age || '-'} / {formData.gender ? formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1) : '-'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E6EBF1', paddingBottom: '8px' }}>
                <span style={{ color: '#8898AA', fontWeight: '500' }}>BMI Metrics</span>
                <span style={{ color: '#0A2540', fontWeight: '700' }}>{formData.height || '-'} cm / {formData.weight || '-'} kg</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#8898AA', fontWeight: '500' }}>Primary Goal</span>
                <span style={{ color: '#0A2540', fontWeight: '700', textTransform: 'capitalize' }}>{formData.primaryGoal ? formData.primaryGoal.replace('_', ' ') : '-'}</span>
              </div>
            </div>
            {errorMsg && (
              <div style={{ padding: '12px', backgroundColor: '#FFF0F0', border: '1px solid #FFCDD2', borderRadius: '8px', fontSize: '13px', color: '#E02424', fontWeight: '600', textAlign: 'center' }}>
                {errorMsg}
              </div>
            )}
            <div style={{ display: 'flex', gap: '12px', paddingTop: '16px' }}>
              <button onClick={handleBack} style={secondaryBtnStyle} className="premium-btn">Edit Details</button>
              <button 
                onClick={handleFinish} 
                disabled={isSubmitting} 
                style={getPrimaryBtnStyle(false)} 
                className="premium-btn"
              >
                {isSubmitting ? 'Saving...' : 'Finish & Go to Dashboard'}
              </button>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div style={{ background: '#EAEFF5', fontFamily: 'Inter, sans-serif', color: '#0A2540', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .hover-lift {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .hover-lift:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(10,37,64,0.06) !important;
        }
        
        .premium-input-container {
          transition: all 0.2s ease;
        }
        .premium-input-container:focus-within {
          border-color: #635BFF !important;
          box-shadow: 0 0 0 1px #635BFF !important;
        }
        
        .premium-btn {
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .premium-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(99,91,255,0.25);
        }
        .premium-btn:active:not(:disabled) {
          transform: translateY(0);
          box-shadow: 0 2px 8px rgba(99,91,255,0.15);
        }
      `}} />

      {/* Stripe Light Background Pattern */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '100vh', zIndex: 0,
        backgroundSize: '100px 100px',
        backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.02) 1px, transparent 1px)',
        pointerEvents: 'none'
      }}></div>
      
      {/* Decorative Gradient Blobs */}
      <div style={{
        position: 'absolute', top: '-10%', right: '-5%', width: '700px', height: '500px',
        background: 'linear-gradient(135deg, #7A73FF 0%, #00D4FF 100%)',
        transform: 'rotate(-15deg)', opacity: 0.15, filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none', borderRadius: '100px'
      }}></div>
      <div style={{
        position: 'absolute', bottom: '-10%', left: '-5%', width: '600px', height: '400px',
        background: 'linear-gradient(135deg, #00D4FF 0%, #7A73FF 100%)',
        transform: 'rotate(15deg)', opacity: 0.1, filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none', borderRadius: '100px'
      }}></div>

      <div style={{ width: '100%', maxWidth: '480px', padding: '24px', position: 'relative', zIndex: 10 }}>
        
        {/* Progress Tracker */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '32px' }}>
          {steps.map(s => {
            const isActive = s.id === step;
            const isCompleted = s.id < step;
            return (
              <div 
                key={s.id} 
                style={{
                  height: '6px',
                  borderRadius: '3px',
                  transition: 'all 0.3s ease',
                  width: isActive ? '32px' : '16px',
                  backgroundColor: isActive ? '#635BFF' : isCompleted ? 'rgba(99, 91, 255, 0.6)' : '#E6EBF1'
                }}
              />
            )
          })}
        </div>

        {/* The Card */}
        <div style={{
          background: 'white',
          borderRadius: '24px',
          border: '1px solid #E6EBF1',
          boxShadow: '0 32px 64px rgba(10, 37, 64, 0.08)',
          padding: '48px 40px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <button 
            onClick={handleFinish} 
            style={{
              background: 'transparent',
              border: 'none',
              color: '#8898AA',
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'color 0.2s'
            }}
            className="hover:text-[#0A2540]"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  )
}
