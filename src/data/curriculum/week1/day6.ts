// Week 1, Day 6: Volume Analysis
// Understanding volume confirmation for price moves

import type { LessonContent } from './day1'

export const lesson: LessonContent = {
  day: 6,
  week: 1,
  title: 'Volume Analysis',
  description: 'Learn to read volume patterns to confirm price moves and spot breakouts.',
  duration: 15,
  keyPoints: [
    'Volume confirms the conviction behind price moves',
    'High volume on up days + low volume on pullbacks = healthy uptrend',
    'High volume breakouts are more reliable than low volume ones',
    'Volume spikes often mark turning points or confirm breakouts',
  ],
  yourStocks: ['NVDA', 'META', 'GOOG', 'MELI', 'PLTR'],
  content: [
    {
      type: 'text',
      title: 'Why Volume Matters',
      content: `Volume is the number of shares traded during a given period.

**Volume Reveals:**
- The conviction behind price moves
- Institutional participation (smart money)
- Whether breakouts are real or fake

**The Core Principle:**
Price shows what happened. Volume shows how many participated.

**For Options Traders:**
- High volume moves are more likely to sustain
- Low volume moves are more likely to reverse
- Understanding volume helps you avoid false breakouts`
    },
    {
      type: 'text',
      title: 'Volume Confirmation',
      content: `Volume should confirm price direction:

**Uptrend Confirmation:**
- Rising prices on above-average volume = healthy uptrend
- Pullbacks on below-average volume = normal consolidation
- Rising prices on declining volume = warning sign

**Downtrend Confirmation:**
- Falling prices on above-average volume = healthy downtrend
- Bounces on below-average volume = normal correction
- Falling prices on declining volume = selling exhaustion possible

**Key Rules:**
1. Volume should expand in the direction of the trend
2. Volume should contract during counter-trend moves
3. Volume divergence from price often precedes reversals`
    },
    {
      type: 'example',
      title: 'Volume Spike on GOOG Breakout',
      content: `GOOG shows a volume spike on breakout:

**The Situation:**
- GOOG trading in range $170-$185 for 6 weeks
- Average daily volume: 20M shares
- Breakout day: GOOG closes at $188 on 48M shares (2.4x average)

**Analysis:**
- The breakout is confirmed by exceptional volume
- Institutions are participating
- The $185 old resistance likely becomes new support

**Options Strategy Post-Breakout:**
- Wait for pullback to $185 area (old resistance, new support)
- Sell put credit spread with short strike at $180
- The high-volume breakout confirms $185 as valid support`,
      stock: 'GOOG'
    },
    {
      type: 'warning',
      title: 'Volume Traps',
      content: `**Low Volume Breakouts:**
- Price breaks resistance but volume is below average
- High probability of false breakout
- Don't sell puts below a low-volume breakout!

**What to Watch:**
- Wait for 2-3 days of sustained volume for confirmation
- Never assume a breakout is real based on one day
- High volume breakouts with follow-through are reliable`
    },
    {
      type: 'text',
      title: 'Volume at Support/Resistance',
      content: `Volume adds context to support and resistance levels:

**High Volume at a Level:**
- Many traders participated in establishing this level
- More likely to hold on future tests
- Good for placing short strikes nearby

**Low Volume at a Level:**
- Few traders established this level
- May not hold on future tests
- Give extra buffer when placing short strikes

**For Strike Selection:**
Place short strikes beyond high-volume zones (strong S/R) rather than low-volume zones (weak S/R).`
    },
    {
      type: 'tip',
      title: 'Practical Volume Tips',
      content: `**For Credit Spreads:**
- Enter on LOW volume pullbacks in uptrends
- Avoid entering on HIGH volume moves against your position
- Use volume to confirm support/resistance levels

**For Iron Condors:**
- Best when volume is average or below (quiet market)
- Avoid iron condors when volume is spiking
- Volume expansion often precedes breakouts

**Red Flags:**
- Price rising but volume falling = bearish divergence
- Price falling but volume falling = possible bounce coming`
    }
  ],
  quiz: [
    {
      id: 'w1d6q1',
      question: 'In a healthy uptrend, what volume pattern should you see?',
      options: [
        'High volume on down days, low volume on up days',
        'High volume on up days, low volume on pullbacks',
        'Consistent volume regardless of direction',
        'Declining volume on all days'
      ],
      correctAnswer: 1,
      explanation: 'In a healthy uptrend, volume should expand on up days and contract during pullbacks. This shows buying interest is strong while selling pressure during pullbacks is light.',
      difficulty: 'easy'
    },
    {
      id: 'w1d6q2',
      question: 'A stock breaks above resistance at $100 on half the average volume. What does this suggest?',
      options: [
        'A confirmed breakout',
        'A potential false breakout - wait for volume confirmation',
        'Institutions are hiding their buying',
        'The resistance was not important'
      ],
      correctAnswer: 1,
      explanation: 'Low-volume breakouts are often false breakouts that reverse. Without strong volume, there is no confirmation of institutional participation. Wait for follow-through with above-average volume.',
      difficulty: 'medium'
    },
    {
      id: 'w1d6q3',
      question: 'You identify a high-volume support zone at $50. For a put credit spread, where should you place your short strike?',
      options: [
        'At exactly $50',
        'At $52, between current price and support',
        'Below $50, such as $48 or $49',
        'At the current price'
      ],
      correctAnswer: 2,
      explanation: 'Place your short strike below the high-volume support zone. The stock would need to break through this high-volume support before reaching your position, giving you additional protection.',
      difficulty: 'medium'
    }
  ]
}

export default lesson
