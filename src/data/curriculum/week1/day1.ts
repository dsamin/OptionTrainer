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
  description: 'Master candlestick patterns, OHLC data interpretation, and optimal time frames for options trading strategies like iron condors and credit spreads.',
  duration: 45,
  keyPoints: [
    'Understand OHLC (Open, High, Low, Close) data structure',
    'Identify bullish and bearish candlestick patterns',
    'Recognize reversal and continuation patterns',
    'Select appropriate time frames for options analysis',
    'Apply candlestick reading to credit spread entry timing'
  ],
  yourStocks: ['NVDA', 'META', 'GOOG', 'AMZN', 'QQQ'],
  content: [
    {
      type: 'text',
      title: 'Introduction to Price Action',
      content: `Price action is the foundation of technical analysis. As an options trader, understanding how price moves helps you select better strike prices, time your entries, and manage risk effectively.

Unlike stock traders who simply go long or short, options traders need to understand:
- **Direction**: Where is price likely to go?
- **Magnitude**: How far might it move?
- **Timing**: When will the move occur relative to expiration?

This lesson focuses on candlestick charts, the most popular way to visualize price action.`
    },
    {
      type: 'text',
      title: 'Understanding OHLC Data',
      content: `Every candlestick contains four critical pieces of information:

**Open (O)**: The price at which the trading period began
**High (H)**: The highest price reached during the period
**Low (L)**: The lowest price reached during the period
**Close (C)**: The price at which the trading period ended

The "body" of the candlestick shows the range between open and close:
- **Green/White candle**: Close > Open (bullish)
- **Red/Black candle**: Close < Open (bearish)

The "wicks" or "shadows" show the high and low extremes beyond the body.`
    },
    {
      type: 'example',
      title: 'Reading a Candlestick',
      content: `Let's say NVDA has this daily candle:
- Open: $875.00
- High: $892.50
- Low: $870.25
- Close: $888.75

This is a **bullish candle** because close ($888.75) > open ($875.00).

The **body** spans from $875.00 to $888.75 = $13.75 range
The **upper wick** shows price tested $892.50 but couldn't hold
The **lower wick** shows price dipped to $870.25 but buyers stepped in

For options: This candle shows buying pressure. If selling a put credit spread, this day confirms bullish sentiment.`,
      stock: 'NVDA'
    },
    {
      type: 'text',
      title: 'Bullish Candlestick Patterns',
      content: `**Single Candle Patterns:**

1. **Hammer**: Small body at top, long lower wick (2x+ body), little/no upper wick
   - Signals: Buyers rejected lower prices
   - Options use: Look for these at support for put credit spreads

2. **Bullish Engulfing**: Large green candle completely engulfs previous red candle
   - Signals: Strong buyer takeover
   - Options use: Confirmation to sell puts below the engulfing low

3. **Morning Star**: Three-candle pattern (red, small/doji, green)
   - Signals: Reversal from downtrend
   - Options use: Wait for confirmation, then consider bullish positions

**Why These Matter for Options:**
When selling iron condors or credit spreads, bullish patterns near support suggest the put side has lower risk of being tested.`
    },
    {
      type: 'text',
      title: 'Bearish Candlestick Patterns',
      content: `**Single Candle Patterns:**

1. **Shooting Star**: Small body at bottom, long upper wick, little/no lower wick
   - Signals: Sellers rejected higher prices
   - Options use: Look for these at resistance for call credit spreads

2. **Bearish Engulfing**: Large red candle completely engulfs previous green candle
   - Signals: Strong seller takeover
   - Options use: Confirmation to sell calls above the engulfing high

3. **Evening Star**: Three-candle pattern (green, small/doji, red)
   - Signals: Reversal from uptrend
   - Options use: Consider bearish positions or close bullish trades

**Iron Condor Application:**
These patterns help you identify which side of your iron condor needs wider strikes. Bearish patterns at resistance = widen call strikes. Bullish patterns at support = widen put strikes.`
    },
    {
      type: 'example',
      title: 'Pattern Recognition in Action',
      content: `META after earnings shows a shooting star at $520:
- The stock gapped up on good earnings
- Reached a high of $535 during the day
- Sellers pushed it back down to close at $518
- Left a long upper wick showing rejection

**Options Trade Idea:**
With the shooting star at $520 (resistance), you might:
1. Sell a call credit spread with short strike at $535-540
2. The rejected high gives you confidence in your resistance level
3. Time decay works in your favor as META consolidates below $520`,
      stock: 'META'
    },
    {
      type: 'tip',
      title: 'Candlestick Confirmation',
      content: `Never trade a single candlestick pattern in isolation. Always look for:

1. **Location**: Pattern at key support/resistance is more significant
2. **Volume**: Higher volume adds conviction to the pattern
3. **Trend context**: Reversal patterns need a prior trend to reverse
4. **Follow-through**: Wait for the next candle to confirm

For options sellers, false signals are costly because you're often taking on significant directional risk. Patience for confirmation is key.`
    },
    {
      type: 'text',
      title: 'Time Frames for Options Traders',
      content: `Different time frames serve different purposes:

**Daily Charts (Primary)**
- Best for: Strike selection, trend identification
- Use for: Weekly and monthly options
- Shows: Clear support/resistance, overall direction

**4-Hour Charts**
- Best for: Entry timing, intraday levels
- Use for: Fine-tuning entry on daily signals
- Shows: Intermediate swings within daily trends

**Weekly Charts**
- Best for: Major support/resistance, big picture
- Use for: Selecting LEAPS or longer-dated options
- Shows: Long-term trends and key psychological levels

**Hourly Charts (Caution)**
- Best for: Very short-term trades only
- Use for: Same-day or next-day expiration
- Warning: More noise, more false signals`
    },
    {
      type: 'warning',
      title: 'Time Frame Mistakes',
      content: `Common errors options traders make with time frames:

1. **Using too short a time frame**: 5-minute charts for 30 DTE options leads to overtrading and false signals

2. **Ignoring higher time frames**: A bullish pattern on the daily means nothing if the weekly is in a strong downtrend

3. **Time frame hopping**: Changing time frames to confirm a bias you already have

**Rule of Thumb**: Match your time frame to your option's expiration. For 30-45 DTE options (ideal for credit spreads), the daily chart should be your primary view.`
    },
    {
      type: 'example',
      title: 'Multi-Time Frame Analysis',
      content: `Analyzing GOOG for a potential iron condor:

**Weekly Chart**: Strong uptrend, price above rising 20-week MA
**Daily Chart**: Consolidating between $175-$185, forming a bull flag
**4-Hour Chart**: Testing $180 resistance with a shooting star

**Trade Decision:**
- Weekly bullish = favor put credit spreads or neutral positions
- Daily consolidation = good for iron condors
- 4-Hour shooting star at $180 = short call strike above $185

You'd place an iron condor with:
- Put spread below the $175 daily support
- Call spread above the $185 daily resistance
- 30-45 DTE for time decay`,
      stock: 'GOOG'
    },
    {
      type: 'exercise',
      title: 'Practice: Candlestick Identification',
      content: `Pull up daily charts for these stocks and identify:

1. **AMZN**: Find the last hammer or shooting star pattern. Was it at support or resistance?

2. **QQQ**: Look for any engulfing patterns in the past 2 weeks. Did price follow through?

3. **NVDA**: Identify the current candlestick pattern forming today. What does it suggest?

For each pattern you find, ask yourself:
- Would this pattern support selling puts, calls, or an iron condor?
- Where would you place your short strikes based on this pattern?
- What additional confirmation would you want?`
    },
    {
      type: 'tip',
      title: 'Options-Specific Candlestick Tips',
      content: `When selling premium (credit spreads, iron condors):

1. **Doji candles** = Indecision = Good for iron condors (expecting range-bound action)

2. **Long-bodied candles** = Strong directional move = Wait for consolidation before selling

3. **Wicks in the direction of your trade** = Extra safety
   - Selling puts? Upper wicks on red candles show buying support
   - Selling calls? Lower wicks on green candles show selling pressure

4. **Candle size relative to ATR** = Volatility gauge
   - Small candles vs ATR = Low volatility = Lower premium but safer
   - Large candles vs ATR = High volatility = More premium but riskier`
    }
  ],
  quiz: [
    {
      id: 'w1d1q1',
      question: 'A candlestick with a long lower wick, small body at the top, and little to no upper wick is called a:',
      options: [
        'Shooting Star',
        'Hammer',
        'Doji',
        'Engulfing Pattern'
      ],
      correctAnswer: 1,
      explanation: 'A Hammer has a small body at the top of the candle with a long lower wick (at least 2x the body length). It signals that sellers pushed price down but buyers stepped in and pushed it back up. This is a bullish reversal pattern when found at support.',
      difficulty: 'easy'
    },
    {
      id: 'w1d1q2',
      question: 'You see a bearish engulfing pattern on META at a key resistance level. As an options trader, which strategy would be most appropriate?',
      options: [
        'Buy a call option',
        'Sell a put credit spread',
        'Sell a call credit spread',
        'Buy shares of META'
      ],
      correctAnswer: 2,
      explanation: 'A bearish engulfing pattern at resistance suggests the stock may reverse lower or at least struggle to break higher. Selling a call credit spread above this resistance level allows you to profit from time decay while the stock stays below that level. The pattern provides confidence in your short strike selection.',
      difficulty: 'medium'
    },
    {
      id: 'w1d1q3',
      question: 'What time frame should be your primary chart when trading options with 30-45 days to expiration?',
      options: [
        '5-minute chart',
        'Hourly chart',
        'Daily chart',
        '15-minute chart'
      ],
      correctAnswer: 2,
      explanation: 'For options with 30-45 DTE, the daily chart should be your primary view. This time frame shows clear support/resistance levels and trend direction without the noise of shorter time frames. Shorter time frames lead to overtrading and false signals for positions held over weeks.',
      difficulty: 'easy'
    },
    {
      id: 'w1d1q4',
      question: 'In OHLC data, if a stock opens at $100, reaches a high of $108, drops to a low of $98, and closes at $95, what type of candle is this?',
      options: [
        'Bullish with a long upper wick',
        'Bearish with a long upper wick',
        'Bullish with a long lower wick',
        'Doji with equal wicks'
      ],
      correctAnswer: 1,
      explanation: 'This is a bearish candle because the close ($95) is below the open ($100). It has a long upper wick because price reached $108 before sellers pushed it back down. The upper wick is $8 (108-100) while the lower wick is only $2 (100-98). This pattern resembles a shooting star and indicates selling pressure.',
      difficulty: 'medium'
    },
    {
      id: 'w1d1q5',
      question: 'You want to sell an iron condor on NVDA. The daily chart shows several doji candles over the past week, and price is in a tight range. This pattern suggests:',
      options: [
        'A strong breakout is imminent - avoid iron condors',
        'Range-bound action is likely - good for iron condors',
        'You should only sell puts, not calls',
        'The stock is about to crash'
      ],
      correctAnswer: 1,
      explanation: 'Doji candles represent indecision between buyers and sellers. Multiple dojis in a tight range suggest the stock is consolidating and likely to continue range-bound action in the near term. This is ideal for iron condors, which profit when price stays within a range. However, be aware that tight consolidation can precede breakouts, so manage position size accordingly.',
      difficulty: 'hard'
    }
  ]
}

export default lesson
