import type { LessonContent } from '../index'

export const day7: LessonContent = {
  day: 7,
  week: 2,
  title: 'Delta & Probability',
  description: 'Understand delta as probability and use it for strike selection in credit spreads.',
  duration: 20,
  keyPoints: [
    'Delta represents the probability an option expires in-the-money',
    'A 16-delta option has ~84% chance of expiring OTM',
    'Short options have opposite delta signs from long options',
    'The 16-25 delta range is the "sweet spot" for premium sellers',
  ],
  yourStocks: ['NVDA', 'META', 'GOOG', 'AAPL', 'MSFT'],
  content: [
    {
      type: 'text',
      title: 'What is Delta?',
      content: `Delta measures how much an option's price changes for every $1 move in the underlying stock.

**Delta Values:**
- Call options: 0 to +1.00
- Put options: 0 to -1.00
- At-the-money options: approximately +/- 0.50
- Deep OTM options: approaching 0

**For Premium Sellers:**
Delta tells you two critical things:
1. Your directional risk exposure
2. The probability your short strike gets breached`
    },
    {
      type: 'text',
      title: 'Delta as Probability',
      content: `When you see an option with delta of 0.16, interpret this as approximately a 16% chance it expires in-the-money.

**For Premium Sellers:**
If you sell a put with 0.16 delta, there's roughly an 84% chance it expires worthless - you keep the full premium.

**Delta to Probability Mapping:**
- 0.50 delta = 50% ITM probability (ATM)
- 0.30 delta = 30% ITM probability
- 0.16 delta = 16% ITM probability (~1 standard deviation)
- 0.10 delta = 10% ITM probability
- 0.05 delta = 5% ITM probability`
    },
    {
      type: 'example',
      title: 'Delta Selection for NVDA',
      content: `NVDA trading at $875. You want to sell a put credit spread.

**Choosing by Delta:**
- 850 put with 0.12 delta = ~88% chance NVDA stays above $850
- 800 put with 0.08 delta = ~92% chance NVDA stays above $800

**Credit Spread Setup:**
- Sell 850 put (12 delta) for $8.50
- Buy 840 put (10 delta) for $6.20
- Net credit: $2.30

You have roughly an 88% probability that the 850 strike expires worthless.`,
      stock: 'NVDA'
    },
    {
      type: 'tip',
      title: 'Delta Guidelines for Premium Sellers',
      content: `**Conservative (higher win rate):**
- Sell 10-16 delta options
- ~84-90% probability of profit
- Typically 1 standard deviation out

**Moderate (balanced approach):**
- Sell 16-25 delta options
- ~75-84% probability of profit
- Good premium/risk balance

**Aggressive (higher premium):**
- Sell 25-35 delta options
- ~65-75% probability of profit
- Requires active management`
    },
    {
      type: 'simulator',
      title: 'Interactive Delta Explorer',
      content: 'Adjust the stock price to see how delta changes with moneyness',
      simulatorPreset: {
        stockPrice: 150,
        strikePrice: 150,
        optionType: 'call',
        scenario: 'delta-sensitivity'
      }
    },
    {
      type: 'text',
      title: 'Position Delta in Spreads',
      content: `Position delta converts options exposure into share equivalents:

**Formula:**
Position Delta = Option Delta x Number of Contracts x 100

**Example Iron Condor on META ($505):**
- Short 530 call (0.20 delta): -20 delta
- Long 540 call (0.12 delta): +12 delta
- Short 480 put (-0.20 delta): +20 delta
- Long 470 put (-0.12 delta): -12 delta

**Net Position Delta: 0**

This iron condor starts delta-neutral - no directional bias.`
    },
    {
      type: 'warning',
      title: 'Delta Changes Over Time',
      content: `Delta is not static:

1. **As expiration approaches:** Delta moves toward 0 or 1 (gamma risk)
2. **As IV changes:** Higher IV compresses deltas toward 0.50
3. **As stock moves:** Your position delta changes

Check position delta regularly, especially in the final week before expiration.`
    }
  ],
  quiz: [
    {
      id: 'w2d7q1',
      question: 'A put option has delta of -0.25. What is the approximate probability it expires ITM?',
      options: ['75%', '25%', '50%', '-25%'],
      correctAnswer: 1,
      explanation: 'The absolute value of delta approximates ITM probability. A -0.25 delta put has roughly 25% chance of expiring in-the-money.',
      difficulty: 'easy'
    },
    {
      id: 'w2d7q2',
      question: 'You are short 4 put contracts with delta of -0.30 each. What is your position delta?',
      options: ['-120 shares', '+120 shares', '-30 shares', '+30 shares'],
      correctAnswer: 1,
      explanation: 'When SHORT a put (negative delta), you flip the sign. Position delta = -(-0.30) x 4 x 100 = +120. Being short puts is a bullish position.',
      difficulty: 'medium'
    },
    {
      id: 'w2d7q3',
      question: 'Which delta range is most commonly used by premium sellers?',
      options: ['5-10 delta', '16-25 delta', '40-50 delta', '70-80 delta'],
      correctAnswer: 1,
      explanation: 'The 16-25 delta range offers 75-84% probability of profit while collecting meaningful premium. Lower deltas have higher win rates but less premium.',
      difficulty: 'easy'
    }
  ]
}
