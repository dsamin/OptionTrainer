// Week 1, Day 3: Trend Lines
// Drawing trend lines, channels, and identifying breakouts for options trading

import { LessonContent } from './day1'

export const lesson: LessonContent = {
  day: 3,
  week: 1,
  title: 'Trend Lines',
  description: 'Master the art of drawing trend lines, identifying channels, and recognizing breakouts to improve your options timing and direction.',
  duration: 45,
  keyPoints: [
    'Draw valid trend lines using proper techniques',
    'Identify uptrend, downtrend, and sideways channels',
    'Recognize breakout and breakdown patterns',
    'Use trend analysis for options strategy selection',
    'Confirm trends before committing to directional trades'
  ],
  yourStocks: ['NVDA', 'GOOG', 'AMZN', 'PLTR', 'QQQ'],
  content: [
    {
      type: 'text',
      title: 'What is a Trend Line?',
      content: `A trend line is a straight line that connects two or more price points and extends into the future to act as dynamic support or resistance.

**Uptrend Line:**
- Connects two or more higher lows
- Drawn below price action
- Acts as dynamic support

**Downtrend Line:**
- Connects two or more lower highs
- Drawn above price action
- Acts as dynamic resistance

**Why Trend Lines Matter for Options:**
- Trend lines help identify direction for credit spread selection
- Channels help set strike prices based on trend boundaries
- Breakouts signal potential strategy adjustments`
    },
    {
      type: 'text',
      title: 'Drawing Valid Trend Lines',
      content: `Not all trend lines are created equal. Here's how to draw them correctly:

**The Rules:**
1. **Minimum Two Touches**: A valid trend line needs at least two points
2. **Three Touches = Confirmed**: More touches increase reliability
3. **Use Wicks or Bodies?**: Be consistent - most prefer wicks (more accurate)
4. **Don't Force It**: If the line doesn't fit naturally, the trend may not exist

**Common Mistakes:**
- Drawing lines through candle bodies (breaks the line)
- Using only one touch point
- Forcing steep angles that don't match price movement
- Ignoring failed trend lines

**The Steeper the Line, The Less Reliable:**
- 45-degree angles are ideal
- Very steep lines break quickly
- Very flat lines offer little trading value`
    },
    {
      type: 'example',
      title: 'Drawing an Uptrend Line on NVDA',
      content: `Let's draw an uptrend line on NVDA's daily chart:

**Step 1: Identify the Low Points**
- Find the most recent significant swing low (let's say $750)
- Find a previous higher low (let's say $680 from 6 weeks ago)

**Step 2: Connect the Lows**
- Draw a line connecting the $680 low to the $750 low
- Extend the line to the right

**Step 3: Validate**
- Does price touch the line a third time? (confirmation)
- Do prices stay above the line? (trend intact)
- Is the angle sustainable? (not too steep)

**For Options:**
If NVDA is in an uptrend and currently at $850:
- The trend line might be around $820 now
- Sell put credit spreads below the trend line
- Example: Sell $810 put / Buy $805 put`,
      stock: 'NVDA'
    },
    {
      type: 'text',
      title: 'Trend Channels',
      content: `A channel consists of two parallel trend lines containing price action:

**Ascending Channel (Bullish):**
- Lower line: Uptrend line connecting higher lows
- Upper line: Parallel line connecting higher highs
- Trade: Sell puts near lower line, sell calls near upper line

**Descending Channel (Bearish):**
- Upper line: Downtrend line connecting lower highs
- Lower line: Parallel line connecting lower lows
- Trade: Sell calls near upper line (be cautious with puts)

**Horizontal Channel (Sideways/Range):**
- Horizontal support and resistance
- Price oscillates between levels
- Trade: Ideal for iron condors!

**Channel Width = Expected Range:**
The width of the channel tells you how much room price has to move. Wider channels = place strikes further out. Narrow channels = can use closer strikes but less premium.`
    },
    {
      type: 'example',
      title: 'Trading a Channel on GOOG',
      content: `GOOG has formed an ascending channel over the past 3 months:

**Channel Boundaries:**
- Lower trend line: Currently around $168 (support)
- Upper trend line: Currently around $188 (resistance)
- Price is currently at $178

**Iron Condor Setup:**
With price in the middle of the channel:
- Sell $195 call (above channel resistance + buffer)
- Buy $200 call
- Sell $162 put (below channel support + buffer)
- Buy $157 put

**Why This Works:**
- The channel boundaries act as dynamic support/resistance
- Price has respected this channel for 3 months
- You're placing strikes outside both channel boundaries
- As long as GOOG stays in the channel, both sides profit`,
      stock: 'GOOG'
    },
    {
      type: 'warning',
      title: 'Channel Breakouts and Breakdowns',
      content: `Channels don't last forever. Here's what to watch for:

**Signs a Breakout is Coming:**
- Tightening price action within the channel
- Decreasing volume on bounces from channel edges
- Multiple failed attempts to reach the opposite boundary
- News catalysts approaching (earnings, FDA approval, etc.)

**When the Channel Breaks:**
- Measure the channel width
- The expected move = channel width from the breakout point
- Example: $20 wide channel breaks up = target $20 above resistance

**For Options Traders:**
- If you're in an iron condor, a channel break can be dangerous
- Have adjustment or exit plans before the break happens
- Consider closing positions before known catalysts`
    },
    {
      type: 'example',
      title: 'Breakout Trade on AMZN',
      content: `AMZN was trading in a channel between $175-$195 for 6 weeks:

**The Breakout:**
- AMZN broke above $195 resistance on high volume
- Candle closed convincingly above the trend line
- Next day confirmed with follow-through

**Measured Move:**
- Channel width: $195 - $175 = $20
- Breakout point: $195
- Target: $195 + $20 = $215

**Options Strategy After Breakout:**
Old iron condor strategy no longer applies. Instead:
- Sell put credit spreads below new support at $195
- Example: Sell $190 put / Buy $185 put
- Wait for new resistance to form before selling calls`,
      stock: 'AMZN'
    },
    {
      type: 'text',
      title: 'Trend Confirmation Techniques',
      content: `Don't trade trends blindly. Confirm them:

**1. Multiple Time Frame Confirmation**
- Weekly trend should match daily trend
- If weekly is up and daily is up = strong confirmation
- If weekly is up but daily is down = just a pullback (usually)

**2. Volume Confirmation**
- Uptrends: Volume should be higher on up days
- Downtrends: Volume should be higher on down days
- Divergence (opposite volume pattern) = trend weakening

**3. Moving Average Alignment**
- Strong uptrend: Price > 20 MA > 50 MA > 200 MA
- Strong downtrend: Price < 20 MA < 50 MA < 200 MA
- Mixed alignment = messy, avoid directional bets

**4. Higher Highs and Higher Lows (Uptrend)**
- Each swing high should exceed the previous
- Each swing low should be above the previous
- One failure is a warning, two = trend change`
    },
    {
      type: 'example',
      title: 'Trend Confirmation on PLTR',
      content: `Let's confirm the trend on PLTR:

**Price Structure:**
- Making higher highs: $22 -> $26 -> $29 (confirmed)
- Making higher lows: $18 -> $21 -> $24 (confirmed)
- Trend line connecting lows is intact

**Volume Analysis:**
- Up days averaging 45M shares
- Down days averaging 30M shares
- More volume on up moves = bullish confirmation

**Moving Averages:**
- Price at $27
- 20-day MA at $25
- 50-day MA at $23
- 200-day MA at $19
- Perfect bullish alignment!

**Options Strategy:**
With strong uptrend confirmation:
- Favor put credit spreads over iron condors
- Example: Sell $22 put (below 50-day MA) / Buy $20 put
- Avoid call credit spreads in strong uptrends`,
      stock: 'PLTR'
    },
    {
      type: 'tip',
      title: 'Trend Lines and Strike Selection',
      content: `Use trend lines as dynamic strike selection guides:

**Uptrend:**
- Draw the uptrend line
- Place short put strikes 3-5% below the trend line
- Avoid selling calls in strong uptrends (or go very wide)

**Downtrend:**
- Draw the downtrend line
- Place short call strikes 3-5% above the trend line
- Be cautious with puts - countertrend bounces are sharp

**Channel/Sideways:**
- Draw both lines
- Place short calls above the upper line
- Place short puts below the lower line
- This is the ideal environment for iron condors

**When Trend Line Breaks:**
- Exit positions that rely on that trend line
- Wait for new trend to establish before re-entering
- Broken trend lines often become opposite S/R`
    },
    {
      type: 'text',
      title: 'Trend Line Failures',
      content: `Understanding false breakouts and breakdowns:

**False Breakout Characteristics:**
- Low volume on the break
- Quick reversal back inside the channel
- Wick outside the line but body inside
- No follow-through the next day

**True Breakout Characteristics:**
- High volume on the break
- Candle closes outside the line
- Follow-through in subsequent sessions
- Old trend line becomes support/resistance

**Trading False Breakouts:**
- If you suspect a false breakout, wait for confirmation
- Don't chase breakouts - let price prove the move
- False breakouts often lead to moves in the opposite direction

**For Options:**
False breakouts can hurt if you adjusted positions too quickly. When in doubt, wait for the daily close or next day's action before making changes.`
    },
    {
      type: 'example',
      title: 'QQQ Channel Analysis',
      content: `QQQ (Nasdaq ETF) is in a well-defined ascending channel:

**Channel Structure:**
- Lower support trend line connecting recent lows
- Upper resistance trend line connecting recent highs
- Channel has been respected for 2+ months

**Current Situation:**
- QQQ trading at $485, near the middle of the channel
- Lower line around $470
- Upper line around $505

**Iron Condor Setup:**
Perfect environment for an iron condor:
- Sell $510 call / Buy $515 call (above upper line)
- Sell $465 put / Buy $460 put (below lower line)
- 30-45 DTE for optimal time decay

**Exit Plan:**
- Close at 50% profit
- If QQQ touches either channel boundary, evaluate for early exit
- If QQQ breaks channel, close the threatened side`,
      stock: 'QQQ'
    },
    {
      type: 'exercise',
      title: 'Practice: Drawing Trend Lines',
      content: `On your charting platform, practice these exercises:

**1. NVDA**
- Draw the current trend line (uptrend or downtrend)
- Extend it forward - where would support/resistance be next week?
- Would you trade with or against this trend?

**2. GOOG**
- Can you identify a channel?
- If so, what are the upper and lower boundaries?
- Where would you place iron condor strikes?

**3. AMZN**
- Has any recent trend line been broken?
- Did the break lead to a measured move?
- Is a new trend forming?

Document your analysis with screenshots or notes. Compare your lines to what actually happens over the coming days.`
    }
  ],
  quiz: [
    {
      id: 'w1d3q1',
      question: 'How many touches are needed for a trend line to be considered confirmed?',
      options: [
        'One touch is enough',
        'Two touches (minimum for a valid line)',
        'Three or more touches',
        'Trend lines don\'t need to touch price'
      ],
      correctAnswer: 2,
      explanation: 'While two touches are the minimum to draw a trend line, three or more touches confirm the line\'s validity. Each additional touch proves that traders are respecting this level and increases the probability that the trend line will continue to act as support or resistance.',
      difficulty: 'easy'
    },
    {
      id: 'w1d3q2',
      question: 'PLTR is trading in a well-defined ascending channel. The lower trend line is at $22 and the upper trend line is at $28. Price is currently at $25. What is the ideal options strategy?',
      options: [
        'Sell naked calls at $28',
        'Buy puts at $22',
        'Sell an iron condor with strikes outside both channel boundaries',
        'Wait for a breakout before trading'
      ],
      correctAnswer: 2,
      explanation: 'When a stock is trading within a well-defined channel, an iron condor is ideal. You would sell calls above the upper trend line (say $29-30) and sell puts below the lower trend line (say $21-20). This lets you profit from time decay while the channel contains price movement.',
      difficulty: 'medium'
    },
    {
      id: 'w1d3q3',
      question: 'A stock breaks above its upper channel boundary on very low volume. The next day, price falls back inside the channel. This is most likely:',
      options: [
        'A confirmed breakout - look for continuation higher',
        'A false breakout - the channel is still intact',
        'The start of a new downtrend',
        'Time to sell puts below support'
      ],
      correctAnswer: 1,
      explanation: 'Low volume breakouts that quickly reverse back inside the channel are classic false breakouts. True breakouts typically occur on high volume with follow-through in subsequent sessions. After a false breakout, the channel remains valid and may even see a move toward the opposite boundary.',
      difficulty: 'medium'
    },
    {
      id: 'w1d3q4',
      question: 'AMZN has been in a channel between $175-$195 for 8 weeks. It breaks above $195 on high volume. Using the measured move technique, what is the upside target?',
      options: [
        '$200',
        '$205',
        '$215',
        '$235'
      ],
      correctAnswer: 2,
      explanation: 'The measured move technique adds the channel width to the breakout point. Channel width = $195 - $175 = $20. Breakout point = $195. Target = $195 + $20 = $215. This technique provides a price objective based on the range that has contained price action.',
      difficulty: 'hard'
    },
    {
      id: 'w1d3q5',
      question: 'You\'re considering a put credit spread on a stock in an uptrend. Where should you place your short put strike relative to the uptrend line?',
      options: [
        'Right at the trend line for maximum premium',
        'Slightly above the trend line',
        'Below the trend line to give price room to touch it',
        'Trend lines don\'t matter for put spreads'
      ],
      correctAnswer: 2,
      explanation: 'Place your short put strike below the uptrend line (typically 3-5% below). This gives price room to test the trend line support without threatening your position. If you place strikes at or above the trend line, any test of support could put your trade at risk. The trend line acts as an additional buffer for your position.',
      difficulty: 'medium'
    }
  ]
}

export default lesson
