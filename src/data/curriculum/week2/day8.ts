import type { LessonContent } from '../index'

export const day8: LessonContent = {
  day: 8,
  week: 2,
  title: 'Delta Deep Dive',
  description:
    'Master delta as probability, position delta calculation, and delta-neutral strategies for premium selling',
  duration: 45,
  keyPoints: [
    'Delta represents the probability an option expires in-the-money',
    'Position delta tells you your directional exposure in share equivalents',
    'Delta-neutral strategies remove directional bias from your trades',
    'Short options have opposite delta signs from long options',
    'Managing delta is crucial for iron condor and credit spread success',
  ],
  yourStocks: ['NVDA', 'META', 'GOOG', 'AAPL', 'MSFT'],
  content: [
    {
      type: 'text',
      title: 'What is Delta?',
      content: `Delta is the most important Greek for options traders. It measures how much an option's price changes for every $1 move in the underlying stock.

**Delta Values:**
- Call options: 0 to +1.00
- Put options: 0 to -1.00
- At-the-money options: approximately +/- 0.50
- Deep in-the-money options: approaching +/- 1.00
- Far out-of-the-money options: approaching 0

For premium sellers, delta tells you two critical things:
1. Your directional risk exposure
2. The approximate probability your short strike gets breached`,
    },
    {
      type: 'example',
      title: 'Delta as Probability',
      content: `When you see an option with a delta of 0.16, you can interpret this as approximately a 16% chance that option expires in-the-money.

For premium sellers, this is gold. If you sell a put with 0.16 delta, there's roughly an 84% chance it expires worthless - you keep the full premium.

**Real Example on NVDA:**
- NVDA trading at $875
- You sell the $800 put with 0.12 delta
- Interpretation: ~88% probability NVDA stays above $800
- This aligns with selling around 1 standard deviation out`,
      stock: 'NVDA',
    },
    {
      type: 'chart',
      title: 'Delta Across Strikes',
      content: `Delta curve visualization:

Strike vs Delta (for calls, stock at $100):
$80  strike: 0.92 delta (deep ITM)
$90  strike: 0.75 delta
$95  strike: 0.62 delta
$100 strike: 0.50 delta (ATM)
$105 strike: 0.38 delta
$110 strike: 0.25 delta
$120 strike: 0.08 delta (far OTM)

Key insight: Delta changes faster near the money. This is gamma, which we'll cover in Week 3.`,
    },
    {
      type: 'text',
      title: 'Position Delta Calculation',
      content: `Position delta converts your options exposure into share equivalents. This is essential for understanding your true directional risk.

**Formula:**
Position Delta = Option Delta x Number of Contracts x 100

**Examples:**
- Long 5 calls with 0.40 delta = +200 share equivalents
- Short 3 puts with -0.30 delta = +90 share equivalents (short a negative = positive)
- Short 2 calls with 0.25 delta = -50 share equivalents

**For Spreads:**
Add up all legs:
- Bull put spread (short -0.20 put, long -0.10 put): Net delta = +0.10
- Iron condor: Usually starts near delta-neutral`,
    },
    {
      type: 'example',
      title: 'Iron Condor Position Delta',
      content: `Let's calculate the position delta for an iron condor on META:

META at $505
- Short 530 call (0.20 delta): -20 delta
- Long 540 call (0.12 delta): +12 delta
- Short 480 put (-0.20 delta): +20 delta
- Long 470 put (-0.12 delta): -12 delta

**Net Position Delta: 0**

This iron condor starts delta-neutral - you have no directional bias. You profit if META stays between 480-530, regardless of whether it moves up or down slightly.`,
      stock: 'META',
    },
    {
      type: 'tip',
      title: 'Delta Selection for Premium Sellers',
      content: `Most successful premium sellers use these delta guidelines:

**Conservative (higher win rate, lower premium):**
- Sell 10-16 delta options
- ~84-90% probability of profit
- Typically 1 standard deviation out

**Moderate (balanced approach):**
- Sell 16-25 delta options
- ~75-84% probability of profit
- Good premium/risk balance

**Aggressive (higher premium, lower win rate):**
- Sell 25-35 delta options
- ~65-75% probability of profit
- Requires active management`,
    },
    {
      type: 'text',
      title: 'Delta-Neutral Strategies',
      content: `Delta-neutral trading means your position has zero (or near-zero) directional bias. You're betting on volatility, time decay, or range-bound movement rather than direction.

**Benefits for Premium Sellers:**
1. Profit from time decay without predicting direction
2. Iron condors and strangles are naturally delta-neutral
3. Can focus on volatility and probability rather than stock picking

**Maintaining Delta Neutrality:**
- Iron condors auto-balance with equal width wings
- Adjust strike selection if stock moves
- Roll tested sides to rebalance delta`,
    },
    {
      type: 'example',
      title: 'Rebalancing Delta',
      content: `You opened a delta-neutral iron condor on GOOG at $175. After a $7 move up, your delta has shifted:

**Before (GOOG at $175):**
- Position delta: 0

**After (GOOG at $182):**
- Short calls now have higher delta (0.35 vs 0.20)
- Short puts now have lower delta (0.10 vs 0.20)
- Position delta: -25 (bearish bias)

**Options to rebalance:**
1. Roll up the put spread closer to current price
2. Close the call spread and re-establish wider
3. Accept the bias if you're slightly bearish anyway`,
      stock: 'GOOG',
    },
    {
      type: 'warning',
      title: 'Delta Changes with Time and Movement',
      content: `Remember that delta is not static:

1. **As expiration approaches:** Delta moves toward 0 or 1 (gamma risk increases)
2. **As IV changes:** Higher IV = deltas compressed toward 0.50
3. **As stock moves:** Your position delta changes even if you do nothing

Never set and forget your delta exposure. Check it daily, especially in the final week before expiration.`,
    },
    {
      type: 'exercise',
      title: 'Calculate Your Position Delta',
      content: `Practice problem:

You have the following positions on AAPL ($185):
1. Short 2x 195 calls @ 0.22 delta
2. Long 2x 200 calls @ 0.14 delta
3. Short 3x 175 puts @ -0.18 delta
4. Long 3x 170 puts @ -0.10 delta

Calculate:
A) Delta of each leg in share equivalents
B) Total position delta
C) Is this bullish, bearish, or neutral?

**Answer:**
A) Leg deltas:
   - Short 195 calls: -0.22 x 2 x 100 = -44
   - Long 200 calls: +0.14 x 2 x 100 = +28
   - Short 175 puts: -(-0.18) x 3 x 100 = +54
   - Long 170 puts: +(-0.10) x 3 x 100 = -30

B) Total: -44 + 28 + 54 - 30 = +8 delta

C) Slightly bullish (8 share equivalents long)`,
      stock: 'AAPL',
    },
  ],
  quiz: [
    {
      id: 'w2d8q1',
      question:
        'A put option has a delta of -0.25. What is the approximate probability it expires in-the-money?',
      options: ['75%', '25%', '50%', '-25%'],
      correctAnswer: 1,
      explanation:
        'The absolute value of delta approximates the probability of expiring ITM. A -0.25 delta put has roughly a 25% chance of expiring in-the-money, meaning the stock would need to drop below the strike price.',
      difficulty: 'easy',
    },
    {
      id: 'w2d8q2',
      question:
        'You are short 4 put contracts with a delta of -0.30 each. What is your position delta in share equivalents?',
      options: [
        '-120 shares',
        '+120 shares',
        '-30 shares',
        '+30 shares',
      ],
      correctAnswer: 1,
      explanation:
        'When you are SHORT a put (negative delta), you flip the sign. Position delta = -(-0.30) x 4 x 100 = +120. Being short puts is a bullish position, equivalent to being long 120 shares.',
      difficulty: 'medium',
    },
    {
      id: 'w2d8q3',
      question:
        'Which delta range is most commonly used by premium sellers seeking a balance between probability of profit and premium collected?',
      options: [
        '5-10 delta',
        '16-25 delta',
        '40-50 delta',
        '70-80 delta',
      ],
      correctAnswer: 1,
      explanation:
        'The 16-25 delta range (also known as "sweet spot" for premium sellers) offers 75-84% probability of profit while still collecting meaningful premium. Lower deltas have higher win rates but less premium; higher deltas offer more premium but lower probability of success.',
      difficulty: 'medium',
    },
    {
      id: 'w2d8q4',
      question:
        'An iron condor is opened with equal delta on both sides (0.16 delta short strikes). If the stock rallies 5%, how does the position delta likely change?',
      options: [
        'Becomes more positive (bullish)',
        'Becomes more negative (bearish)',
        'Stays at zero',
        'Depends on implied volatility',
      ],
      correctAnswer: 1,
      explanation:
        'When the stock rallies, the short call moves closer to the money (higher delta) while the short put moves further out (lower delta). This creates a net negative position delta - the position becomes bearish. The iron condor now "wants" the stock to fall back.',
      difficulty: 'hard',
    },
    {
      id: 'w2d8q5',
      question:
        'You want to open a delta-neutral position on MSFT. You sell a 0.20 delta call for $3.00. How many 0.10 delta puts should you sell to remain delta-neutral?',
      options: [
        '1 put',
        '2 puts',
        '4 puts',
        'Cannot be delta-neutral by selling only',
      ],
      correctAnswer: 1,
      explanation:
        'Short 1 call at 0.20 delta = -20 position delta. To neutralize, you need +20 delta. Shorting puts creates positive delta: each 0.10 delta put shorted = +10 delta. You need 2 puts (2 x +10 = +20) to offset the -20 from the call, achieving delta neutrality.',
      difficulty: 'hard',
    },
  ],
}
