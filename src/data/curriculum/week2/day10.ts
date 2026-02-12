import type { LessonContent } from '../index'

export const day10: LessonContent = {
  day: 10,
  week: 2,
  title: 'Implied Volatility',
  description:
    'Master IV rank, IV percentile, identify when volatility is high or low, and navigate IV crush around earnings',
  duration: 50,
  keyPoints: [
    'Implied volatility represents the market\'s expectation of future movement',
    'IV Rank compares current IV to the past year\'s range (0-100)',
    'IV Percentile shows what percentage of days had lower IV',
    'High IV = sell premium, Low IV = consider buying or waiting',
    'IV crush after earnings can devastate long option positions',
  ],
  yourStocks: ['NVDA', 'META', 'GOOG', 'AAPL', 'AMZN'],
  content: [
    {
      type: 'text',
      title: 'What is Implied Volatility?',
      content: `Implied volatility (IV) is the market's forecast of how much a stock will move. Unlike historical volatility (what actually happened), IV is forward-looking - it's baked into option prices.

**Key Concepts:**
- IV is expressed as an annualized percentage
- An IV of 30% suggests the market expects the stock to move within a 30% range over the next year
- Higher IV = more expensive options (more premium to collect)
- Lower IV = cheaper options (less premium available)

**Why It Matters for Premium Sellers:**
When IV is high, options are expensive. This is when you want to SELL premium. When IV is low, options are cheap - less attractive for selling.

The goal is to sell expensive options (high IV) and buy them back cheaper (lower IV or time decay).`,
    },
    {
      type: 'text',
      title: 'IV Rank vs IV Percentile',
      content: `Two metrics help you determine if IV is relatively high or low:

**IV Rank (IVR):**
Formula: (Current IV - 52-week Low IV) / (52-week High IV - 52-week Low IV)

Example: Stock has IV range of 20-60% over past year, currently at 40%
IVR = (40 - 20) / (60 - 20) = 20/40 = 50%

**IV Percentile (IVP):**
Shows the percentage of days in the past year when IV was LOWER than today.

Example: If IVP is 75%, then IV was lower than today on 75% of trading days.

**Which to Use:**
- IVR tells you where current IV sits in the range
- IVP tells you how often IV has been lower
- Most traders prefer IVP as it's less affected by one-time spikes
- Both above 50% = relatively elevated IV (good for selling)`,
    },
    {
      type: 'example',
      title: 'Reading IV on NVDA',
      content: `Let's analyze NVDA's current volatility environment:

**NVDA Volatility Data:**
- Current IV: 48%
- 52-week IV Low: 32%
- 52-week IV High: 85%
- Historical Volatility (30-day): 42%

**Calculations:**
IV Rank: (48 - 32) / (85 - 32) = 16/53 = 30%
IV Percentile: 45% (IV was lower on 45% of days)

**Interpretation:**
- IVR of 30% suggests IV is in the lower third of its range
- IVP of 45% confirms IV is slightly below average
- Current IV (48%) > HV (42%) means options are slightly expensive vs realized movement

**Trading Decision:**
IV is not particularly elevated. Consider waiting for a volatility spike before selling premium, or use tighter strikes to collect meaningful premium.`,
      stock: 'NVDA',
    },
    {
      type: 'chart',
      title: 'IV Through the Year',
      content: `IV typically follows patterns based on market conditions and events:

Typical IV Cycle:

High IV |     *              *
        |    * *    *       * *
        |   *   *  * *     *   *
        |  *     **   *   *     *
Low IV  |_*___________*_*_________*
        Jan  Mar  May  Jul  Sep  Dec
             ^         ^         ^
           Q1        Q2/Q3     Year-end
         Earnings  Summer    Holiday
                   Lull      Volatility

Key patterns:
- IV spikes around earnings (4x per year per stock)
- Market-wide fear increases IV across all stocks
- Summer months often have lower IV ("sell in May")
- End of year can see volatility around tax selling`,
    },
    {
      type: 'text',
      title: 'When to Sell Premium (High IV)',
      content: `High IV environments favor premium sellers. Look for:

**Indicators of High IV:**
- IVR > 50% (preferably > 70%)
- IVP > 50% (preferably > 70%)
- Recent news causing uncertainty (but not catastrophic)
- Upcoming earnings (before the announcement)
- Market-wide fear spike (VIX elevated)

**Benefits of Selling High IV:**
1. Collect more premium for same delta
2. Options are "expensive" - more room for IV to drop
3. Better risk/reward on defined risk trades
4. Wider breakevens on iron condors

**Example - High IV Trade:**
META with IVR of 75% (elevated):
- Standard 16-delta iron condor might collect $4.50
- Same structure at average IV might only collect $2.80
- 60% more premium for the same probability of profit`,
      stock: 'META',
    },
    {
      type: 'warning',
      title: 'When IV is Low - Proceed with Caution',
      content: `Low IV presents challenges for premium sellers:

**Indicators of Low IV:**
- IVR < 25%
- IVP < 25%
- Quiet market, low VIX
- No upcoming catalysts

**Risks of Selling Low IV:**
1. Less premium collected = worse risk/reward
2. IV can only go UP from here (vega risk)
3. Breakevens are tighter
4. Any volatility expansion hurts your position

**What to Do in Low IV:**
- Consider smaller position sizes
- Use closer-to-money strikes (higher delta)
- Look at different underlyings with higher IV
- Wait for volatility to increase
- Consider debit spreads (benefit from IV expansion)

Remember: Just because IV is low doesn't mean you MUST sell premium. Sometimes the best trade is no trade.`,
    },
    {
      type: 'example',
      title: 'IV Crush Around Earnings - AMZN',
      content: `IV crush is the rapid collapse of implied volatility after a known event (usually earnings).

**Before AMZN Earnings:**
- Stock at $185
- IV: 65% (elevated due to uncertainty)
- ATM straddle price: $18.00
- Implied move: ~$18 (about 10%)

**After Earnings Announced:**
- Stock moves to $190 (+2.7%)
- IV drops to: 35% (uncertainty resolved)
- ATM straddle would now price at: $8.00

**The Crush:**
Even though the stock went UP, IV collapsed 46%.
If you bought the straddle, you'd lose money despite being "right" on direction.
If you sold the straddle (or iron condor), IV crush works in your favor.

**Key Insight:**
Earnings straddles often price in a 5-8% move. If the actual move is smaller, IV crush devastates long premium positions. Premium sellers profit from this overpricing.`,
      stock: 'AMZN',
    },
    {
      type: 'tip',
      title: 'IV Strategy for Tech Stocks',
      content: `Tech stocks like GOOG, AAPL, META, and NVDA have predictable IV patterns:

**Earnings Cycle (Quarterly):**
- 2-3 weeks before: IV starts climbing
- 1 week before: IV peaks
- Day after earnings: IV crushes 30-50%

**Trading Approach:**
1. **Pre-earnings (1-2 weeks out):** IV is elevated. Good time for iron condors with expiration AFTER earnings.
2. **Post-earnings:** IV is crushed. Consider waiting for the next catalyst before selling premium.
3. **Between earnings:** Look for news events, product launches, or market fear to elevate IV.

**Specific to Weekly Options:**
The first weekly expiration after earnings often has the lowest IV. The weekly just before earnings has the highest.`,
    },
    {
      type: 'exercise',
      title: 'Analyze This IV Environment',
      content: `GOOG is trading at $175. You're considering an iron condor.

**Given Data:**
- Current IV: 28%
- 52-week IV High: 52%
- 52-week IV Low: 22%
- Days until earnings: 8
- Current VIX: 14

Calculate and decide:
A) What is the IV Rank?
B) Is this high or low IV?
C) Would you sell premium now? Why or why not?

**Answers:**
A) IV Rank = (28 - 22) / (52 - 22) = 6/30 = 20%

B) This is LOW IV - in the bottom 20% of its range

C) Considerations:
   - Low IVR (20%) = less premium available
   - Earnings in 8 days = IV will likely rise
   - VIX at 14 is historically low

   **Recommendation:** Wait for IV to rise as earnings approach. Enter the iron condor 3-5 days before earnings when IV has expanded, with expiration after the announcement to capture IV crush.`,
      stock: 'GOOG',
    },
  ],
  quiz: [
    {
      id: 'w2d10q1',
      question:
        'A stock has had IV range from 25% to 75% over the past year. Current IV is 45%. What is the IV Rank?',
      options: ['45%', '40%', '50%', '60%'],
      correctAnswer: 1,
      explanation:
        'IV Rank = (Current IV - Low) / (High - Low) = (45 - 25) / (75 - 25) = 20/50 = 40%. Current IV is 40% of the way between the yearly low and high.',
      difficulty: 'easy',
    },
    {
      id: 'w2d10q2',
      question:
        'What is the key difference between IV Rank and IV Percentile?',
      options: [
        'IV Rank is more accurate than IV Percentile',
        'IV Rank shows position in the range, IV Percentile shows how often IV was lower',
        'IV Percentile uses a longer lookback period',
        'They measure the same thing differently',
      ],
      correctAnswer: 1,
      explanation:
        'IV Rank tells you where current IV sits within the high-low range (a position). IV Percentile tells you the percentage of days when IV was lower than today (a frequency). IVP is often preferred because it\'s less skewed by one-time spikes.',
      difficulty: 'medium',
    },
    {
      id: 'w2d10q3',
      question:
        'META has earnings tomorrow. IV is at 55% (IV Rank 85%). After earnings, the stock moves 3% and IV drops to 32%. If you sold an iron condor before earnings, how does IV crush affect your position?',
      options: [
        'Hurts your position - you\'re short vega',
        'Helps your position - you benefit from IV collapse',
        'No effect - IV doesn\'t impact iron condors',
        'Depends on which direction the stock moved',
      ],
      correctAnswer: 1,
      explanation:
        'When you sell an iron condor, you are short vega (you benefit when IV falls). The IV crush from 55% to 32% dramatically reduces option prices across the board. Your short options become cheaper to buy back, creating profit even if the stock moved.',
      difficulty: 'medium',
    },
    {
      id: 'w2d10q4',
      question:
        'It\'s a quiet market with VIX at 12. Your usual stock has IV Rank of 15%. What is the best approach for premium selling?',
      options: [
        'Sell twice as many contracts to collect the same premium',
        'Use closer-to-money strikes to collect meaningful premium',
        'Sell the same strikes but expect the same returns',
        'Low IV means higher probability of profit, so sell more aggressively',
      ],
      correctAnswer: 1,
      explanation:
        'In low IV environments, selling the same OTM strikes collects less premium with tighter breakevens. Using closer-to-money strikes (higher delta) allows you to collect meaningful premium, but increases risk. Alternatively, wait for IV to rise or look at other underlyings.',
      difficulty: 'hard',
    },
    {
      id: 'w2d10q5',
      question:
        'An ATM straddle on AAPL costs $12 with 7 DTE, with earnings in 2 days. The implied move is approximately:',
      options: ['$6 (5%)', '$12 (6.5%)', '$24 (13%)', 'Cannot determine from this information'],
      correctAnswer: 1,
      explanation:
        'The ATM straddle price approximates the implied (expected) move. At $12 for the straddle, the market implies AAPL could move about $12 in either direction by expiration. If AAPL is ~$185, this represents roughly 6.5% implied move. This is typical for earnings.',
      difficulty: 'hard',
    },
  ],
}
