import { motion } from 'framer-motion'
import { Users } from 'lucide-react'

interface UserStat {
    user_id: number
    name: string
    avatar: string
    lessons_completed: number
    average_quiz_score: number
    total_time_minutes: number
    level: number
    level_name: string
}

export default function UserProgressComparison({ users }: { users: UserStat[] }) {
    const maxLessons = 18

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="rounded-xl"
            style={{
                background: '#12121f',
                border: '1px solid rgba(99, 102, 241, 0.15)',
            }}
        >
            <div className="px-5 py-4 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(99, 102, 241, 0.1)' }}>
                <Users className="w-4 h-4" style={{ color: '#06b6d4' }} />
                <h3 className="text-base font-semibold" style={{ color: '#e2e8f0' }}>User Progress Comparison</h3>
            </div>
            <div className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {users.map((user, i) => (
                        <div key={user.user_id} className="space-y-4">
                            {/* User header */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
                                    <img
                                        src={`/src/Images/${user.avatar}`}
                                        alt={user.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                                    />
                                </div>
                                <div>
                                    <div className="font-medium text-sm" style={{ color: '#e2e8f0' }}>{user.name}</div>
                                    <div className="text-xs" style={{ color: '#64748b' }}>Lv.{user.level} {user.level_name}</div>
                                </div>
                            </div>

                            {/* Lessons progress */}
                            <div className="space-y-1.5">
                                <div className="flex justify-between text-xs">
                                    <span style={{ color: '#94a3b8' }}>Lessons</span>
                                    <span style={{ color: '#e2e8f0' }}>{user.lessons_completed}/{maxLessons}</span>
                                </div>
                                <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(34,197,94,0.08)' }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(user.lessons_completed / maxLessons) * 100}%` }}
                                        transition={{ delay: i * 0.15, duration: 0.6, ease: 'easeOut' }}
                                        className="h-full rounded-full"
                                        style={{ background: 'linear-gradient(90deg, #22c55e, #4ade80)' }}
                                    />
                                </div>
                            </div>

                            {/* Quiz score */}
                            <div className="space-y-1.5">
                                <div className="flex justify-between text-xs">
                                    <span style={{ color: '#94a3b8' }}>Avg Quiz Score</span>
                                    <span style={{ color: '#e2e8f0' }}>{user.average_quiz_score}%</span>
                                </div>
                                <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(99,102,241,0.08)' }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${user.average_quiz_score}%` }}
                                        transition={{ delay: i * 0.15 + 0.1, duration: 0.6, ease: 'easeOut' }}
                                        className="h-full rounded-full"
                                        style={{ background: 'linear-gradient(90deg, #6366f1, #818cf8)' }}
                                    />
                                </div>
                            </div>

                            {/* Time spent */}
                            <div className="space-y-1.5">
                                <div className="flex justify-between text-xs">
                                    <span style={{ color: '#94a3b8' }}>Time Spent</span>
                                    <span style={{ color: '#e2e8f0' }}>
                                        {user.total_time_minutes > 60
                                            ? `${Math.round(user.total_time_minutes / 60 * 10) / 10}h`
                                            : `${Math.round(user.total_time_minutes)}m`
                                        }
                                    </span>
                                </div>
                                <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(245,158,11,0.08)' }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${Math.min((user.total_time_minutes / 600) * 100, 100)}%` }}
                                        transition={{ delay: i * 0.15 + 0.2, duration: 0.6, ease: 'easeOut' }}
                                        className="h-full rounded-full"
                                        style={{ background: 'linear-gradient(90deg, #f59e0b, #fbbf24)' }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}
