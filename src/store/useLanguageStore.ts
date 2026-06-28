import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface LanguageState {
  language: 'hindi' | 'english'
  setLanguage: (lang: 'hindi' | 'english') => void
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'hindi',
      setLanguage: (language) => set({ language }),
    }),
    { name: 'language-storage' }
  )
)
