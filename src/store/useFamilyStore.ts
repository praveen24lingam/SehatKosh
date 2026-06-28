import { create } from 'zustand'
import { FamilyMember } from '@/types/database'

interface FamilyState {
  members: FamilyMember[]
  selectedMemberId: string | null
  isLoading: boolean
  setMembers: (members: FamilyMember[]) => void
  addMember: (member: FamilyMember) => void
  removeMember: (id: string) => void
  updateMember: (id: string, data: Partial<FamilyMember>) => void
  selectMember: (id: string | null) => void
  setLoading: (loading: boolean) => void
}

export const useFamilyStore = create<FamilyState>((set) => ({
  members: [],
  selectedMemberId: null,
  isLoading: false,
  setMembers: (members) => set({ members }),
  addMember: (member) => set((state) => ({ members: [...state.members, member] })),
  removeMember: (id) =>
    set((state) => ({ members: state.members.filter((m) => m.id !== id) })),
  updateMember: (id, data) =>
    set((state) => ({
      members: state.members.map((m) => (m.id === id ? { ...m, ...data } : m)),
    })),
  selectMember: (id) => set({ selectedMemberId: id }),
  setLoading: (isLoading) => set({ isLoading }),
}))
