// Week 1: Technical Analysis Foundations
// Index file exporting all Week 1 lessons

export { lesson as day1 } from './day1'
export { lesson as day2 } from './day2'
export { lesson as day3 } from './day3'
export { lesson as day4 } from './day4'
export { lesson as day5 } from './day5'
export { lesson as day6 } from './day6'
export { lesson as day7 } from './day7'

// Re-export types from day1
export type { LessonContent, ContentSection, QuizQuestion } from './day1'

// Week 1 Overview
export const week1Overview = {
  week: 1,
  title: 'Technical Analysis Foundations',
  description: 'Master the core technical analysis skills needed for options trading. Learn to read price action, identify key levels, and use indicators to time your entries.',
  totalDays: 7,
  estimatedHours: 6,
  topics: [
    'Price Action & Candlesticks',
    'Support & Resistance',
    'Trend Lines & Channels',
    'Moving Averages',
    'RSI Fundamentals',
    'Volume Analysis',
    'Putting It All Together'
  ],
  learningObjectives: [
    'Read and interpret candlestick patterns for options timing',
    'Identify support and resistance levels for strike selection',
    'Draw and use trend lines to determine market direction',
    'Apply moving averages for dynamic support/resistance',
    'Use RSI to identify overbought/oversold conditions',
    'Analyze volume to confirm price moves',
    'Combine multiple indicators for high-probability setups'
  ],
  stocks: ['NVDA', 'META', 'GOOG', 'MELI', 'AMZN', 'SHOP', 'PLTR', 'QQQ', 'HOOD', 'RDDT']
}

export default {
  day1: () => import('./day1').then(m => m.lesson),
  day2: () => import('./day2').then(m => m.lesson),
  day3: () => import('./day3').then(m => m.lesson),
  day4: () => import('./day4').then(m => m.lesson),
  day5: () => import('./day5').then(m => m.lesson),
  day6: () => import('./day6').then(m => m.lesson),
  day7: () => import('./day7').then(m => m.lesson),
  overview: week1Overview
}
