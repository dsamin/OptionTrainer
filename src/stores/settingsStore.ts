import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const WATCHED_STOCKS = [
  { symbol: 'NVDA', name: 'NVIDIA' },
  { symbol: 'GOOG', name: 'Google' },
  { symbol: 'META', name: 'Meta' },
  { symbol: 'MELI', name: 'MercadoLibre' },
  { symbol: 'AMZN', name: 'Amazon' },
  { symbol: 'SHOP', name: 'Shopify' },
  { symbol: 'PLTR', name: 'Palantir' },
  { symbol: 'QQQ', name: 'Nasdaq ETF' },
  { symbol: 'HOOD', name: 'Robinhood' },
  { symbol: 'RDDT', name: 'Reddit' },
  { symbol: 'NFLX', name: 'Netflix' },
  { symbol: 'AVGO', name: 'Broadcom' },
] as const

export type WatchedStock = typeof WATCHED_STOCKS[number]['symbol']

interface SettingsState {
  theme: 'dark' | 'light'
  soundEnabled: boolean
  notificationsEnabled: boolean
  preferredStock: WatchedStock
  dailyReminderTime: string | null
  completedOnboarding: boolean

  // Actions
  setTheme: (theme: 'dark' | 'light') => void
  toggleSound: () => void
  toggleNotifications: () => void
  setPreferredStock: (stock: WatchedStock) => void
  setDailyReminderTime: (time: string | null) => void
  completeOnboarding: () => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'dark',
      soundEnabled: true,
      notificationsEnabled: true,
      preferredStock: 'NVDA',
      dailyReminderTime: null,
      completedOnboarding: false,

      setTheme: (theme) => set({ theme }),
      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
      toggleNotifications: () => set((s) => ({ notificationsEnabled: !s.notificationsEnabled })),
      setPreferredStock: (stock) => set({ preferredStock: stock }),
      setDailyReminderTime: (time) => set({ dailyReminderTime: time }),
      completeOnboarding: () => set({ completedOnboarding: true }),
    }),
    {
      name: 'option-trainer-settings',
    }
  )
)
