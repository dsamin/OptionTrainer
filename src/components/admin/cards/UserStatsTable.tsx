import { motion } from 'framer-motion'

interface UserStat {
    user_id: number
    name: string
    avatar: string
    total_logins: number
    last_seen: string | null
    total_time_minutes: number
    lessons_completed: number
    average_quiz_score: number
    current_streak: number
    level: number
    level_name: string
}

function relativeTime(dateStr: string | null): string {
    if (!dateStr) return 'Never'
    const diff = Date.now() - new Date(dateStr).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return 'Just now'
    if (mins < 60) return `${mins}m ago`
    const hours = Math.floor(mins / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
}

export default function UserStatsTable({ users }: { users: UserStat[] }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl overflow-hidden"
            style={{
                background: '#12121f',
                border: '1px solid rgba(99, 102, 241, 0.15)',
            }}
        >
            <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(99, 102, 241, 0.1)' }}>
                <h3 className="text-base font-semibold" style={{ color: '#e2e8f0' }}>User Statistics</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr style={{ borderBottom: '1px solid rgba(99, 102, 241, 0.1)' }}>
                            {['User', 'Logins', 'Last Seen', 'Time Spent', 'Lessons', 'Avg Score', 'Streak', 'Level'].map(h => (
                                <th key={h} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#64748b' }}>
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, i) => (
                            <tr
                                key={user.user_id}
                                style={{
                                    borderBottom: '1px solid rgba(99, 102, 241, 0.05)',
                                    background: i % 2 === 1 ? 'rgba(255,255,255,0.01)' : 'transparent',
                                }}
                            >
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
                                            <img
                                                src={`/src/Images/${user.avatar}`}
                                                alt={user.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                                            />
                                        </div>
                                        <span className="font-medium" style={{ color: '#e2e8f0' }}>{user.name}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3" style={{ color: '#94a3b8' }}>{user.total_logins}</td>
                                <td className="px-4 py-3" style={{ color: '#94a3b8' }}>{relativeTime(user.last_seen)}</td>
                                <td className="px-4 py-3" style={{ color: '#94a3b8' }}>
                                    {user.total_time_minutes > 60
                                        ? `${Math.round(user.total_time_minutes / 60 * 10) / 10}h`
                                        : `${Math.round(user.total_time_minutes)}m`
                                    }
                                </td>
                                <td className="px-4 py-3" style={{ color: '#94a3b8' }}>{user.lessons_completed}/18</td>
                                <td className="px-4 py-3">
                                    <span
                                        className="px-2 py-0.5 rounded text-xs font-medium"
                                        style={{
                                            background: user.average_quiz_score >= 90 ? 'rgba(34,197,94,0.15)' :
                                                user.average_quiz_score >= 70 ? 'rgba(245,158,11,0.15)' :
                                                    'rgba(239,68,68,0.15)',
                                            color: user.average_quiz_score >= 90 ? '#22c55e' :
                                                user.average_quiz_score >= 70 ? '#f59e0b' : '#ef4444',
                                        }}
                                    >
                                        {user.average_quiz_score}%
                                    </span>
                                </td>
                                <td className="px-4 py-3" style={{ color: '#f59e0b' }}>🔥 {user.current_streak}</td>
                                <td className="px-4 py-3">
                                    <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'rgba(99,102,241,0.15)', color: '#818cf8' }}>
                                        Lv.{user.level} {user.level_name}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    )
}
