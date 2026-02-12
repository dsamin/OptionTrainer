import type { LessonContent } from '../index'

export const day11: LessonContent = {
  day: 11,
  week: 2,
  title: 'Vega Management',
  description:
    'Master vega exposure in spreads, learn to manage vega risk, and optimize iron condor positions for volatility changes',
  duration: 45,
  keyPoints: [
    'Vega measures option price sensitivity to 1% change in IV',
    'Selling premium means you are short vega (benefit from IV decline)',
    'Longer-dated options have higher vega than shorter-dated',
    'Spreads reduce but don\'t eliminate vega exposure',
    'Vega risk is highest when IV is at extremes',
  ],
  yourStocks: ['NVDA', 'META', 'TSLA', 'AAPL', 'GOOG'],
  content: [
    {
      type: 'text',
      title: 'What is Vega?',
      content: `Vega measures how much an option's price changes for every 1% change in implied volatility.

**Vega Basics:**
- Expressed in dollars per 1% IV change
- A vega of 0.15 means the option gains/loses $15 per contract for each 1% IV move
- Always positive for long options
- ATM options have the highest vega
- Vega decreases as expiration approaches

**For Premium Sellers:**
When you SELL options, you have NEGATIVE vega exposure:
- If IV rises: Your short options become more expensive (bad)
- If IV falls: Your short options become cheaper (good)

This is why we prefer to sell premium when IV is elevated - there's more room for IV to fall than rise.`,
    },
    {
      type: 'chart',
      title: 'Vega Across Strike Prices',
      content: `Vega distribution across strikes (stock at $100, 30 DTE):

Strike:  $80   $90   $95   $100   $105   $110   $120
Vega:    0.05  0.10  0.13  0.15   0.13   0.10   0.05
         |     |     |     |      |      |      |
         *     **    ***   ****   ***    **     *

Key observations:
- ATM options ($100 strike) have maximum vega
- Vega drops off symmetrically as you move OTM
- Deep OTM options have minimal vega exposure
- This is why iron condor wings have less vega than ATM positions`,
    },
    {
      type: 'example',
      title: 'Vega Exposure in an NVDA Credit Spread',
      content: `Let's calculate vega exposure for a put credit spread on NVDA:

NVDA at $880, 21 DTE, IV at 45%
- Short 850 put: Premium $8.50, Vega 0.85
- Long 840 put: Premium $6.20, Vega 0.75

**Position Vega:**
- Short 850 put: -0.85 (you're short, so negative vega)
- Long 840 put: +0.75 (you're long, so positive vega)
- Net vega: -0.85 + 0.75 = -0.10

**What This Means:**
- For every 1% IV increase, your spread loses $10 per contract
- For every 1% IV decrease, your spread gains $10 per contract

If IV drops from 45% to 40% (5% decrease):
Profit from vega: 5 x $10 = $50 per contract

This is in ADDITION to any theta decay. Selling high IV amplifies returns.`,
      stock: 'NVDA',
    },
    {
      type: 'text',
      title: 'Vega in Iron Condors',
      content: `Iron condors have four legs, each with vega exposure:

**Typical Iron Condor Vega Structure:**
- Short call: Negative vega (benefits from IV drop)
- Long call: Positive vega (hurts from IV drop)
- Short put: Negative vega (benefits from IV drop)
- Long put: Positive vega (hurts from IV drop)

**Net Result:**
Iron condors are NET SHORT vega. Both credit spreads contribute negative vega.

**Example Breakdown:**
Short 16-delta strangle portion: -0.20 vega
Long wing protection: +0.12 vega
Net iron condor vega: -0.08

**Practical Impact:**
If you enter an iron condor when IV is 50% and it drops to 40%:
10% IV drop x $8 per 1% = $80 profit from vega alone
(Plus theta decay = very profitable trade)`,
    },
    {
      type: 'example',
      title: 'Managing Vega Risk - META Earnings',
      content: `Scenario: You have an iron condor on META with earnings tomorrow.

**Position Details:**
- Entered when IV was 55%
- Current IV: 65% (pre-earnings spike)
- Net vega: -0.25 ($25 per 1% IV change)
- Position is currently at a loss due to IV expansion

**IV Impact Calculation:**
IV rose 10% (55% to 65%)
Loss from vega: 10 x $25 = $250 per contract

**Post-Earnings Scenarios:**

Scenario A - Stock moves 3%, IV crushes to 35%:
- IV drops 30% from 65% to 35%
- Vega profit: 30 x $25 = $750
- Net result: Likely profitable

Scenario B - Stock moves 8%, IV drops to 40%:
- IV drops 25%
- Vega profit: 25 x $25 = $625
- But stock breach may cause larger delta loss
- Net result: Depends on strike distances

**Key Lesson:**
IV expansion before earnings is normal. Don't panic - the crush after earnings often recovers your position.`,
      stock: 'META',
    },
    {
      type: 'tip',
      title: 'Vega Management Strategies',
      content: `Practical ways to manage vega exposure:

**1. Sell When IV is High:**
- IVR > 50% means IV has room to fall
- You benefit from both theta AND vega

**2. Use Shorter DTE:**
- 14 DTE has less vega than 45 DTE
- Faster theta decay offsets vega risk
- Trade-off: Less time to adjust

**3. Go Further OTM:**
- 10-delta options have less vega than 30-delta
- Reduces IV sensitivity
- Trade-off: Less premium collected

**4. Time Entries Around Events:**
- Enter iron condors 5-7 days before earnings
- IV has peaked, you capture the crush
- Avoid entering during low IV periods

**5. Reduce Position Size in Low IV:**
- If you must trade low IV, size down
- Potential IV spike hurts more when you're larger`,
    },
    {
      type: 'warning',
      title: 'Vega Risk Scenarios',
      content: `When vega works against premium sellers:

**1. Unexpected News:**
- Surprise Fed announcements, geopolitical events
- IV can spike 20%+ in hours
- Your short vega position takes immediate loss

**2. Flash Crashes:**
- VIX spikes, all options become expensive
- Even OTM options see significant IV expansion
- Delta AND vega work against you

**3. Entering Before IV Expansion:**
- Selling premium at IVR 20%
- IV rises to IVR 50%
- You're underwater before the trade has time to work

**4. Extended Low Volatility:**
- VIX at 12 for months
- You sell "cheap" premium
- Any normalization of IV hurts positions

**Protection Strategies:**
- Keep position sizes manageable
- Have a plan before entering (stop-loss or adjustment point)
- Diversify across underlyings and expirations`,
    },
    {
      type: 'example',
      title: 'Vega Comparison: Weekly vs Monthly',
      content: `Compare vega exposure for the same delta strikes on TSLA:

TSLA at $245, ATM put options:

**Weekly (7 DTE):**
- Premium: $4.50
- Vega: 0.12
- Theta: -0.35

**Monthly (30 DTE):**
- Premium: $10.80
- Vega: 0.28
- Theta: -0.18

**Analysis:**
The monthly has 2.3x more vega exposure (0.28 vs 0.12).

If IV spikes 10%:
- Weekly put loses: 10 x $12 = $120
- Monthly put loses: 10 x $28 = $280

**Trade-off:**
- Weekly: Lower vega risk, higher theta, but less time to be right
- Monthly: Higher vega risk, lower daily theta, more adjustment time

For TSLA specifically (high IV stock), many traders prefer weeklies to minimize vega exposure to this volatile underlying.`,
      stock: 'TSLA',
    },
    {
      type: 'exercise',
      title: 'Calculate Vega Impact',
      content: `You have an iron condor on AAPL with earnings in 3 days:

Position:
- Short 195 call, vega 0.18
- Long 200 call, vega 0.14
- Short 175 put, vega 0.16
- Long 170 put, vega 0.11

Current IV: 38%
Expected post-earnings IV: 25%

Calculate:
A) Net vega of the iron condor
B) Expected profit/loss from IV crush
C) If theta is -0.04 net, which Greek contributes more to profit?

**Answers:**
A) Net vega:
   Call spread: -0.18 + 0.14 = -0.04
   Put spread: -0.16 + 0.11 = -0.05
   Total: -0.09 (short $9 per 1% IV change)

B) IV crush impact:
   IV drops: 38% - 25% = 13%
   Vega profit: 13 x $9 = $117 per contract

C) Theta contribution (assume 3 days):
   3 days x $4 = $12 per contract

   Vega contribution: $117
   Theta contribution: $12

   Vega contributes almost 10x more! This is why earnings plays are really volatility trades, not time decay trades.`,
      stock: 'AAPL',
    },
  ],
  quiz: [
    {
      id: 'w2d11q1',
      question:
        'An option has a vega of 0.20. If implied volatility increases from 35% to 40%, how much does the option price change?',
      options: ['$0.20 increase', '$1.00 increase', '$5.00 increase', '$100 increase'],
      correctAnswer: 1,
      explanation:
        'Vega of 0.20 means $0.20 per share (or $20 per contract) for each 1% IV change. A 5% IV increase (35% to 40%) = 5 x $0.20 = $1.00 per share increase in the option price.',
      difficulty: 'easy',
    },
    {
      id: 'w2d11q2',
      question:
        'You sell an iron condor with net vega of -0.12. What happens to your position if IV rises 8%?',
      options: [
        'You profit $96 per contract',
        'You lose $96 per contract',
        'No impact - iron condors are vega neutral',
        'You profit $12 per contract',
      ],
      correctAnswer: 1,
      explanation:
        'Net vega of -0.12 means you lose $12 per contract for each 1% IV rise (you\'re short vega). An 8% IV increase = 8 x $12 = $96 loss per contract. This is why we prefer to sell premium when IV is already elevated.',
      difficulty: 'medium',
    },
    {
      id: 'w2d11q3',
      question:
        'Which option typically has the highest vega?',
      options: [
        'Deep OTM option with 7 DTE',
        'ATM option with 45 DTE',
        'Deep ITM option with 30 DTE',
        'Slightly OTM option with 7 DTE',
      ],
      correctAnswer: 1,
      explanation:
        'Vega is highest for ATM options with longer time to expiration. The 45 DTE ATM option has maximum sensitivity to IV changes. Vega decreases as you move away from ATM (either direction) and as expiration approaches.',
      difficulty: 'medium',
    },
    {
      id: 'w2d11q4',
      question:
        'You enter an iron condor on NVDA when IV is at 48%. Earnings cause IV to spike to 62% before dropping to 38% after. Net vega is -0.15. What is your total P&L from vega alone?',
      options: [
        'Loss of $21 (net IV change of +14%)',
        'Loss of $36 (you experienced the spike)',
        'Profit of $15 (48% to 38% = -10%)',
        'Profit of $36 (62% to 38% = -24%)',
      ],
      correctAnswer: 2,
      explanation:
        'What matters is where IV started vs where it ended up at your exit. If you held through earnings: 48% to 38% = -10% IV change. With net vega of -0.15: 10 x $15 = $150 profit per contract from vega. The spike only matters if you closed during it.',
      difficulty: 'hard',
    },
    {
      id: 'w2d11q5',
      question:
        'Which strategy best reduces vega risk while maintaining premium collection?',
      options: [
        'Sell longer-dated options for more premium',
        'Sell closer-to-money strikes for more premium',
        'Use shorter DTE options with further OTM strikes',
        'Double your position size to collect more premium',
      ],
      correctAnswer: 2,
      explanation:
        'Shorter DTE options have lower vega (less IV sensitivity), and further OTM strikes also have lower vega. This combination minimizes vega risk while still allowing premium collection. The trade-off is less premium per trade and higher gamma risk.',
      difficulty: 'hard',
    },
  ],
}
