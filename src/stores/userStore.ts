import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ApiUser } from '../services/api';
import { api } from '../services/api';

interface UserStore {
  currentUser: ApiUser | null;
  sessionId: number | null;
  heartbeatInterval: ReturnType<typeof setInterval> | null;
  setCurrentUser: (user: ApiUser | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      currentUser: null,
      sessionId: null,
      heartbeatInterval: null,

      setCurrentUser: (user) => {
        // Clean up previous session if any
        const prev = get();
        if (prev.heartbeatInterval) {
          clearInterval(prev.heartbeatInterval);
        }
        if (prev.sessionId) {
          api.session.end(prev.sessionId);
        }

        if (user) {
          // Start new session
          set({ currentUser: user });
          api.session.start(user.id).then(({ sessionId }) => {
            const interval = setInterval(() => {
              const state = get();
              if (state.sessionId) {
                api.session.heartbeat(state.sessionId);
              }
            }, 60000);
            set({ sessionId, heartbeatInterval: interval });
          }).catch(() => {
            // Session tracking is non-critical
          });
        } else {
          set({ currentUser: null, sessionId: null, heartbeatInterval: null });
        }
      },

      logout: () => {
        const state = get();
        if (state.heartbeatInterval) {
          clearInterval(state.heartbeatInterval);
        }
        if (state.sessionId) {
          api.session.end(state.sessionId);
        }
        set({ currentUser: null, sessionId: null, heartbeatInterval: null });
      },
    }),
    {
      name: 'option-trainer-user',
      partialize: (state) => ({
        currentUser: state.currentUser,
        sessionId: state.sessionId,
      }),
    }
  )
);
