import type { LessonContent } from '../index'

export const day10: LessonContent = {
  day: 10,
  week: 2,
  title: 'Vega & Volatility Risk',
  description: 'Understand vega exposure and how to manage volatility risk in spreads.',
  duration: 15,
  keyPoints: [
    'Vega measures sensitivity to 1% change in IV',
    'Selling premium = short vega (benefit from IV decline)',
    'ATM options have highest vega; shorter DTE has less',
    'Sell when IV is high to minimize vega risk',
  ],
  yourStocks: ['NVDA', 'META', 'TSLA', 'AAPL', 'GOOG'],
  content: [
    {
      type: 'text',
      title: 'What is Vega?',
      content: `Vega measures how much an option's price changes for every 1% change in implied volatility.

**Vega Basics:**
- A vega of 0.15 means the option gains/loses $15 per contract for each 1% IV move
- ATM options have the highest vega
- Vega decreases as expiration approaches

**For Premium Sellers:**
When you SELL options, you have NEGATIVE vega:
- If IV rises: Your short options become more expensive (bad)
- If IV falls: Your short options become cheaper (good)`
    },
    {
      type: 'example',
      title: 'Vega in NVDA Credit Spread',
      content: `NVDA at $880, 21 DTE, IV at 45%
- Short 850 put: Vega 0.85
- Long 840 put: Vega 0.75

**Position Vega:**
- Short 850 put: -0.85
- Long 840 put: +0.75
- Net vega: -0.10

**Impact:**
- For every 1% IV increase: spread loses $10
- For every 1% IV decrease: spread gains $10

If IV drops from 45% to 40%:
Profit from vega: 5 x $10 = $50 per contract`,
      stock: 'NVDA'
    },
    {
      type: 'text',
      title: 'Vega in Iron Condors',
      content: `Iron condors are NET SHORT vega:

**Structure:**
- Short call: Negative vega
- Long call: Positive vega
- Short put: Negative vega
- Long put: Positive vega

Net result: You benefit when IV falls.

**Example:**
Iron condor with net vega of -0.08
If IV drops 10% after earnings:
Profit = 10 x $8 = $80 from vega alone
(Plus theta decay = very profitable trade)`
    },
    {
      type: 'tip',
      title: 'Managing Vega Risk',
      content: `**1. Sell When IV is High:**
- IVR > 50% means IV has room to fall
- You benefit from both theta AND vega

**2. Use Shorter DTE:**
- 14 DTE has less vega than 45 DTE
- Trade-off: Less adjustment time

**3. Go Further OTM:**
- 10-delta options have less vega than 30-delta

**4. Time Entries Around Events:**
- Enter iron condors 5-7 days before earnings
- IV has peaked, you capture the crush`
    },
    {
      type: 'warning',
      title: 'Vega Risk Scenarios',
      content: `When vega works against premium sellers:

**Unexpected News:**
- Surprise Fed announcements, geopolitical events
- IV can spike 20%+ in hours

**Entering at Low IV:**
- Selling premium at IVR 20%
- IV rises to IVR 50%
- You're underwater before the trade has time to work

**Protection:**
- Keep position sizes manageable
- Have adjustment triggers defined
- Prefer selling when IVR > 50%`
    }
  ],
  quiz: [
    {
      id: 'w2d10q1',
      question: 'An option has vega of 0.20. If IV increases from 35% to 40%, how much does the option price change?',
      options: ['$0.20', '$1.00', '$5.00', '$100'],
      correctAnswer: 1,
      explanation: 'Vega of 0.20 = $20 per contract per 1% IV change. A 5% increase = 5 x $0.20 = $1.00 per share increase.',
      difficulty: 'easy'
    },
    {
      id: 'w2d10q2',
      question: 'You sell an iron condor with net vega of -0.12. If IV rises 8%, what happens?',
      options: ['Profit $96', 'Lose $96', 'No impact', 'Profit $12'],
      correctAnswer: 1,
      explanation: 'Net vega -0.12 means you lose $12 per 1% IV rise. 8% increase = 8 x $12 = $96 loss per contract.',
      difficulty: 'medium'
    },
    {
      id: 'w2d10q3',
      question: 'Which option typically has the highest vega?',
      options: ['Deep OTM with 7 DTE', 'ATM with 45 DTE', 'Deep ITM with 30 DTE', 'Slightly OTM with 7 DTE'],
      correctAnswer: 1,
      explanation: 'Vega is highest for ATM options with longer time to expiration. The 45 DTE ATM option has maximum IV sensitivity.',
      difficulty: 'easy'
    }
  ]
}
