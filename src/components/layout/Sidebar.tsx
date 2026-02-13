import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  BookOpen,
  Trophy,
  TrendingUp,
  Settings,
  ChevronRight,
  Gamepad2,
  LogOut,
  X,
  BarChart3,
} from 'lucide-react'
import { cn } from '../../lib/utils'
import { useProgressStore } from '../../stores/progressStore'
import { useUserStore } from '../../stores/userStore'
import { curriculum } from '../../data/curriculum'

import devanImg from '../../Images/Devan.PNG'
import nandaImg from '../../Images/Nanda.PNG'
import sriharImg from '../../Images/Srihari.PNG'

const AVATAR_MAP: Record<string, string> = {
  'Devan.PNG': devanImg,
  'Nanda.PNG': nandaImg,
  'Srihari.PNG': sriharImg,
}

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/progress', icon: Trophy, label: 'Progress' },
  { to: '/gamehub', icon: Gamepad2, label: 'Game Hub' },
  { to: '/simulator', icon: BarChart3, label: 'Simulator' },
  { to: '/stocks', icon: TrendingUp, label: 'Stocks' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

interface SidebarProps {
  isMobile?: boolean
  onClose?: () => void
}

export function Sidebar({ isMobile = false, onClose }: SidebarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const { lessons, getCurrentDay, isLessonUnlocked } = useProgressStore()
  const { currentUser, logout } = useUserStore()
  const currentDay = getCurrentDay()

  const handleLogout = () => {
    logout()
    navigate('/')
    onClose?.()
  }

  const handleNavClick = () => {
    // Close sidebar on mobile after navigation
    if (isMobile) {
      onClose?.()
    }
  }

  return (
    <aside className={cn(
      'bg-gray-900/50 border-r border-gray-800 flex flex-col h-full',
      isMobile ? 'w-72' : 'w-72'
    )}>
      {/* Logo + User + Mobile Close Button */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-base">OptionTrainer</h1>
              <p className="text-xs text-gray-500">Master Options Trading</p>
            </div>
          </div>
          {/* Mobile Close Button */}
          {isMobile && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        {currentUser && (
          <div className="flex items-center justify-between bg-gray-800/60 rounded-xl px-3 py-2">
            <div className="flex items-center gap-2 min-w-0">
              <img
                src={AVATAR_MAP[currentUser.avatar] ?? devanImg}
                alt={currentUser.name}
                className="w-7 h-7 rounded-full object-cover border border-gray-600 flex-shrink-0"
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">{currentUser.name}</p>
                <p className="text-xs text-indigo-400">{currentUser.level_name} · {currentUser.total_xp.toLocaleString()} XP</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-300 transition-colors ml-2 flex-shrink-0"
              title="Switch user"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={handleNavClick}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200',
                isActive
                  ? 'bg-primary-600/20 text-primary-400 border border-primary-600/30'
                  : 'text-gray-400 hover:text-gray-100 hover:bg-gray-800'
              )
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Curriculum Progress */}
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
          Curriculum
        </h3>
        <div className="space-y-1">
          {curriculum.map((week) => (
            <div key={week.week} className="mb-4">
              <div className="flex items-center gap-2 px-2 py-1 text-sm font-medium text-gray-400">
                <BookOpen className="w-4 h-4" />
                <span>{week.title}</span>
              </div>
              <div className="ml-4 space-y-0.5 mt-1">
                {week.days.map((day) => {
                  const isCompleted = lessons[day.day]?.completed
                  const isUnlocked = isLessonUnlocked(day.day)
                  const isCurrent = day.day === currentDay
                  const isActive = location.pathname === `/lesson/${day.day}`

                  return (
                    <NavLink
                      key={day.day}
                      to={isUnlocked ? `/lesson/${day.day}` : '#'}
                      onClick={(e) => {
                        if (!isUnlocked) {
                          e.preventDefault()
                        } else {
                          handleNavClick()
                        }
                      }}
                      className={cn(
                        'flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all',
                        isActive && 'bg-primary-600/20 text-primary-400',
                        isCurrent && !isActive && 'bg-gray-800 text-gray-100',
                        isCompleted && !isActive && 'text-success-400',
                        !isUnlocked && 'text-gray-600 cursor-not-allowed',
                        isUnlocked && !isActive && !isCurrent && !isCompleted && 'text-gray-400 hover:text-gray-100 hover:bg-gray-800'
                      )}
                    >
                      <div
                        className={cn(
                          'w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium border',
                          isCompleted && 'bg-success-600 border-success-600 text-white',
                          isCurrent && !isCompleted && 'bg-primary-600 border-primary-600 text-white',
                          !isCompleted && !isCurrent && isUnlocked && 'border-gray-600 text-gray-500',
                          !isUnlocked && 'border-gray-700 text-gray-700'
                        )}
                      >
                        {isCompleted ? '✓' : day.day}
                      </div>
                      <span className="truncate flex-1">{day.title}</span>
                      {isCurrent && (
                        <ChevronRight className="w-4 h-4 text-primary-400" />
                      )}
                    </NavLink>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
