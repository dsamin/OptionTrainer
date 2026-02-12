import { motion } from 'framer-motion'
import {
    Target,
    Flame,
    Zap,
    Award,
    Clock,
    TrendingUp,
    BookOpen,
    CheckCircle2,
    Lock,
    Star
} from 'lucide-react'
import { useProgressStore, ACHIEVEMENTS } from '../../stores/progressStore'
import { curriculum } from '../../data/curriculum'
import { cn } from '../../lib/utils'
import { Link } from 'react-router-dom'

export function ProgressPage() {
    const {
        lessons,
        currentStreak,
        longestStreak,
        totalXp,
        achievements,

        getProgress,
        getWeekProgress,
        getCurrentDay
    } = useProgressStore()

    const progress = getProgress()
    const currentDay = getCurrentDay()

    const completedLessons = Object.values(lessons).filter(l => l.completed)
    const averageScore = completedLessons.length > 0
        ? Math.round(completedLessons.reduce((sum, l) => sum + (l.quizScore || 0), 0) / completedLessons.length)
        : 0
    const totalTimeMinutes = completedLessons.reduce((sum, l) => sum + l.timeSpentMinutes, 0)

    return (
        <div className="max-w-6xl mx-auto space-y-6 pb-12">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold mb-1">Your Progress</h1>
                <p className="text-gray-400">Track your options trading learning journey</p>
            </motion.div>

            {/* Overview Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { icon: Target, label: 'Days Complete', value: `${progress.completed}/21`, color: 'text-primary-400', bg: 'bg-primary-600/20' },
                    { icon: Flame, label: 'Current Streak', value: currentStreak, color: 'text-warning-400', bg: 'bg-warning-600/20' },
                    { icon: Zap, label: 'Total XP', value: totalXp.toLocaleString(), color: 'text-primary-400', bg: 'bg-primary-600/20' },
                    { icon: Star, label: 'Avg Quiz Score', value: `${averageScore}%`, color: 'text-success-400', bg: 'bg-success-600/20' },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                        className="card"
                    >
                        <div className="flex items-center gap-3">
                            <div className={cn('p-3 rounded-lg', stat.bg)}>
                                <stat.icon className={cn('w-6 h-6', stat.color)} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{stat.value}</p>
                                <p className="text-sm text-gray-500">{stat.label}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Additional Stats Row */}
            <div className="grid grid-cols-3 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="card text-center"
                >
                    <TrendingUp className="w-6 h-6 text-primary-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{longestStreak}</p>
                    <p className="text-sm text-gray-500">Longest Streak</p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="card text-center"
                >
                    <Clock className="w-6 h-6 text-warning-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{totalTimeMinutes}m</p>
                    <p className="text-sm text-gray-500">Total Study Time</p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="card text-center"
                >
                    <Award className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{achievements.length}/{ACHIEVEMENTS.length}</p>
                    <p className="text-sm text-gray-500">Achievements</p>
                </motion.div>
            </div>

            {/* Overall Progress Bar */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="card"
            >
                <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">Overall Progress</h3>
                    <span className="text-lg font-bold text-primary-400">{progress.percentage}%</span>
                </div>
                <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress.percentage}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-primary-600 via-primary-500 to-success-500 rounded-full"
                    />
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>Day 1</span>
                    <span>Day {currentDay} (Current)</span>
                    <span>Day 21</span>
                </div>
            </motion.div>

            {/* Week-by-Week Breakdown */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <h2 className="text-xl font-bold mb-4">Weekly Breakdown</h2>
                <div className="space-y-4">
                    {curriculum.map((week) => {
                        const weekProgress = getWeekProgress(week.week)
                        const weekPercent = Math.round((weekProgress.completed / 7) * 100)

                        return (
                            <div key={week.week} className="card">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{week.icon}</span>
                                        <div>
                                            <h3 className="font-semibold">Week {week.week}: {week.title}</h3>
                                            <p className="text-sm text-gray-500">{week.description}</p>
                                        </div>
                                    </div>
                                    <span className={cn(
                                        'font-bold',
                                        weekPercent === 100 ? 'text-success-400' : 'text-gray-400'
                                    )}>
                                        {weekProgress.completed}/7
                                    </span>
                                </div>
                                <div className="h-2 bg-gray-800 rounded-full overflow-hidden mb-3">
                                    <div
                                        className={cn(
                                            'h-full rounded-full transition-all duration-500',
                                            weekPercent === 100 ? 'bg-success-500' : 'bg-primary-500'
                                        )}
                                        style={{ width: `${weekPercent}%` }}
                                    />
                                </div>

                                {/* Day details */}
                                <div className="grid grid-cols-7 gap-2">
                                    {week.days.map((day) => {
                                        const lesson = lessons[day.day]
                                        const isCompleted = lesson?.completed
                                        const isCurrent = day.day === currentDay

                                        return (
                                            <Link
                                                key={day.day}
                                                to={`/lesson/${day.day}`}
                                                className={cn(
                                                    'relative p-2 rounded-lg text-center transition-all text-xs',
                                                    isCompleted && 'bg-success-600/20 border border-success-600/30',
                                                    isCurrent && !isCompleted && 'bg-primary-600/20 border border-primary-600/30',
                                                    !isCompleted && !isCurrent && 'bg-gray-800/50 border border-gray-700/30 hover:bg-gray-800'
                                                )}
                                            >
                                                <div className="font-bold mb-1">D{day.day}</div>
                                                {isCompleted ? (
                                                    <CheckCircle2 className="w-4 h-4 text-success-400 mx-auto" />
                                                ) : isCurrent ? (
                                                    <BookOpen className="w-4 h-4 text-primary-400 mx-auto" />
                                                ) : (
                                                    <Lock className="w-4 h-4 text-gray-600 mx-auto" />
                                                )}
                                                {lesson?.quizScore !== undefined && (
                                                    <div className="text-xs text-gray-500 mt-1">{lesson.quizScore}%</div>
                                                )}
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                <h2 className="text-xl font-bold mb-4">Achievements</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {ACHIEVEMENTS.map((achievement) => {
                        const isUnlocked = achievements.includes(achievement.id)

                        return (
                            <motion.div
                                key={achievement.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={cn(
                                    'card flex items-center gap-4',
                                    isUnlocked
                                        ? 'bg-gradient-to-r from-primary-900/30 to-success-600/10 border-primary-700/30'
                                        : 'opacity-50'
                                )}
                            >
                                <div className={cn(
                                    'text-3xl',
                                    !isUnlocked && 'grayscale'
                                )}>
                                    {isUnlocked ? achievement.icon : '🔒'}
                                </div>
                                <div>
                                    <p className="font-semibold">{achievement.name}</p>
                                    <p className="text-sm text-gray-500">{achievement.description}</p>
                                </div>
                                {isUnlocked && (
                                    <CheckCircle2 className="w-5 h-5 text-success-400 ml-auto shrink-0" />
                                )}
                            </motion.div>
                        )
                    })}
                </div>
            </motion.div>
        </div>
    )
}
