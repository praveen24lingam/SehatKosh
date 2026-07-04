'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Shield, Lock, AlertCircle, CheckCircle2 } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const router = useRouter()
  const { setUser } = useAuthStore()
  
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('email')
  const [step, setStep] = useState<'phone' | 'otp'>('phone')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isEmailSent, setIsEmailSent] = useState(false)
  
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    if (!email || !password) {
      setErrorMsg('Please enter both email and password.')
      return
    }
    
    setIsSubmitting(true)
    try {
      const supabase = createClient()
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      
      if (error) throw error
      
      if (data.user?.identities?.length === 0) {
        throw new Error('An account with this email already exists. Please log in.')
      }

      setIsEmailSent(true)
    } catch (error: any) {
      console.error(error)
      setErrorMsg(error.message || 'Failed to create account.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    if (phone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.')
      return
    }
    
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      })
      
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to send OTP. Please check Twilio configuration.')
      
      setStep('otp')
    } catch (error: any) {
      console.error(error)
      setErrorMsg(error.message || 'Failed to send OTP. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    
    setErrorMsg('')
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    const otpValue = otp.join('')
    if (otpValue.length < 6) {
      setErrorMsg('Please enter the full 6-digit OTP.')
      return
    }
    
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, token: otpValue })
      })
      
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to verify OTP')
      
      setUser({
        id: data.user.id,
        phone_number: phone,
        name: null, 
        language: 'hindi',
        created_at: new Date().toISOString()
      })
      router.push('/onboarding')
    } catch (error: any) {
      console.error(error)
      setErrorMsg(error.message || 'Invalid OTP. Please try again.')
    } finally {
      setIsSubmitting(false)
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
        .animate-float-delayed {
          animation: float 7s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        input::placeholder {
          color: #8898AA;
        }
        
        .premium-input-container {
          transition: all 0.2s ease;
        }
        .premium-input-container:focus-within {
          border-color: #635BFF !important;
          box-shadow: 0 0 0 1px #635BFF !important;
        }
        
        .premium-otp-input:focus {
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

        .login-layout-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px;
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 10;
        }
        .login-left-col {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-bottom: 48px;
        }
        .login-right-col {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (min-width: 900px) {
          .login-layout-container {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            gap: 80px;
          }
          .login-left-col {
            width: 45%;
            margin-bottom: 0;
          }
          .login-right-col {
            width: 55%;
            justify-content: flex-end;
          }
        }
      `}} />

      {/* Stripe Light Background Pattern */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '100vh', zIndex: 0,
        backgroundSize: '100px 100px',
        backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.02) 1px, transparent 1px)',
        pointerEvents: 'none'
      }}></div>
      <div style={{
        position: 'absolute', top: '-10%', right: '-5%', width: '700px', height: '500px',
        background: 'linear-gradient(135deg, #7A73FF 0%, #00D4FF 100%)',
        transform: 'rotate(-15deg)', opacity: 0.15, filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none', borderRadius: '100px'
      }}></div>

      <div className="login-layout-container">
        
        {/* LEFT SIDE - BRANDING & DETAILS */}
        <div className="login-left-col">
          <Link href="/" style={{ position: 'relative', zIndex: 50, color: '#425466', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', fontWeight: '600', fontSize: '14px', marginBottom: '80px', transition: 'color 0.2s' }} className="hover:text-[#0A2540] self-start">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <div style={{ position: 'relative', zIndex: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <span style={{ color: '#0A2540', fontSize: '28px', fontWeight: '800', letterSpacing: '-1px' }}>SehatKosh</span>
            </div>

            <h1 style={{ fontSize: '48px', fontWeight: '800', color: '#0A2540', lineHeight: '1.05', marginBottom: '24px', letterSpacing: '-1px' }}>
              Your Family's<br/>
              <span style={{ color: '#635BFF' }}>Health Vault.</span>
            </h1>
            <p style={{ fontSize: '20px', color: '#425466', marginBottom: '64px', lineHeight: '1.6', maxWidth: '420px', fontWeight: '400' }}>
              Store prescriptions, get AI-powered medical insights in your local language, and find generic medicines to save thousands every month.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - FLOATING LOGIN CARD */}
        <div className="login-right-col">
          <div style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 20 }}>
            
            {/* The Card */}
            <div style={{
              background: '#F6F9FC',
              borderRadius: '24px',
              border: '1px solid #E6EBF1',
              boxShadow: '0 32px 64px rgba(10,37,64,0.08)',
              padding: '48px 40px',
              position: 'relative'
            }}>
              
              <div className="text-center mb-8">
                <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#0A2540', letterSpacing: '-1px', marginBottom: '8px' }}>Create an account</h2>
                <p style={{ color: '#425466', fontSize: '15px', lineHeight: '1.5' }}>Join thousands of families securing their health.</p>
              </div>

              {errorMsg && (
                <div style={{ marginBottom: '24px', background: '#FFF0F0', border: '1px solid #FFCDD2', borderRadius: '8px', padding: '12px 16px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <AlertCircle size={18} color="#E02424" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '13px', color: '#E02424', fontWeight: '600', lineHeight: '1.4', wordBreak: 'break-word' }}>{errorMsg}</span>
                </div>
              )}
              
              {isEmailSent && (
                <div style={{ marginBottom: '24px', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '8px', padding: '12px 16px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <CheckCircle2 size={18} color="#16A34A" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '13px', color: '#16A34A', fontWeight: '600', lineHeight: '1.4' }}>Account created! Check your email for the confirmation link.</span>
                </div>
              )}

              <div className="w-full relative">
                <AnimatePresence mode="wait">
                  {authMethod === 'email' ? (
                    <motion.div
                      key="email-step"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                      className="w-full"
                    >
                      <form onSubmit={handleEmailSignup} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <label style={{ fontSize: '13px', fontWeight: '700', color: '#0A2540' }}>Email Address</label>
                          <div className="premium-input-container" style={{ display: 'flex', border: '1px solid #E6EBF1', borderRadius: '12px', overflow: 'hidden', background: 'white' }}>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="you@example.com"
                              required
                              disabled={isEmailSent}
                              style={{ flex: 1, height: '48px', padding: '0 16px', border: 'none', background: 'transparent', fontSize: '15px', color: '#0A2540', outline: 'none', fontWeight: '500' }}
                            />
                          </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <label style={{ fontSize: '13px', fontWeight: '700', color: '#0A2540' }}>Password</label>
                          <div className="premium-input-container" style={{ display: 'flex', border: '1px solid #E6EBF1', borderRadius: '12px', overflow: 'hidden', background: 'white' }}>
                            <input
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="••••••••"
                              required
                              disabled={isEmailSent}
                              style={{ flex: 1, height: '48px', padding: '0 16px', border: 'none', background: 'transparent', fontSize: '15px', color: '#0A2540', outline: 'none', fontWeight: '500' }}
                            />
                          </div>
                        </div>

                        <button 
                          type="submit" 
                          disabled={isSubmitting || isEmailSent}
                          className="premium-btn"
                          style={{ width: '100%', height: '48px', background: (isSubmitting || isEmailSent) ? '#E6EBF1' : '#635BFF', color: (isSubmitting || isEmailSent) ? '#8898AA' : 'white', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: '700', cursor: (isSubmitting || isEmailSent) ? 'not-allowed' : 'pointer', marginTop: '8px' }}
                        >
                          {isSubmitting ? 'Creating account...' : 'Sign Up'}
                        </button>
                      </form>

                      <div className="text-center" style={{ marginTop: '24px' }}>
                        <button type="button" onClick={() => { setAuthMethod('phone'); setErrorMsg(''); setIsEmailSent(false); }} style={{ background: 'transparent', border: 'none', color: '#425466', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }} className="hover:text-[#0A2540]">
                          Use Phone Number instead
                        </button>
                      </div>
                    </motion.div>
                  ) : step === 'phone' ? (
                    <motion.div
                      key="phone-step"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                      className="w-full"
                    >
                      <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <label style={{ fontSize: '13px', fontWeight: '700', color: '#0A2540' }}>Mobile Number</label>
                          <div className="premium-input-container" style={{ display: 'flex', border: '1px solid #E6EBF1', borderRadius: '12px', overflow: 'hidden', background: 'white' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 16px', color: '#425466', fontWeight: '600', fontSize: '14px', borderRight: '1px solid #E6EBF1', background: '#FAFCFF' }}>
                              +91
                            </div>
                            <input
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                              placeholder="9876543210"
                              required
                              style={{ flex: 1, height: '48px', padding: '0 16px', border: 'none', background: 'transparent', fontSize: '15px', color: '#0A2540', outline: 'none', fontWeight: '500' }}
                            />
                          </div>
                        </div>

                        <button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="premium-btn"
                          style={{ width: '100%', height: '48px', background: isSubmitting ? '#E6EBF1' : '#635BFF', color: isSubmitting ? '#8898AA' : 'white', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: '700', cursor: isSubmitting ? 'not-allowed' : 'pointer', marginTop: '4px' }}
                        >
                          {isSubmitting ? 'Sending...' : 'Continue'}
                        </button>
                      </form>

                      <div className="text-center" style={{ marginTop: '24px' }}>
                        <button type="button" onClick={() => { setAuthMethod('email'); setErrorMsg(''); }} style={{ background: 'transparent', border: 'none', color: '#425466', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }} className="hover:text-[#0A2540]">
                          Use Email instead
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="otp-step"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                      className="w-full"
                    >
                      <div className="text-center mb-8">
                        <p style={{ color: '#425466', fontSize: '14px', lineHeight: '1.6' }}>
                          Enter the 6-digit code sent to<br/>
                          <span style={{ fontWeight: '700', color: '#0A2540' }}>+91 {phone}</span>
                          <button 
                            type="button"
                            onClick={() => { setStep('phone'); setErrorMsg(''); }}
                            style={{ background: 'transparent', border: 'none', color: '#635BFF', fontWeight: '700', marginLeft: '8px', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '2px' }}
                          >
                            Edit
                          </button>
                        </p>
                      </div>

                      <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                          {otp.map((digit, index) => (
                            <input
                              key={index}
                              ref={(el) => { otpRefs.current[index] = el }}
                              type="text"
                              inputMode="numeric"
                              value={digit}
                              onChange={(e) => handleOtpChange(index, e.target.value)}
                              onKeyDown={(e) => handleOtpKeyDown(index, e)}
                              maxLength={1}
                              autoFocus={index === 0}
                              className="premium-otp-input"
                              style={{ width: '100%', height: '56px', textAlign: 'center', fontSize: '20px', fontWeight: '700', color: '#0A2540', background: 'white', border: '1px solid #E6EBF1', borderRadius: '12px', outline: 'none', transition: 'all 0.2s ease' }}
                            />
                          ))}
                        </div>

                        <button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="premium-btn"
                          style={{ width: '100%', height: '48px', background: isSubmitting ? '#E6EBF1' : '#635BFF', color: isSubmitting ? '#8898AA' : 'white', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: '700', cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                        >
                          {isSubmitting ? 'Verifying...' : 'Verify & Sign Up'}
                        </button>

                        <div className="text-center">
                          <p style={{ fontSize: '13px', color: '#8898AA', fontWeight: '500' }}>
                            Didn't receive the code?{' '}
                            <button type="button" onClick={handleSendOtp} disabled={isSubmitting} style={{ background: 'transparent', border: 'none', color: '#635BFF', fontWeight: '700', cursor: isSubmitting ? 'not-allowed' : 'pointer' }} className="hover:underline">
                              Resend OTP
                            </button>
                          </p>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
            </div>

            {/* Sub text / Trust Indicators below card */}
            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', opacity: 0.8 }}>
              {step !== 'otp' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '14px', color: '#425466', fontWeight: '500', position: 'relative', zIndex: 50 }}>
                  <span>Already have an account? <Link href="/login" style={{ color: '#0A2540', textDecoration: 'none', fontWeight: '700', display: 'inline-block' }} className="hover:underline">Log In</Link></span>
                </div>
              )}
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#8898AA', fontSize: '12px', fontWeight: '600', marginTop: '8px' }}>
                <Lock size={12} />
                Secured by 256-bit AES encryption
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
