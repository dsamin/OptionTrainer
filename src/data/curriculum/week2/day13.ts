import type { LessonContent } from '../index'

export const day13: LessonContent = {
  day: 13,
  week: 2,
  title: 'DTE Selection',
  description:
    'Master the art of choosing expiration dates: weekly vs monthly options, optimal DTE for premium selling, and rolling timing',
  duration: 40,
  keyPoints: [
    'Shorter DTE = higher theta per day but higher gamma risk',
    'Longer DTE = lower theta per day but more time to adjust',
    '21-45 DTE is the "sweet spot" for premium selling',
    'Weekly options work best on high-liquidity underlyings',
    'Roll timing depends on profit target and days remaining',
  ],
  yourStocks: ['NVDA', 'META', 'GOOG', 'AAPL', 'SPY'],
  content: [
    {
      type: 'text',
      title: 'The DTE Decision Framework',
      content: `Choosing the right expiration is as important as choosing the right strikes. DTE affects every aspect of your trade:

**What Changes with DTE:**
- Theta: Higher daily decay as expiration approaches
- Gamma: More sensitive to price moves near expiration
- Vega: Lower sensitivity to IV changes with shorter DTE
- Premium: More absolute premium with longer DTE
- Adjustment time: More room to fix positions with longer DTE

**The Core Trade-off:**
Shorter DTE gives you more theta per day but less time to be right.
Longer DTE gives you more time to adjust but less daily income.

Finding your optimal DTE depends on your trading style, available time, and risk tolerance.`,
    },
    {
      type: 'chart',
      title: 'Theta Decay by DTE',
      content: `Daily theta as a percentage of option value:

DTE    | Daily Theta | Gamma Risk | Adjustment Time
-------|-------------|------------|----------------
7 DTE  | ~3.0%/day   | VERY HIGH  | Minimal
14 DTE | ~1.8%/day   | HIGH       | Limited
21 DTE | ~1.2%/day   | MODERATE   | Good
30 DTE | ~0.8%/day   | LOW-MOD    | Ample
45 DTE | ~0.5%/day   | LOW        | Maximum

Sweet spot visualization:

       THETA                    GAMMA
       ▲                        ▲
       |    *                   |            *
       |      *                 |          *
       |        *     ←SWEET    |        *
       |          *    SPOT     |      *
       |            * * * →     |    *
       |__________________▶     |__*____________▶
           45  30  21  14  7        7  14  21  30  45
                  DTE                     DTE`,
    },
    {
      type: 'text',
      title: 'Weekly Options (0-7 DTE)',
      content: `Weekly options expire every Friday and offer unique advantages and risks:

**Advantages:**
- Maximum theta decay per day
- Faster capital turnover
- Less exposure to major news events
- Can capitalize on short-term moves

**Disadvantages:**
- Extreme gamma risk (delta changes rapidly)
- Little time to adjust losing positions
- Wider bid-ask spreads on some underlyings
- Requires more active management

**Best For:**
- Experienced traders
- High-liquidity stocks (AAPL, META, NVDA, SPY)
- Defined-risk strategies only (credit spreads, iron condors)
- Traders who can monitor positions daily

**Not Recommended For:**
- Beginners
- Naked options (undefined risk)
- Illiquid underlyings
- "Set and forget" trading styles`,
    },
    {
      type: 'example',
      title: 'Weekly vs Monthly on NVDA',
      content: `Compare the same 16-delta iron condor on NVDA ($880) with different DTEs:

**Weekly (7 DTE):**
- Short strikes: 920 call, 840 put
- Credit: $3.20 per contract
- Daily theta: $0.45
- Max daily gamma exposure: Very high

**Monthly (30 DTE):**
- Short strikes: 980 call, 780 put
- Credit: $5.80 per contract
- Daily theta: $0.19
- Max daily gamma exposure: Moderate

**Analysis:**

Theta efficiency (7 DTE): $3.20 / 7 days = $0.46/day
Theta efficiency (30 DTE): $5.80 / 30 days = $0.19/day

The weekly is 2.4x more efficient at collecting theta!

But consider gamma risk:
- Weekly: A 3% move could take you from safe to breached
- Monthly: Same move still leaves you with comfortable buffer

**When to Use Each:**
- Weekly: High conviction, quiet week expected, can manage daily
- Monthly: Normal conditions, want buffer, can't watch constantly`,
      stock: 'NVDA',
    },
    {
      type: 'text',
      title: 'The 21-45 DTE Sweet Spot',
      content: `Research and practice show that 21-45 DTE offers the best risk-adjusted returns for premium selling:

**Why This Range Works:**

**At 45 DTE:**
- Theta acceleration has begun but isn't extreme
- Plenty of time to roll or adjust
- Manageable gamma risk
- Good entry point for monthly cycles

**At 21 DTE:**
- Theta is accelerating nicely (~1.2%/day)
- Still have meaningful adjustment window
- Can capture most of the decay curve
- Optimal for managing at 50% profit target

**The Typical Cycle:**
1. Enter position at 45 DTE
2. Manage toward 50% profit
3. Close around 21 DTE if profitable
4. Or hold to 14 DTE and reassess
5. Never hold through final week unless small profit remains

**Research Insight:**
Studies show managing trades at 50% profit around 21 DTE produces better risk-adjusted returns than holding to expiration.`,
    },
    {
      type: 'example',
      title: 'DTE Selection Based on IV - META',
      content: `How IV environment affects DTE selection on META:

**Scenario 1: High IV (IVR 75%)**
META at $510, IV elevated due to earnings uncertainty

Optimal DTE: 30-45 days
Rationale:
- High IV means premium is rich even further out
- Longer DTE captures IV crush after event
- More time for realized volatility to be less than implied
- Can close at 50% profit quickly if IV drops

**Scenario 2: Normal IV (IVR 40%)**
META at $510, typical market conditions

Optimal DTE: 21-30 days
Rationale:
- Balance of theta and adjustment time
- Standard premium levels
- Typical management cycle works well

**Scenario 3: Low IV (IVR 15%)**
META at $510, very quiet market

Optimal DTE: 14-21 days OR wait
Rationale:
- Need shorter DTE to collect meaningful theta
- Less time for IV to spike against you
- Consider smaller position or skip entirely

The lower the IV, the shorter you should go (or don't trade at all).`,
      stock: 'META',
    },
    {
      type: 'tip',
      title: 'Optimal DTE for Different Strategies',
      content: `Match your DTE to your strategy:

**Iron Condors:**
- Optimal: 30-45 DTE
- Allows time for theta AND adjustments
- Close at 50% profit or 21 DTE

**Credit Spreads (directional):**
- Optimal: 21-30 DTE
- Less time for stock to move against you
- Close at 50-75% profit

**Naked Puts (cash-secured):**
- Optimal: 30-45 DTE
- More premium for the assignment risk
- Can roll if tested

**Strangles (undefined risk):**
- Optimal: 45-60 DTE
- Maximum adjustment flexibility
- Roll untested side regularly

**Earnings Plays:**
- Optimal: First expiration after earnings
- Captures IV crush
- Often weekly options

**General Rules:**
- More risk = longer DTE for adjustment time
- Directional bias = shorter DTE to be right faster
- Undefined risk = longer DTE always`,
    },
    {
      type: 'text',
      title: 'Rolling Timing Considerations',
      content: `Rolling is moving your position to a new expiration. Timing matters:

**When to Roll for Duration:**
1. Position is profitable (50%+) with time remaining
2. You want to maintain the position
3. The new expiration offers better theta

**When to Roll Tested Positions:**
1. One side is being challenged
2. Rolling adds time AND credit (usually)
3. Fundamental view hasn't changed

**The 21 DTE Decision Point:**
At 21 DTE, you should decide:
- Close for profit if at 50%+ gain
- Hold if still working but not yet profitable
- Roll out if tested but recoverable
- Close for loss if thesis is broken

**Rolling Mechanics:**
- Roll same strike to later date: Collects more credit
- Roll further OTM: May be debit or credit, improves probability
- Roll + widen: Adds risk but collects more premium

**Don't Roll When:**
- The trade is a clear loser (just close it)
- You're chasing losses with more risk
- The underlying thesis has fundamentally changed`,
    },
    {
      type: 'example',
      title: 'Rolling Decision Tree - GOOG',
      content: `GOOG Iron Condor at 14 DTE - Decision Framework:

**Starting Position:**
- Entered at 45 DTE with $4.00 credit
- 16-delta strikes: 195/200 calls, 155/150 puts
- Current DTE: 14

**Scenario A: 65% Profit ($2.60 realized)**
Decision: CLOSE
Reason: You've captured most of the premium with minimal remaining theta. Close and redeploy capital.

**Scenario B: 30% Profit ($1.20 realized)**
Decision: HOLD to 7 DTE or 50% profit
Reason: Theta acceleration will work for you. Set alert at 50% profit to close.

**Scenario C: Breakeven or small loss**
Decision: EVALUATE
- If stock is centered: Hold, theta will help
- If stock is near one side: Consider rolling tested side
- If IV has spiked: Hold, IV crush likely coming

**Scenario D: Tested (short strike breached)**
Decision: ROLL OR CLOSE
- Roll out 2-3 weeks for credit if thesis intact
- Close for loss if view has changed
- Never add to a losing position

**Scenario E: 7 DTE with profit remaining**
Decision: CLOSE
Reason: Gamma risk in final week outweighs remaining profit.`,
      stock: 'GOOG',
    },
    {
      type: 'exercise',
      title: 'Create Your DTE Plan',
      content: `Build a personal DTE framework for your trading:

**Step 1: Define Your Style**
How much time can you spend monitoring positions?
- Daily check: 7-21 DTE options work
- Weekly check: 30-45 DTE minimum
- Monthly check: 45+ DTE only

**Step 2: Match to Account Size**
Smaller accounts need faster turnover:
- <$10K: Focus on 14-21 DTE for capital efficiency
- $10-50K: 21-30 DTE provides good balance
- >$50K: 30-45 DTE for risk management

**Step 3: Create Entry Rules**
Example framework:
- High IV (>50 IVR): Enter at 45 DTE
- Normal IV (30-50 IVR): Enter at 30 DTE
- Low IV (<30 IVR): Wait or use 14-21 DTE

**Step 4: Create Exit Rules**
- 50% profit OR 21 DTE remaining: Close
- 7 DTE: Close regardless of profit/loss
- 200% max loss: Close

**Your Assignment:**
Write out your personal DTE rules for:
1. Iron condors on high-IV stocks
2. Credit spreads on your favorite stocks
3. When you will and won't use weekly options`,
    },
  ],
  quiz: [
    {
      id: 'w2d13q1',
      question:
        'Which DTE range is generally considered the "sweet spot" for selling iron condors?',
      options: ['3-7 days', '7-14 days', '21-45 days', '60-90 days'],
      correctAnswer: 2,
      explanation:
        'The 21-45 DTE range offers the best balance of theta decay and adjustment time. Theta is accelerating meaningfully, but gamma risk hasn\'t become extreme. Most professional premium sellers target this window.',
      difficulty: 'easy',
    },
    {
      id: 'w2d13q2',
      question:
        'Why might you choose longer DTE (45+ days) when implied volatility is high?',
      options: [
        'Longer DTE has higher gamma',
        'You capture more IV crush and have time for realized volatility to be less than implied',
        'Weekly options aren\'t available',
        'Longer DTE has more theta per day',
      ],
      correctAnswer: 1,
      explanation:
        'When IV is high, longer DTE positions capture the IV crush as volatility normalizes. You also get more time for the actual stock movement to be less than what was implied. The rich premium available justifies the longer holding period.',
      difficulty: 'medium',
    },
    {
      id: 'w2d13q3',
      question:
        'You have an iron condor at 14 DTE with 50% profit. What is the recommended action?',
      options: [
        'Hold to expiration for max profit',
        'Close the position and take profits',
        'Roll to the next expiration',
        'Add to the position for more premium',
      ],
      correctAnswer: 1,
      explanation:
        'At 50% profit with 14 DTE remaining, you should close. You\'ve captured most of the edge while gamma risk is increasing. The remaining potential profit doesn\'t justify the risk of holding through the theta acceleration zone.',
      difficulty: 'easy',
    },
    {
      id: 'w2d13q4',
      question:
        'What is the main advantage of weekly options over monthly options for premium sellers?',
      options: [
        'Lower commissions',
        'Higher absolute premium',
        'More theta decay per day',
        'Lower gamma risk',
      ],
      correctAnswer: 2,
      explanation:
        'Weekly options offer significantly more theta decay per day (theta efficiency) because time value must decay to zero in just 5 trading days. However, this comes with much higher gamma risk - the main trade-off of weekly options.',
      difficulty: 'medium',
    },
    {
      id: 'w2d13q5',
      question:
        'When should you typically roll a credit spread to a later expiration?',
      options: [
        'Whenever you hit 50% profit',
        'When the short strike is tested but your thesis is intact',
        'Every week regardless of position status',
        'Only when both strikes are in the money',
      ],
      correctAnswer: 1,
      explanation:
        'Roll when your short strike is being tested (challenged) but your fundamental view hasn\'t changed. Rolling adds time and usually collects additional credit, giving the trade more room to work. Don\'t roll just to chase losses or when the underlying thesis has fundamentally changed.',
      difficulty: 'hard',
    },
  ],
}
