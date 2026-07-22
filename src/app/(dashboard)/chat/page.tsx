'use client'

import { useEffect, useRef, useState } from 'react'
import { ChatInput } from '@/components/chat/ChatInput'
import { MessageBubble } from '@/components/chat/MessageBubble'
import { LoadingBubble } from '@/components/chat/LoadingBubble'
import { ChatActionCards } from '@/components/chat/QuickChips'
import { useChatStore } from '@/store/useChatStore'
import { useUserStore } from '@/store/useUserStore'
import { useLanguageStore } from '@/store/useLanguageStore'
import { ChatMessage } from '@/types/chat'
import { Sparkles, Plus } from 'lucide-react'

export default function ChatPage() {
  const { messages, addMessage, isLoading, setLoading, clearChat } = useChatStore()
  const { user } = useUserStore()
  const { language } = useLanguageStore()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  // Bumping this remounts ChatInput, which clears its local draft text and any
  // pending image attachment along with the conversation itself.
  const [sessionKey, setSessionKey] = useState(0)

  const handleNewChat = () => {
    clearChat()
    setSessionKey((k) => k + 1)
  }

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

        /* New Chat bar — sticks to the top of the scrolling message area so it
           stays reachable on desktop and mobile without altering page height. */
        .chat-newchat-bar {
          position: sticky;
          top: -24px;
          z-index: 5;
          display: flex;
          justify-content: flex-end;
          margin: -24px -16px 4px;
          padding: 12px 16px;
          background: rgb(248 250 252 / 0.85);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid rgb(var(--slate-rgb) / 0.06);
        }
        .chat-newchat-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          font-size: 14px;
          font-weight: 600;
          color: var(--primary);
          background: var(--surface);
          border: 1px solid rgb(var(--teal-rgb) / 0.28);
          border-radius: 12px;
          cursor: pointer;
          outline: none;
          transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
        }
        .chat-newchat-btn:hover {
          background: var(--primary);
          color: var(--surface);
          box-shadow: 0 6px 16px rgb(var(--teal-rgb) / 0.22);
        }
        .chat-newchat-btn:active {
          background: var(--primary-hover);
          color: var(--surface);
        }
        .chat-newchat-btn:focus-visible {
          box-shadow: 0 0 0 3px rgb(var(--teal-rgb) / 0.2);
        }

        /* Empty-state scale: one step down on small screens so the heading
           never crowds the cards. */
        .chat-empty-state {
          padding: 24px 0 40px;
        }
        .chat-empty-header {
          margin-bottom: 32px;
        }
        .chat-empty-title {
          font-size: 26px;
          font-weight: 700;
          line-height: 1.25;
          letter-spacing: -0.5px;
          color: var(--foreground);
          margin: 0 0 10px;
        }
        .chat-empty-subtitle {
          font-size: 15px;
          line-height: 1.6;
          color: var(--foreground-secondary);
          max-width: 400px;
          margin: 0;
        }
        @media (max-width: 640px) {
          .chat-empty-state {
            padding: 8px 0 32px;
          }
          .chat-empty-header {
            margin-bottom: 24px;
          }
          .chat-empty-title {
            font-size: 22px;
          }
          .chat-empty-subtitle {
            font-size: 14px;
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
        backgroundColor: 'transparent'
      }}>
        {messages.length > 0 && (
          <div className="chat-newchat-bar">
            <button
              onClick={handleNewChat}
              className="chat-newchat-btn"
              title={language === 'hindi' ? 'नई बात shuru karein' : 'Start a new chat'}
            >
              <Plus size={16} strokeWidth={2.5} />
              <span className={language === 'hindi' ? 'font-hindi' : ''}>
                {language === 'hindi' ? 'नई बात' : 'New Chat'}
              </span>
            </button>
          </div>
        )}

        {messages.length === 0 && (
          <div className="chat-empty-state" style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '720px',
            margin: '0 auto'
          }}>
            <div className="chat-empty-header app-enter" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                background: 'rgb(var(--teal-rgb) / 0.08)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <Sparkles size={26} color="var(--primary)" strokeWidth={1.75} />
              </div>
              <h2 className={`chat-empty-title ${language === 'hindi' ? 'font-hindi' : ''}`}>
                {/* Greet by first name when we have one. */}
                {user?.name
                  ? (language === 'hindi' ? `मैं आपकी कैसे मदद कर सकता हूँ, ${user.name.split(' ')[0]}?` : `How can I help you today, ${user.name.split(' ')[0]}?`)
                  : (language === 'hindi' ? 'मैं आपकी कैसे मदद कर सकता हूँ?' : 'How can I help you today?')}
              </h2>
              <p className={`chat-empty-subtitle ${language === 'hindi' ? 'font-hindi' : ''}`}>
                {language === 'hindi'
                  ? 'अपने स्वास्थ्य से जुड़ा कोई भी सवाल पूछें, या रिपोर्ट की फोटो भेजें।'
                  : 'Ask any health question, or send a photo of your report.'}
              </p>
            </div>

            <ChatActionCards onSelect={(text) => handleSendMessage(text)} />
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
        <ChatInput key={sessionKey} onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  )
}
