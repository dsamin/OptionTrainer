import { Flame, Zap, Award, Menu } from 'lucide-react'
import { useProgressStore } from '../../stores/progressStore'
import { useUIStore } from '../../stores/uiStore'
import { cn } from '../../lib/utils'

export function Header() {
  const { currentStreak, totalXp, achievements, getProgress } = useProgressStore()
  const { openSidebar } = useUIStore()
  const progress = getProgress()

  return (
    <header className="h-14 md:h-16 border-b border-gray-800 bg-gray-900/30 backdrop-blur-sm px-3 md:px-6 flex items-center justify-between gap-2 md:gap-4">
      {/* Mobile Menu Button */}
      <button
        onClick={openSidebar}
        className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors md:hidden"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Progress Bar - Hidden on mobile, visible on md+ */}
      <div className="hidden md:flex items-center gap-4 flex-1 max-w-md">
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

      {/* Mobile Progress - Compact version, visible only on mobile */}
      <div className="flex md:hidden items-center gap-2 flex-1 min-w-0">
        <div className="flex-1 max-w-32">
          <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-600 to-primary-400 rounded-full transition-all duration-500"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
        </div>
        <span className="text-xs text-gray-500 whitespace-nowrap">
          {progress.percentage}%
        </span>
      </div>

      {/* Stats - Responsive layout */}
      <div className="flex items-center gap-2 md:gap-6">
        {/* Streak - Always visible but compact on mobile */}
        <div className={cn(
          'flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-lg',
          currentStreak > 0 ? 'bg-warning-900/30 border border-warning-700/50' : 'bg-gray-800'
        )}>
          <Flame className={cn(
            'w-4 h-4 md:w-5 md:h-5',
            currentStreak > 0 ? 'text-warning-400' : 'text-gray-500'
          )} />
          <div className="text-right">
            <p className={cn(
              'text-sm md:text-lg font-bold leading-none',
              currentStreak > 0 ? 'text-warning-400' : 'text-gray-400'
            )}>
              {currentStreak}
            </p>
            <p className="text-[10px] md:text-xs text-gray-500 hidden sm:block">streak</p>
          </div>
        </div>

        {/* XP - Always visible but compact on mobile */}
        <div className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-lg bg-primary-900/30 border border-primary-700/50">
          <Zap className="w-4 h-4 md:w-5 md:h-5 text-primary-400" />
          <div className="text-right">
            <p className="text-sm md:text-lg font-bold text-primary-400 leading-none">
              {totalXp >= 1000 ? `${(totalXp / 1000).toFixed(1)}k` : totalXp}
            </p>
            <p className="text-[10px] md:text-xs text-gray-500 hidden sm:block">XP</p>
          </div>
        </div>

        {/* Achievements - Hidden on mobile, visible on sm+ */}
        <div className="hidden sm:flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-lg bg-success-900/30 border border-success-700/50">
          <Award className="w-4 h-4 md:w-5 md:h-5 text-success-400" />
          <div className="text-right">
            <p className="text-sm md:text-lg font-bold text-success-400 leading-none">
              {achievements.length}
            </p>
            <p className="text-[10px] md:text-xs text-gray-500">badges</p>
          </div>
        </div>
      </div>
    </header>
  )
}
