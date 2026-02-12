// Week 1, Day 6: Volume Analysis
// Understanding volume confirmation, accumulation/distribution, and volume spikes

import { LessonContent } from './day1'

export const lesson: LessonContent = {
  day: 6,
  week: 1,
  title: 'Volume Analysis',
  description: 'Learn to read volume patterns to confirm price moves, identify accumulation and distribution phases, and spot significant volume spikes that signal institutional activity.',
  duration: 50,
  keyPoints: [
    'Understand why volume matters for validating price moves',
    'Identify accumulation and distribution patterns',
    'Recognize significant volume spikes and their meaning',
    'Use volume to confirm breakouts and breakdowns',
    'Apply volume analysis to options strategy selection'
  ],
  yourStocks: ['NVDA', 'META', 'GOOG', 'MELI', 'PLTR'],
  content: [
    {
      type: 'text',
      title: 'Why Volume Matters',
      content: `Volume is the number of shares traded during a given period. It's one of the most important confirmation tools in technical analysis.

**Volume Reveals:**
- The conviction behind price moves
- Institutional participation (smart money)
- Potential for continued movement or reversal
- Whether breakouts are real or fake

**The Core Principle:**
Price shows what happened. Volume shows how many participated.

**For Options Traders:**
- High volume moves are more likely to sustain
- Low volume moves are more likely to reverse
- Volume spikes often precede or confirm major turning points
- Understanding volume helps you avoid false breakouts that ruin credit spreads`
    },
    {
      type: 'text',
      title: 'Volume Confirmation',
      content: `Volume should confirm price direction. Here's what to look for:

**Uptrend Confirmation:**
- Rising prices on above-average volume = healthy uptrend
- Pullbacks on below-average volume = normal consolidation
- Rising prices on declining volume = warning sign (weakening trend)

**Downtrend Confirmation:**
- Falling prices on above-average volume = healthy downtrend
- Bounces on below-average volume = normal correction
- Falling prices on declining volume = selling exhaustion possible

**Key Rules:**
1. Volume should expand in the direction of the trend
2. Volume should contract during counter-trend moves
3. Volume divergence from price often precedes reversals

**Average Volume:**
Compare today's volume to the 20-day or 50-day average volume to determine if it's above or below normal.`
    },
    {
      type: 'example',
      title: 'Volume Confirmation on NVDA',
      content: `Let's analyze NVDA's recent price action with volume:

**Strong Rally Day:**
- NVDA up 4%
- Volume: 55M shares (average is 45M)
- Interpretation: Strong institutional buying, trend supported

**Pullback Day:**
- NVDA down 1.5%
- Volume: 30M shares (below average)
- Interpretation: Light selling, just profit-taking, trend intact

**What This Means for Options:**
The low-volume pullback into support is an ideal put credit spread entry:
- The trend is confirmed by high-volume rallies
- The pullback is normal consolidation (low volume)
- Selling pressure is light, buyers will likely return

This is much better than selling puts after a low-volume rally, which could reverse.`,
      stock: 'NVDA'
    },
    {
      type: 'text',
      title: 'Accumulation and Distribution',
      content: `**Accumulation:**
Institutions quietly building positions (buying):
- Price moves sideways or slightly up
- Volume is elevated but not explosive
- Often occurs after a downtrend (bottoming)
- Pattern: Higher lows on good volume

**Distribution:**
Institutions quietly exiting positions (selling):
- Price moves sideways or slightly down
- Volume is elevated, especially on down days
- Often occurs after an uptrend (topping)
- Pattern: Lower highs on heavy volume

**How to Identify:**
Look at volume on up days vs. down days:
- More volume on up days = accumulation (bullish)
- More volume on down days = distribution (bearish)

**For Options:**
- Accumulation phases: Favor put credit spreads
- Distribution phases: Favor call credit spreads or exit bullish positions`
    },
    {
      type: 'example',
      title: 'Accumulation Pattern on META',
      content: `META shows classic accumulation after a decline:

**The Pattern:**
- META fell from $520 to $450 over 3 weeks
- Price then traded sideways between $450-$470 for 2 weeks
- Volume on down days: 15-20M shares
- Volume on up days: 25-30M shares

**Accumulation Signs:**
- Up days have 50% more volume than down days
- Higher lows forming ($452, $455, $458)
- Price holding above the $450 low

**Options Strategy:**
This is a great setup for a put credit spread:
- Short strike at $445 (below the range and accumulation zone)
- Long strike at $440
- Accumulation suggests institutions are buying
- The $450 low is being defended

**Warning Signs:**
If you see a high-volume break below $450, the accumulation failed. Exit the trade.`,
      stock: 'META'
    },
    {
      type: 'example',
      title: 'Distribution Pattern on MELI',
      content: `MELI shows distribution after a strong rally:

**The Pattern:**
- MELI rallied from $1,600 to $1,900
- Price then traded sideways between $1,850-$1,900 for 2 weeks
- Volume on up days: 300K shares
- Volume on down days: 500K+ shares

**Distribution Signs:**
- Down days have significantly more volume
- Lower highs forming ($1,900, $1,885, $1,875)
- Multiple failed attempts to hold above $1,900

**Options Strategy:**
This is a warning sign for bullish positions:
- Consider call credit spreads above $1,900
- Short strike at $1,920 / Long strike at $1,940
- Distribution suggests institutions are selling
- The $1,900 level keeps getting rejected

**What to Watch:**
High-volume break below $1,850 confirms distribution is complete. Expect a larger decline.`,
      stock: 'MELI'
    },
    {
      type: 'text',
      title: 'Volume Spikes',
      content: `A volume spike is a day with volume significantly higher than average (usually 2x or more).

**What Volume Spikes Mean:**

**Spike at the Bottom:**
- After extended decline, huge volume spike
- Often signals capitulation (forced selling exhaustion)
- Can mark a major bottom
- Options: Look for put credit spread opportunities after confirmation

**Spike at the Top:**
- After extended rally, huge volume spike
- Often signals climax buying (everyone who wants in is in)
- Can mark a major top
- Options: Look for call credit spread opportunities after confirmation

**Spike on Breakout:**
- Price breaks key level on 2x+ average volume
- Confirms the breakout is real (institutional participation)
- Options: Adjust strategy to respect the new trend

**Spike with No Price Move:**
- Huge volume but price barely moves
- Suggests heavy buying AND selling (battle)
- Often precedes big moves - direction uncertain
- Options: Wait for clarity before committing`
    },
    {
      type: 'example',
      title: 'Volume Spike Analysis on GOOG',
      content: `GOOG shows a volume spike on a breakout:

**The Situation:**
- GOOG trading in range $170-$185 for 6 weeks
- Average daily volume: 20M shares
- Breakout day: GOOG closes at $188 on 48M shares (2.4x average)

**Analysis:**
- The breakout is confirmed by exceptional volume
- Institutions are participating (not just retail)
- The $185 old resistance likely becomes new support

**Options Strategy Post-Breakout:**
Old iron condor approach is out. New strategy:
- Wait for pullback to $185 area (old resistance, new support)
- Sell put credit spread with short strike at $180
- The high-volume breakout confirms $185 as valid support
- Avoid selling calls near-term (breakout momentum)`,
      stock: 'GOOG'
    },
    {
      type: 'warning',
      title: 'Volume Traps',
      content: `**Low Volume Breakouts:**
- Price breaks resistance but volume is below average
- High probability of a false breakout
- Price often reverses back into the range
- Don't sell puts below a low-volume breakout!

**High Volume Fakeouts:**
- Some volume spikes are manipulated or news-driven
- One-day spikes without follow-through can reverse
- Wait for 2-3 days of sustained volume for confirmation

**Ex-Dividend and Options Expiration:**
- Volume can spike artificially on these days
- Not a true indicator of directional conviction
- Be aware of calendar effects

**Earnings Volume:**
- Earnings always cause volume spikes
- Post-earnings volume tells you more than earnings day volume
- Look for volume patterns in the days after, not the day of

**For Options Sellers:**
Never assume a breakout is real based on one day. Wait for follow-through with continued volume before adjusting positions.`
    },
    {
      type: 'text',
      title: 'Volume and Support/Resistance',
      content: `Volume adds context to support and resistance levels:

**High Volume at a Level:**
- Many traders participated in establishing this level
- The level is well-known and significant
- More likely to hold on future tests
- Good for placing short strikes nearby

**Low Volume at a Level:**
- Few traders established this level
- May not hold on future tests
- Be more cautious using this level for strikes
- Give extra buffer when placing short strikes

**Volume Profile:**
Shows where most volume traded at different price levels:
- High-volume price zones act as magnets (price returns to them)
- Low-volume price zones are passed through quickly
- Called "High Volume Nodes" and "Low Volume Nodes"

**For Strike Selection:**
Place short strikes beyond high-volume zones (strong S/R) rather than low-volume zones (weak S/R).`
    },
    {
      type: 'example',
      title: 'Volume at Support on PLTR',
      content: `PLTR shows high-volume support at $22:

**Volume Profile Analysis:**
- PLTR trading range: $20-$28 over past 3 months
- Highest volume concentration: $21.50-$22.50 zone
- This is a "High Volume Node"

**What This Means:**
- Many shares changed hands at $22
- Traders anchor to this price psychologically
- Both buyers and sellers reference this level
- It's likely to act as strong support

**Put Credit Spread Setup:**
- PLTR currently at $25
- High-volume support at $22
- Sell $21 put / Buy $19 put

**The Edge:**
You're placing your short strike $1 below a high-volume zone. For PLTR to reach $21, it must first break through the $22 area where heavy buying interest exists.`,
      stock: 'PLTR'
    },
    {
      type: 'tip',
      title: 'Practical Volume Tips',
      content: `**Daily Volume Checklist:**
1. Is today's volume above or below the 20-day average?
2. Is volume confirming the price direction?
3. Are there any unusual spikes requiring investigation?

**For Credit Spreads:**
- Enter on LOW volume pullbacks (in uptrends for puts)
- Avoid entering on HIGH volume moves against your position
- Use volume to confirm support/resistance levels

**For Iron Condors:**
- Best when volume is average or below (quiet market)
- Avoid iron condors when volume is spiking (volatility)
- Volume expansion often precedes breakouts

**Red Flags:**
- Price rising but volume falling = bearish divergence
- Price falling but volume falling = possible bounce coming
- Sudden volume spike with no news = investigate before trading

**Tools:**
Most charting platforms show volume as a histogram below price. Add a 20-day moving average of volume to easily see above/below average.`
    },
    {
      type: 'exercise',
      title: 'Practice: Volume Analysis',
      content: `On your charting platform, analyze volume for these stocks:

**1. NVDA**
- Compare volume on the last 3 up days vs. last 3 down days
- Is volume confirming the current trend?
- Any recent volume spikes to investigate?

**2. META**
- Look at volume over the past month
- Can you identify any accumulation or distribution patterns?
- How would this influence your options strategy?

**3. GOOG**
- Find the last breakout (price breaking key level)
- Was volume above or below average on the breakout?
- Did price follow through, or was it a false breakout?

Track your analysis and note whether volume correctly predicted the subsequent price action.`
    }
  ],
  quiz: [
    {
      id: 'w1d6q1',
      question: 'In a healthy uptrend, what volume pattern should you see?',
      options: [
        'High volume on down days, low volume on up days',
        'High volume on up days, low volume on down days (pullbacks)',
        'Consistent volume regardless of price direction',
        'Declining volume on all days'
      ],
      correctAnswer: 1,
      explanation: 'In a healthy uptrend, volume should expand in the direction of the trend (up days) and contract during counter-trend moves (pullbacks). This shows that buying interest is strong while selling pressure during pullbacks is light - a sign that the trend is supported by institutional participation.',
      difficulty: 'easy'
    },
    {
      id: 'w1d6q2',
      question: 'A stock breaks above resistance at $100 on volume that is half of the 20-day average. What does this suggest?',
      options: [
        'A confirmed breakout - buy calls immediately',
        'A potential false breakout - wait for volume confirmation',
        'Institutions are hiding their buying activity',
        'The resistance level was not important'
      ],
      correctAnswer: 1,
      explanation: 'Low-volume breakouts are often false breakouts that reverse back into the prior range. Without strong volume, there is no confirmation that institutions are participating. Wait for follow-through days with above-average volume before trusting the breakout.',
      difficulty: 'medium'
    },
    {
      id: 'w1d6q3',
      question: 'META is trading sideways after a decline. Up days show 25M shares while down days show 15M shares. This pattern suggests:',
      options: [
        'Distribution - institutions are selling',
        'Accumulation - institutions are buying',
        'No institutional activity',
        'The stock will continue declining'
      ],
      correctAnswer: 1,
      explanation: 'When up days have higher volume than down days during a sideways consolidation after a decline, this indicates accumulation - institutions are quietly building positions. This is bullish and suggests the stock may move higher once accumulation is complete.',
      difficulty: 'medium'
    },
    {
      id: 'w1d6q4',
      question: 'After an extended rally, NVDA has a day where it gaps up 3% on 3x average volume but closes near unchanged (small body, big wicks). What does this suggest?',
      options: [
        'Strong continuation pattern - buy calls',
        'Potential climax top - be cautious with bullish positions',
        'Normal trading activity',
        'Volume data is inaccurate'
      ],
      correctAnswer: 1,
      explanation: 'A volume spike (3x average) after an extended rally with a small price change (big wicks, small body) suggests a potential climax top. The huge volume shows intense participation, but the inability to hold gains indicates equal buying and selling pressure. This often precedes a reversal or consolidation.',
      difficulty: 'hard'
    },
    {
      id: 'w1d6q5',
      question: 'You identify a high-volume support zone at $50 on a stock currently trading at $55. For a put credit spread, where should you place your short strike?',
      options: [
        'At exactly $50 to capture the support',
        'At $52, between current price and support',
        'Below $50, such as $48 or $49',
        'At $55, at the current price'
      ],
      correctAnswer: 2,
      explanation: 'Place your short strike below the high-volume support zone. A high-volume zone around $50 indicates strong buying interest at that level. By placing your short strike at $48-49, the stock would need to break through this high-volume support before reaching your position, giving you additional protection.',
      difficulty: 'medium'
    }
  ]
}

export default lesson
