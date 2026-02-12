// Week 1, Day 4: Moving Averages
// Understanding SMA vs EMA, key moving averages, and crossovers

import { LessonContent } from './day1'

export const lesson: LessonContent = {
  day: 4,
  week: 1,
  title: 'Moving Averages',
  description: 'Learn to use Simple and Exponential Moving Averages for trend identification, dynamic support/resistance, and recognizing golden and death crosses.',
  duration: 50,
  keyPoints: [
    'Understand the difference between SMA and EMA',
    'Use the 20, 50, and 200-day moving averages effectively',
    'Identify golden crosses and death crosses',
    'Apply moving averages as dynamic support and resistance',
    'Combine moving averages with options strategies'
  ],
  yourStocks: ['NVDA', 'META', 'GOOG', 'QQQ', 'HOOD'],
  content: [
    {
      type: 'text',
      title: 'What are Moving Averages?',
      content: `A moving average smooths out price data by calculating the average price over a specified number of periods.

**Why They Matter:**
- Filter out market noise to see the underlying trend
- Act as dynamic support and resistance levels
- Signal trend changes when price or MAs cross

**Two Main Types:**
- Simple Moving Average (SMA): Equal weight to all prices
- Exponential Moving Average (EMA): More weight to recent prices

**For Options Traders:**
Moving averages help identify:
1. Overall trend direction (bullish, bearish, neutral)
2. Dynamic levels for strike price selection
3. Potential turning points for timing entries`
    },
    {
      type: 'text',
      title: 'SMA vs EMA: When to Use Each',
      content: `**Simple Moving Average (SMA):**
- Calculation: Sum of closing prices / Number of periods
- Characteristics: Smoother, less reactive to recent price changes
- Best for: Identifying major trends, long-term investors
- Popular SMAs: 50-day, 200-day

**Exponential Moving Average (EMA):**
- Calculation: Gives more weight to recent prices
- Characteristics: More responsive, faster signals
- Best for: Short-term trading, catching early moves
- Popular EMAs: 9-day, 20-day, 50-day

**Which is Better?**
Neither is "better" - they serve different purposes:
- Use EMA for faster signals and shorter-term options
- Use SMA for major trend confirmation and longer-term positions
- Many traders use both: EMA for timing, SMA for trend`
    },
    {
      type: 'text',
      title: 'The Key Moving Averages',
      content: `**20-Day MA (Short-term)**
- Represents roughly one month of trading
- Respects minor pullbacks in strong trends
- Price above = short-term bullish
- Good for: Timing 0-30 DTE options

**50-Day MA (Intermediate)**
- Represents roughly one quarter of trading
- Key level for institutional investors
- Major support/resistance for swing trades
- Good for: 30-60 DTE options

**200-Day MA (Long-term)**
- Represents roughly one year of trading
- The "line in the sand" for major trend
- Price above = bull market; below = bear market
- Good for: Overall bias, LEAPS

**Pro Tip:**
The 50-day and 200-day MAs are self-fulfilling prophecies. So many traders watch them that price often reacts at these levels.`
    },
    {
      type: 'example',
      title: 'Reading MAs on NVDA',
      content: `Let's analyze NVDA's moving average structure:

**Current Readings (Example):**
- NVDA Price: $875
- 20-day EMA: $860
- 50-day SMA: $820
- 200-day SMA: $650

**Analysis:**
1. **Strong Uptrend**: Price is above all MAs
2. **Bullish Alignment**: 20 EMA > 50 SMA > 200 SMA
3. **Near-term Support**: 20 EMA at $860
4. **Major Support**: 50 SMA at $820

**Options Strategy:**
With MAs aligned bullishly:
- Favor put credit spreads
- Place short strike below the 50-day MA ($820)
- Example: Sell $810 put / Buy $805 put
- The 50-day acts as a safety buffer`,
      stock: 'NVDA'
    },
    {
      type: 'text',
      title: 'Golden Cross and Death Cross',
      content: `**Golden Cross (Bullish Signal):**
- Occurs when 50-day MA crosses ABOVE the 200-day MA
- Signals potential beginning of a new uptrend
- Higher probability when accompanied by volume
- For options: Favor bullish strategies after confirmation

**Death Cross (Bearish Signal):**
- Occurs when 50-day MA crosses BELOW the 200-day MA
- Signals potential beginning of a new downtrend
- Can precede significant declines
- For options: Favor bearish strategies or reduce exposure

**Important Caveats:**
- These are LAGGING indicators (confirm what already happened)
- False signals occur, especially in choppy markets
- Best in trending markets, less reliable in ranges
- Don't trade the cross blindly - wait for confirmation`
    },
    {
      type: 'example',
      title: 'Golden Cross Example: META',
      content: `META experienced a golden cross in early 2023:

**The Setup:**
- 50-day MA had been declining for months
- Stock bottomed around $88
- Price began rising, pulling up the 50-day MA
- 50-day MA crossed above 200-day MA around $160

**What Happened Next:**
- Stock continued to rally strongly
- Eventually reached over $500
- The golden cross signaled a major trend change

**Options Lesson:**
- After golden cross confirmation: sell puts, not calls
- Use the rising 50-day MA as your support level
- Be patient - the best move comes AFTER the cross
- Don't chase; wait for pullbacks to the rising MAs`,
      stock: 'META'
    },
    {
      type: 'warning',
      title: 'Moving Average Whipsaws',
      content: `Moving averages can give false signals in sideways markets:

**The Whipsaw Problem:**
- Price oscillates around an MA
- Crosses above and below repeatedly
- Each cross generates a signal, but most fail
- Results in multiple losing trades

**How to Avoid Whipsaws:**
1. **Add a filter**: Require price to close X% beyond the MA
2. **Wait for confirmation**: Don't act on first cross
3. **Check the higher time frame**: Daily MA on weekly chart
4. **Look at MA slope**: Flat MA = choppy market

**For Options:**
Whipsaw environments are actually GOOD for iron condors:
- No clear trend = range-bound action
- Sell both puts and calls outside the range
- Let time decay work while price chops around`
    },
    {
      type: 'text',
      title: 'MAs as Dynamic Support/Resistance',
      content: `Moving averages act as "moving" support and resistance levels:

**Using 20-day MA (Fast):**
- Strong trends: Price bounces off 20 EMA
- Pullbacks to 20 EMA are buying opportunities in uptrends
- Break of 20 EMA is first warning sign

**Using 50-day MA (Medium):**
- Healthy trends: Price may touch 50 SMA before resuming
- Break of 50 SMA after 20 EMA break = trend weakening
- Major level for institutional buyers

**Using 200-day MA (Slow):**
- Major trend determinant
- Touch of 200 SMA in uptrend = excellent long opportunity
- Break of 200 SMA = potential bear market

**Confluence:**
When an MA aligns with horizontal support/resistance, the level is much stronger. Look for these confluence zones for strike selection.`
    },
    {
      type: 'example',
      title: 'MA Support on GOOG',
      content: `GOOG recently pulled back to its 50-day MA:

**The Setup:**
- GOOG in uptrend, price at $180
- Stock pulled back from $185 high
- Touched 50-day SMA at $172
- Bounced with a hammer candlestick

**Analysis:**
- 50-day MA held as support (dynamic level)
- Hammer shows buying interest at this level
- Still above 200-day MA (major trend intact)

**Put Credit Spread Setup:**
- Current price: $180
- 50-day MA support: $172
- Sell $168 put / Buy $163 put
- Short strike is $4 below the proven support

**Why This Works:**
For GOOG to reach $168, it must:
1. Break the 50-day MA support at $172
2. Fall an additional $4
This gives you margin for error.`,
      stock: 'GOOG'
    },
    {
      type: 'text',
      title: 'MA Alignment (Stacking)',
      content: `The order of moving averages tells you the trend strength:

**Bullish Alignment (Strongest Uptrend):**
Price > 20 EMA > 50 SMA > 200 SMA
- All MAs rising
- Trade: Put credit spreads, bullish diagonals

**Bearish Alignment (Strongest Downtrend):**
Price < 20 EMA < 50 SMA < 200 SMA
- All MAs falling
- Trade: Call credit spreads, bearish diagonals

**Mixed/Transitioning:**
MAs crossing over each other, not in order
- Trend is changing or non-existent
- Trade: Iron condors, wait for clarity

**For Strike Selection:**
- Strong bull alignment: Use 50 or 200 SMA for put short strikes
- Strong bear alignment: Use 50 or 200 SMA for call short strikes
- Mixed alignment: Use wider strikes on both sides`
    },
    {
      type: 'example',
      title: 'QQQ MA Analysis',
      content: `Let's analyze QQQ (Nasdaq-100 ETF):

**Current MA Structure:**
- QQQ Price: $480
- 20 EMA: $475
- 50 SMA: $465
- 200 SMA: $420

**Alignment Check:**
Price ($480) > 20 EMA ($475) > 50 SMA ($465) > 200 SMA ($420)
= Perfect bullish alignment!

**Trend Assessment:**
- Major trend: Strong bull (above 200)
- Intermediate: Healthy pullback would find support at 50
- Short-term: Minor pullbacks to 20 EMA are buyable

**Iron Condor Setup:**
Despite bullish trend, if IV is high:
- Sell $505 call / Buy $510 call (above recent highs)
- Sell $455 put / Buy $450 put (below 50 SMA)
- Put side uses 50 SMA as buffer`,
      stock: 'QQQ'
    },
    {
      type: 'tip',
      title: 'MA Confluence Zones',
      content: `The most powerful levels occur when multiple MAs converge:

**What is Confluence?**
When different MAs reach similar price levels:
- 20 EMA and 50 SMA both around $100 = strong confluence
- Add horizontal support = even stronger

**How to Find Confluence:**
1. Plot your key MAs (20, 50, 200)
2. Look for areas where they cluster together
3. Mark these as high-probability support/resistance

**Trading Confluence:**
- Expect strong reactions at confluence zones
- Place short strikes beyond confluence levels
- Volume confirmation at these levels is extra bullish/bearish

**Example:**
HOOD's 20 EMA at $18.50 and 50 SMA at $18.20, with horizontal support at $18.00. This $18-18.50 zone is a powerful confluence area - ideal for placing put short strikes below.`
    },
    {
      type: 'example',
      title: 'HOOD Confluence Trade',
      content: `HOOD has a confluence zone around $18:

**The Setup:**
- Current price: $21
- 20 EMA: $19.50
- 50 SMA: $18.50
- Horizontal support: $18.00

**Confluence Zone:**
$18.00 - $18.50 area has:
- 50 SMA support
- Previous breakout level (horizontal)
- Close to round number ($18)

**Put Credit Spread:**
- Sell $17.50 put (below the entire confluence zone)
- Buy $15 put (wide spread for good R/R)
- HOOD would need to break through multiple support layers

**Risk Management:**
If HOOD breaks below $18 with volume:
- The confluence failed
- Consider closing for a small loss
- Don't wait for max loss`,
      stock: 'HOOD'
    },
    {
      type: 'exercise',
      title: 'Practice: MA Analysis',
      content: `Analyze these stocks using moving averages:

**1. NVDA**
- What is the current MA alignment? (Price vs 20/50/200)
- Is it bullish, bearish, or mixed?
- Where would you place a put credit spread short strike?

**2. META**
- Has there been a recent golden or death cross?
- Which MA is currently acting as support?
- If price pulled back to the 50 SMA, would you buy puts or sell them?

**3. QQQ**
- Calculate the distance between current price and the 200 SMA
- Is this extended (far from) or near the 200 SMA?
- How does this affect your strategy selection?

Use your broker's charting platform to add the 20 EMA, 50 SMA, and 200 SMA to these charts.`
    }
  ],
  quiz: [
    {
      id: 'w1d4q1',
      question: 'What is the main difference between an SMA and an EMA?',
      options: [
        'SMA uses more data points than EMA',
        'EMA gives more weight to recent prices, making it more responsive',
        'SMA is only used for short-term trading',
        'EMA can only be calculated on weekly charts'
      ],
      correctAnswer: 1,
      explanation: 'The Exponential Moving Average (EMA) gives more weight to recent prices, making it more responsive to current price action. The Simple Moving Average (SMA) weights all prices equally. This makes EMAs faster to signal changes but also more prone to false signals.',
      difficulty: 'easy'
    },
    {
      id: 'w1d4q2',
      question: 'A "Golden Cross" occurs when:',
      options: [
        'Price crosses above the 200-day MA',
        'The 20-day MA crosses above the 50-day MA',
        'The 50-day MA crosses above the 200-day MA',
        'The 200-day MA turns from declining to rising'
      ],
      correctAnswer: 2,
      explanation: 'A Golden Cross specifically refers to the 50-day moving average crossing above the 200-day moving average. This is considered a major bullish signal indicating a potential new uptrend. The opposite (50 crossing below 200) is called a Death Cross.',
      difficulty: 'easy'
    },
    {
      id: 'w1d4q3',
      question: 'GOOG is trading at $180 with MAs at: 20 EMA = $175, 50 SMA = $168, 200 SMA = $145. For a put credit spread, which level would be most appropriate for your short strike?',
      options: [
        'Above $180 (above current price)',
        'At $175 (at the 20 EMA)',
        'Just above $168 (near the 50 SMA)',
        'Below $165 (giving buffer below the 50 SMA)'
      ],
      correctAnswer: 3,
      explanation: 'For a put credit spread, you want the short strike below support levels. The 50 SMA at $168 acts as major support. Placing your short strike below $165 gives GOOG room to pull back to and even slightly through the 50 SMA without threatening your position. This provides a buffer beyond the dynamic support.',
      difficulty: 'medium'
    },
    {
      id: 'w1d4q4',
      question: 'A stock shows: Price < 20 EMA < 50 SMA < 200 SMA. All moving averages are declining. This indicates:',
      options: [
        'Bullish alignment - buy calls',
        'Bearish alignment - favor call credit spreads',
        'Neutral alignment - sell iron condors',
        'Transitioning trend - wait for clarity'
      ],
      correctAnswer: 1,
      explanation: 'When price is below all MAs and the MAs are stacked in bearish order (20 below 50 below 200) with all declining, this is a strong bearish alignment. In this environment, favor bearish strategies like call credit spreads. The declining MAs act as dynamic resistance above the current price.',
      difficulty: 'medium'
    },
    {
      id: 'w1d4q5',
      question: 'You observe that a stock\'s 20 EMA, 50 SMA, and horizontal support from a previous low all converge around $50. The stock is currently at $55. This $50 area is best described as:',
      options: [
        'A breakdown zone to avoid',
        'A confluence zone providing strong support',
        'An area to sell call credit spreads',
        'A signal that the MAs are unreliable'
      ],
      correctAnswer: 1,
      explanation: 'When multiple moving averages converge with horizontal support at the same price level, this creates a "confluence zone" - an area of strong support where multiple technical factors align. This makes the level more significant and reliable, making it an excellent reference point for placing put credit spread short strikes below.',
      difficulty: 'hard'
    }
  ]
}

export default lesson
