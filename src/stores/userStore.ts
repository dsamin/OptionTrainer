import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ApiUser } from '../services/api';

interface UserStore {
  currentUser: ApiUser | null;
  setCurrentUser: (user: ApiUser | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      currentUser: null,
      setCurrentUser: (user) => set({ currentUser: user }),
      logout: () => set({ currentUser: null }),
    }),
    { name: 'option-trainer-user' }
  )
);
