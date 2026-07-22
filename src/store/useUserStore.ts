import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AppUser, DEMO_USER } from '@/lib/constants/demoUser'

interface UserState {
  user: AppUser
  setUser: (user: AppUser) => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: DEMO_USER,
      setUser: (user) => set({ user }),
    }),
    { name: 'user-storage' }
  )
)
