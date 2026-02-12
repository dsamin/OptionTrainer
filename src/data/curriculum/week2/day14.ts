import type { LessonContent } from '../index'

export const day14: LessonContent = {
  day: 14,
  week: 2,
  title: 'Week 2 Review: The Greeks',
  description:
    'Comprehensive review of options Greeks, their interplay, and how to use them for successful premium selling strategies',
  duration: 60,
  keyPoints: [
    'Delta, Theta, Vega, and Gamma work together to determine option behavior',
    'Premium sellers are long theta, short gamma, and typically short vega',
    'Greeks change dynamically with stock price, time, and volatility',
    'Probability of profit must be balanced with expected value',
    'DTE selection affects all Greeks and should match your trading style',
  ],
  yourStocks: ['NVDA', 'META', 'GOOG', 'AAPL', 'TSLA', 'SPY'],
  content: [
    {
      type: 'text',
      title: 'Week 2 Summary: The Greeks at a Glance',
      content: `This week we mastered the four primary Greeks and their applications to premium selling:

**Delta (Day 8)**
- Measures price sensitivity and probability of ITM
- 16-delta = ~84% probability of staying OTM
- Iron condors start delta-neutral
- Position delta tells you your directional exposure

**Theta (Day 9)**
- Time decay - how you earn money as a premium seller
- Accelerates in the final 21 days
- ATM options have the highest theta
- Net theta in spreads = short theta - long theta

**Implied Volatility (Day 10)**
- Market's expectation of future movement
- IV Rank/Percentile tells you if IV is relatively high or low
- High IV = sell premium; Low IV = be cautious
- IV crush after earnings benefits short premium positions

**Vega (Day 11)**
- Sensitivity to 1% IV change
- Selling premium = short vega (benefit from IV drop)
- Longer DTE = higher vega exposure
- Manage vega by selling high IV and using appropriate DTE`,
    },
    {
      type: 'chart',
      title: 'Greeks Cheat Sheet for Premium Sellers',
      content: `Position Type        | Delta | Theta | Vega  | Gamma
---------------------|-------|-------|-------|-------
Short Put            | +     | +     | -     | -
Short Call           | -     | +     | -     | -
Bull Put Spread      | +     | +     | -     | Mixed
Bear Call Spread     | -     | +     | -     | Mixed
Iron Condor          | ~0    | +     | -     | -
Short Straddle       | ~0    | ++    | --    | --
Short Strangle       | ~0    | +     | -     | -

Key insights:
+ = Positive exposure (you benefit when it increases)
- = Negative exposure (you benefit when it decreases)
~0 = Approximately neutral

All premium selling strategies:
- Want theta to work FOR you (positive)
- Want gamma to be LOW (negative is fine)
- Generally want IV to DROP (short vega)`,
    },
    {
      type: 'text',
      title: 'Probability and DTE Review',
      content: `**Probability of Profit (Day 12)**
- Standard deviation defines expected move ranges
- 1 SD = 68% probability, 2 SD = 95%
- Delta approximates ITM probability
- POP must be balanced with expected value
- High POP + terrible risk/reward = bad trade

**DTE Selection (Day 13)**
- Shorter DTE: More theta, more gamma risk, less adjustment time
- Longer DTE: Less theta, less gamma risk, more adjustment time
- Sweet spot: 21-45 DTE for most strategies
- Weekly options: High efficiency but requires active management
- Match DTE to your monitoring ability and risk tolerance

**The 50% Profit Rule:**
Close positions at 50% profit around 21 DTE. This approach:
- Locks in most of the edge
- Avoids high gamma of final week
- Frees capital for new positions
- Produces better risk-adjusted returns than holding to expiration`,
    },
    {
      type: 'example',
      title: 'Greeks in Action: Complete Iron Condor Analysis',
      content: `Let's analyze a complete iron condor setup on META:

**Position (META at $510, IV Rank 65%, 30 DTE):**
- Short 545 call (16 delta, theta -0.12, vega 0.22)
- Long 555 call (10 delta, theta -0.08, vega 0.16)
- Short 475 put (-16 delta, theta -0.11, vega 0.21)
- Long 465 put (-10 delta, theta -0.07, vega 0.15)

**Net Greeks:**
- Delta: (-16 + 10) + (16 - 10) = 0 (neutral)
- Theta: (+0.12 - 0.08) + (+0.11 - 0.07) = +0.08 (earn $8/day)
- Vega: (-0.22 + 0.16) + (-0.21 + 0.15) = -0.12 (earn on IV drop)

**Credit: $4.80 / Max Risk: $5.20**

**Analysis:**
1. Delta-neutral start - no directional bias
2. Earning $8/day from theta
3. IV Rank 65% is favorable - vega working for you
4. 30 DTE is in the sweet spot
5. Credit/width ratio: 48% (excellent)

**Expected Outcome at 50% Profit (15 DTE):**
Profit: $2.40 per contract
Days held: ~15
Daily return: $0.16/day theta + vega tailwind
Capital efficiency: 46% return on risk in 15 days`,
      stock: 'META',
    },
    {
      type: 'tip',
      title: 'The Greek Hierarchy for Premium Sellers',
      content: `Prioritize Greeks in this order when evaluating trades:

**1. Implied Volatility (Entry Condition)**
Before anything else, check if IV is elevated enough to sell premium.
- IVR > 50%: Green light
- IVR 30-50%: Proceed with caution
- IVR < 30%: Consider waiting

**2. Delta (Strike Selection)**
Choose strikes based on probability goals.
- 16-delta: Standard, ~68% POP on iron condor
- 10-delta: Conservative, ~80% POP
- 25-delta: Aggressive, ~50% POP

**3. Theta (Daily Income)**
Verify you're collecting meaningful premium for your risk.
- Check net theta on the spread
- Ensure credit/width ratio > 33%
- Calculate days to 50% profit

**4. Vega (Volatility Risk)**
Understand your IV exposure.
- Higher IVR entry = less vega risk
- Shorter DTE = less vega exposure
- Monitor for IV spikes that hurt positions

**5. Gamma (Expiration Risk)**
Manage gamma by timing and position sizing.
- Avoid the final 7 days with large positions
- Close at 50% profit before gamma escalates
- Use wider spreads in high-gamma environments`,
    },
    {
      type: 'example',
      title: 'Greeks Through the Trade Lifecycle',
      content: `Watch how Greeks evolve through a 30-day iron condor on NVDA:

**Day 1 (Entry at 30 DTE):**
NVDA at $880, IV at 52% (IVR 70%)
- Delta: 0 (neutral)
- Theta: +$10/day
- Vega: -0.15 ($15 per 1% IV)
- Position: Balanced, collecting premium

**Day 15 (Midpoint):**
NVDA at $890 (+1%), IV dropped to 45%
- Delta: -5 (slight bearish tilt from rally)
- Theta: +$14/day (accelerating)
- Vega: -0.10 (decreasing with DTE)
- P&L: +$70 from theta, +$105 from vega = +$175 (36%)
- Action: Approaching 50% target, prepare to close

**Day 22 (Close at 50%):**
NVDA at $885, IV at 42%
- Closed for $2.40 profit (50% of $4.80 credit)
- Held 22 days, earned $2.40 per contract
- Annualized return: Well over 100% on capital risked
- Freed up margin for new position

**Key Takeaways:**
- Theta earned consistently but accelerated after day 15
- Vega tailwind added significantly to profits
- Delta shift was manageable due to wide strikes
- Closing at 50% avoided final week gamma risk`,
      stock: 'NVDA',
    },
    {
      type: 'warning',
      title: 'Common Mistakes with Greeks',
      content: `Avoid these Greek-related errors:

**1. Ignoring Vega in Low IV**
Selling premium when IVR is 15% means vega can only hurt you. Any IV spike causes immediate losses.

**2. Misunderstanding Position Delta**
Remember: Short puts have POSITIVE delta (bullish), short calls have NEGATIVE delta (bearish). Don't confuse option delta with position delta.

**3. Overestimating Theta**
Theta is not guaranteed profit. It only helps if the stock cooperates. A 3% move against you will overwhelm days of theta.

**4. Holding Through High Gamma**
The final week before expiration has extreme gamma. Small moves cause large delta changes. Close positions or roll before this zone.

**5. Ignoring Greek Changes**
Greeks are snapshots in time. They change as the stock moves, time passes, and IV fluctuates. Check them regularly, not just at entry.

**6. Position Sizing Based on POP Only**
An 85% POP trade can still blow up your account if sized too large. Always consider max loss, not just probability.`,
    },
    {
      type: 'exercise',
      title: 'Week 2 Synthesis Exercise',
      content: `You're evaluating two potential iron condor trades. Choose the better setup:

**Trade A: AAPL ($188)**
- IVR: 25%
- 21 DTE
- Short 200/205 calls, 175/170 puts
- Credit: $1.80 / Max loss: $3.20
- Net theta: +$0.05/day
- Net vega: -0.06

**Trade B: TSLA ($245)**
- IVR: 68%
- 30 DTE
- Short 280/290 calls, 210/200 puts
- Credit: $4.20 / Max loss: $5.80
- Net theta: +$0.08/day
- Net vega: -0.15

**Analysis:**

Trade A Issues:
- Low IVR (25%) = vega risk, any IV spike hurts
- Credit/width: $1.80/$5 = 36% (borderline)
- Low theta ($5/day for the risk)
- In low IV, need even better entry

Trade B Advantages:
- High IVR (68%) = room for IV to fall
- Credit/width: $4.20/$10 = 42% (good)
- Higher theta ($8/day)
- Vega tailwind likely

**Winner: Trade B**
Despite TSLA's reputation for volatility, the high IVR makes this a better risk-adjusted trade. The Greeks are working in your favor on all fronts.`,
      stock: 'TSLA',
    },
    {
      type: 'text',
      title: 'Looking Ahead: Week 3',
      content: `With the Greeks mastered, Week 3 will focus on advanced strategy application:

**Day 15: Iron Condor Optimization**
Apply everything you've learned to build optimal iron condors.

**Day 16: Credit Spread Timing**
When to use vertical spreads vs iron condors.

**Day 17: Managing Assignments**
What happens when your short strikes are breached.

**Day 18: Rolling Strategies**
Advanced techniques for extending and adjusting positions.

**Day 19: Position Sizing**
How much capital to allocate to each trade.

**Day 20: Trading Plan**
Build your personalized premium selling system.

**Day 21: Final Assessment**
Comprehensive test of all concepts.

You now have the foundation to understand WHY options behave the way they do. Week 3 will teach you HOW to apply this knowledge systematically.`,
    },
  ],
  quiz: [
    {
      id: 'w2d14q1',
      question:
        'As a premium seller with a short iron condor, which combination of Greek exposures do you have?',
      options: [
        'Long theta, long gamma, short vega',
        'Long theta, short gamma, short vega',
        'Short theta, long gamma, long vega',
        'Short theta, short gamma, long vega',
      ],
      correctAnswer: 1,
      explanation:
        'Premium sellers (short options) are long theta (benefit from time decay), short gamma (hurt by large moves), and short vega (benefit from IV decline). This is the fundamental risk profile of all premium selling strategies.',
      difficulty: 'easy',
    },
    {
      id: 'w2d14q2',
      question:
        'You sold an iron condor when IVR was 70%. Now IVR has dropped to 40%. How has this affected your position?',
      options: [
        'Hurt the position due to short vega',
        'Helped the position due to short vega',
        'No impact - iron condors are vega neutral',
        'Depends on which direction the stock moved',
      ],
      correctAnswer: 1,
      explanation:
        'With short vega exposure, you benefit when IV falls. A drop from 70% to 40% IVR means implied volatility decreased significantly, making your short options cheaper to buy back. This vega tailwind adds to your theta profits.',
      difficulty: 'easy',
    },
    {
      id: 'w2d14q3',
      question:
        'A stock has moved against your credit spread. At 10 DTE, you\'re at a 25% loss. What makes the situation more dangerous as expiration approaches?',
      options: [
        'Theta decay slows down',
        'Vega increases significantly',
        'Gamma increases, making delta very unstable',
        'The spread automatically gets wider',
      ],
      correctAnswer: 2,
      explanation:
        'As expiration approaches, gamma increases dramatically. This means delta changes rapidly with small stock moves. A position that\'s underwater at 10 DTE can swing wildly between profit and loss as gamma magnifies every price tick.',
      difficulty: 'medium',
    },
    {
      id: 'w2d14q4',
      question:
        'You want to open an iron condor with 70% probability of max profit. Stock is at $100 with 35% IV and 30 DTE. What approximate strike prices should you target for the short options?',
      options: [
        '$92 put and $108 call (8% away)',
        '$85 put and $115 call (15% away)',
        '$95 put and $105 call (5% away)',
        '$90 put and $110 call (10% away)',
      ],
      correctAnswer: 3,
      explanation:
        'For 70% POP, you want roughly 15-16 delta strikes. Expected 1 SD move = $100 x 35% x sqrt(30/365) = $10. Strikes at approximately 1 SD ($90 and $110, or 10% away) give you the ~68-70% probability of staying between the short strikes.',
      difficulty: 'medium',
    },
    {
      id: 'w2d14q5',
      question:
        'Trade A has IVR 20%, collects $2.00 on $8 risk, with theta of $0.06. Trade B has IVR 65%, collects $3.50 on $6.50 risk, with theta of $0.08. Which is better and why?',
      options: [
        'Trade A - lower risk amount',
        'Trade B - better credit/risk ratio and higher IVR',
        'Trade A - higher potential percentage profit',
        'Trade B - but only because of higher theta',
      ],
      correctAnswer: 1,
      explanation:
        'Trade B is superior: Higher IVR (65% vs 20%) means vega tailwind, better credit/risk ratio (54% vs 25%), and higher theta. Trade A\'s low IVR means any IV expansion hurts the position. Always prefer high IVR entries when selling premium.',
      difficulty: 'hard',
    },
    {
      id: 'w2d14q6',
      question:
        'Why is the 21-45 DTE range considered optimal for iron condors?',
      options: [
        'Maximum gamma for quick profits',
        'Lowest vega exposure possible',
        'Best balance of theta acceleration and adjustment time',
        'Highest credit available',
      ],
      correctAnswer: 2,
      explanation:
        'The 21-45 DTE window offers the best balance: theta is accelerating meaningfully but gamma hasn\'t become extreme. You have time to adjust if positions are tested. This sweet spot maximizes risk-adjusted returns for premium sellers.',
      difficulty: 'medium',
    },
    {
      id: 'w2d14q7',
      question:
        'You have a delta-neutral iron condor on NVDA. The stock rallies 5% over two days. What happens to your position delta?',
      options: [
        'Becomes more positive (bullish exposure)',
        'Becomes more negative (bearish exposure)',
        'Stays neutral - that\'s the point of iron condors',
        'Becomes undefined',
      ],
      correctAnswer: 1,
      explanation:
        'When the stock rallies, your short call moves closer to the money (higher delta) while your short put moves further out (lower delta). The net effect is negative position delta - the iron condor now "wants" the stock to fall back. This is normal gamma behavior.',
      difficulty: 'hard',
    },
    {
      id: 'w2d14q8',
      question:
        'An ATM option has delta of 0.50, theta of -0.15, and vega of 0.25. A 20-delta OTM option on the same stock and expiration would most likely have:',
      options: [
        'Higher theta and higher vega',
        'Lower theta and lower vega',
        'Same theta but lower vega',
        'Lower theta but higher vega',
      ],
      correctAnswer: 1,
      explanation:
        'Both theta and vega peak at ATM and decline as you move OTM. A 20-delta option will have lower theta (less time value to decay) and lower vega (less sensitivity to IV changes) compared to a 50-delta ATM option.',
      difficulty: 'medium',
    },
    {
      id: 'w2d14q9',
      question:
        'Your iron condor is at 45% profit with 15 DTE remaining. Net theta is $12/day. What is the best action?',
      options: [
        'Hold for max profit - you\'re so close',
        'Close now - you\'ve captured most of the edge',
        'Roll to next month for more premium',
        'Add more contracts to accelerate gains',
      ],
      correctAnswer: 1,
      explanation:
        'At 45% profit with 15 DTE, you should close. You\'ve captured significant edge, gamma is increasing, and the remaining ~$12/day theta doesn\'t justify the risk of the position moving against you. Free up capital and find a new opportunity.',
      difficulty: 'easy',
    },
    {
      id: 'w2d14q10',
      question:
        'Which scenario represents the BEST entry conditions for selling premium?',
      options: [
        'IVR 20%, VIX at 12, stock near 52-week highs',
        'IVR 75%, VIX at 22, stock in established trading range',
        'IVR 50%, VIX at 45, stock down 20% on bad earnings',
        'IVR 100%, VIX at 35, pending binary event tomorrow',
      ],
      correctAnswer: 1,
      explanation:
        'Scenario B offers: High IVR (75%) for vega tailwind, elevated but not extreme VIX (22) suggesting good premium, and a range-bound stock (ideal for iron condors). Scenario A has too little premium, C has too much uncertainty, and D has extreme event risk.',
      difficulty: 'hard',
    },
  ],
}
