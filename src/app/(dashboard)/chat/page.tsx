'use client'

import { useEffect, useRef, useState } from 'react'
import { ChatInput } from '@/components/chat/ChatInput'
import { MessageBubble } from '@/components/chat/MessageBubble'
import { LoadingBubble } from '@/components/chat/LoadingBubble'
import { QuickChips } from '@/components/chat/QuickChips'
import { useChatStore } from '@/store/useChatStore'
import { useAuthStore } from '@/store/useAuthStore'
import { ChatMessage } from '@/types/chat'
import { BloodReportCard } from '@/components/chat/cards/BloodReportCard'
import { JanAushadhiCard } from '@/components/chat/cards/JanAushadhiCard'
import { YojanaCard } from '@/components/chat/cards/YojanaCard'
import { MedicineInfoCard } from '@/components/chat/cards/MedicineInfoCard'
import { HandwrittenRejectCard } from '@/components/chat/cards/HandwrittenRejectCard'

export default function ChatPage() {
  const { messages, addMessage, isLoading, setLoading } = useChatStore()
  const { user } = useAuthStore()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  const handleSendMessage = async (text: string, imageBase64?: string) => {
    if (!text && !imageBase64) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      messageType: imageBase64 ? 'image' : 'text',
      timestamp: new Date(),
      imageUrl: imageBase64
    }

    addMessage(userMessage)
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          messageType: imageBase64 ? 'image' : 'text',
          imageBase64,
          userId: user?.id,
          conversationHistory: messages
        })
      })

      const data = await response.json()

      if (data.success) {
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response,
          messageType: 'text',
          timestamp: new Date(),
          responseType: data.responseType,
          data: data.data
        }
        addMessage(assistantMessage)
      } else {
        throw new Error(data.error || 'Failed to get response')
      }
    } catch (error) {
      console.error('Chat error:', error)
      addMessage({
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Maaf karein, kuch error aagaya. Kripya thodi der baad koshish karein.',
        messageType: 'text',
        timestamp: new Date()
      })
    } finally {
      setLoading(false)
    }
  }

  const renderCustomCard = (message: ChatMessage) => {
    if (!message.responseType) return null
    
    // For MVP, we render mock cards based on responseType to demonstrate the UI
    // In production, the data would come from message.data parsed from Gemini
    
    switch (message.responseType) {
      case 'document_analysis':
        return (
          <BloodReportCard 
            summary="Aapki blood report mein Vitamin B12 aur D3 ki kami hai. Baaki sab normal lag raha hai."
            abnormalValues={[
              { name: 'Vitamin B12', value: '180 pg/mL', range: '200-900 pg/mL' },
              { name: 'Vitamin D3', value: '15 ng/mL', range: '30-100 ng/mL' }
            ]}
            doctorConsultation="Yes (Physician se miliye)"
          />
        )
      case 'jan_aushadhi':
        return (
          <JanAushadhiCard 
            brandedName="Telma 40 (Telmisartan)"
            genericName="Telmisartan 40mg"
            savings="₹180 / month"
            storeLink="https://janaushadhi.gov.in/KendraDetails.aspx"
          />
        )
      case 'yojana':
        return (
          <YojanaCard 
            schemes={[
              {
                name: 'Ayushman Bharat (PM-JAY)',
                amount: '₹5,00,000/year',
                reason: 'Aapki aay aur BPL card ke aadhar par',
                link: 'https://pmjay.gov.in/'
              }
            ]}
          />
        )
      case 'medicine_info':
        return (
          <MedicineInfoCard 
            name="Paracetamol 500mg"
            uses="Bukhaar aur dard kam karne ke liye"
            sideEffects="Liver pe asar (agar zyada dose li jaye)"
            whenToTake="Khana khane ke baad, din mein 2-3 baar zaroorat padne par"
          />
        )
      case 'handwritten_reject':
        return <HandwrittenRejectCard />
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col h-full h-[calc(100vh-64px-72px)] md:h-screen">
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-surface-light">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🤖</span>
            </div>
            <h2 className="text-xl font-display font-semibold text-primary-light mb-2">
              Sehat Saathi
            </h2>
            <p className="text-text-secondary font-body max-w-sm">
              Main aapka AI Health Assistant hoon. Report bhejein, dawai ke baare mein poochhein, ya yojana dhoondein.
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id}>
            <MessageBubble message={message} />
            {message.role === 'assistant' && renderCustomCard(message)}
          </div>
        ))}
        
        {isLoading && <LoadingBubble />}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-surface-card sticky bottom-0 border-t border-light">
        {messages.length === 0 && <QuickChips onSelect={(text) => handleSendMessage(text)} />}
        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  )
}
