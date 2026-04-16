import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const BASE = 'http://localhost:3001/api';

interface AdminStore {
    token: string | null;
    isAuthenticated: boolean;
    login: (password: string) => Promise<boolean>;
    logout: () => void;
}

export const useAdminStore = create<AdminStore>()(
    persist(
        (set) => ({
            token: null,
            isAuthenticated: false,

            login: async (password: string) => {
                try {
                    const res = await fetch(`${BASE}/admin/login`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ password }),
                    });

                    if (!res.ok) {
                        set({ token: null, isAuthenticated: false });
                        return false;
                    }

                    const data = await res.json();
                    set({ token: data.token, isAuthenticated: true });
                    return true;
                } catch {
                    set({ token: null, isAuthenticated: false });
                    return false;
                }
            },

            logout: () => {
                set({ token: null, isAuthenticated: false });
            },
        }),
        { name: 'option-trainer-admin' }
    )
);
