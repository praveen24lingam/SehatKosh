'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Shield, HeartPulse, Lock } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'

export default function LoginPage() {
  const router = useRouter()
  const { setUser } = useAuthStore()
  
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (phone.length < 10) return
    
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        body: JSON.stringify({ phone })
      })
      
      if (!res.ok) throw new Error('Failed to send OTP')
      
      setStep('otp')
    } catch (error) {
      console.error(error)
      alert('Failed to send OTP. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    
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
    const otpValue = otp.join('')
    if (otpValue.length < 6) return
    
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        body: JSON.stringify({ phone, token: otpValue })
      })
      
      if (!res.ok) throw new Error('Failed to verify OTP')
      
      const { user } = await res.json()
      
      setUser({
        id: user.id,
        phone_number: phone,
        name: null, 
        language: 'hindi',
        created_at: new Date().toISOString()
      })
      router.push('/onboarding')
    } catch (error) {
      console.error(error)
      alert('Invalid OTP. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div style={{ background: '#FAFAFA', fontFamily: 'Inter, sans-serif', minHeight: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      
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
          color: #A1A1AA;
        }
        
        .premium-input-container {
          transition: all 0.2s ease;
        }
        .premium-input-container:focus-within {
          border-color: #18181B !important;
          box-shadow: 0 0 0 1px #18181B !important;
        }
        
        .premium-otp-input:focus {
          border-color: #18181B !important;
          box-shadow: 0 0 0 1px #18181B !important;
        }
        
        .premium-btn {
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .premium-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        }
        .premium-btn:active:not(:disabled) {
          transform: translateY(0);
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
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

      {/* SUBTLE RADIAL GLOWS & GLASSMORPHISM */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(99,91,255,0.06) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0, pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', top: '20%', right: '20%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(255,107,107,0.03) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0, pointerEvents: 'none' }}></div>

      {/* GRID PATTERN (Vercel/Linear Vibe) */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.02) 1px, transparent 1px)', backgroundSize: '64px 64px', zIndex: 0, pointerEvents: 'none', maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}></div>

      <div className="login-layout-container">
        
        {/* LEFT SIDE - BRANDING & DETAILS */}
        <div className="login-left-col">
          <Link href="/" style={{ position: 'relative', zIndex: 10, color: '#52525B', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', fontWeight: '500', fontSize: '14px', marginBottom: '80px', transition: 'color 0.2s' }} className="hover:text-black self-start">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <div style={{ position: 'relative', zIndex: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <div style={{ width: '40px', height: '40px', background: 'black', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}>
                <HeartPulse color="white" size={20} strokeWidth={2.5} />
              </div>
              <span style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '-1px', color: 'black' }}>SehatKosh</span>
            </div>

            <h1 style={{ fontSize: '48px', fontWeight: '700', color: '#09090B', lineHeight: '1.1', marginBottom: '24px', letterSpacing: '-2px' }}>
              The modern standard<br/>for health records.
            </h1>
            <p style={{ fontSize: '18px', color: '#52525B', marginBottom: '64px', lineHeight: '1.6', maxWidth: '420px', fontWeight: '400' }}>
              A unified, encrypted vault for your family's medical history, prescriptions, and AI-powered health insights.
            </p>
            
            {/* Minimal Dashboard Cards */}
            <div style={{ position: 'relative', height: '240px', display: 'none' }} className="md:block">
              
              {/* Card 1 */}
              <div className="animate-float" style={{ position: 'absolute', top: 0, left: 0, width: '320px', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '16px', padding: '20px', boxShadow: '0 24px 48px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #18181B 0%, #3F3F46 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', fontWeight: '600' }}>R</div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#09090B' }}>Rahul Sharma</div>
                      <div style={{ fontSize: '12px', color: '#71717A' }}>Blood Report Synced</div>
                    </div>
                  </div>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }}></div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ flex: 1, height: '6px', borderRadius: '4px', background: '#E4E4E7' }}></div>
                  <div style={{ width: '40px', height: '6px', borderRadius: '4px', background: '#18181B' }}></div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="animate-float-delayed" style={{ position: 'absolute', top: '80px', left: '40px', width: '300px', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '16px', padding: '16px', boxShadow: '0 12px 32px rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#09090B' }}>
                  <div style={{ background: '#F4F4F5', padding: '8px', borderRadius: '8px' }}>
                    <Shield size={16} strokeWidth={2.5} color="#18181B" />
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: '600' }}>End-to-End Encrypted</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE - FLOATING LOGIN CARD */}
        <div className="login-right-col">
          <div style={{ width: '100%', maxWidth: '420px' }}>
            
            {/* The Card */}
            <div style={{
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(40px)',
              borderRadius: '24px',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 32px 64px -12px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.02)',
              padding: '48px 40px',
              position: 'relative',
              zIndex: 20
            }}>
              
              <div className="text-center mb-8">
                <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#09090B', letterSpacing: '-1px', marginBottom: '8px' }}>Welcome back</h2>
                <p style={{ color: '#52525B', fontSize: '15px', lineHeight: '1.5' }}>Sign in to your health vault.</p>
              </div>

              <div className="w-full relative">
                <AnimatePresence mode="wait">
                  {step === 'phone' ? (
                    <motion.div
                      key="phone-step"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                      className="w-full"
                    >
                      <button 
                        type="button"
                        onClick={() => alert("Google login integration coming soon!")}
                        style={{ width: '100%', height: '48px', background: 'white', border: '1px solid #E4E4E7', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', fontSize: '14px', fontWeight: '600', color: '#09090B', cursor: 'pointer', transition: 'background 0.2s, box-shadow 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}
                        className="hover:bg-[#F4F4F5]"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                      </button>

                      <div style={{ margin: '24px 0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ flex: 1, height: '1px', background: '#E4E4E7' }} />
                        <span style={{ color: '#A1A1AA', fontSize: '12px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px' }}>or</span>
                        <div style={{ flex: 1, height: '1px', background: '#E4E4E7' }} />
                      </div>

                      <form onSubmit={(e) => {
                        e.preventDefault();
                        if (phone.length < 10) {
                          alert("Please enter a valid 10-digit mobile number to continue.");
                          return;
                        }
                        handleSendOtp(e);
                      }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <label style={{ fontSize: '13px', fontWeight: '600', color: '#09090B' }}>Mobile Number</label>
                          <div className="premium-input-container" style={{ display: 'flex', border: '1px solid #E4E4E7', borderRadius: '12px', overflow: 'hidden', background: 'white' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 16px', color: '#52525B', fontWeight: '500', fontSize: '14px', borderRight: '1px solid #E4E4E7', background: '#FAFAFA' }}>
                              +91
                            </div>
                            <input
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                              placeholder="9876543210"
                              required
                              style={{ flex: 1, height: '48px', padding: '0 16px', border: 'none', background: 'transparent', fontSize: '15px', color: '#09090B', outline: 'none' }}
                            />
                          </div>
                        </div>

                        <button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="premium-btn"
                          style={{ width: '100%', height: '48px', background: isSubmitting ? '#E4E4E7' : '#18181B', color: isSubmitting ? '#A1A1AA' : 'white', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: '600', cursor: isSubmitting ? 'not-allowed' : 'pointer', marginTop: '4px' }}
                        >
                          {isSubmitting ? 'Sending...' : 'Continue'}
                        </button>
                      </form>
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
                        <p style={{ color: '#52525B', fontSize: '14px', lineHeight: '1.6' }}>
                          Enter the 6-digit code sent to<br/>
                          <span style={{ fontWeight: '600', color: '#09090B' }}>+91 {phone}</span>
                          <button 
                            onClick={() => setStep('phone')}
                            style={{ background: 'transparent', border: 'none', color: '#52525B', fontWeight: '500', marginLeft: '8px', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '2px' }}
                          >
                            Edit
                          </button>
                        </p>
                      </div>

                      <form onSubmit={(e) => {
                        e.preventDefault();
                        if (otp.join('').length < 6) {
                          alert("Please enter the full 6-digit OTP.");
                          return;
                        }
                        handleVerifyOtp(e);
                      }} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
                              style={{ width: '100%', height: '56px', textAlign: 'center', fontSize: '20px', fontWeight: '600', color: '#09090B', background: 'white', border: '1px solid #E4E4E7', borderRadius: '12px', outline: 'none', transition: 'all 0.2s ease' }}
                            />
                          ))}
                        </div>

                        <button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="premium-btn"
                          style={{ width: '100%', height: '48px', background: isSubmitting ? '#E4E4E7' : '#18181B', color: isSubmitting ? '#A1A1AA' : 'white', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: '600', cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                        >
                          {isSubmitting ? 'Verifying...' : 'Verify & Login'}
                        </button>

                        <div className="text-center">
                          <p style={{ fontSize: '13px', color: '#71717A' }}>
                            Didn't receive the code?{' '}
                            <button type="button" onClick={() => alert("OTP Resent!")} style={{ background: 'transparent', border: 'none', color: '#18181B', fontWeight: '500', cursor: 'pointer' }} className="hover:underline">
                              Resend (30s)
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
              {step === 'phone' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '13px', color: '#71717A', fontWeight: '500' }}>
                  <a href="#" onClick={(e) => { e.preventDefault(); alert("Forgot password flow coming soon!"); }} style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} className="hover:text-black">Forgot login details?</a>
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#E4E4E7' }}></div>
                  <a href="#" onClick={(e) => { e.preventDefault(); alert("Registration flow coming soon!"); }} style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} className="hover:text-black">Create an account</a>
                </div>
              )}
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#A1A1AA', fontSize: '12px' }}>
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
