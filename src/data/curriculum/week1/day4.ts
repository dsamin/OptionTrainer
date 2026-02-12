// Week 1, Day 4: Moving Averages
// Understanding key MAs for trend identification and dynamic support

import type { LessonContent } from './day1'

export const lesson: LessonContent = {
  day: 4,
  week: 1,
  title: 'Moving Averages',
  description: 'Use the 20, 50, and 200-day moving averages for trend identification and dynamic support/resistance.',
  duration: 20,
  keyPoints: [
    'EMA is more responsive to recent prices; SMA weights all prices equally',
    '20-day for short-term, 50-day for intermediate, 200-day for major trend',
    'Golden Cross (50 above 200) is bullish; Death Cross is bearish',
    'MAs act as dynamic support/resistance - price often bounces off them',
  ],
  yourStocks: ['NVDA', 'META', 'GOOG', 'QQQ', 'HOOD'],
  content: [
    {
      type: 'text',
      title: 'SMA vs EMA',
      content: `A moving average smooths price data by calculating the average over a specified period.

**Simple Moving Average (SMA):**
- Equal weight to all prices in the period
- Smoother, less reactive
- Best for identifying major trends
- Popular: 50-day, 200-day

**Exponential Moving Average (EMA):**
- More weight to recent prices
- More responsive, faster signals
- Best for short-term trading
- Popular: 9-day, 20-day

**For Options:**
- Use EMA for timing (faster signals)
- Use SMA for trend confirmation (more reliable)`
    },
    {
      type: 'text',
      title: 'The Key Moving Averages',
      content: `**20-Day MA (Short-term)**
- Represents roughly one month of trading
- Price above = short-term bullish
- Good for 0-30 DTE options

**50-Day MA (Intermediate)**
- Key level for institutional investors
- Major support/resistance for swing trades
- Good for 30-60 DTE options

**200-Day MA (Long-term)**
- The "line in the sand" for major trend
- Price above = bull market; below = bear market
- Good for overall bias, LEAPS

**Pro Tip:** The 50-day and 200-day MAs are self-fulfilling. So many traders watch them that price often reacts at these levels.`
    },
    {
      type: 'text',
      title: 'Golden Cross and Death Cross',
      content: `**Golden Cross (Bullish):**
- 50-day MA crosses ABOVE the 200-day MA
- Signals potential new uptrend
- Favor bullish strategies after confirmation

**Death Cross (Bearish):**
- 50-day MA crosses BELOW the 200-day MA
- Signals potential new downtrend
- Favor bearish strategies or reduce exposure

**Important Caveats:**
- These are LAGGING indicators (confirm what already happened)
- False signals occur in choppy markets
- Don't trade the cross blindly - wait for confirmation`
    },
    {
      type: 'example',
      title: 'Reading MAs on NVDA',
      content: `Let's analyze NVDA's moving average structure:

**Current Readings:**
- NVDA Price: $875
- 20-day EMA: $860
- 50-day SMA: $820
- 200-day SMA: $650

**Analysis:**
1. **Strong Uptrend**: Price above all MAs
2. **Bullish Alignment**: 20 EMA > 50 SMA > 200 SMA
3. **Near-term Support**: 20 EMA at $860
4. **Major Support**: 50 SMA at $820

**Options Strategy:**
With MAs aligned bullishly, favor put credit spreads. Place short strike below the 50-day MA ($820).
Example: Sell $810 put / Buy $805 put. The 50-day acts as a safety buffer.`,
      stock: 'NVDA'
    },
    {
      type: 'text',
      title: 'MAs as Dynamic Support/Resistance',
      content: `Moving averages act as "moving" support and resistance levels:

**20-day MA (Fast):**
- Strong trends: Price bounces off 20 EMA
- Break of 20 EMA is first warning sign

**50-day MA (Medium):**
- Healthy trends may touch 50 SMA before resuming
- Major level for institutional buyers

**200-day MA (Slow):**
- Touch of 200 SMA in uptrend = excellent long opportunity
- Break of 200 SMA = potential bear market

**Confluence:** When an MA aligns with horizontal support/resistance, the level is much stronger. Look for these confluence zones for strike selection.`
    },
    {
      type: 'tip',
      title: 'MA Alignment (Stacking)',
      content: `The order of moving averages tells you trend strength:

**Bullish Alignment (Strongest Uptrend):**
Price > 20 EMA > 50 SMA > 200 SMA
- All MAs rising
- Trade: Put credit spreads

**Bearish Alignment (Strongest Downtrend):**
Price < 20 EMA < 50 SMA < 200 SMA
- All MAs falling
- Trade: Call credit spreads

**Mixed/Transitioning:**
MAs crossing over each other, not in order
- Trend is changing or non-existent
- Trade: Iron condors, or wait for clarity`
    }
  ],
  quiz: [
    {
      id: 'w1d4q1',
      question: 'What is the main difference between an SMA and an EMA?',
      options: [
        'SMA uses more data points than EMA',
        'EMA gives more weight to recent prices, making it more responsive',
        'SMA is only used for short-term trading',
        'EMA can only be calculated on weekly charts'
      ],
      correctAnswer: 1,
      explanation: 'EMA gives more weight to recent prices, making it more responsive to current price action. SMA weights all prices equally, making it smoother but slower to react.',
      difficulty: 'easy'
    },
    {
      id: 'w1d4q2',
      question: 'A "Golden Cross" occurs when:',
      options: [
        'Price crosses above the 200-day MA',
        'The 20-day MA crosses above the 50-day MA',
        'The 50-day MA crosses above the 200-day MA',
        'The 200-day MA turns from declining to rising'
      ],
      correctAnswer: 2,
      explanation: 'A Golden Cross is specifically when the 50-day MA crosses above the 200-day MA. This is a major bullish signal indicating a potential new uptrend.',
      difficulty: 'easy'
    },
    {
      id: 'w1d4q3',
      question: 'GOOG has: Price $180, 20 EMA $175, 50 SMA $168, 200 SMA $145. Where should you place your put credit spread short strike?',
      options: [
        'Above $180 (above current price)',
        'At $175 (at the 20 EMA)',
        'Just above $168 (near the 50 SMA)',
        'Below $165 (buffer below the 50 SMA)'
      ],
      correctAnswer: 3,
      explanation: 'Place short strike below support levels. The 50 SMA at $168 acts as major support. Below $165 gives room to pull back to the 50 SMA without threatening your position.',
      difficulty: 'medium'
    }
  ]
}

export default lesson
