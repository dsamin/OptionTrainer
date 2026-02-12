import type { LessonContent } from '../index'

export const day9: LessonContent = {
  day: 9,
  week: 2,
  title: 'Theta Mastery',
  description:
    'Understand theta decay curves, maximize theta in credit spreads, and optimize your premium selling timing',
  duration: 40,
  keyPoints: [
    'Theta measures the daily time decay of an option in dollars',
    'Theta decay accelerates exponentially in the final 30 days',
    'At-the-money options have the highest theta',
    'Spreads have net theta based on the difference between legs',
    'Weekend decay is priced in advance, not on Monday',
  ],
  yourStocks: ['NVDA', 'META', 'GOOG', 'AAPL', 'TSLA'],
  content: [
    {
      type: 'text',
      title: 'What is Theta?',
      content: `Theta measures how much value an option loses each day due to time passing. For premium sellers, theta is your best friend - it's how you make money.

**Theta Values:**
- Always expressed as a negative number (options lose value over time)
- Represents the dollar amount lost per day per contract
- A theta of -0.05 means the option loses $5 per day (per contract)

**For Premium Sellers:**
When you sell an option, you COLLECT theta. A -0.08 theta option means you earn approximately $8 per day per contract as long as the stock behaves.

This is the foundation of income strategies like iron condors and credit spreads.`,
    },
    {
      type: 'chart',
      title: 'The Theta Decay Curve',
      content: `Time decay is NOT linear - it accelerates as expiration approaches:

Days to Expiration vs Relative Theta:
90 DTE: |==                    (slow decay)
60 DTE: |===                   (gradual)
45 DTE: |=====                 (moderate)
30 DTE: |========              (accelerating)
21 DTE: |===========           (faster)
14 DTE: |================      (rapid)
7 DTE:  |======================  (very rapid)
3 DTE:  |========================== (extreme)

Key insight: About 1/3 of an option's time value decays in the final week. This is why weekly options are popular for premium sellers - maximum theta per day.`,
    },
    {
      type: 'example',
      title: 'Theta in Action - NVDA Credit Spread',
      content: `Let's examine theta on an NVDA put credit spread:

NVDA at $880, 21 DTE
- Short 850 put: Premium $8.50, Theta -0.25
- Long 840 put: Premium $6.20, Theta -0.20

**Spread Analysis:**
- Net credit: $8.50 - $6.20 = $2.30
- Net theta: -0.25 - (-0.20) = -0.05

Wait, why is net theta smaller? Because you're paying theta on your long option.

**Daily Profit from Theta:**
Net theta of -0.05 means the spread loses $5/day in value.
Since you're SHORT the spread, you GAIN $5/day.

At this rate, in 21 days: 21 x $5 = $105 potential profit
Your max profit is $230, so theta accounts for about 45% of potential profit.`,
      stock: 'NVDA',
    },
    {
      type: 'text',
      title: 'Theta at Different Strikes',
      content: `Theta varies significantly based on where the strike is relative to the stock price:

**At-the-money (ATM) options:**
- Highest theta (most time value to decay)
- Decay rate: Maximum

**Out-of-the-money (OTM) options:**
- Lower theta than ATM
- Decay rate: Moderate
- This is where premium sellers typically operate

**In-the-money (ITM) options:**
- Lower theta (mostly intrinsic value)
- Decay rate: Lower
- Less relevant for premium selling

**Premium Seller Insight:**
You want strikes with meaningful theta but high probability of staying OTM. The 20-30 delta zone typically offers the best theta-to-risk ratio.`,
    },
    {
      type: 'example',
      title: 'Maximizing Theta in Iron Condors',
      content: `Compare two iron condor structures on META ($510):

**Wide Wings (10 delta strikes):**
- Short 550/560 call spread: $1.20 credit, -0.02 net theta
- Short 470/460 put spread: $1.30 credit, -0.02 net theta
- Total: $2.50 credit, -0.04 daily theta

**Tighter Wings (20 delta strikes):**
- Short 535/545 call spread: $2.40 credit, -0.05 net theta
- Short 485/475 put spread: $2.50 credit, -0.05 net theta
- Total: $4.90 credit, -0.10 daily theta

**Analysis:**
The tighter wings offer 2.5x more theta, but also more risk. Choose based on your directional bias and risk tolerance.`,
      stock: 'META',
    },
    {
      type: 'tip',
      title: 'Optimal DTE for Theta Collection',
      content: `Research and experience suggest these theta optimization windows:

**Weekly Options (0-7 DTE):**
- Highest theta per day
- Maximum gamma risk
- Best for: Experienced traders, defined risk strategies

**14-21 DTE (Sweet Spot):**
- Strong theta acceleration
- Manageable gamma risk
- Best for: Most premium sellers

**30-45 DTE (Standard):**
- Moderate theta
- More time to be right
- Best for: Larger positions, undefined risk

**45+ DTE:**
- Lower theta per day
- Maximum time for adjustment
- Best for: LEAPS spreads, low maintenance

For weekly options on tech stocks like GOOG, AAPL, and NVDA, the 14-21 DTE window typically offers the best risk-adjusted theta.`,
    },
    {
      type: 'text',
      title: 'Weekend Theta Decay',
      content: `A common misconception is that theta decay happens over the weekend and you collect extra premium on Monday. The truth is more nuanced:

**Reality:**
- Weekend decay is priced INTO options before the weekend
- Friday afternoon options already reflect weekend time decay
- Monday morning prices typically don't gap down due to theta alone

**What This Means for You:**
1. Don't expect a "free lunch" on Monday mornings
2. Friday afternoon can be a good entry point (post-decay pricing)
3. Thursday/Friday entries capture weekend premium in the sale price

**Best Practice:**
Enter positions Thursday or Friday to sell the "weekend premium" that's baked into prices, rather than waiting until Monday.`,
    },
    {
      type: 'warning',
      title: 'When Theta Works Against You',
      content: `Theta is your friend ONLY when the trade is working. Here's when it hurts:

**1. Tested Positions:**
When a short strike is breached, theta accelerates against you. The option you sold gains intrinsic value faster than it decays.

**2. Earnings/Events:**
Implied volatility expansion before events can overwhelm theta. Your $0.05 daily theta means nothing if IV adds $2 of extrinsic value.

**3. Long Spreads:**
If you buy a debit spread, you're PAYING theta every day. Time is your enemy.

**4. Far OTM Options:**
Very low delta options have minimal theta. You're not collecting much daily even though you sold them.

Always verify your net theta is meaningful relative to your capital at risk.`,
    },
    {
      type: 'example',
      title: 'Theta Across Expirations - AAPL',
      content: `Compare the same strike across different expirations on AAPL ($188):

180 Put (8 delta):
- 7 DTE:  Premium $0.85, Theta -0.08 (-9.4% daily)
- 14 DTE: Premium $1.40, Theta -0.06 (-4.3% daily)
- 21 DTE: Premium $1.85, Theta -0.05 (-2.7% daily)
- 45 DTE: Premium $2.80, Theta -0.03 (-1.1% daily)

**Insight:**
The 7 DTE option decays at 9.4% per day but has maximum gamma risk. The 21 DTE option has a better risk/reward at 2.7% daily decay with more time to adjust if needed.

For a $185 credit spread (180/175), you'd collect higher net theta in the weekly, but the 14-21 DTE window often provides better risk-adjusted returns.`,
      stock: 'AAPL',
    },
    {
      type: 'exercise',
      title: 'Calculate Your Daily Theta',
      content: `You have the following iron condor on TSLA ($245):

- Short 270 call @ $2.50, theta -0.12
- Long 280 call @ $1.20, theta -0.07
- Short 220 put @ $2.30, theta -0.11
- Long 210 put @ $1.10, theta -0.06

Calculate:
A) Net credit collected
B) Net theta per day
C) Days to recover 50% of max profit from theta alone

**Answers:**
A) Net credit: ($2.50 - $1.20) + ($2.30 - $1.10) = $1.30 + $1.20 = $2.50

B) Net theta:
   Call spread: -0.12 - (-0.07) = -0.05
   Put spread: -0.11 - (-0.06) = -0.05
   Total: -0.10 (you earn $10/day per contract)

C) 50% of max profit = $125
   Days = $125 / $10 = 12.5 days

   This assumes stable conditions - actual results vary with stock movement and IV changes.`,
      stock: 'TSLA',
    },
  ],
  quiz: [
    {
      id: 'w2d9q1',
      question:
        'An option has a theta of -0.08. As a premium seller who is short this option, approximately how much do you earn per day per contract?',
      options: ['$0.08', '$8.00', '-$8.00', '$80.00'],
      correctAnswer: 1,
      explanation:
        'Theta is expressed on a per-share basis. One contract represents 100 shares, so -0.08 theta = $8.00 per day per contract. Since you are short, you benefit from this decay and earn approximately $8 per day.',
      difficulty: 'easy',
    },
    {
      id: 'w2d9q2',
      question:
        'At which point in an option\'s life does theta decay accelerate the most?',
      options: [
        '90-60 days to expiration',
        '60-45 days to expiration',
        '45-30 days to expiration',
        'Final 21 days to expiration',
      ],
      correctAnswer: 3,
      explanation:
        'Theta decay follows an exponential curve that accelerates dramatically in the final 21 days, with the most extreme decay occurring in the last week. About 1/3 of an option\'s time value decays in the final 7 days.',
      difficulty: 'easy',
    },
    {
      id: 'w2d9q3',
      question:
        'You sell a put for $3.00 with theta of -0.15 and buy a put for $1.50 with theta of -0.08. What is your net theta position?',
      options: [
        '-0.23 (losing $23/day)',
        '-0.07 (earning $7/day)',
        '+0.07 (losing $7/day)',
        '-0.07 (losing $7/day)',
      ],
      correctAnswer: 1,
      explanation:
        'Net theta = Short put theta - Long put theta = -0.15 - (-0.08) = -0.07. Since you are net short (sold more premium than bought), you earn from theta decay. The spread earns approximately $7 per day per contract.',
      difficulty: 'medium',
    },
    {
      id: 'w2d9q4',
      question:
        'Which statement about weekend theta decay is most accurate?',
      options: [
        'Theta only decays on trading days, not weekends',
        'You receive extra premium when markets open Monday',
        'Weekend decay is priced into options before the weekend',
        'Weekend theta is exactly 2x the daily rate',
      ],
      correctAnswer: 2,
      explanation:
        'Weekend theta decay is priced into options before the weekend, typically reflected in Friday afternoon prices. Markets are efficient enough that you don\'t receive "free" decay over the weekend - it\'s already factored into the option price when you trade on Thursday/Friday.',
      difficulty: 'medium',
    },
    {
      id: 'w2d9q5',
      question:
        'Your iron condor has a net theta of -0.06. The position collected $3.00 in premium and has 14 DTE. Assuming no stock movement or IV change, what percentage of max profit would theta alone generate?',
      options: [
        'About 14% ($0.84)',
        'About 28% ($0.84)',
        'About 28% ($0.84 x 14 = would exceed premium)',
        'About 28% of the $3.00 max profit',
      ],
      correctAnswer: 2,
      explanation:
        'Daily theta earnings = $6 per contract. Over 14 days: $6 x 14 = $84 = $0.84 per share. Max profit is $3.00, so theta would generate $0.84/$3.00 = 28% of max profit. Note: This exceeds reality because theta accelerates but this is a simplified calculation.',
      difficulty: 'hard',
    },
  ],
}
