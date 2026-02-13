import type { LessonContent } from '../index'

export const day14: LessonContent = {
  day: 14,
  week: 3,
  title: 'Credit Spread Timing',
  description: 'Combine technical analysis with options for higher-probability entries.',
  duration: 20,
  keyPoints: [
    'Enter put spreads at support with oversold RSI',
    'Enter call spreads at resistance with overbought RSI',
    'Multiple signals increase probability',
    'Failed support/resistance is your stop-loss signal',
  ],
  yourStocks: ['NVDA', 'META', 'GOOG', 'PLTR', 'SHOP'],
  content: [
    {
      type: 'text',
      title: 'Combining TA with Options',
      content: `Technical analysis tells you WHERE price is likely to stop. Options Greeks tell you HOW to structure the trade.

**Credit Spread Direction Rules:**
- **Put credit spreads:** Expect price to stay ABOVE a level (bullish)
- **Call credit spreads:** Expect price to stay BELOW a level (bearish)

**The Perfect Setup:**
1. Price approaches strong technical level
2. RSI confirms oversold/overbought
3. IV is elevated (bigger premium)
4. 30-45 DTE for theta to work

When all four align, you have a high-probability entry.`
    },
    {
      type: 'text',
      title: 'Put Credit Spreads at Support',
      content: `When price approaches strong support, sell put credit spreads.

**Identifying Strong Support:**
- Multiple touches (at least 2-3)
- Round numbers ($100, $150, $200)
- Previous breakout levels
- 50/200-day moving averages

**Entry Checklist:**
1. Price within 3-5% of support
2. RSI below 40 (approaching oversold)
3. IV Rank above 30%
4. Short strike at or below support
5. At least 30 DTE

Support becomes your "line in the sand" - if it breaks, exit.`
    },
    {
      type: 'example',
      title: 'Put Spread Entry - NVDA',
      content: `NVDA Technical Setup:
- Current price: $750
- Strong support at $700 (tested 3 times)
- 50-day MA at $710
- RSI: 38 (approaching oversold)
- IV Rank: 45%

**Trade Entry:**
- Sell NVDA 700/690 put spread
- 35 DTE, Short 700 put delta: 22
- Credit: $2.40

**Exit Rules:**
- Close at 50% profit ($1.20)
- Close if NVDA closes below $695
- Close at 21 DTE regardless`,
      stock: 'NVDA'
    },
    {
      type: 'text',
      title: 'RSI-Based Entry Rules',
      content: `RSI is your timing indicator:

**For Put Credit Spreads (Bullish):**
- RSI below 30: Strong entry signal
- RSI 30-40: Good entry zone
- RSI 40-50: Neutral - wait
- RSI above 50: Not ideal unless at major support

**For Call Credit Spreads (Bearish):**
- RSI above 70: Strong entry signal
- RSI 60-70: Good entry zone
- RSI 50-60: Neutral - wait
- RSI below 50: Not ideal unless at major resistance

**Divergence Entries:**
Bullish divergence (price lower low, RSI higher low) = Enter put spread at support
Bearish divergence (price higher high, RSI lower high) = Enter call spread at resistance`
    },
    {
      type: 'tip',
      title: 'Multiple Signal Approach',
      content: `Never enter on a single signal. Stack confirmations:

**For Put Credit Spreads:**
- Price at support (primary)
- RSI oversold or bullish divergence
- Volume declining on pullback
- IV elevated

**Scoring System:**
Give each signal a point. Only enter with 3+ points.

Example SHOP put spread scoring:
- At support: +1
- RSI at 35: +1
- Bullish divergence: +1
- Volume declining: +1
Total: 4/4 - High conviction entry!`
    },
    {
      type: 'warning',
      title: 'When NOT to Enter',
      content: `Avoid entry when:

1. **Earnings within DTE window** - Binary event can blow through any level
2. **Support/resistance already broken** - Don't catch falling knives
3. **RSI neutral (40-60)** - No edge
4. **IV Rank below 20%** - Not enough premium
5. **Strong trend against direction** - Wait for consolidation

**Trend Override:**
If weekly chart shows strong downtrend, support levels break more easily. If weekly shows strong uptrend, resistance breaks more easily.`
    }
  ],
  quiz: [
    {
      id: 'w3d14q1',
      question: 'Price is at strong support and RSI is at 32. What credit spread should you consider?',
      options: ['Call credit spread above resistance', 'Put credit spread below support', 'Iron condor around current price', 'Wait for RSI to go lower'],
      correctAnswer: 1,
      explanation: 'At support with oversold RSI, expect a bounce. Sell put credit spread with short strike at or below support.',
      difficulty: 'easy'
    },
    {
      id: 'w3d14q2',
      question: 'What is a bullish RSI divergence?',
      options: ['RSI and price both making higher highs', 'Price makes lower low, RSI makes higher low', 'RSI above 70 for multiple days', 'Price makes higher high, RSI makes lower high'],
      correctAnswer: 1,
      explanation: 'Bullish divergence: price makes lower low but RSI makes higher low. Indicates weakening selling pressure - ideal for put spreads at support.',
      difficulty: 'medium'
    },
    {
      id: 'w3d14q3',
      question: 'You want to sell a put spread. RSI is 38, price is 5% above support, IV Rank is 42. What should you do?',
      options: ['Enter immediately', 'Wait for price to move closer to support', 'Enter with double position size', 'Use call spread instead'],
      correctAnswer: 1,
      explanation: 'While RSI and IV are acceptable, price is 5% above support. Wait for price to pull back closer to the support level for optimal entry.',
      difficulty: 'medium'
    }
  ]
}
