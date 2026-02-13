import type { LessonContent } from '../index'

export const day8: LessonContent = {
  day: 8,
  week: 2,
  title: 'Theta & Time Decay',
  description: 'Understand theta decay curves and maximize theta collection in credit spreads.',
  duration: 20,
  keyPoints: [
    'Theta measures daily time decay in dollars',
    'Theta decay accelerates in the final 21 days',
    'ATM options have the highest theta',
    '21-45 DTE is the "sweet spot" for premium selling',
  ],
  yourStocks: ['NVDA', 'META', 'GOOG', 'AAPL', 'TSLA'],
  content: [
    {
      type: 'text',
      title: 'What is Theta?',
      content: `Theta measures how much value an option loses each day due to time passing. For premium sellers, theta is how you make money.

**Theta Values:**
- Always expressed as a negative number
- A theta of -0.05 means the option loses $5 per day per contract

**For Premium Sellers:**
When you SELL an option, you COLLECT theta. A -0.08 theta option means you earn approximately $8 per day as long as the stock behaves.`
    },
    {
      type: 'chart',
      title: 'The Theta Decay Curve',
      content: `Time decay is NOT linear - it accelerates near expiration:

Days to Expiration vs Relative Theta:
90 DTE: |==                    (slow decay)
60 DTE: |===                   (gradual)
45 DTE: |=====                 (moderate)
30 DTE: |========              (accelerating)
21 DTE: |===========           (faster)
14 DTE: |================      (rapid)
7 DTE:  |======================  (very rapid)

About 1/3 of an option's time value decays in the final week.`
    },
    {
      type: 'example',
      title: 'Theta in NVDA Credit Spread',
      content: `NVDA at $880, 21 DTE
- Short 850 put: Premium $8.50, Theta -0.25
- Long 840 put: Premium $6.20, Theta -0.20

**Spread Analysis:**
- Net credit: $8.50 - $6.20 = $2.30
- Net theta: -0.25 - (-0.20) = -0.05

Since you're SHORT the spread, you GAIN $5/day from theta.

At this rate, in 21 days: 21 x $5 = $105 potential profit
Your max profit is $230, so theta accounts for about 45% of potential profit.`,
      stock: 'NVDA'
    },
    {
      type: 'text',
      title: 'Theta at Different Strikes',
      content: `**At-the-money (ATM) options:**
- Highest theta (most time value)
- Decay rate: Maximum

**Out-of-the-money (OTM) options:**
- Lower theta than ATM
- This is where premium sellers typically operate

**Premium Seller Insight:**
The 20-30 delta zone typically offers the best theta-to-risk ratio.`
    },
    {
      type: 'tip',
      title: 'Optimal DTE for Theta',
      content: `**Weekly (0-7 DTE):**
- Highest theta per day
- Maximum gamma risk
- For experienced traders only

**14-21 DTE (Sweet Spot):**
- Strong theta acceleration
- Manageable gamma risk
- Best for most premium sellers

**30-45 DTE (Standard):**
- Moderate theta
- More time to adjust
- Best for larger positions

For 30-45 DTE credit spreads, manage at 50% profit or close by 21 DTE.`
    },
    {
      type: 'warning',
      title: 'When Theta Works Against You',
      content: `Theta is your friend ONLY when the trade is working:

**Tested Positions:** When a short strike is breached, the option gains intrinsic value faster than it decays.

**Earnings/Events:** IV expansion before events can overwhelm theta. Your $5 daily theta means nothing if IV adds $200 of extrinsic value.

**Long Spreads:** If you BUY a spread, you're PAYING theta every day.`
    }
  ],
  quiz: [
    {
      id: 'w2d8q1',
      question: 'An option has theta of -0.08. As a premium seller who is short this option, how much do you earn per day?',
      options: ['$0.08', '$8.00', '-$8.00', '$80.00'],
      correctAnswer: 1,
      explanation: 'Theta of -0.08 means $8 per contract per day. Since you are short, you benefit from this decay.',
      difficulty: 'easy'
    },
    {
      id: 'w2d8q2',
      question: 'At which point does theta decay accelerate the most?',
      options: ['90-60 DTE', '60-45 DTE', '45-30 DTE', 'Final 21 days'],
      correctAnswer: 3,
      explanation: 'Theta decay accelerates dramatically in the final 21 days, with the most extreme decay in the last week.',
      difficulty: 'easy'
    },
    {
      id: 'w2d8q3',
      question: 'You sell a put for $3.00 with theta -0.15 and buy a put for $1.50 with theta -0.08. What is your net theta?',
      options: ['-0.23', '-0.07 (earning $7/day)', '+0.07', '-0.07 (losing $7/day)'],
      correctAnswer: 1,
      explanation: 'Net theta = -0.15 - (-0.08) = -0.07. Since you are net short, you earn approximately $7 per day.',
      difficulty: 'medium'
    }
  ]
}
