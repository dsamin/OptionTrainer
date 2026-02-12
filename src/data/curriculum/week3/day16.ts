import type { LessonContent } from '../index'

export const day16: LessonContent = {
  day: 16,
  week: 3,
  title: 'Rolling Strategies',
  description: 'Master when to roll positions and when to accept losses.',
  duration: 20,
  keyPoints: [
    'Roll for credit whenever possible',
    'Roll down and out for puts, up and out for calls',
    'Maximum 2-3 rolls per position',
    'If thesis breaks, close don\'t roll',
  ],
  yourStocks: ['NVDA', 'META', 'GOOG', 'QQQ', 'SHOP'],
  content: [
    {
      type: 'text',
      title: 'Rolling Mechanics',
      content: `Rolling closes your current position and opens a new one simultaneously.

**Types of Rolls:**

**Roll Out (Time):**
- Same strike, later expiration
- Adds time to position
- Usually for a credit (more extrinsic value)

**Roll Down (Puts) / Roll Up (Calls):**
- Different strike, same expiration
- Moves strike further OTM
- Often requires a debit

**Roll Down and Out / Roll Up and Out:**
- Different strike AND later expiration
- Most common defensive roll
- Can often achieve a credit`
    },
    {
      type: 'text',
      title: 'When to Roll',
      content: `Roll when:
1. Fundamental thesis still intact
2. Can roll for credit or even money
3. Technical support/resistance still exists
4. New position has favorable risk/reward
5. Have capital for extended trade

**Do NOT Roll When:**
1. Fundamentals changed (bad earnings, guidance cut)
2. Can only roll for significant debit
3. Already rolled 2-3 times
4. Stock in clear technical breakdown
5. Capital needed elsewhere`
    },
    {
      type: 'example',
      title: 'Roll Down and Out - NVDA',
      content: `**Initial Position:**
Sold NVDA 750 put for $12, 35 DTE, NVDA at $820

**At 14 DTE:** NVDA dropped to $730 (below strike)
- 750 put worth $28 (showing $16 loss)
- Delta spiked to 65
- Assignment risk is real

**Roll Decision:**
- Buy to close 750 put @ $28 (14 DTE)
- Sell to open 700 put @ $32 (42 DTE)
- Net credit: $4.00

**Position Improvement:**
- Strike moved from $20 ITM to $30 OTM
- Delta: 25 (vs previous 65)
- Break-even improved: $684 vs $738
- 28 more days for recovery`,
      stock: 'NVDA'
    },
    {
      type: 'warning',
      title: 'The Rolling Trap',
      content: `Rolling can turn small losses into large ones. Watch for:

**Signs of a Rolling Trap:**
1. Rolled 3+ times
2. Each roll for smaller credit (or debit)
3. Break-even keeps getting worse
4. Stock in clear downtrend
5. Rolling past earnings

**Example Rolling Trap:**
- Roll 1: 750→730, +$3.00
- Roll 2: 730→710, +$1.50
- Roll 3: 710→690, +$0.50
- Roll 4: 690→670, -$1.00 debit

Each roll for less benefit. Stock clearly trending against you. Close the position.`
    },
    {
      type: 'tip',
      title: 'Rolling Decision Framework',
      content: `Before any roll, check:

**Step 1: Thesis Check**
- Is original thesis valid?
- If fundamentals changed = CLOSE

**Step 2: Technical Check**
- Support/resistance for new strike?
- If technical breakdown = CLOSE

**Step 3: Credit Check**
- Can roll for credit?
- If only debit available = probably CLOSE

**Step 4: Position Check**
- Already rolled before?
- If 2+ times = CLOSE

**Decision:**
- 4+ positive checks = Roll
- 0-1 positive = Close`
    },
    {
      type: 'example',
      title: 'When NOT to Roll - SHOP',
      content: `**Initial:** Sold SHOP 75 put for $2.50 at $82

**The Downtrend:**
- Week 1: SHOP drops to $78
- Week 2: SHOP drops to $72 (below strike)
- Week 3: SHOP drops to $66 after earnings miss

**Rolling Attempts:**
- Roll 1 (at $72): 75→70, +$1.00
- Roll 2 (at $68): 70→65, +$0.50
- Roll 3 (at $66): 65→60, -$0.50 debit

**Mistake:** Should have closed after Roll 1 or Roll 2.

After earnings miss, fundamentals changed. Continued rolling just delayed and increased the loss.`,
      stock: 'SHOP'
    }
  ],
  quiz: [
    {
      id: 'w3d16q1',
      question: 'What does "rolling down and out" mean for a put?',
      options: ['Higher strike and earlier expiration', 'Lower strike and later expiration', 'Same strike and later expiration', 'Higher strike and later expiration'],
      correctAnswer: 1,
      explanation: 'Rolling down and out means LOWER strike (down) and LATER expiration (out). Gives stock more room and time to recover.',
      difficulty: 'easy'
    },
    {
      id: 'w3d16q2',
      question: 'What is a sign you\'re caught in a "rolling trap"?',
      options: ['You roll for a large credit', 'Each roll is for less credit or requires a debit', 'You\'ve only rolled once', 'Stock has stabilized'],
      correctAnswer: 1,
      explanation: 'A rolling trap is indicated when each roll generates less credit or requires paying a debit. This suggests the stock is trending against you.',
      difficulty: 'medium'
    },
    {
      id: 'w3d16q3',
      question: 'Your NVDA put is ITM after earnings miss and guidance cut. You can roll for small credit. What should you do?',
      options: ['Roll because you can collect credit', 'Roll because NVDA always recovers', 'Close - fundamental thesis changed', 'Roll and double position'],
      correctAnswer: 2,
      explanation: 'When fundamentals change (earnings miss, guidance cut), original thesis is invalid. Even with a credit available, close and accept the loss.',
      difficulty: 'hard'
    }
  ]
}
