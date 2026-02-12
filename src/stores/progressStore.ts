import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface LessonProgress {
  dayNumber: number
  completed: boolean
  completedAt?: string
  quizScore?: number
  exerciseCompleted: boolean
  timeSpentMinutes: number
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt?: string
  requirement: {
    type: 'streak' | 'lessons' | 'quizScore' | 'week' | 'perfect'
    value: number
  }
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first-day', name: 'First Steps', description: 'Complete your first lesson', icon: '🎯', requirement: { type: 'lessons', value: 1 } },
  { id: 'week-1', name: 'Week 1 Complete', description: 'Complete all Week 1 lessons', icon: '📚', requirement: { type: 'week', value: 1 } },
  { id: 'week-2', name: 'Week 2 Complete', description: 'Complete all Week 2 lessons', icon: '📈', requirement: { type: 'week', value: 2 } },
  { id: 'week-3', name: 'Week 3 Complete', description: 'Complete all Week 3 lessons', icon: '🏆', requirement: { type: 'week', value: 3 } },
  { id: 'streak-3', name: 'Streak Starter', description: '3 day learning streak', icon: '🔥', requirement: { type: 'streak', value: 3 } },
  { id: 'streak-7', name: 'Week Warrior', description: '7 day learning streak', icon: '⚡', requirement: { type: 'streak', value: 7 } },
  { id: 'streak-14', name: 'Consistency King', description: '14 day learning streak', icon: '👑', requirement: { type: 'streak', value: 14 } },
  { id: 'streak-21', name: 'Master Trader', description: 'Complete all 21 days', icon: '🎓', requirement: { type: 'streak', value: 21 } },
  { id: 'quiz-master', name: 'Quiz Master', description: 'Score 100% on 5 quizzes', icon: '🧠', requirement: { type: 'perfect', value: 5 } },
  { id: 'rsi-expert', name: 'RSI Expert', description: 'Complete RSI lesson with 100%', icon: '📊', requirement: { type: 'quizScore', value: 5 } },
  { id: 'theta-king', name: 'Theta King', description: 'Complete Theta lesson with 100%', icon: '⏰', requirement: { type: 'quizScore', value: 9 } },
  { id: 'greek-god', name: 'Greek God', description: 'Complete all Greeks lessons with 90%+', icon: '🏛️', requirement: { type: 'lessons', value: 14 } },
]

interface ProgressState {
  lessons: Record<number, LessonProgress>
  currentStreak: number
  longestStreak: number
  lastCompletedDate: string | null
  totalXp: number
  achievements: string[]
  quizAttempts: Record<number, number[]>
  startDate: string | null

  // Actions
  completeLesson: (dayNumber: number, quizScore: number, timeSpent: number) => void
  updateQuizScore: (dayNumber: number, score: number) => void
  checkAndUpdateStreak: () => void
  getProgress: () => { completed: number; total: number; percentage: number }
  getCurrentDay: () => number
  isLessonUnlocked: (dayNumber: number) => boolean
  getWeekProgress: (week: number) => { completed: number; total: number }
  resetProgress: () => void
}

