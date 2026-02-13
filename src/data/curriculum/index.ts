export interface LessonContent {
  day: number
  week: number
  title: string
  description: string
  duration: number // minutes
  keyPoints: string[]
  content: ContentSection[]
  yourStocks?: string[] // Stocks to reference in examples
  quiz: QuizQuestion[]
}

export interface ContentSection {
  type: 'text' | 'chart' | 'example' | 'tip' | 'warning' | 'exercise' | 'simulator'
  title?: string
  content: string
  image?: string
  stock?: string
  simulatorPreset?: {
    stockPrice: number
    strikePrice: number
    optionType: 'call' | 'put'
    scenario: 'theta-decay' | 'delta-sensitivity' | 'full'
  }
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number // 0-indexed
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface WeekData {
  week: number
  title: string
  icon: string
  description: string
  days: { day: number; title: string }[]
}

export const curriculum: WeekData[] = [
  {
    week: 1,
    title: 'Technical Analysis',
    icon: '📊',
    description: 'Master chart reading, indicators, and price action',
    days: [
      { day: 1, title: 'Price Action Basics' },
      { day: 2, title: 'Support & Resistance' },
      { day: 3, title: 'Trend Lines & Channels' },
      { day: 4, title: 'Moving Averages' },
      { day: 5, title: 'RSI Fundamentals' },
      { day: 6, title: 'Volume Analysis' },
    ],
  },
  {
    week: 2,
    title: 'Options Greeks',
    icon: '🏛️',
    description: 'Understand delta, theta, vega, and probability',
    days: [
      { day: 7, title: 'Delta & Probability' },
      { day: 8, title: 'Theta & Time Decay' },
      { day: 9, title: 'Implied Volatility' },
      { day: 10, title: 'Vega & Volatility Risk' },
      { day: 11, title: 'DTE Selection' },
      { day: 12, title: 'Strike Selection' },
    ],
  },
  {
    week: 3,
    title: 'Strategy & Execution',
    icon: '🎯',
    description: 'Apply everything to profitable trading',
    days: [
      { day: 13, title: 'Iron Condors' },
      { day: 14, title: 'Credit Spread Timing' },
      { day: 15, title: 'Managing Assignments' },
      { day: 16, title: 'Rolling Strategies' },
      { day: 17, title: 'Position Sizing & Trading Plan' },
      { day: 18, title: 'Final Assessment' },
    ],
  },
]

// Import all day content - 18 days total
// Week 1: Technical Analysis (Days 1-6)
import { lesson as day1 } from './week1/day1'
import { lesson as day2 } from './week1/day2'
import { lesson as day3 } from './week1/day3'
import { lesson as day4 } from './week1/day4'
import { lesson as day5 } from './week1/day5'
import { lesson as day6 } from './week1/day6'
// Week 2: Options Greeks (Days 7-12)
import { day7 } from './week2/day7'
import { day8 } from './week2/day8'
import { day9 } from './week2/day9'
import { day10 } from './week2/day10'
import { day11 } from './week2/day11'
import { day12 } from './week2/day12'
// Week 3: Strategy & Execution (Days 13-18)
import { day13 } from './week3/day13'
import { day14 } from './week3/day14'
import { day15 } from './week3/day15'
import { day16 } from './week3/day16'
import { day17 } from './week3/day17'
import { day18 } from './week3/day18'

const allDays: Record<number, LessonContent> = {
  1: day1,
  2: day2,
  3: day3,
  4: day4,
  5: day5,
  6: day6,
  7: day7,
  8: day8,
  9: day9,
  10: day10,
  11: day11,
  12: day12,
  13: day13,
  14: day14,
  15: day15,
  16: day16,
  17: day17,
  18: day18,
}

export function getDayContent(day: number): LessonContent | undefined {
  return allDays[day]
}

export function getWeekDays(week: number): LessonContent[] {
  const weekData = curriculum.find(w => w.week === week)
  if (!weekData) return []
  return weekData.days
    .map(d => allDays[d.day])
    .filter(Boolean) as LessonContent[]
}
