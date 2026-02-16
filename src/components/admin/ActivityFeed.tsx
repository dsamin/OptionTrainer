import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Activity, LogIn, BookOpen, GraduationCap } from 'lucide-react'
import { adminApi } from '../../services/adminApi'

interface ActivityEntry {
    type: 'login' | 'lesson_complete' | 'quiz_attempt'
    user_name: string
    timestamp: string
    detail: string
}

function relativeTime(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime()
    const secs = Math.floor(diff / 1000)
    if (secs < 60) return 'Just now'
    const mins = Math.floor(secs / 60)
    if (mins < 60) return `${mins}m ago`
    const hours = Math.floor(mins / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
}

const typeConfig = {
    login: { icon: LogIn, color: '#6366f1', bg: 'rgba(99,102,241,0.15)' },
    lesson_complete: { icon: BookOpen, color: '#22c55e', bg: 'rgba(34,197,94,0.15)' },
    quiz_attempt: { icon: GraduationCap, color: '#8b5cf6', bg: 'rgba(139,92,246,0.15)' },
}

export default function ActivityFeed({ data }: { data: ActivityEntry[] }) {
    const [activities, setActivities] = useState(data)

    // Auto-refresh every 30 seconds
    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const analytics = await adminApi.getAnalytics()
                setActivities(analytics.recent_activity || [])
            } catch { /* ignore refresh errors */ }
        }, 30000)

        return () => clearInterval(interval)
    }, [])

    // Update when props change
    useEffect(() => {
        setActivities(data)
    }, [data])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="rounded-xl flex flex-col"
            style={{
                background: '#12121f',
                border: '1px solid rgba(99, 102, 241, 0.15)',
                maxHeight: 420,
            }}
        >
            <div className="px-5 py-4 flex items-center gap-2 flex-shrink-0" style={{ borderBottom: '1px solid rgba(99, 102, 241, 0.1)' }}>
                <Activity className="w-4 h-4" style={{ color: '#6366f1' }} />
                <h3 className="text-base font-semibold" style={{ color: '#e2e8f0' }}>Recent Activity</h3>
            </div>
            <div className="overflow-y-auto flex-1 p-3 space-y-1">
                {activities.length === 0 ? (
                    <div className="text-center py-8">
                        <Activity className="w-8 h-8 mx-auto mb-2" style={{ color: '#334155' }} />
                        <p className="text-sm" style={{ color: '#64748b' }}>No activity yet</p>
                    </div>
                ) : (
                    activities.slice(0, 20).map((entry, i) => {
                        const config = typeConfig[entry.type] || typeConfig.login
                        const Icon = config.icon
                        return (
                            <motion.div
                                key={`${entry.timestamp}-${i}`}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.03 }}
                                className="flex items-start gap-3 px-3 py-2.5 rounded-lg transition-colors"
                                style={{ background: 'transparent' }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(99,102,241,0.05)')}
                                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                            >
                                <div
                                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                                    style={{ background: config.bg }}
                                >
                                    <Icon className="w-4 h-4" style={{ color: config.color }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm" style={{ color: '#e2e8f0' }}>
                                        <span className="font-medium">{entry.user_name}</span>
                                    </div>
                                    <div className="text-xs truncate" style={{ color: '#94a3b8' }}>
                                        {entry.detail}
                                    </div>
                                </div>
                                <span className="text-[11px] flex-shrink-0 ml-2" style={{ color: '#64748b' }}>
                                    {relativeTime(entry.timestamp)}
                                </span>
                            </motion.div>
                        )
                    })
                )}
            </div>
        </motion.div>
    )
}
