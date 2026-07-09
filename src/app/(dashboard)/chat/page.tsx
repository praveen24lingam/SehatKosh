'use client'

import { useEffect, useRef, useState } from 'react'
import { ChatInput } from '@/components/chat/ChatInput'
import { MessageBubble } from '@/components/chat/MessageBubble'
import { LoadingBubble } from '@/components/chat/LoadingBubble'
import { ChatActionCards } from '@/components/chat/QuickChips'
import { useChatStore } from '@/store/useChatStore'
import { useAuthStore } from '@/store/useAuthStore'
import { useLanguageStore } from '@/store/useLanguageStore'
import { ChatMessage } from '@/types/chat'
import { Sparkles, MessageCircle, Clock } from 'lucide-react'

export default function ChatPage() {
  const { messages, addMessage, isLoading, setLoading } = useChatStore()
  const { user } = useAuthStore()
  const { language } = useLanguageStore()
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

  return (
    <div className="chat-page-container" style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      fontFamily: 'Inter, sans-serif'
    }}>
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .chat-page-container {
            height: calc(100vh - 72px) !important;
          }
        }
        @media (min-width: 769px) {
          .chat-page-container {
            height: 100vh !important;
          }
        }
      `}} />

      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        backgroundColor: '#F8FAFC'
      }}>
        {messages.length === 0 && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '800px',
            margin: '0 auto',
            padding: '16px 0 32px'
          }}>
            {/* Premium Hero */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              marginBottom: '32px'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: 'linear-gradient(135deg, rgba(99,91,255,0.1) 0%, rgba(0,212,255,0.1) 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                boxShadow: '0 8px 24px rgba(99,91,255,0.08)'
              }}>
                <Sparkles size={32} color="#635BFF" strokeWidth={1.5} />
              </div>
              <h2 style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#0A2540',
                marginBottom: '8px',
                letterSpacing: '-0.5px'
              }}>
                {/* Fallback to 'Dost' (friend) if user name is missing */}
                {user?.name 
                  ? (language === 'hindi' ? `मैं आपकी कैसे मदद कर सकता हूँ, ${user.name.split(' ')[0]}?` : `How can I help you today, ${user.name.split(' ')[0]}?`)
                  : (language === 'hindi' ? 'मैं आपकी कैसे मदद कर सकता हूँ?' : 'How can I help you today?')}
              </h2>
              <p style={{
                color: '#425466',
                fontSize: '16px',
                maxWidth: '420px',
                margin: 0
              }}>
                {language === 'hindi'
                  ? 'अपने स्वास्थ्य से जुड़ा कोई भी सवाल पूछें, या सीधे रिपोर्ट अपलोड करें।'
                  : 'Ask any health-related question, or upload your reports directly.'}
              </p>
            </div>

            {/* Action Cards Grid */}
            <ChatActionCards onSelect={(text) => handleSendMessage(text)} />

            {/* Recent Conversations Placeholder */}
            <div style={{ marginTop: '40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Clock size={16} color="#8898AA" />
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#425466', margin: 0 }}>
                  {language === 'hindi' ? 'हाल की बातचीत' : 'Recent Conversations'}
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { title: language === 'hindi' ? 'रक्त रिपोर्ट विश्लेषण' : 'Blood Report Analysis', date: language === 'hindi' ? 'कल' : 'Yesterday' },
                  { title: language === 'hindi' ? 'पीएम-जय योजना विवरण' : 'PM-JAY Scheme Details', date: language === 'hindi' ? '2 दिन पहले' : '2 days ago' }
                ].map((chat, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px',
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    border: '1px solid rgba(10,37,64,0.06)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 8px rgba(10,37,64,0.02)'
                  }} className="recent-chat-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ padding: '8px', backgroundColor: '#F4F4FF', borderRadius: '8px', color: '#635BFF' }}>
                        <MessageCircle size={18} />
                      </div>
                      <span style={{ fontSize: '15px', fontWeight: '500', color: '#0A2540' }}>{chat.title}</span>
                    </div>
                    <span style={{ fontSize: '13px', color: '#8898AA' }}>{chat.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id}>
            <MessageBubble message={message} />
          </div>
        ))}
        
        {isLoading && <LoadingBubble />}
        <div ref={messagesEndRef} />
      </div>

      <div style={{
        backgroundColor: 'white',
        position: 'sticky',
        bottom: 0,
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  )
}
