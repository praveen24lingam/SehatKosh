import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SettingsState {
  notificationsEnabled: boolean
  dataSharingEnabled: boolean
  setNotificationsEnabled: (enabled: boolean) => void
  setDataSharingEnabled: (enabled: boolean) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      notificationsEnabled: true,
      dataSharingEnabled: false,
      setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),
      setDataSharingEnabled: (enabled) => set({ dataSharingEnabled: enabled }),
    }),
    {
      name: 'sehat-kosh-settings',
    }
  )
)
