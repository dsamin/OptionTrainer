// Week 1, Day 5: RSI Fundamentals
// Understanding RSI for options timing and divergences

import type { LessonContent } from './day1'

export const lesson: LessonContent = {
  day: 5,
  week: 1,
  title: 'RSI Fundamentals',
  description: 'Use the Relative Strength Index to identify overbought/oversold conditions and spot divergences.',
  duration: 20,
  keyPoints: [
    'RSI ranges from 0-100; above 70 is overbought, below 30 is oversold',
    'Strong trends can stay overbought/oversold for extended periods',
    'Bullish divergence: price makes lower low but RSI makes higher low',
    'Bearish divergence: price makes higher high but RSI makes lower high',
  ],
  yourStocks: ['NVDA', 'META', 'RDDT', 'SHOP', 'QQQ'],
  content: [
    {
      type: 'text',
      title: 'What is RSI?',
      content: `The Relative Strength Index (RSI) measures the speed and magnitude of recent price changes.

**The Basics:**
- RSI ranges from 0 to 100
- Standard setting: 14 periods (days on daily chart)
- Measures ratio of average gains to average losses

**What RSI Tells You:**
- High RSI (>70): Potentially overbought
- Low RSI (<30): Potentially oversold
- Middle RSI (40-60): Balanced momentum

**For Options Traders:**
RSI helps time entries and identify potential reversal points for credit spreads.`
    },
    {
      type: 'text',
      title: 'Overbought and Oversold',
      content: `**Overbought (RSI > 70):**
- Price has risen rapidly
- Suggests potential pullback
- NOT a sell signal by itself - trends can stay overbought

**Oversold (RSI < 30):**
- Price has fallen rapidly
- Suggests potential bounce
- NOT a buy signal by itself - trends can stay oversold

**Better Interpretation:**
- Overbought in uptrend: Normal, expect minor pullback
- Oversold in uptrend: Potential buying opportunity
- Oversold in downtrend: Normal, expect minor bounce
- Overbought in downtrend: Potential trend reversal`
    },
    {
      type: 'text',
      title: 'RSI Divergences',
      content: `Divergences occur when price and RSI move in opposite directions. They often precede reversals.

**Bullish Divergence:**
- Price makes a LOWER low
- RSI makes a HIGHER low
- Signal: Selling momentum is weakening
- Implication: Potential bottom forming

**Bearish Divergence:**
- Price makes a HIGHER high
- RSI makes a LOWER high
- Signal: Buying momentum is weakening
- Implication: Potential top forming

**Important:**
- Divergences can persist before price reverses
- Use them as warnings, not standalone signals
- Wait for price confirmation (candlestick pattern, trend line break)`
    },
    {
      type: 'example',
      title: 'Bullish Divergence on META',
      content: `META shows a bullish RSI divergence at support:

**The Pattern:**
- First low: META drops to $450, RSI at 28
- Bounce to $475
- Second low: META drops to $445, RSI at 35

**Analysis:**
- Price made a lower low ($445 vs $450)
- RSI made a higher low (35 vs 28)
- This is a bullish divergence!

**Options Trade:**
Excellent setup for a put credit spread:
- Sell $440 put / Buy $435 put
- The divergence suggests downside is limited
- Enter after the second low is confirmed (price starts rising)`,
      stock: 'META'
    },
    {
      type: 'text',
      title: 'RSI for Options Timing',
      content: `**Timing Put Credit Spreads:**
- Wait for RSI pullback to 40-50 in uptrends
- Enter after RSI bounces from oversold (<35)
- Avoid entry when RSI is already >70

**Timing Call Credit Spreads:**
- Wait for RSI rally to 55-65 in downtrends
- Enter after RSI rejects from overbought (>70)
- Avoid entry when RSI is already <30

**Timing Iron Condors:**
- Best when RSI is 40-60 (balanced)
- Avoid when RSI shows divergence (potential reversal)`
    },
    {
      type: 'tip',
      title: 'RSI + Support/Resistance',
      content: `RSI becomes more powerful combined with price levels:

**RSI + Support:**
- RSI oversold AT a support level = high probability bounce
- Great setup for put credit spreads

**RSI + Resistance:**
- RSI overbought AT a resistance level = high probability rejection
- Great setup for call credit spreads

**The More Confluence, The Better:**
RSI oversold + horizontal support + 50 MA = excellent put credit spread opportunity`
    }
  ],
  quiz: [
    {
      id: 'w1d5q1',
      question: 'A bullish RSI divergence occurs when:',
      options: [
        'Price makes a higher high while RSI makes a higher high',
        'Price makes a lower low while RSI makes a higher low',
        'Price makes a higher high while RSI makes a lower high',
        'Both price and RSI are above 70'
      ],
      correctAnswer: 1,
      explanation: 'A bullish divergence occurs when price makes a lower low but RSI makes a higher low. This shows selling momentum is weakening and a potential bottom is forming.',
      difficulty: 'medium'
    },
    {
      id: 'w1d5q2',
      question: 'NVDA is in a strong uptrend and RSI just hit 80. What is the best approach for selling a put credit spread?',
      options: [
        'Sell immediately - strong momentum',
        'Wait for RSI to pull back to 50-60 before entering',
        'Don\'t sell puts when RSI is above 70',
        'Switch to call credit spreads'
      ],
      correctAnswer: 1,
      explanation: 'RSI of 80 suggests the stock is extended and may pull back. Wait for RSI to cool off to 50-60 for a better entry after a pullback rather than chasing the extreme.',
      difficulty: 'medium'
    },
    {
      id: 'w1d5q3',
      question: 'What is the primary danger of trading RSI overbought/oversold signals in a strong trend?',
      options: [
        'RSI signals are always accurate in trends',
        'Trends can stay overbought or oversold for extended periods',
        'RSI stops working when trends are strong',
        'You need to use a 7-period RSI instead'
      ],
      correctAnswer: 1,
      explanation: 'In strong trends, RSI can remain overbought or oversold for extended periods. Fading these extremes in trending markets often leads to losses because the trend continues despite the extreme reading.',
      difficulty: 'easy'
    }
  ]
}

export default lesson
