import { create } from 'zustand'
import { ChatMessage } from '@/types/chat'

interface ChatState {
  messages: ChatMessage[]
  isLoading: boolean
  addMessage: (message: ChatMessage) => void
  setLoading: (loading: boolean) => void
  clearChat: () => void
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isLoading: false,
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setLoading: (isLoading) => set({ isLoading }),
  clearChat: () => set({ messages: [] }),
}))
