import type { LessonContent } from '../index'

export const day9: LessonContent = {
  day: 9,
  week: 2,
  title: 'Implied Volatility',
  description: 'Master IV Rank and learn when to sell premium based on volatility levels.',
  duration: 20,
  keyPoints: [
    'IV represents the market\'s expectation of future movement',
    'IV Rank compares current IV to the past year\'s range (0-100)',
    'High IV = sell premium; Low IV = wait or be cautious',
    'IV crush after earnings benefits premium sellers',
  ],
  yourStocks: ['NVDA', 'META', 'GOOG', 'AAPL', 'AMZN'],
  content: [
    {
      type: 'text',
      title: 'What is Implied Volatility?',
      content: `Implied volatility (IV) is the market's forecast of how much a stock will move. It's baked into option prices.

**Key Concepts:**
- IV is expressed as an annualized percentage
- Higher IV = more expensive options (more premium to collect)
- Lower IV = cheaper options (less premium available)

**For Premium Sellers:**
When IV is high, options are expensive. This is when you want to SELL premium. The goal is to sell expensive options and buy them back cheaper.`
    },
    {
      type: 'text',
      title: 'Understanding IV Rank',
      content: `**IV Rank (IVR):**
Formula: (Current IV - 52-week Low IV) / (52-week High IV - 52-week Low IV)

**Example:**
Stock has IV range of 20-60% over past year, currently at 40%
IVR = (40 - 20) / (60 - 20) = 20/40 = 50%

**Interpreting IVR:**
- IVR > 50% = IV is elevated (good for selling)
- IVR > 70% = IV is high (great for selling)
- IVR < 30% = IV is low (be cautious selling)

When IVR is high, you collect more premium for the same delta.`
    },
    {
      type: 'example',
      title: 'Reading IV on NVDA',
      content: `NVDA Volatility Data:
- Current IV: 48%
- 52-week IV Low: 32%
- 52-week IV High: 85%

**Calculation:**
IV Rank: (48 - 32) / (85 - 32) = 16/53 = 30%

**Interpretation:**
- IVR of 30% = IV is in the lower third of its range
- Options are not particularly expensive
- Consider waiting for a volatility spike, or use tighter strikes`,
      stock: 'NVDA'
    },
    {
      type: 'example',
      title: 'IV Crush After Earnings - AMZN',
      content: `IV crush is the rapid collapse of IV after a known event (usually earnings).

**Before AMZN Earnings:**
- IV: 65% (elevated due to uncertainty)
- ATM straddle price: $18.00

**After Earnings Announced:**
- Stock moves +2.7%
- IV drops to: 35% (uncertainty resolved)
- ATM straddle would now price at: $8.00

**Key Insight:**
Even though the stock went UP, IV collapsed 46%. Premium sellers profit from this overpricing of expected moves.`,
      stock: 'AMZN'
    },
    {
      type: 'tip',
      title: 'When to Sell Premium',
      content: `**High IV Indicators (SELL):**
- IVR > 50% (preferably > 70%)
- Recent news causing uncertainty
- Upcoming earnings (before announcement)
- Market-wide fear spike

**Low IV Cautions:**
- IVR < 25%
- Less premium collected = worse risk/reward
- IV can only go UP from here (vega risk)
- Consider smaller positions or waiting`
    },
    {
      type: 'warning',
      title: 'Low IV Traps',
      content: `Low IV environments present challenges:

**Risks:**
- Less premium for same risk
- Any volatility expansion hurts your position
- Breakevens are tighter

**What to Do:**
- Consider smaller position sizes
- Use closer-to-money strikes
- Look at different underlyings with higher IV
- Sometimes the best trade is no trade`
    }
  ],
  quiz: [
    {
      id: 'w2d9q1',
      question: 'A stock has IV range 25-75% over the past year. Current IV is 45%. What is IV Rank?',
      options: ['45%', '40%', '50%', '60%'],
      correctAnswer: 1,
      explanation: 'IV Rank = (45 - 25) / (75 - 25) = 20/50 = 40%. Current IV is 40% of the way between low and high.',
      difficulty: 'easy'
    },
    {
      id: 'w2d9q2',
      question: 'META has earnings tomorrow with IV at 55% (IVR 85%). After earnings, IV drops to 32%. How does IV crush affect your short iron condor?',
      options: ['Hurts your position', 'Helps your position', 'No effect', 'Depends on direction'],
      correctAnswer: 1,
      explanation: 'When you sell an iron condor, you are short vega. The IV crush from 55% to 32% makes options cheaper to buy back, creating profit.',
      difficulty: 'medium'
    },
    {
      id: 'w2d9q3',
      question: 'VIX is at 12 and your stock has IVR of 15%. What is the best approach?',
      options: ['Sell more contracts', 'Use closer-to-money strikes or wait', 'Sell same strikes as usual', 'Buy options instead'],
      correctAnswer: 1,
      explanation: 'In low IV, selling OTM strikes collects less premium with tighter breakevens. Use closer-to-money strikes for meaningful premium, or wait for IV to rise.',
      difficulty: 'medium'
    }
  ]
}
