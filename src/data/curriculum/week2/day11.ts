import type { LessonContent } from '../index'

export const day11: LessonContent = {
  day: 11,
  week: 2,
  title: 'DTE Selection',
  description: 'Choose optimal expiration dates for premium selling strategies.',
  duration: 15,
  keyPoints: [
    'Shorter DTE = more theta/day but higher gamma risk',
    '21-45 DTE is the "sweet spot" for premium selling',
    'Close at 50% profit or by 21 DTE remaining',
    'Match DTE to IV environment and monitoring ability',
  ],
  yourStocks: ['NVDA', 'META', 'GOOG', 'AAPL', 'SPY'],
  content: [
    {
      type: 'text',
      title: 'The DTE Trade-off',
      content: `Choosing expiration affects every aspect of your trade:

**What Changes with DTE:**
- Theta: Higher daily decay as expiration approaches
- Gamma: More sensitive to price moves near expiration
- Vega: Lower IV sensitivity with shorter DTE
- Adjustment time: More room to fix positions with longer DTE

**The Core Trade-off:**
Shorter DTE = more theta per day but less time to be right.
Longer DTE = more adjustment time but less daily income.`
    },
    {
      type: 'chart',
      title: 'Theta Decay by DTE',
      content: `Daily theta as percentage of option value:

DTE    | Daily Theta | Gamma Risk | Adjustment Time
-------|-------------|------------|----------------
7 DTE  | ~3.0%/day   | VERY HIGH  | Minimal
14 DTE | ~1.8%/day   | HIGH       | Limited
21 DTE | ~1.2%/day   | MODERATE   | Good
30 DTE | ~0.8%/day   | LOW-MOD    | Ample
45 DTE | ~0.5%/day   | LOW        | Maximum

The 21-45 DTE range balances theta acceleration with manageable gamma risk.`
    },
    {
      type: 'text',
      title: 'The 21-45 DTE Sweet Spot',
      content: `Research shows 21-45 DTE offers the best risk-adjusted returns:

**At 45 DTE:**
- Theta acceleration has begun but isn't extreme
- Plenty of time to roll or adjust
- Good entry point for monthly cycles

**At 21 DTE:**
- Theta is accelerating nicely (~1.2%/day)
- Still have meaningful adjustment window
- Optimal for managing at 50% profit target

**The Typical Cycle:**
1. Enter position at 45 DTE
2. Manage toward 50% profit
3. Close around 21 DTE if profitable
4. Never hold through final week unless small profit remains`
    },
    {
      type: 'example',
      title: 'Weekly vs Monthly on NVDA',
      content: `Compare the same 16-delta iron condor on NVDA ($880):

**Weekly (7 DTE):**
- Credit: $3.20 per contract
- Daily theta: $0.45
- Gamma risk: Very high

**Monthly (30 DTE):**
- Credit: $5.80 per contract
- Daily theta: $0.19
- Gamma risk: Moderate

**Analysis:**
Theta efficiency: Weekly is 2.4x more efficient at collecting theta!

But a 3% move in the weekly could breach your strike, while the monthly has comfortable buffer.

**Use weekly for:** High conviction, quiet week expected, can manage daily
**Use monthly for:** Normal conditions, want buffer, can't watch constantly`,
      stock: 'NVDA'
    },
    {
      type: 'tip',
      title: 'DTE by IV Environment',
      content: `Match your DTE to implied volatility:

**High IV (IVR > 50%):** Enter at 45 DTE
- Premium is rich even further out
- Longer DTE captures IV crush
- Can close at 50% profit quickly if IV drops

**Normal IV (IVR 30-50%):** Enter at 30 DTE
- Balance of theta and adjustment time
- Standard management cycle works well

**Low IV (IVR < 30%):** Use 14-21 DTE or wait
- Need shorter DTE to collect meaningful theta
- Less time for IV to spike against you
- Consider smaller position or skip entirely`
    },
    {
      type: 'warning',
      title: 'Weekly Option Risks',
      content: `Weekly options (0-7 DTE) require extra caution:

**The Dangers:**
- Extreme gamma risk (delta changes rapidly)
- Little time to adjust losing positions
- Wider bid-ask spreads on some underlyings
- Requires daily monitoring

**Only Use Weeklies When:**
- Trading high-liquidity stocks (AAPL, META, NVDA, SPY)
- Using defined-risk strategies only (spreads, iron condors)
- You can monitor positions daily
- You're experienced with options management`
    }
  ],
  quiz: [
    {
      id: 'w2d11q1',
      question: 'Which DTE range is the "sweet spot" for selling iron condors?',
      options: ['3-7 days', '7-14 days', '21-45 days', '60-90 days'],
      correctAnswer: 2,
      explanation: 'The 21-45 DTE range offers the best balance of theta decay and adjustment time. Theta is accelerating meaningfully, but gamma risk hasn\'t become extreme.',
      difficulty: 'easy'
    },
    {
      id: 'w2d11q2',
      question: 'You have an iron condor at 14 DTE with 50% profit. What should you do?',
      options: ['Hold to expiration for max profit', 'Close and take profits', 'Roll to next expiration', 'Add to the position'],
      correctAnswer: 1,
      explanation: 'At 50% profit with 14 DTE remaining, close the position. You\'ve captured most of the edge while gamma risk is increasing. The remaining profit doesn\'t justify holding through theta acceleration.',
      difficulty: 'easy'
    },
    {
      id: 'w2d11q3',
      question: 'Why choose longer DTE (45+ days) when IV is high?',
      options: ['Longer DTE has higher gamma', 'You capture more IV crush with time for volatility to normalize', 'Weekly options aren\'t available', 'Longer DTE has more theta per day'],
      correctAnswer: 1,
      explanation: 'When IV is high, longer DTE captures the IV crush as volatility normalizes. You get more time for actual stock movement to be less than implied. Rich premium justifies the longer holding period.',
      difficulty: 'medium'
    }
  ]
}
