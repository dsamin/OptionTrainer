import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Play,
  ChevronRight,
  Clock,
  Target,
  TrendingUp,
  BookOpen,
  Flame,
  Award
} from 'lucide-react'
import { useProgressStore, ACHIEVEMENTS } from '../../stores/progressStore'
import { curriculum, getDayContent } from '../../data/curriculum'
import { cn } from '../../lib/utils'

export function Dashboard() {
  const {
    currentStreak,
    totalXp,
    achievements,
    getCurrentDay,
    getProgress,
    getWeekProgress
  } = useProgressStore()

  const currentDay = getCurrentDay()
  const progress = getProgress()
  const currentLesson = getDayContent(currentDay)
  const currentWeek = Math.ceil(currentDay / 6)

  const recentAchievements = ACHIEVEMENTS
    .filter(a => achievements.includes(a.id))
    .slice(-3)
    .reverse()

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-gradient-to-r from-primary-900/50 to-primary-800/30 border-primary-700/30"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold mb-2">
              {currentStreak > 0 ? '🔥 Keep the streak going!' : 'Welcome back, Trader!'}
            </h1>
            <p className="text-sm sm:text-base text-gray-400 mb-4">
              {progress.completed === 0
                ? "Ready to start your options trading journey?"
                : progress.completed === 18
                  ? "Congratulations! You've completed the entire curriculum!"
                  : `You're ${progress.percentage}% through the curriculum. Keep going!`}
            </p>
            {progress.completed < 18 && (
              <Link
                to={`/lesson/${currentDay}`}
                className="btn-primary inline-flex items-center gap-2 min-h-[44px] px-4"
              >
                <Play className="w-4 h-4" />
                {progress.completed === 0 ? 'Start Day 1' : `Continue Day ${currentDay}`}
                <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>
          <div className="hidden md:block">
            <div className="text-6xl">📈</div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-2 sm:p-3 rounded-lg bg-primary-600/20">
              <Target className="w-5 h-5 sm:w-6 sm:h-6 text-primary-400" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold">{progress.completed}</p>
              <p className="text-xs sm:text-sm text-gray-500">Days Complete</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-2 sm:p-3 rounded-lg bg-warning-600/20">
              <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-warning-400" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold">{currentStreak}</p>
              <p className="text-xs sm:text-sm text-gray-500">Day Streak</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-2 sm:p-3 rounded-lg bg-success-600/20">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-success-400" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold">{totalXp.toLocaleString()}</p>
              <p className="text-xs sm:text-sm text-gray-500">Total XP</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-2 sm:p-3 rounded-lg bg-purple-600/20">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold">{achievements.length}</p>
              <p className="text-xs sm:text-sm text-gray-500">Achievements</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Current Lesson Preview */}
      {progress.completed < 18 && currentLesson && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card"
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="badge-primary">Day {currentDay}</span>
                <span className="badge-warning">Week {currentWeek}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold">{currentLesson.title}</h2>
              <p className="text-sm sm:text-base text-gray-400 mt-1">{currentLesson.description}</p>
            </div>
            <Link
              to={`/lesson/${currentDay}`}
              className="btn-primary flex items-center justify-center gap-2 min-h-[44px] w-full sm:w-auto shrink-0"
            >
              <Play className="w-4 h-4" />
              Start
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>~15 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>{currentLesson.keyPoints?.length || 0} key concepts</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span>Quiz at the end</span>
            </div>
          </div>

          {currentLesson.keyPoints && (
            <div className="mt-4 pt-4 border-t border-gray-800">
              <p className="text-sm font-medium text-gray-300 mb-2">What you'll learn:</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {currentLesson.keyPoints.slice(0, 4).map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-gray-400">
                    <ChevronRight className="w-4 h-4 text-primary-400 shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}

      {/* Week Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {curriculum.map((week) => {
          const weekProgress = getWeekProgress(week.week)
          const isCurrentWeek = week.week === currentWeek
          const isCompleted = weekProgress.completed === 6

          return (
            <div
              key={week.week}
              className={cn(
                'card',
                isCurrentWeek && 'border-primary-600/50',
                isCompleted && 'border-success-600/50'
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{week.icon}</span>
                  <div>
                    <h3 className="font-semibold">Week {week.week}</h3>
                    <p className="text-sm text-gray-500">{week.title}</p>
                  </div>
                </div>
                {isCompleted && (
                  <span className="text-success-400">✓</span>
                )}
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full rounded-full transition-all duration-500',
                    isCompleted ? 'bg-success-500' : 'bg-primary-500'
                  )}
                  style={{ width: `${(weekProgress.completed / 6) * 100}%` }}
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {weekProgress.completed}/6 lessons complete
              </p>
            </div>
          )
        })}
      </motion.div>

      {/* Recent Achievements */}
      {recentAchievements.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Achievements</h3>
            <Link to="/progress" className="text-sm text-primary-400 hover:text-primary-300 min-h-[44px] flex items-center">
              View all →
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {recentAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg flex-1"
              >
                <span className="text-xl sm:text-2xl">{achievement.icon}</span>
                <div className="min-w-0">
                  <p className="font-medium text-sm sm:text-base truncate">{achievement.name}</p>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
