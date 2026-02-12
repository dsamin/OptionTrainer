import type { LessonContent } from '../index'

export const day13: LessonContent = {
  day: 13,
  week: 3,
  title: 'Iron Condors',
  description: 'Structure iron condors with proper wing width and adjustment triggers.',
  duration: 25,
  keyPoints: [
    'Wing width determines risk/reward profile',
    'Adjust when short delta exceeds 30-35',
    'Close at 50% profit to manage gamma risk',
    'Never let one side blow through your strike',
  ],
  yourStocks: ['NVDA', 'META', 'GOOG', 'QQQ', 'AMZN'],
  content: [
    {
      type: 'text',
      title: 'Wing Width Selection',
      content: `Wing width determines your risk/reward profile:

**Narrow Wings ($5-10 wide):**
- Lower max profit per contract
- Lower max loss per contract
- Higher probability of profit
- Less capital required
- Best for: Smaller accounts, conservative traders

**Wide Wings ($15-20 wide):**
- Higher max profit per contract
- Higher max loss per contract
- Lower probability of profit
- More capital required
- Best for: Larger accounts, experienced traders

**Rule of Thumb:** Match wing width to expected move. If a stock's expected move is $50, don't use $5 wings - you'll hit max loss too easily.`
    },
    {
      type: 'example',
      title: 'Wing Width Comparison - NVDA',
      content: `NVDA at $800, 30 DTE Iron Condor:

**Narrow Wings ($10 wide):**
- Sell 760/750 put spread, Sell 840/850 call spread
- Credit: $3.20
- Max loss: $6.80
- Margin: ~$680

**Wide Wings ($20 wide):**
- Sell 760/740 put spread, Sell 840/860 call spread
- Credit: $4.80
- Max loss: $15.20
- Margin: ~$1,520

Wide wings collect 50% more premium but risk 2x+ the capital. Risk/reward per dollar invested is often better with narrow wings.`,
      stock: 'NVDA'
    },
    {
      type: 'text',
      title: 'Adjustment Triggers',
      content: `Don't wait until expiration to see if your iron condor works. Use clear triggers:

**Delta-Based Triggers:**
- **25 delta:** Yellow flag - monitor closely
- **30 delta:** Orange flag - prepare adjustment
- **35+ delta:** Red flag - adjust or close immediately

**P/L Triggers:**
- Loss = 1x credit: Consider adjustment
- Loss = 2x credit: Adjust or close
- Loss = 3x credit: Close immediately

**DTE Triggers:**
- 21+ DTE: More time to recover
- 14-21 DTE: Tight management
- <7 DTE: Close regardless of P/L`
    },
    {
      type: 'example',
      title: 'Adjustment in Action - META',
      content: `META Iron Condor opened at $500:
- Sold 460/450 put spread (16 delta)
- Sold 540/550 call spread (16 delta)
- Credit: $2.80, 30 DTE

**Day 5:** META rallies to $520
- Short 540 call now at 32 delta
- Position showing $1.50 loss

**Adjustment Options:**
1. Close call spread, keep put spread
2. Roll 540/550 calls to 560/570 at 45 DTE
3. Close entire position

**Best Choice:** Roll call spread up and out for a credit - buys time and moves strike further from price.`,
      stock: 'META'
    },
    {
      type: 'tip',
      title: 'When to Close Early',
      content: `**50% Profit Rule:**
When you've captured 50% of max profit, close.

Example: $3.00 credit, position now $1.50 to close
- Max additional profit: $1.50
- Risk remaining: $7.00
- Risk/reward of staying: 4.7:1 against you

**75% Profit:** Close almost always.

**Time-Based:**
- 50% profit before 50% time elapsed: Close
- 21 DTE and profitable: Close
- 7 DTE: Should have closed already`
    },
    {
      type: 'warning',
      title: 'The Danger of Hope Trading',
      content: `Never turn a manageable loss into a catastrophic one by hoping.

**Accept the loss when:**
- Adjustment would create worse risk/reward
- Already adjusted twice on same side
- Stock moved on fundamental news (earnings, guidance)
- Past your predetermined max loss threshold

A 1x credit loss is normal. A 3x credit loss means you waited too long.`
    }
  ],
  quiz: [
    {
      id: 'w3d13q1',
      question: 'You sold an iron condor for $3.00 credit. The position is now worth $1.50 to close. What percentage of max profit have you captured?',
      options: ['25%', '33%', '50%', '75%'],
      correctAnswer: 2,
      explanation: 'You received $3.00 and can close for $1.50, keeping $1.50 profit. Max profit was $3.00, so $1.50/$3.00 = 50%.',
      difficulty: 'easy'
    },
    {
      id: 'w3d13q2',
      question: 'Your short put moved from 16 delta to 32 delta. What action is appropriate?',
      options: ['Do nothing - within normal range', 'Prepare adjustment order immediately', 'Buy more contracts', 'Wait until 50 delta'],
      correctAnswer: 1,
      explanation: 'A short strike at 30+ delta is an orange/red flag. At 32 delta, prepare an adjustment order - either roll the strike or close that side.',
      difficulty: 'medium'
    },
    {
      id: 'w3d13q3',
      question: 'What is the primary advantage of narrow wings ($10) vs wide wings ($20)?',
      options: ['Higher max profit', 'Lower probability of profit', 'Less capital at risk and lower margin', 'Wider profit zone'],
      correctAnswer: 2,
      explanation: 'Narrow wings require less capital and lower margin because max loss is smaller. Suitable for smaller accounts or conservative traders.',
      difficulty: 'medium'
    }
  ]
}
