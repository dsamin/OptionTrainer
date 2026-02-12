// Week 1, Day 7: Week 1 Review
// Comprehensive review of all Week 1 concepts

import { LessonContent } from './day1'

export const lesson: LessonContent = {
  day: 7,
  week: 1,
  title: 'Week 1 Review',
  description: 'Review and synthesize all Week 1 concepts: candlesticks, support/resistance, trend lines, moving averages, RSI, and volume analysis into a cohesive technical analysis framework for options trading.',
  duration: 60,
  keyPoints: [
    'Integrate all Week 1 concepts into a complete analysis framework',
    'Understand how multiple indicators work together',
    'Apply technical analysis to real options trading decisions',
    'Identify high-probability setups using confluence',
    'Prepare for Week 2: Options Greeks and Strategies'
  ],
  yourStocks: ['NVDA', 'META', 'GOOG', 'AMZN', 'QQQ', 'PLTR', 'MELI', 'SHOP', 'HOOD', 'RDDT'],
  content: [
    {
      type: 'text',
      title: 'Week 1 Summary',
      content: `This week you learned the foundational technical analysis skills every options trader needs:

**Day 1: Price Action Basics**
- OHLC data and candlestick anatomy
- Bullish patterns: Hammer, Bullish Engulfing, Morning Star
- Bearish patterns: Shooting Star, Bearish Engulfing, Evening Star
- Time frames: Daily for most options, weekly for major trends

**Day 2: Support & Resistance**
- Identifying horizontal levels from price history
- Role reversal: old resistance becomes new support
- Using levels for strike price selection
- Volume confirmation at key levels

**Day 3: Trend Lines**
- Drawing valid trend lines (minimum 2 touches, 3+ confirms)
- Ascending and descending channels
- Breakout and breakdown patterns
- Measured move targets from channel width

**Day 4: Moving Averages**
- SMA vs EMA characteristics
- Key MAs: 20, 50, and 200-day
- Golden Cross and Death Cross signals
- MA alignment for trend strength

**Day 5: RSI Fundamentals**
- Overbought (>70) and Oversold (<30) levels
- Bullish and bearish divergences
- RSI for timing entries
- Context matters: RSI in trends vs. ranges

**Day 6: Volume Analysis**
- Volume confirmation of price moves
- Accumulation and distribution patterns
- Volume spikes and their significance
- Volume at support/resistance levels`
    },
    {
      type: 'text',
      title: 'The Confluence Framework',
      content: `The most powerful trades occur when multiple factors align. This is called "confluence."

**Confluence for Put Credit Spreads:**
Best setup has multiple bullish signals:
- Price at or above rising 50-day MA
- At horizontal support level
- RSI near or below 30-40 (oversold or neutral)
- Volume light on pullback (healthy consolidation)
- Bullish candlestick pattern (hammer, engulfing)
- Uptrend line intact

**Confluence for Call Credit Spreads:**
Best setup has multiple bearish signals:
- Price at or below declining 50-day MA
- At horizontal resistance level
- RSI near or above 60-70 (overbought or neutral)
- Volume light on rally (weak bounce)
- Bearish candlestick pattern (shooting star, engulfing)
- Downtrend line intact

**Confluence for Iron Condors:**
Best setup has range-bound signals:
- Price between clear support and resistance
- RSI in neutral zone (40-60)
- MAs flat or converging (no clear trend)
- Volume normal or below average
- Trading within a channel
- No major divergences`
    },
    {
      type: 'example',
      title: 'Complete Analysis: NVDA',
      content: `Let's perform a full Week 1 analysis on NVDA:

**Step 1: Candlesticks (Day 1)**
- Recent candles show green bodies with higher closes
- Last pullback showed hammer pattern at support
- Body sizes normal, no excessive wicks

**Step 2: Support/Resistance (Day 2)**
- Support: $825 (previous breakout), $800 (round number)
- Resistance: $900 (round number), $950 (recent high)
- Current price: $875

**Step 3: Trend Lines (Day 3)**
- Uptrend line connects lows from 3 months ago
- Currently around $810
- Price is above the trend line

**Step 4: Moving Averages (Day 4)**
- 20 EMA: $860 (price above)
- 50 SMA: $820 (price above)
- 200 SMA: $650 (price well above)
- Alignment: Bullish (price > 20 > 50 > 200)

**Step 5: RSI (Day 5)**
- Current RSI: 58 (neutral, not extreme)
- No divergence present
- Room for upside before overbought

**Step 6: Volume (Day 6)**
- Recent up days: Above average volume
- Recent pullback: Below average volume
- Pattern confirms uptrend

**Conclusion:**
NVDA shows bullish confluence. Best options strategy: Put credit spread with short strike below $810 (below 50 SMA and trend line).`,
      stock: 'NVDA'
    },
    {
      type: 'example',
      title: 'Complete Analysis: QQQ',
      content: `Full Week 1 analysis on QQQ (Nasdaq ETF):

**Price Action (Day 1):**
- Trading in a range for 2 weeks
- Mix of red and green candles with small bodies
- Doji patterns suggest indecision

**Support/Resistance (Day 2):**
- Support: $465 (recent low), $460 (50 SMA)
- Resistance: $490 (recent high), $500 (round number)
- Current price: $478

**Trend Lines (Day 3):**
- Broad ascending channel from 6 months ago
- Currently in the upper half of channel
- No immediate breakout threat

**Moving Averages (Day 4):**
- 20 EMA: $475 (price slightly above)
- 50 SMA: $460 (price above)
- 200 SMA: $420 (price well above)
- Alignment: Bullish but consolidating

**RSI (Day 5):**
- Current RSI: 52 (neutral)
- No divergence
- Neither overbought nor oversold

**Volume (Day 6):**
- Volume below average for past week
- No volume spikes
- Low conviction in either direction

**Conclusion:**
QQQ shows range-bound characteristics. Best options strategy: Iron condor with call spread above $500 and put spread below $455.`,
      stock: 'QQQ'
    },
    {
      type: 'text',
      title: 'Decision Framework',
      content: `Use this framework for every options trade:

**1. Determine the Trend (MAs + Trend Lines)**
- Bullish: Price > 50 MA, rising trend line
- Bearish: Price < 50 MA, declining trend line
- Neutral: Price around flat MAs, in a channel

**2. Find Key Levels (Support/Resistance)**
- Identify 2-3 support levels below price
- Identify 2-3 resistance levels above price
- Note volume and touches at each level

**3. Check Momentum (RSI)**
- Overbought (>70): Wait for pullback or sell calls
- Oversold (<30): Look for bounce, sell puts
- Neutral (40-60): Either direction possible

**4. Confirm with Volume**
- Is volume confirming price direction?
- Any recent spikes to investigate?
- Accumulation or distribution pattern?

**5. Look for Candlestick Confirmation**
- Any reversal patterns at key levels?
- Continuation patterns supporting trend?
- What does today's candle suggest?

**6. Select Strategy**
- Bullish bias: Put credit spreads
- Bearish bias: Call credit spreads
- Neutral bias: Iron condors
- Uncertain: Stay out until clarity`
    },
    {
      type: 'tip',
      title: 'Common Mistakes to Avoid',
      content: `**Mistake 1: Over-relying on One Indicator**
- No single indicator is reliable alone
- Always seek confluence (multiple signals)
- Each indicator has failure modes

**Mistake 2: Fighting the Trend**
- "It's overbought so I'll short" fails in uptrends
- The trend is your friend until it ends
- Wait for actual reversal confirmation

**Mistake 3: Ignoring Higher Time Frames**
- Daily chart bearish but weekly bullish = be careful
- Always check one time frame higher
- Major trend trumps minor patterns

**Mistake 4: Chasing Moves**
- Entering after a big move often leads to losses
- Wait for pullbacks and consolidation
- Patience is essential for options sellers

**Mistake 5: No Defined Exit Plan**
- Know your profit target before entering
- Know when you'll exit for a loss
- Adjust plans as price action changes`
    },
    {
      type: 'warning',
      title: 'What Technical Analysis Cannot Do',
      content: `Technical analysis has real limitations:

**Cannot Predict News Events**
- Earnings surprises override all technicals
- FDA decisions, lawsuits, macro events are unpredictable
- Close or reduce positions before major announcements

**Cannot Guarantee Outcomes**
- Patterns fail regularly (30-40% of the time)
- High probability is not certainty
- Size positions assuming you could be wrong

**Cannot Replace Risk Management**
- Even perfect setups can lose
- Position sizing is more important than entry
- Always use defined-risk strategies (spreads)

**Cannot Work in All Markets**
- Technical analysis struggles in choppy, low-liquidity markets
- Some stocks don't "respect" technical levels
- Stick to liquid stocks with clear patterns

**The Bottom Line:**
Technical analysis improves your odds, it doesn't guarantee success. Use it as a probability tool combined with sound risk management.`
    },
    {
      type: 'text',
      title: 'Building Your Daily Routine',
      content: `Successful options traders develop consistent analysis habits:

**Pre-Market (5-10 minutes per stock):**
1. Check overnight news/gaps
2. Note pre-market price relative to key levels
3. Check if any MAs will be tested today
4. Review upcoming catalysts (earnings dates, etc.)

**During Market:**
1. Watch for volume spikes
2. Note any candlestick patterns forming
3. Monitor positions relative to stop levels
4. Don't overtrade - let setups come to you

**Post-Market (5-10 minutes):**
1. Review the day's close vs. key levels
2. Update your support/resistance levels
3. Check RSI readings
4. Plan for tomorrow's potential trades

**Weekly Review:**
1. Did your levels hold or break?
2. Were your trend assessments correct?
3. What patterns worked or failed?
4. Update your trading journal`
    },
    {
      type: 'example',
      title: 'Quick Scan Template',
      content: `Use this template to analyze any stock:

**Stock: _________ Current Price: _________**

**Trend (circle one):** Uptrend / Downtrend / Sideways

**Key Levels:**
- Resistance 1: _______ Resistance 2: _______
- Support 1: _______ Support 2: _______

**Moving Averages:**
- 20 EMA: _______ (above/below price)
- 50 SMA: _______ (above/below price)
- 200 SMA: _______ (above/below price)

**RSI:** _______ (overbought/neutral/oversold)

**Volume:** Above/Below average | Accumulation/Distribution/Normal

**Today's Candle:** Bullish/Bearish/Indecisive

**Strategy Idea:**
- Trade type: Put spread / Call spread / Iron condor / None
- Short strike(s): _______
- Reasoning: _______

Practice this on your watchlist stocks daily.`
    },
    {
      type: 'text',
      title: 'Looking Ahead: Week 2 Preview',
      content: `Next week we'll dive into options-specific concepts:

**Week 2: Options Greeks and Strategies**

- **Delta**: How much your option moves with the stock
- **Theta**: Time decay - the options seller's edge
- **Vega**: How volatility affects option prices
- **Gamma**: Rate of change of delta

**You'll Learn:**
- Why these Greeks matter for credit spreads
- How to structure iron condors for optimal Greeks
- When high or low IV favors different strategies
- Managing positions using Greeks

**How Week 1 Connects:**
- Technical analysis tells you WHERE to place strikes
- Greeks tell you HOW the trade will behave
- Combined, you'll make better trading decisions

Before next week, practice your Week 1 analysis on all 10 watchlist stocks:
NVDA, META, GOOG, MELI, AMZN, SHOP, PLTR, QQQ, HOOD, RDDT`
    },
    {
      type: 'exercise',
      title: 'Week 1 Capstone Exercise',
      content: `Complete a full analysis on 3 stocks of your choice:

For each stock, document:

**1. Chart Setup**
- Add 20 EMA, 50 SMA, 200 SMA
- Add RSI (14-period)
- Add volume with 20-day MA

**2. Level Identification**
- Mark 2-3 support levels
- Mark 2-3 resistance levels
- Draw any relevant trend lines

**3. Current Assessment**
- Trend: Bullish, Bearish, or Neutral?
- RSI status: Overbought, Oversold, or Neutral?
- Volume pattern: Accumulation, Distribution, or Normal?
- Recent candlestick patterns?

**4. Trade Idea**
- What options strategy fits this analysis?
- Where would you place short strikes?
- What would invalidate your thesis?

Save your analysis. We'll revisit these in Week 3 to see how they played out.`
    }
  ],
  quiz: [
    {
      id: 'w1d7q1',
      question: 'You observe NVDA with: price above all MAs (bullish alignment), RSI at 45, volume below average on a pullback to the 20 EMA, and a hammer candlestick. What options strategy is most appropriate?',
      options: [
        'Call credit spread - bearish setup',
        'Put credit spread - bullish confluence',
        'Iron condor - neutral setup',
        'Buy puts - reversal expected'
      ],
      correctAnswer: 1,
      explanation: 'This is a textbook bullish confluence: price above all MAs (trend is up), RSI neutral (room to run), low volume pullback (healthy consolidation), and hammer candlestick (reversal pattern at support). A put credit spread takes advantage of this bullish setup with defined risk.',
      difficulty: 'medium'
    },
    {
      id: 'w1d7q2',
      question: 'META is at $480, resistance at $500, support at $450, RSI at 52, and has been trading sideways for 3 weeks with below-average volume. The best options strategy is:',
      options: [
        'Put credit spread below $450',
        'Call credit spread above $500',
        'Iron condor with strikes outside both levels',
        'Buy straddle at $480'
      ],
      correctAnswer: 2,
      explanation: 'This is a range-bound setup: price between support and resistance, neutral RSI (52), sideways action for 3 weeks, and low volume. An iron condor profits from this continued range-bound behavior, with put strikes below $450 support and call strikes above $500 resistance.',
      difficulty: 'medium'
    },
    {
      id: 'w1d7q3',
      question: 'GOOG shows: price making higher highs, but RSI making lower highs. The 50-day MA is at $170 and rising. What does this combination suggest?',
      options: [
        'Strong uptrend - sell aggressive put credit spreads',
        'Bearish divergence warning - be cautious with bullish positions',
        'The RSI is broken and should be ignored',
        'Immediately sell call credit spreads'
      ],
      correctAnswer: 1,
      explanation: 'This is a bearish RSI divergence: price making higher highs but RSI making lower highs. This warns that bullish momentum is weakening even though price is rising. The rising 50 MA shows the trend is still up, but caution is warranted. Don\'t be overly aggressive with bullish positions, and watch for trend change confirmation.',
      difficulty: 'hard'
    },
    {
      id: 'w1d7q4',
      question: 'A stock breaks above $100 resistance. Which confirmation signals would make you confident enough to sell a put credit spread with short strike at $95?',
      options: [
        'Low volume on the breakout, RSI at 40',
        'High volume on breakout, follow-through next day, old resistance ($100) holding as support on pullback',
        'RSI at 85 and volume declining',
        'Price gaps above but immediately falls back below $100'
      ],
      correctAnswer: 1,
      explanation: 'A confirmed breakout requires: high volume (institutional participation), follow-through (continuation after initial break), and role reversal (old resistance at $100 now acting as support). This gives you confidence that $100 is now valid support, making a $95 short strike well-protected.',
      difficulty: 'hard'
    },
    {
      id: 'w1d7q5',
      question: 'Which of the following is NOT a valid reason to avoid entering a trade?',
      options: [
        'RSI shows a divergence against your trade direction',
        'Volume is not confirming the price move',
        'The 50-day MA is exactly flat',
        'Major earnings are in 2 days'
      ],
      correctAnswer: 2,
      explanation: 'A flat 50-day MA simply indicates a neutral trend - it\'s not a reason to avoid trading; it just suggests iron condors may be better than directional spreads. However, RSI divergence (momentum weakening), volume not confirming (suspicious move), and upcoming earnings (unpredictable catalyst) are all valid reasons to stay out or reduce position size.',
      difficulty: 'medium'
    },
    {
      id: 'w1d7q6',
      question: 'You want to sell a call credit spread on SHOP. The stock is at $80, 50-day MA is at $78, and resistance is at $88. RSI is at 72. Where should you place your short strike?',
      options: [
        'At $80, the current price',
        'At $82, slightly above current price',
        'At $90 or higher, above resistance with RSI buffer',
        'At $78, at the 50-day MA'
      ],
      correctAnswer: 2,
      explanation: 'For a call credit spread, place the short strike above resistance. Even though RSI is overbought (72), strong trends can stay overbought. Place the short strike at $90 or above, beyond the $88 resistance level. This gives price room to test resistance without threatening your position. Never place short call strikes at or below resistance.',
      difficulty: 'medium'
    },
    {
      id: 'w1d7q7',
      question: 'A stock\'s daily chart shows a bearish trend, but the weekly chart shows a strong uptrend with price above the 200-week MA. Which interpretation is correct?',
      options: [
        'The daily bearish trend trumps the weekly - sell calls',
        'The daily may be a pullback within the larger weekly uptrend',
        'Weekly and daily charts are unrelated',
        'Ignore both and look at the monthly chart'
      ],
      correctAnswer: 1,
      explanation: 'Higher time frames provide context for lower time frames. A bearish daily trend within a bullish weekly trend often indicates a pullback or consolidation rather than a trend reversal. The major trend (weekly uptrend) usually resumes. This is why checking multiple time frames is essential before committing to a directional trade.',
      difficulty: 'hard'
    },
    {
      id: 'w1d7q8',
      question: 'Which combination of signals creates the STRONGEST confluence for a put credit spread?',
      options: [
        'RSI at 80, price at resistance, bearish engulfing pattern',
        'RSI at 35, price at horizontal support and 50 MA, hammer candle, low volume pullback',
        'Price in the middle of a range, RSI at 50, average volume',
        'Price below all MAs, RSI at 40, high volume selling'
      ],
      correctAnswer: 1,
      explanation: 'Option B has 5+ bullish signals: oversold RSI (35), double support (horizontal + 50 MA), bullish candlestick (hammer), and light selling pressure (low volume pullback). This confluence of multiple bullish factors creates a high-probability put credit spread setup. Option A is bearish (not for put spreads), C is neutral, and D is bearish.',
      difficulty: 'hard'
    },
    {
      id: 'w1d7q9',
      question: 'You sold a put credit spread on a stock at $100. The stock drops to test the $95 support level you identified. Volume on this test is 3x average with a long lower wick candle. What does this suggest?',
      options: [
        'The support is failing - close the trade',
        'High volume rejection with lower wick suggests strong buying - support likely holds',
        'Volume doesn\'t matter at support levels',
        'Convert to an iron condor'
      ],
      correctAnswer: 1,
      explanation: 'High volume with a long lower wick at support is a bullish signal. The high volume shows intense activity, and the lower wick shows buyers stepped in to reject lower prices. This is often a capitulation or shakeout pattern that marks a local bottom. The support is likely to hold, which is good for your put credit spread.',
      difficulty: 'hard'
    },
    {
      id: 'w1d7q10',
      question: 'What is the primary purpose of using technical analysis as an options seller?',
      options: [
        'To predict exactly where price will go',
        'To identify high-probability zones for strike placement and improve trade timing',
        'To eliminate all risk from trading',
        'To replace fundamental analysis completely'
      ],
      correctAnswer: 1,
      explanation: 'Technical analysis for options sellers is about probabilities, not predictions. Its purpose is to identify high-probability support/resistance zones for strike selection and improve entry timing to maximize the probability of keeping the premium. It cannot predict exact prices or eliminate risk - it simply improves your odds when combined with proper position sizing and risk management.',
      difficulty: 'easy'
    }
  ]
}

export default lesson
