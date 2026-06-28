'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/store/useAuthStore'

export default function OnboardingPage() {
  const router = useRouter()
  const { user, setUser } = useAuthStore()
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setIsSubmitting(true)
    // Simulate API call to update user name
    setTimeout(() => {
      setIsSubmitting(false)
      if (user) {
        setUser({ ...user, name })
      }
      router.push('/dashboard')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-surface-light text-primary-light p-4 flex flex-col items-center justify-center">
      <motion.div 
        className="w-full max-w-sm space-y-12"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="text-center space-y-4">
          <div>
            <h1 className="font-body text-2xl font-bold">Aapka swagat hai! 🙏</h1>
            <h1 className="font-hindi text-2xl font-bold text-text-secondary">आपका स्वागत है!</h1>
          </div>
          
          <div className="pt-4">
            <h2 className="font-body text-xl font-medium">Aapka naam kya hai?</h2>
            <h2 className="font-hindi text-xl font-medium text-text-secondary">आपका नाम क्या है?</h2>
          </div>
        </div>

        <form onSubmit={handleContinue} className="space-y-8">
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Apna naam likhein..."
            className="text-lg font-body font-medium h-14 bg-surface-card text-center shadow-sm"
            required
            autoFocus
          />

          <Button 
            type="submit" 
            className="w-full h-12 bg-accent hover:bg-accent/90 text-white font-medium text-lg relative group overflow-hidden shadow-md"
            disabled={!name.trim() || isSubmitting}
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
            {isSubmitting ? 'Bhej rahe hain...' : 'Aage Badhen'} <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </form>
      </motion.div>
    </div>
  )
}
