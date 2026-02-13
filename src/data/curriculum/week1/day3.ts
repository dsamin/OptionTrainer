// Week 1, Day 3: Trend Lines & Channels
// Drawing trend lines and identifying breakouts for options trading

import type { LessonContent } from './day1'

export const lesson: LessonContent = {
  day: 3,
  week: 1,
  title: 'Trend Lines & Channels',
  description: 'Master drawing trend lines, identifying channels, and recognizing breakouts.',
  duration: 20,
  keyPoints: [
    'Valid trend lines need 2+ touches; 3+ touches confirm the line',
    'Uptrend lines connect higher lows; downtrend lines connect lower highs',
    'Channels contain price between parallel trend lines',
    'High volume breakouts are more reliable than low volume ones',
  ],
  yourStocks: ['NVDA', 'GOOG', 'AMZN', 'PLTR', 'QQQ'],
  content: [
    {
      type: 'text',
      title: 'What is a Trend Line?',
      content: `A trend line connects two or more price points and extends into the future as dynamic support or resistance.

**Uptrend Line:**
- Connects higher lows
- Drawn below price action
- Acts as dynamic support

**Downtrend Line:**
- Connects lower highs
- Drawn above price action
- Acts as dynamic resistance

**Why They Matter for Options:**
- Trend lines help identify direction for credit spread selection
- Channels help set strike prices based on trend boundaries
- Breakouts signal potential strategy adjustments`
    },
    {
      type: 'text',
      title: 'Drawing Valid Trend Lines',
      content: `**The Rules:**
1. **Minimum Two Touches**: A valid line needs at least two points
2. **Three Touches = Confirmed**: More touches increase reliability
3. **Use Wicks or Bodies**: Be consistent - most prefer wicks
4. **Don't Force It**: If the line doesn't fit naturally, the trend may not exist

**Common Mistakes:**
- Drawing lines through candle bodies
- Using only one touch point
- Forcing steep angles that don't match price

**The Steeper the Line, The Less Reliable:**
- 45-degree angles are ideal
- Very steep lines break quickly`
    },
    {
      type: 'text',
      title: 'Trend Channels',
      content: `A channel consists of two parallel trend lines containing price:

**Ascending Channel (Bullish):**
- Lower line: Connects higher lows
- Upper line: Connects higher highs
- Trade: Sell puts near lower line, sell calls near upper line

**Descending Channel (Bearish):**
- Upper line: Connects lower highs
- Lower line: Connects lower lows

**Horizontal Channel (Sideways):**
- Price oscillates between levels
- Ideal for iron condors!

**Channel Width = Expected Range**: Wider channels need strikes placed further out.`
    },
    {
      type: 'example',
      title: 'Trading a Channel on GOOG',
      content: `GOOG has formed an ascending channel over 3 months:

**Channel Boundaries:**
- Lower trend line: Currently around $168 (support)
- Upper trend line: Currently around $188 (resistance)
- Price is currently at $178

**Iron Condor Setup:**
With price in the middle of the channel:
- Sell $195 call (above channel resistance + buffer)
- Buy $200 call
- Sell $162 put (below channel support + buffer)
- Buy $157 put

**Why This Works:**
The channel boundaries act as dynamic support/resistance. You're placing strikes outside both boundaries. As long as GOOG stays in the channel, both sides profit.`,
      stock: 'GOOG'
    },
    {
      type: 'warning',
      title: 'Channel Breakouts',
      content: `Channels don't last forever. Watch for:

**Signs a Breakout is Coming:**
- Tightening price action within the channel
- Decreasing volume on bounces from edges
- News catalysts approaching (earnings, etc.)

**True vs False Breakouts:**
- High volume = likely real breakout
- Low volume = potential fakeout, may reverse

**Measured Move**: When a channel breaks, the expected move equals the channel width from the breakout point.`
    },
    {
      type: 'tip',
      title: 'Trend Lines and Strike Selection',
      content: `**Uptrend:**
- Place short put strikes 3-5% below the trend line
- Avoid selling calls in strong uptrends

**Downtrend:**
- Place short call strikes 3-5% above the trend line
- Be cautious with puts

**Channel/Sideways:**
- Place short calls above the upper line
- Place short puts below the lower line
- Ideal environment for iron condors

**When Trend Line Breaks:**
- Exit positions that rely on that trend line
- Broken trend lines often become opposite S/R`
    }
  ],
  quiz: [
    {
      id: 'w1d3q1',
      question: 'How many touches are needed for a trend line to be confirmed?',
      options: [
        'One touch is enough',
        'Two touches (minimum for a valid line)',
        'Three or more touches',
        'Trend lines don\'t need to touch price'
      ],
      correctAnswer: 2,
      explanation: 'While two touches are minimum to draw a trend line, three or more touches confirm its validity. Each touch proves traders are respecting this level.',
      difficulty: 'easy'
    },
    {
      id: 'w1d3q2',
      question: 'PLTR is in an ascending channel with lower line at $22 and upper at $28. Price is at $25. What is the ideal strategy?',
      options: [
        'Sell naked calls at $28',
        'Buy puts at $22',
        'Sell an iron condor with strikes outside both boundaries',
        'Wait for a breakout before trading'
      ],
      correctAnswer: 2,
      explanation: 'In a well-defined channel, an iron condor is ideal. Sell calls above the upper line and puts below the lower line to profit from time decay while price stays in the channel.',
      difficulty: 'medium'
    },
    {
      id: 'w1d3q3',
      question: 'A stock breaks above its channel on low volume, then falls back inside. This is most likely:',
      options: [
        'A confirmed breakout',
        'A false breakout - channel is still intact',
        'The start of a new downtrend',
        'Time to sell puts below support'
      ],
      correctAnswer: 1,
      explanation: 'Low volume breakouts that reverse back inside the channel are classic false breakouts. True breakouts occur on high volume with follow-through. The channel remains valid.',
      difficulty: 'medium'
    }
  ]
}

export default lesson
