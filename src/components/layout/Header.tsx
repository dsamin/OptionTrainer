import { Flame, Zap, Award } from 'lucide-react'
import { useProgressStore } from '../../stores/progressStore'
import { cn } from '../../lib/utils'

export function Header() {
  const { currentStreak, totalXp, achievements, getProgress } = useProgressStore()
  const progress = getProgress()

  return (
    <header className="h-16 border-b border-gray-800 bg-gray-900/30 backdrop-blur-sm px-6 flex items-center justify-between">
      {/* Progress Bar */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="flex-1">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-400">Overall Progress</span>
            <span className="text-gray-300 font-medium">{progress.percentage}%</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-600 to-primary-400 rounded-full transition-all duration-500"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
        </div>
        <span className="text-sm text-gray-500">
          {progress.completed}/{progress.total} days
        </span>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-6">
        {/* Streak */}
        <div className={cn(
          'flex items-center gap-2 px-3 py-1.5 rounded-lg',
          currentStreak > 0 ? 'bg-warning-900/30 border border-warning-700/50' : 'bg-gray-800'
        )}>
          <Flame className={cn(
            'w-5 h-5',
            currentStreak > 0 ? 'text-warning-400' : 'text-gray-500'
          )} />
          <div className="text-right">
            <p className={cn(
              'text-lg font-bold leading-none',
              currentStreak > 0 ? 'text-warning-400' : 'text-gray-400'
            )}>
              {currentStreak}
            </p>
            <p className="text-xs text-gray-500">streak</p>
          </div>
        </div>

        {/* XP */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary-900/30 border border-primary-700/50">
          <Zap className="w-5 h-5 text-primary-400" />
          <div className="text-right">
            <p className="text-lg font-bold text-primary-400 leading-none">
              {totalXp.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500">XP</p>
          </div>
        </div>

        {/* Achievements */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success-900/30 border border-success-700/50">
          <Award className="w-5 h-5 text-success-400" />
          <div className="text-right">
            <p className="text-lg font-bold text-success-400 leading-none">
              {achievements.length}
            </p>
            <p className="text-xs text-gray-500">badges</p>
          </div>
        </div>
      </div>
    </header>
  )
}
