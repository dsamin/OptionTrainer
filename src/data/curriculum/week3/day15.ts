import type { LessonContent } from '../index'

export const day15: LessonContent = {
  day: 15,
  week: 3,
  title: 'Managing Assignments',
  description: 'Handle assignment with confidence and recover from tested positions.',
  duration: 20,
  keyPoints: [
    'Assignment occurs when options are ITM with little extrinsic value',
    'Roll before assignment when possible (for credit)',
    'If assigned, sell covered calls to reduce cost basis',
    'Assignment is manageable, not catastrophic',
  ],
  yourStocks: ['NVDA', 'META', 'GOOG', 'AMZN', 'MELI'],
  content: [
    {
      type: 'text',
      title: 'When Assignment Happens',
      content: `Assignment is when the option holder exercises their right, and you must fulfill your obligation.

**Put Assignment:** You must BUY 100 shares at strike price
**Call Assignment:** You must SELL 100 shares at strike price

**Assignment Most Likely When:**
1. Option is deep ITM (high intrinsic value)
2. Little extrinsic value remaining (<$0.05)
3. Approaching expiration (especially last week)
4. Near ex-dividend date (for calls)

**The Extrinsic Value Rule:**
Options with significant time value rarely get exercised early. When extrinsic value drops to pennies, exercise becomes likely.`
    },
    {
      type: 'text',
      title: 'Rolling to Avoid Assignment',
      content: `Rolling is closing current option and opening a new one further out.

**Roll Down and Out (Puts):**
- Current short put is ITM
- Roll to LOWER strike AND later expiration
- Often done for a credit

**Roll Up and Out (Calls):**
- Current short call is ITM
- Roll to HIGHER strike AND later expiration
- Often done for a credit

**The Roll Credit Rule:**
Only roll if you can collect additional credit. Rolling for a debit adds to a losing trade - often better to close and accept the loss.`
    },
    {
      type: 'example',
      title: 'Rolling to Avoid Assignment - NVDA',
      content: `**Situation:**
- Sold NVDA 700 put for $8.00 at 30 DTE
- NVDA dropped to $680, now 10 DTE
- 700 put worth $24.00 (showing $16 loss)
- Don't want to own 100 shares at $700 ($70,000)

**Roll Analysis:**
- Buy to close 700 put @ $24.00 (10 DTE)
- Sell to open 680 put @ $28.00 (38 DTE)
- Net credit: $4.00

**Result:**
- Rolled down $20 (700 to 680 strike)
- Rolled out 28 days
- Collected $4.00 additional credit
- Total credit: $12.00
- New break-even: $668
- Avoided $70,000 capital tie-up`,
      stock: 'NVDA'
    },
    {
      type: 'text',
      title: 'Handling Assignment',
      content: `If assigned despite rolling attempts:

**When Assigned on a Put (You Own Shares):**

**Option 1: Sell Covered Calls**
- Sell calls against shares to reduce cost basis
- Target strikes above your cost basis
- This is the "wheel strategy"

**Option 2: Hold Shares**
- If bullish long-term
- Set a stop-loss to limit downside

**Option 3: Sell Immediately**
- If thesis changed or clear downtrend
- Accept loss and move on

**Cost Basis Calculation:**
Strike Price - Premium Received = Effective Cost Basis

Example: Assigned on META 500 put, received $8 premium
Effective cost: $500 - $8 = $492 per share`
    },
    {
      type: 'example',
      title: 'Case Study: MELI Assignment Recovery',
      content: `**Setup:** Sold MELI 1600 put for $45 when MELI at $1,700

**What Happened:**
- MELI dropped to $1,520
- Rolled twice, eventually assigned at $1,600
- Effective cost: $1,600 - $57 (total credits) = $1,543

**Recovery Strategy - Covered Calls:**
- Week 1: Sold 1600 call for $18
- Week 2: Sold 1580 call for $22
- Week 3: MELI rallied to $1,620, shares called away at $1,580

**Final Result:**
- Bought at $1,543 effective
- Sold at $1,580
- Profit: $37/share = $3,700

What looked like a loser became profitable through management.`,
      stock: 'MELI'
    },
    {
      type: 'tip',
      title: 'Assignment Preparation',
      content: `Before selling any put, answer these questions:

1. **Do I have capital for 100 shares?**
   - NVDA 800 put = $80,000 if assigned
   - If no, use defined-risk spreads

2. **Am I willing to own this stock at this price?**
   - Only sell puts on stocks you want to own
   - Strike should be a price you consider value

3. **What's my plan if assigned?**
   - Sell covered calls?
   - Hold long-term?
   - Stop-loss level?

4. **What strike will I sell calls at if assigned?**
   - Know your covered call strategy in advance`
    }
  ],
  quiz: [
    {
      id: 'w3d15q1',
      question: 'When is early assignment MOST likely?',
      options: ['When option has high extrinsic value', 'When option is deep ITM with little extrinsic value', 'When stock is at strike price', 'When 45+ DTE remaining'],
      correctAnswer: 1,
      explanation: 'Early assignment is most likely when deep ITM with little extrinsic value. Option holders have no incentive to exercise when significant time value exists.',
      difficulty: 'easy'
    },
    {
      id: 'w3d15q2',
      question: 'You sold a META 500 put and collected $12 premium. If assigned, what is your effective cost basis?',
      options: ['$500', '$512', '$488', '$506'],
      correctAnswer: 2,
      explanation: 'Effective cost = Strike - Premium = $500 - $12 = $488 per share. Premium reduces your effective purchase price.',
      difficulty: 'easy'
    },
    {
      id: 'w3d15q3',
      question: 'What is the most common recovery strategy after put assignment?',
      options: ['Immediately sell shares at a loss', 'Buy more shares to average down', 'Sell covered calls against shares', 'Buy protective puts'],
      correctAnswer: 2,
      explanation: 'Selling covered calls generates premium income that reduces cost basis. Can profit even if shares called away below original cost basis.',
      difficulty: 'medium'
    }
  ]
}
