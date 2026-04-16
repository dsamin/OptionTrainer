import { motion } from 'framer-motion'
import {
    LogIn, CalendarDays, CalendarRange, Radio,
    BookOpen, Trophy
} from 'lucide-react'

interface OverviewData {
    total_logins_all_time: number
    total_logins_today: number
    total_logins_this_week: number
    active_sessions: number
    total_lessons_completed: number
    average_quiz_score: number
}

const cards: { key: keyof OverviewData; label: string; icon: any; color: string; suffix?: string }[] = [
    { key: 'total_logins_all_time', label: 'Total Logins', icon: LogIn, color: '#6366f1' },
    { key: 'total_logins_today', label: 'Logins Today', icon: CalendarDays, color: '#22c55e' },
    { key: 'total_logins_this_week', label: 'Logins This Week', icon: CalendarRange, color: '#f59e0b' },
    { key: 'active_sessions', label: 'Active Sessions', icon: Radio, color: '#ef4444' },
    { key: 'total_lessons_completed', label: 'Lessons Completed', icon: BookOpen, color: '#8b5cf6' },
    { key: 'average_quiz_score', label: 'Avg Quiz Score', icon: Trophy, color: '#06b6d4', suffix: '%' },
]

export default function OverviewCards({ data }: { data: OverviewData }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {cards.map((card, i) => {
                const Icon = card.icon
                const value = data[card.key as keyof OverviewData]
                return (
                    <motion.div
                        key={card.key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.4, ease: 'easeOut' }}
                        className="rounded-xl p-5 relative overflow-hidden"
                        style={{
                            background: '#12121f',
                            border: '1px solid rgba(99, 102, 241, 0.15)',
                            boxShadow: '0 0 20px rgba(99, 102, 241, 0.06)',
                        }}
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center"
                                style={{
                                    background: `${card.color}15`,
                                    border: `1px solid ${card.color}30`,
                                }}
                            >
                                <Icon className="w-5 h-5" style={{ color: card.color }} />
                            </div>
                        </div>
                        <div className="text-3xl font-bold mb-1" style={{ color: '#e2e8f0' }}>
                            {value}{card.suffix || ''}
                        </div>
                        <div className="text-xs font-medium" style={{ color: '#94a3b8' }}>
                            {card.label}
                        </div>
                        {/* Subtle gradient accent */}
                        <div
                            className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-[0.03]"
                            style={{ background: card.color }}
                        />
                    </motion.div>
                )
            })}
        </div>
    )
}
