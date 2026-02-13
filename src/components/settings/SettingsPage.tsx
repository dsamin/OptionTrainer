import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Settings,
    Sun,
    Moon,
    Volume2,
    VolumeX,
    Bell,
    BellOff,
    TrendingUp,
    RotateCcw,
    AlertTriangle,
    Palette,
    ChevronDown
} from 'lucide-react'
import { useSettingsStore, WATCHED_STOCKS, type WatchedStock } from '../../stores/settingsStore'
import { useProgressStore } from '../../stores/progressStore'
import { cn } from '../../lib/utils'

export function SettingsPage() {
    const {
        theme,
        soundEnabled,
        notificationsEnabled,
        preferredStock,
        setTheme,
        toggleSound,
        toggleNotifications,
        setPreferredStock,
    } = useSettingsStore()

    const { resetProgress, getProgress } = useProgressStore()
    const progress = getProgress()
    const [showResetConfirm, setShowResetConfirm] = useState(false)
    const [resetConfirmed, setResetConfirmed] = useState(false)

    const handleReset = () => {
        resetProgress()
        setResetConfirmed(true)
        setTimeout(() => {
            setShowResetConfirm(false)
            setResetConfirmed(false)
        }, 2000)
    }

    return (
        <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6 pb-12 px-4 sm:px-0">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex items-center gap-3 mb-1">
                    <Settings className="w-7 h-7 sm:w-8 sm:h-8 text-gray-400" />
                    <h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>
                </div>
                <p className="text-sm sm:text-base text-gray-400">Customize your learning experience</p>
            </motion.div>

            {/* Appearance */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="card"
            >
                <div className="flex items-center gap-2 mb-4">
                    <Palette className="w-5 h-5 text-primary-400" />
                    <h2 className="text-lg font-semibold">Appearance</h2>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-3">
                    <div>
                        <p className="font-medium">Theme</p>
                        <p className="text-sm text-gray-500">Choose between dark and light mode</p>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1 self-start sm:self-auto">
                        <button
                            onClick={() => setTheme('dark')}
                            className={cn(
                                'flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-2 rounded-md transition-all min-h-[44px]',
                                theme === 'dark'
                                    ? 'bg-primary-600 text-white'
                                    : 'text-gray-400 hover:text-gray-200'
                            )}
                        >
                            <Moon className="w-4 h-4" />
                            Dark
                        </button>
                        <button
                            onClick={() => setTheme('light')}
                            className={cn(
                                'flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-2 rounded-md transition-all min-h-[44px]',
                                theme === 'light'
                                    ? 'bg-primary-600 text-white'
                                    : 'text-gray-400 hover:text-gray-200'
                            )}
                        >
                            <Sun className="w-4 h-4" />
                            Light
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Preferences */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card"
            >
                <div className="flex items-center gap-2 mb-4">
                    <Settings className="w-5 h-5 text-primary-400" />
                    <h2 className="text-lg font-semibold">Preferences</h2>
                </div>

                {/* Sound */}
                <div className="flex items-center justify-between gap-4 py-4 border-b border-gray-800">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        {soundEnabled ? (
                            <Volume2 className="w-5 h-5 text-success-400 flex-shrink-0" />
                        ) : (
                            <VolumeX className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        )}
                        <div className="min-w-0">
                            <p className="font-medium">Sound Effects</p>
                            <p className="text-sm text-gray-500">Audio feedback for quiz answers</p>
                        </div>
                    </div>
                    <button
                        onClick={toggleSound}
                        className={cn(
                            'relative w-14 h-8 rounded-full transition-colors duration-200 flex-shrink-0',
                            soundEnabled ? 'bg-primary-600' : 'bg-gray-700'
                        )}
                        aria-label={soundEnabled ? 'Disable sound' : 'Enable sound'}
                    >
                        <div
                            className={cn(
                                'absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-200 shadow-md',
                                soundEnabled ? 'left-7' : 'left-1'
                            )}
                        />
                    </button>
                </div>

                {/* Notifications */}
                <div className="flex items-center justify-between gap-4 py-4 border-b border-gray-800">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        {notificationsEnabled ? (
                            <Bell className="w-5 h-5 text-success-400 flex-shrink-0" />
                        ) : (
                            <BellOff className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        )}
                        <div className="min-w-0">
                            <p className="font-medium">Notifications</p>
                            <p className="text-sm text-gray-500">Daily study reminders</p>
                        </div>
                    </div>
                    <button
                        onClick={toggleNotifications}
                        className={cn(
                            'relative w-14 h-8 rounded-full transition-colors duration-200 flex-shrink-0',
                            notificationsEnabled ? 'bg-primary-600' : 'bg-gray-700'
                        )}
                        aria-label={notificationsEnabled ? 'Disable notifications' : 'Enable notifications'}
                    >
                        <div
                            className={cn(
                                'absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-200 shadow-md',
                                notificationsEnabled ? 'left-7' : 'left-1'
                            )}
                        />
                    </button>
                </div>

                {/* Preferred Stock */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-4">
                    <div className="flex items-center gap-3">
                        <TrendingUp className="w-5 h-5 text-primary-400 flex-shrink-0" />
                        <div>
                            <p className="font-medium">Preferred Stock</p>
                            <p className="text-sm text-gray-500">Used in lesson examples</p>
                        </div>
                    </div>
                    <div className="relative w-full sm:w-auto">
                        <select
                            value={preferredStock}
                            onChange={(e) => setPreferredStock(e.target.value as WatchedStock)}
                            className="appearance-none w-full sm:w-auto bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 sm:py-2 pr-10 text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer min-h-[44px]"
                        >
                            {WATCHED_STOCKS.map(stock => (
                                <option key={stock.symbol} value={stock.symbol}>
                                    {stock.symbol} — {stock.name}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </motion.div>

            {/* Danger Zone */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="card border-danger-400/20"
            >
                <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-5 h-5 text-danger-400" />
                    <h2 className="text-lg font-semibold text-danger-400">Danger Zone</h2>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-3">
                    <div>
                        <p className="font-medium">Reset Progress</p>
                        <p className="text-sm text-gray-500">
                            {progress.completed > 0
                                ? `You have ${progress.completed} completed lessons. This action cannot be undone.`
                                : 'No progress to reset.'
                            }
                        </p>
                    </div>

                    {!showResetConfirm ? (
                        <button
                            onClick={() => setShowResetConfirm(true)}
                            disabled={progress.completed === 0}
                            className={cn(
                                'flex items-center justify-center gap-2 px-4 py-3 sm:py-2 rounded-lg font-medium transition-all border min-h-[44px] self-start sm:self-auto',
                                progress.completed > 0
                                    ? 'border-danger-400/50 text-danger-400 hover:bg-danger-400/10'
                                    : 'border-gray-700 text-gray-600 cursor-not-allowed'
                            )}
                        >
                            <RotateCcw className="w-4 h-4" />
                            Reset
                        </button>
                    ) : resetConfirmed ? (
                        <span className="text-success-400 font-medium">Progress Reset</span>
                    ) : (
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                            <button
                                onClick={() => setShowResetConfirm(false)}
                                className="btn-secondary text-sm min-h-[44px] order-2 sm:order-1"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleReset}
                                className="flex items-center justify-center gap-2 px-4 py-3 sm:py-2 rounded-lg font-medium bg-danger-500 text-white hover:bg-danger-400 transition-all min-h-[44px] order-1 sm:order-2"
                            >
                                <AlertTriangle className="w-4 h-4" />
                                Confirm Reset
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* App Info */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center text-sm text-gray-600 py-4"
            >
                <p>OptionTrainer v1.0.0</p>
                <p className="mt-1">18-Day Options Trading Curriculum</p>
            </motion.div>
        </div>
    )
}