const initialState = {
  lessons: {} as Record<number, LessonProgress>,
  currentStreak: 0,
  longestStreak: 0,
  lastCompletedDate: null as string | null,
  totalXp: 0,
  achievements: [] as string[],
  quizAttempts: {} as Record<number, number[]>,
  startDate: null as string | null,
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      ...initialState,

      completeLesson: (dayNumber, quizScore, timeSpent) => {
        const today = new Date().toISOString().split('T')[0]

        set((state) => {
          const newLessons = {
            ...state.lessons,
            [dayNumber]: {
              dayNumber,
              completed: true,
              completedAt: today,
              quizScore,
              exerciseCompleted: true,
              timeSpentMinutes: timeSpent,
            },
          }

          // Calculate XP: base 100 + quiz bonus (up to 50) + streak bonus
          const baseXp = 100
          const quizBonus = Math.round((quizScore / 100) * 50)
          const streakBonus = Math.min(state.currentStreak * 5, 50)
          const earnedXp = baseXp + quizBonus + streakBonus

          // Track quiz attempts
          const newQuizAttempts = {
            ...state.quizAttempts,
            [dayNumber]: [...(state.quizAttempts[dayNumber] || []), quizScore],
          }

          // Check for new achievements
          const completedCount = Object.values(newLessons).filter(l => l.completed).length
          const perfectQuizzes = Object.values(newLessons).filter(l => l.quizScore === 100).length
          const newAchievements = [...state.achievements]

          ACHIEVEMENTS.forEach(achievement => {
            if (newAchievements.includes(achievement.id)) return

            let earned = false
            switch (achievement.requirement.type) {
              case 'lessons':
                earned = completedCount >= achievement.requirement.value
                break
              case 'week':
                const weekStart = (achievement.requirement.value - 1) * 7 + 1
                const weekEnd = achievement.requirement.value * 7
                const weekLessons = Object.values(newLessons).filter(
                  l => l.dayNumber >= weekStart && l.dayNumber <= weekEnd && l.completed
                )
                earned = weekLessons.length === 7
                break
              case 'streak':
                earned = state.currentStreak + 1 >= achievement.requirement.value
                break
              case 'perfect':
                earned = perfectQuizzes >= achievement.requirement.value
                break
              case 'quizScore':
                const lessonScore = newLessons[achievement.requirement.value]?.quizScore
                earned = lessonScore === 100
                break
            }

            if (earned) {
              newAchievements.push(achievement.id)
            }
          })

          return {
            lessons: newLessons,
            totalXp: state.totalXp + earnedXp,
            quizAttempts: newQuizAttempts,
            achievements: newAchievements,
            startDate: state.startDate || today,
            lastCompletedDate: today,
          }
        })

        get().checkAndUpdateStreak()
      },

      updateQuizScore: (dayNumber, score) => {
        set((state) => ({
          lessons: {
            ...state.lessons,
            [dayNumber]: {
              ...state.lessons[dayNumber],
              quizScore: Math.max(state.lessons[dayNumber]?.quizScore || 0, score),
            },
          },
        }))
      },

      checkAndUpdateStreak: () => {
        const today = new Date().toISOString().split('T')[0]
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        const yesterdayStr = yesterday.toISOString().split('T')[0]

        set((state) => {
          if (state.lastCompletedDate === today) {
            return state
          }

          if (state.lastCompletedDate === yesterdayStr) {
            const newStreak = state.currentStreak + 1
            return {
              currentStreak: newStreak,
              longestStreak: Math.max(state.longestStreak, newStreak),
              lastCompletedDate: today,
            }
          }

          return {
            currentStreak: 1,
            lastCompletedDate: today,
          }
        })
      },

      getProgress: () => {
        const lessons = get().lessons
        const completed = Object.values(lessons).filter(l => l.completed).length
        const total = 21
        return {
          completed,
          total,
          percentage: Math.round((completed / total) * 100),
        }
      },

      getCurrentDay: () => {
        const lessons = get().lessons
        const completed = Object.values(lessons)
          .filter(l => l.completed)
          .map(l => l.dayNumber)

        if (completed.length === 0) return 1
        return Math.min(Math.max(...completed) + 1, 21)
      },

      isLessonUnlocked: (dayNumber) => {
        if (dayNumber === 1) return true
        const lessons = get().lessons
        return lessons[dayNumber - 1]?.completed || false
      },

      getWeekProgress: (week) => {
        const lessons = get().lessons
        const weekStart = (week - 1) * 7 + 1
        const weekEnd = week * 7
        const weekLessons = Object.values(lessons).filter(
          l => l.dayNumber >= weekStart && l.dayNumber <= weekEnd
        )
        return {
          completed: weekLessons.filter(l => l.completed).length,
          total: 7,
        }
      },

      resetProgress: () => set(initialState),
    }),
    {
      name: 'option-trainer-progress',
    }
  )
)
