import type { LessonContent } from '../index'

export const day12: LessonContent = {
  day: 12,
  week: 2,
  title: 'Strike Selection',
  description: 'Select optimal strikes using probability, delta, and credit-to-width ratios.',
  duration: 15,
  keyPoints: [
    'Delta approximates probability of expiring ITM',
    '16-delta = ~84% probability of staying OTM (1 standard deviation)',
    'Target 33%+ credit-to-width ratio for adequate compensation',
    'Balance probability of profit against expected value',
  ],
  yourStocks: ['NVDA', 'META', 'GOOG', 'AAPL', 'SPY'],
  content: [
    {
      type: 'text',
      title: 'Delta as Probability',
      content: `Delta gives us a shortcut to probability-based strike selection:

**Delta to Probability Mapping:**
| Delta | Approx POP (staying OTM) | SD Distance |
|-------|--------------------------|-------------|
| 0.30  | 70%                      | 0.5 SD      |
| 0.16  | 84%                      | 1 SD        |
| 0.10  | 90%                      | 1.3 SD      |
| 0.05  | 95%                      | 1.6 SD      |

**Premium Seller Guidelines:**
- **Conservative:** 10-delta (90% POP single side)
- **Standard:** 16-delta (84% POP single side)
- **Moderate:** 20-25 delta (75-80% POP single side)`
    },
    {
      type: 'example',
      title: 'Expected Move Calculation - NVDA',
      content: `Calculate the expected move for strike selection:

**Given:**
- NVDA price: $880
- IV: 48%
- DTE: 21 days

**Expected Move (1 SD):**
$880 x 0.48 x sqrt(21/365) = $101

**Interpretation:**
68% of the time, NVDA will be between $779 and $981.

**For a 21 DTE Iron Condor:**
- Sell 16-delta calls around $980
- Sell 16-delta puts around $780
- 68% probability stock stays between these strikes`,
      stock: 'NVDA'
    },
    {
      type: 'text',
      title: 'Credit-to-Width Ratio',
      content: `The credit you collect should justify the risk you take:

**The Rule:** Collect at least 1/3 (33%) of the spread width

**Examples:**
- $5 wide spread: Collect at least $1.65
- $10 wide spread: Collect at least $3.33

**If You Can't Meet 33%:**
- Go closer to the money (higher delta)
- Use tighter spreads
- Wait for higher IV
- Skip the trade

**Why This Matters:**
A 33% credit on a $10 spread means:
- Max profit: $3.33
- Max loss: $6.67
- Risk/reward: ~2:1

This ratio provides adequate compensation for the probability of loss.`
    },
    {
      type: 'example',
      title: 'Iron Condor POP - META',
      content: `Calculate probability of profit for a META iron condor:

**Position (META at $510):**
- Short 545 call (16 delta)
- Long 555 call
- Short 475 put (16 delta)
- Long 465 put
- Credit: $4.50

**Probability Calculations:**
POP = 1 - (call delta + put delta)
POP = 1 - (0.16 + 0.16) = 68%

**With Breakevens:**
Upper breakeven: 545 + 4.50 = 549.50
Lower breakeven: 475 - 4.50 = 470.50
POP based on breakevens: ~72%

This 16-delta iron condor offers roughly 2:1 odds of profit.`,
      stock: 'META'
    },
    {
      type: 'tip',
      title: 'Strike Selection Framework',
      content: `A balanced approach to strike selection:

**Step 1: Check IV Environment**
- High IV (IVR > 50%): Can use wider strikes (10-16 delta)
- Low IV (IVR < 30%): Need tighter strikes (20-25 delta)

**Step 2: Verify Credit-to-Width Ratio**
Target 33%+ of spread width

**Step 3: Check Absolute Dollar Risk**
- Is max loss acceptable for your account?
- Can you handle 2-3 consecutive losses?

**Sweet Spot:**
16-20 delta strikes when IV is normal to elevated, collecting 30-35% of spread width.`
    },
    {
      type: 'warning',
      title: 'Probability Misconceptions',
      content: `Common probability mistakes to avoid:

**"I'll win 84% with 16 delta"**
84% is the probability of ONE strike expiring OTM. Iron condors have TWO short strikes.

**"High POP = Safe Trade"**
A 90% POP trade with 9:1 risk/reward loses money long-term. Consider expected value, not just win rate.

**"Probability of profit = Max profit"**
POP includes partial profits. Probability of max profit is much lower (stock must stay between short strikes).

**Expected Value Reality:**
Options are priced to be "fair." Any edge comes from active management, not just high probability.`
    }
  ],
  quiz: [
    {
      id: 'w2d12q1',
      question: 'A 16-delta option has approximately what probability of expiring OTM?',
      options: ['50%', '68%', '84%', '95%'],
      correctAnswer: 2,
      explanation: '16-delta represents approximately 1 standard deviation from the current price, which gives about 84% probability of that individual strike expiring OTM.',
      difficulty: 'easy'
    },
    {
      id: 'w2d12q2',
      question: 'What credit-to-width ratio should you target for credit spreads?',
      options: ['10% of width', '20% of width', '33% of width', '50% of width'],
      correctAnswer: 2,
      explanation: 'Target at least 1/3 (33%) of spread width as credit. For a $10 spread, collect at least $3.33. This ensures adequate compensation for the risk.',
      difficulty: 'easy'
    },
    {
      id: 'w2d12q3',
      question: 'You sell a 16-delta call and 16-delta put for an iron condor. What is the approximate probability both expire worthless?',
      options: ['84%', '68%', '32%', '16%'],
      correctAnswer: 1,
      explanation: 'For BOTH to expire worthless, the stock must stay within a range. This is approximately 68% (1 - 0.16 - 0.16 = 68%), representing the area between the two strikes.',
      difficulty: 'medium'
    }
  ]
}
