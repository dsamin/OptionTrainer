// Week 1, Day 1: Price Action Basics
// Candlestick patterns and reading OHLC data for options traders

export interface ContentSection {
  type: 'text' | 'chart' | 'example' | 'tip' | 'warning' | 'exercise'
  title?: string
  content: string
  stock?: string
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface LessonContent {
  day: number
  week: number
  title: string
  description: string
  duration: number
  keyPoints: string[]
  content: ContentSection[]
  yourStocks?: string[]
  quiz: QuizQuestion[]
}

export const lesson: LessonContent = {
  day: 1,
  week: 1,
  title: 'Price Action Basics',
  description: 'Master candlestick patterns and OHLC data interpretation for timing options entries.',
  duration: 20,
  keyPoints: [
    'OHLC shows Open, High, Low, Close for each period',
    'Bullish patterns (Hammer, Engulfing) signal buying pressure',
    'Bearish patterns (Shooting Star, Engulfing) signal selling pressure',
    'Daily charts are best for 30-45 DTE options',
  ],
  yourStocks: ['NVDA', 'META', 'GOOG', 'AMZN', 'QQQ'],
  content: [
    {
      type: 'text',
      title: 'Understanding OHLC Data',
      content: `Every candlestick contains four pieces of information:

**Open (O)**: Price at the period's start
**High (H)**: Highest price reached
**Low (L)**: Lowest price reached
**Close (C)**: Price at the period's end

The "body" shows the range between open and close:
- **Green candle**: Close > Open (bullish)
- **Red candle**: Close < Open (bearish)

The "wicks" show the high and low extremes beyond the body.`
    },
    {
      type: 'text',
      title: 'Bullish Candlestick Patterns',
      content: `**Hammer**: Small body at top, long lower wick (2x+ body)
- Signals buyers rejected lower prices
- Look for these at support for put credit spreads

**Bullish Engulfing**: Large green candle engulfs previous red candle
- Signals strong buyer takeover
- Confirmation to sell puts below the engulfing low

**Morning Star**: Three-candle pattern (red, small/doji, green)
- Signals reversal from downtrend
- Wait for confirmation before bullish positions`
    },
    {
      type: 'text',
      title: 'Bearish Candlestick Patterns',
      content: `**Shooting Star**: Small body at bottom, long upper wick
- Signals sellers rejected higher prices
- Look for these at resistance for call credit spreads

**Bearish Engulfing**: Large red candle engulfs previous green candle
- Signals strong seller takeover
- Confirmation to sell calls above the engulfing high

**Evening Star**: Three-candle pattern (green, small/doji, red)
- Signals reversal from uptrend
- Consider bearish positions or close bullish trades`
    },
    {
      type: 'example',
      title: 'Pattern Recognition: NVDA',
      content: `NVDA shows a shooting star at $520:
- Stock gapped up on good earnings
- Reached high of $535 during the day
- Sellers pushed it back down to close at $518
- Long upper wick shows rejection

**Options Trade Idea:**
With the shooting star at $520 (resistance), consider:
1. Sell a call credit spread with short strike at $535-540
2. The rejected high gives confidence in your resistance level
3. Time decay works in your favor as NVDA consolidates`,
      stock: 'NVDA'
    },
    {
      type: 'text',
      title: 'Time Frames for Options',
      content: `**Daily Charts (Primary)**
- Best for strike selection and trend identification
- Use for weekly and monthly options (30-45 DTE)
- Shows clear support/resistance and overall direction

**Weekly Charts**
- Best for major support/resistance and big picture
- Use for longer-dated options

**Hourly Charts (Caution)**
- More noise, more false signals
- Only for very short-term trades

**Rule**: Match your time frame to your option's expiration. For 30-45 DTE credit spreads, daily charts should be your primary view.`
    },
    {
      type: 'tip',
      title: 'Candlestick Confirmation',
      content: `Never trade a single candlestick pattern in isolation. Always look for:

1. **Location**: Pattern at key support/resistance is more significant
2. **Volume**: Higher volume adds conviction to the pattern
3. **Follow-through**: Wait for the next candle to confirm

For options sellers, false signals are costly. Patience for confirmation is key.`
    }
  ],
  quiz: [
    {
      id: 'w1d1q1',
      question: 'A candlestick with a long lower wick, small body at the top, and little upper wick is called a:',
      options: [
        'Shooting Star',
        'Hammer',
        'Doji',
        'Engulfing Pattern'
      ],
      correctAnswer: 1,
      explanation: 'A Hammer has a small body at the top with a long lower wick (at least 2x the body). It signals buyers rejected lower prices - a bullish reversal pattern when found at support.',
      difficulty: 'easy'
    },
    {
      id: 'w1d1q2',
      question: 'You see a bearish engulfing pattern on META at resistance. Which strategy is most appropriate?',
      options: [
        'Buy a call option',
        'Sell a put credit spread',
        'Sell a call credit spread',
        'Buy shares of META'
      ],
      correctAnswer: 2,
      explanation: 'A bearish engulfing at resistance suggests the stock may reverse lower. Selling a call credit spread above this resistance profits from time decay while the stock stays below that level.',
      difficulty: 'medium'
    },
    {
      id: 'w1d1q3',
      question: 'What time frame should be your primary chart when trading 30-45 DTE options?',
      options: [
        '5-minute chart',
        'Hourly chart',
        'Daily chart',
        '15-minute chart'
      ],
      correctAnswer: 2,
      explanation: 'For 30-45 DTE options, the daily chart should be primary. It shows clear support/resistance without the noise of shorter time frames that lead to overtrading and false signals.',
      difficulty: 'easy'
    }
  ]
}

export default lesson
