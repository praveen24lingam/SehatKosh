'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Shield, Lock, AlertCircle, CheckCircle2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    if (!email) {
      setErrorMsg('Please enter your email address.')
      return
    }
    
    setIsSubmitting(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      })
      
      if (error) throw error
      
      setIsSuccess(true)
    } catch (error: unknown) {
      console.error(error)
      setErrorMsg((error instanceof Error ? error.message : '') || 'Failed to send reset instructions.')
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
              Your Family&apos;s<br/>
              <span style={{ color: '#635BFF' }}>Health Vault.</span>
            </h1>
            <p style={{ fontSize: '20px', color: '#425466', marginBottom: '64px', lineHeight: '1.6', maxWidth: '420px', fontWeight: '400' }}>
              Store prescriptions, get AI-powered medical insights in your local language, and find generic medicines to save thousands every month.
            </p>
            
            {/* Minimal Dashboard Cards */}
            <div style={{ position: 'relative', height: '240px', display: 'none' }} className="md:block">
              {/* Card 1 */}
              <div className="animate-float" style={{ position: 'absolute', top: 0, left: 0, width: '320px', background: '#FAFCFF', border: '1px solid #E6EBF1', borderRadius: '16px', padding: '24px', boxShadow: '0 12px 24px rgba(10,37,64,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #7A73FF 0%, #00D4FF 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', fontWeight: '600' }}>R</div>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: '700', color: '#0A2540' }}>Rahul Sharma</div>
                      <div style={{ fontSize: '13px', color: '#8898AA' }}>Blood Report Synced</div>
                    </div>
                  </div>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#00D924' }}></div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ flex: 1, height: '6px', borderRadius: '4px', background: '#E6EBF1' }}></div>
                  <div style={{ width: '40px', height: '6px', borderRadius: '4px', background: '#635BFF' }}></div>
                </div>
              </div>
              {/* Card 2 */}
              <div className="animate-float-delayed" style={{ position: 'absolute', top: '90px', left: '40px', width: '300px', background: '#FAFCFF', border: '1px solid #E6EBF1', borderRadius: '16px', padding: '16px', boxShadow: '0 12px 24px rgba(10,37,64,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#0A2540' }}>
                  <div style={{ background: 'rgba(0, 217, 36, 0.1)', padding: '8px', borderRadius: '8px' }}>
                    <Shield size={16} strokeWidth={2.5} color="#00D924" />
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: '700' }}>End-to-End Encrypted</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE - FLOATING CARD */}
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
                <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#0A2540', letterSpacing: '-1px', marginBottom: '8px' }}>Reset password</h2>
                <p style={{ color: '#425466', fontSize: '15px', lineHeight: '1.5' }}>Enter your email to receive a password reset link.</p>
              </div>

              {errorMsg && (
                <div style={{ marginBottom: '24px', background: '#FFF0F0', border: '1px solid #FFCDD2', borderRadius: '8px', padding: '12px 16px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <AlertCircle size={18} color="#E02424" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '13px', color: '#E02424', fontWeight: '600', lineHeight: '1.4' }}>{errorMsg}</span>
                </div>
              )}
              
              {isSuccess && (
                <div style={{ marginBottom: '24px', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '8px', padding: '12px 16px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <CheckCircle2 size={18} color="#16A34A" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '13px', color: '#16A34A', fontWeight: '600', lineHeight: '1.4' }}>Reset link sent! Please check your email inbox and spam folder.</span>
                </div>
              )}

              <div className="w-full relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key="email-step"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="w-full"
                  >
                    <form onSubmit={handleResetPassword} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '13px', fontWeight: '700', color: '#0A2540' }}>Email Address</label>
                        <div className="premium-input-container" style={{ display: 'flex', border: '1px solid #E6EBF1', borderRadius: '12px', overflow: 'hidden', background: 'white' }}>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            disabled={isSuccess || isSubmitting}
                            style={{ flex: 1, height: '48px', padding: '0 16px', border: 'none', background: 'transparent', fontSize: '15px', color: '#0A2540', outline: 'none', fontWeight: '500' }}
                          />
                        </div>
                      </div>

                      <button 
                        type="submit" 
                        disabled={isSubmitting || isSuccess}
                        className="premium-btn"
                        style={{ width: '100%', height: '48px', background: (isSubmitting || isSuccess) ? '#E6EBF1' : '#635BFF', color: (isSubmitting || isSuccess) ? '#8898AA' : 'white', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: '700', cursor: (isSubmitting || isSuccess) ? 'not-allowed' : 'pointer', marginTop: '4px' }}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                      </button>
                    </form>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Sub text / Trust Indicators below card */}
            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', opacity: 0.8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '14px', color: '#425466', fontWeight: '500', position: 'relative', zIndex: 50 }}>
                <Link href="/login" style={{ color: '#0A2540', textDecoration: 'none', fontWeight: '700', display: 'inline-flex', alignItems: 'center' }} className="hover:underline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Log In
                </Link>
              </div>
              
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
