import type { LessonContent } from '../index'

export const day12: LessonContent = {
  day: 12,
  week: 2,
  title: 'Probability of Profit',
  description:
    'Understand standard deviation in options, select strikes by probability, and balance POP against expected value',
  duration: 45,
  keyPoints: [
    'Standard deviation defines expected price ranges over time',
    'One standard deviation contains ~68% of expected moves',
    'Delta approximates probability of expiring ITM',
    'Higher POP trades often have lower expected value',
    'Optimal strike selection balances probability and reward',
  ],
  yourStocks: ['NVDA', 'META', 'GOOG', 'AAPL', 'SPY'],
  content: [
    {
      type: 'text',
      title: 'Standard Deviation and Stock Movement',
      content: `Standard deviation (SD) is a statistical measure that defines expected price ranges based on implied volatility.

**The Formula:**
Expected Move = Stock Price x IV x sqrt(DTE/365)

**Standard Deviation Probabilities:**
- 1 SD move: ~68% of outcomes fall within this range
- 2 SD move: ~95% of outcomes fall within this range
- 3 SD move: ~99.7% of outcomes fall within this range

**For Premium Sellers:**
Selling at 1 SD (16-delta) means:
- 68% of the time, stock stays within both strikes
- ~84% of the time, your individual strike isn't breached
- This is the foundation of high-probability trading`,
    },
    {
      type: 'example',
      title: 'Calculating Expected Move - NVDA',
      content: `Let's calculate the expected move for NVDA:

**Given:**
- NVDA price: $880
- IV: 48%
- DTE: 21 days

**Expected Move (1 SD):**
$880 x 0.48 x sqrt(21/365)
= $880 x 0.48 x 0.24
= $101.38

**Interpretation:**
68% of the time, NVDA will be between:
- Upper bound: $880 + $101 = $981
- Lower bound: $880 - $101 = $779

**For a 21 DTE Iron Condor:**
- Sell 16-delta calls around $980
- Sell 16-delta puts around $780
- 68% probability stock stays between these strikes`,
      stock: 'NVDA',
    },
    {
      type: 'chart',
      title: 'Probability Distribution Curve',
      content: `Stock price probability distribution (bell curve):

                          |
                         /|\\
                        / | \\
                       /  |  \\
                      /   |   \\
                     /    |    \\
                    /     |     \\
                   /      |      \\
              ____/       |       \\____
             /            |             \\
         ___/             |              \\___
        /                 |                  \\
     --+--------+---------+---------+--------+--
      -2SD     -1SD    Current    +1SD     +2SD
       (2.5%)  (16%)   Price     (84%)   (97.5%)

Key insight:
- Selling at 16-delta = selling at ~1 SD
- ~84% probability of staying OTM
- Iron condor with both sides at 16-delta has ~68% POP`,
    },
    {
      type: 'text',
      title: 'Strike Selection by Probability',
      content: `Delta gives us a shortcut to probability-based strike selection:

**Delta to Probability Mapping:**
| Delta | Approx POP (staying OTM) | SD Distance |
|-------|--------------------------|-------------|
| 0.50  | 50%                      | 0 SD (ATM)  |
| 0.30  | 70%                      | 0.5 SD      |
| 0.16  | 84%                      | 1 SD        |
| 0.10  | 90%                      | 1.3 SD      |
| 0.05  | 95%                      | 1.6 SD      |

**Premium Seller Guidelines:**
- **Conservative:** 10-delta (90% POP single side)
- **Standard:** 16-delta (84% POP single side)
- **Moderate:** 20-25 delta (75-80% POP single side)
- **Aggressive:** 30-delta (70% POP single side)

Remember: These are single-side probabilities. For iron condors, multiply for both sides.`,
    },
    {
      type: 'example',
      title: 'Iron Condor POP Calculation - META',
      content: `Calculate the probability of profit for a META iron condor:

**Position (META at $510):**
- Short 545 call (16 delta)
- Long 555 call
- Short 475 put (16 delta)
- Long 465 put

**Probability Calculations:**

Method 1 - Conservative estimate:
POP = 1 - (call delta + put delta)
POP = 1 - (0.16 + 0.16) = 68%

Method 2 - Using breakevens:
If credit received = $4.50
Upper breakeven: 545 + 4.50 = 549.50
Lower breakeven: 475 - 4.50 = 470.50
POP based on breakevens: ~72%

**Interpretation:**
Roughly 68-72% probability of keeping some profit.
Probability of max profit (stock between 475-545): ~65%

This 16-delta iron condor on META offers roughly 2:1 odds of profit.`,
      stock: 'META',
    },
    {
      type: 'text',
      title: 'POP vs Expected Value',
      content: `High probability of profit doesn't always mean high expected value. Understanding this trade-off is crucial.

**Expected Value Formula:**
EV = (Win Rate x Avg Win) - (Loss Rate x Avg Loss)

**Example Comparison:**

**Trade A: 10-delta Iron Condor**
- POP: 85%
- Max profit: $1.50
- Max loss: $8.50
- EV = (0.85 x $1.50) - (0.15 x $8.50) = $1.28 - $1.28 = $0.00

**Trade B: 20-delta Iron Condor**
- POP: 70%
- Max profit: $3.50
- Max loss: $6.50
- EV = (0.70 x $3.50) - (0.30 x $6.50) = $2.45 - $1.95 = $0.50

**Key Insight:**
Trade B has lower POP but higher expected value. The extra premium collected more than compensates for the lower win rate.

This is why pure POP isn't the only consideration - you need adequate premium for the risk.`,
    },
    {
      type: 'tip',
      title: 'Optimal Strike Selection Framework',
      content: `A balanced approach to strike selection:

**Step 1: Check IV Environment**
- High IV (IVR > 50%): Can use wider strikes (10-16 delta)
- Low IV (IVR < 30%): May need tighter strikes (20-25 delta)

**Step 2: Calculate Credit-to-Width Ratio**
Target: Collect at least 1/3 of spread width
- $10 wide spread should collect at least $3.33
- If not meeting this, go closer to money

**Step 3: Verify Expected Value**
- Calculate max profit and max loss
- Ensure EV is positive with your estimated win rate
- Include commissions in calculation

**Step 4: Check Absolute Dollar Risk**
- Is max loss acceptable for your account size?
- Can you handle 2-3 consecutive losses?

**Sweet Spot for Most Traders:**
16-20 delta strikes when IV is normal to elevated, collecting 30-35% of spread width.`,
    },
    {
      type: 'example',
      title: 'Comparing Strike Selections - GOOG',
      content: `Compare three iron condor approaches on GOOG ($175):

**Conservative (10 delta):**
- Strikes: 195/200 calls, 155/150 puts
- Credit: $1.80 / Max loss: $8.20
- POP: ~85%
- EV: (0.85 x 1.80) - (0.15 x 8.20) = $0.30

**Standard (16 delta):**
- Strikes: 188/193 calls, 162/157 puts
- Credit: $2.80 / Max loss: $7.20
- POP: ~72%
- EV: (0.72 x 2.80) - (0.28 x 7.20) = $0.00

**Moderate (25 delta):**
- Strikes: 182/187 calls, 168/163 puts
- Credit: $3.80 / Max loss: $6.20
- POP: ~60%
- EV: (0.60 x 3.80) - (0.40 x 6.20) = -$0.20

**Analysis:**
On paper, the conservative approach has the best EV. However, this doesn't account for management - most traders close at 50% profit, changing the math significantly.

With 50% profit target:
- Conservative: Win $0.90 more often
- Standard: Win $1.40 more often
- Moderate: Win $1.90 more often

Active management often makes moderate positions more profitable.`,
      stock: 'GOOG',
    },
    {
      type: 'warning',
      title: 'Probability Misconceptions',
      content: `Common probability mistakes to avoid:

**1. "I'll win 84% of the time with 16 delta"**
Reality: 84% is the probability of ONE strike expiring OTM. Iron condors have TWO short strikes. And this assumes holding to expiration.

**2. "High POP = Safe Trade"**
Reality: A 90% POP trade with 9:1 risk/reward loses money long-term. You need to consider expected value, not just win rate.

**3. "Past performance predicts future"**
Reality: Options are priced to be "fair." If 16-delta had consistent edge, prices would adjust. Any edge comes from active management.

**4. "I can't lose on this trade"**
Reality: 3 standard deviation moves happen more often than statistics suggest. Black swan events are real.

**5. "Probability of profit = Probability of max profit"**
Reality: POP includes partial profits. Probability of max profit is much lower (stock must stay between short strikes).`,
    },
    {
      type: 'exercise',
      title: 'Build Your Probability Framework',
      content: `AAPL is at $188 with IV at 28% and 14 DTE.

**Step 1: Calculate 1 SD move**
Expected move = $188 x 0.28 x sqrt(14/365)
= $188 x 0.28 x 0.196
= $10.32

**Step 2: Identify 16-delta strikes**
- Upper (1 SD up): $188 + $10 = ~$198
- Lower (1 SD down): $188 - $10 = ~$178

**Step 3: Check available options**
Assume these credits are available:
- 198/203 call spread: $1.10 credit
- 178/173 put spread: $1.20 credit
- Total credit: $2.30 on $10 risk (23%)

**Question:** Is this trade worth taking?

**Analysis:**
- Credit/width ratio: 23% (below 33% target)
- IV is low (28%), explaining thin premium
- POP ~68%, EV likely negative without management

**Recommendation:**
Either wait for higher IV, use tighter strikes (20-delta), or skip this trade. Low IV = unfavorable risk/reward for premium sellers.`,
      stock: 'AAPL',
    },
  ],
  quiz: [
    {
      id: 'w2d12q1',
      question:
        'A stock is at $100 with 30% IV and 30 DTE. What is the approximate expected 1 standard deviation move?',
      options: ['$3.00', '$8.60', '$30.00', '$9.00'],
      correctAnswer: 1,
      explanation:
        'Expected move = Price x IV x sqrt(DTE/365) = $100 x 0.30 x sqrt(30/365) = $100 x 0.30 x 0.287 = $8.61. The stock is expected to move about $8.60 in either direction, creating a range of roughly $91.40 to $108.60 with 68% probability.',
      difficulty: 'medium',
    },
    {
      id: 'w2d12q2',
      question:
        'You sell a 16-delta call and a 16-delta put to create a strangle. What is the approximate probability that BOTH options expire worthless?',
      options: ['84%', '68%', '32%', '16%'],
      correctAnswer: 1,
      explanation:
        'Each 16-delta option has approximately an 84% chance of expiring OTM. For BOTH to expire worthless simultaneously, the stock must stay within a range. This probability is approximately 68% (1 - 0.16 - 0.16 = 68%), representing the area between the two strikes.',
      difficulty: 'medium',
    },
    {
      id: 'w2d12q3',
      question:
        'Trade A has 85% POP with $150 max profit and $850 max loss. Trade B has 65% POP with $350 max profit and $650 max loss. Which has higher expected value?',
      options: [
        'Trade A (higher win rate)',
        'Trade B (better risk/reward)',
        'They are equal',
        'Cannot determine without more information',
      ],
      correctAnswer: 1,
      explanation:
        'Trade A EV: (0.85 x $150) - (0.15 x $850) = $127.50 - $127.50 = $0. Trade B EV: (0.65 x $350) - (0.35 x $650) = $227.50 - $227.50 = $0. They are theoretically equal! Options are priced to be fair. Any edge comes from management and skill.',
      difficulty: 'hard',
    },
    {
      id: 'w2d12q4',
      question:
        'What credit-to-width ratio is generally considered the minimum for a credit spread to be worthwhile?',
      options: ['10% of width', '20% of width', '33% of width', '50% of width'],
      correctAnswer: 2,
      explanation:
        'Most premium sellers target at least 1/3 (33%) of the spread width as credit. For a $5-wide spread, this means collecting at least $1.65. This ensures adequate compensation for the risk and allows for profitable management even if you close early.',
      difficulty: 'easy',
    },
    {
      id: 'w2d12q5',
      question:
        'SPY is at $500. You want to sell an iron condor with 70% probability of max profit. Approximately what delta should your short strikes be?',
      options: [
        '30 delta (at the money)',
        '25 delta',
        '16 delta',
        '10 delta',
      ],
      correctAnswer: 2,
      explanation:
        'For 70% probability of max profit (stock staying between short strikes), each short strike should be at roughly 15-16 delta. This places them at about 1 SD out. Lower delta would increase POP but reduce premium; higher delta would increase premium but lower POP.',
      difficulty: 'hard',
    },
  ],
}
