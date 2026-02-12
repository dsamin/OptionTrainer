// Week 1, Day 5: RSI Fundamentals
// Understanding RSI for options timing and entry optimization

import { LessonContent } from './day1'

export const lesson: LessonContent = {
  day: 5,
  week: 1,
  title: 'RSI Fundamentals',
  description: 'Master the Relative Strength Index (RSI) to identify overbought and oversold conditions, spot divergences, and time your options entries more effectively.',
  duration: 45,
  keyPoints: [
    'Understand how RSI is calculated and what it measures',
    'Identify overbought (>70) and oversold (<30) conditions',
    'Recognize bullish and bearish RSI divergences',
    'Use RSI for timing credit spread entries',
    'Avoid common RSI mistakes in trending markets'
  ],
  yourStocks: ['NVDA', 'META', 'RDDT', 'SHOP', 'QQQ'],
  content: [
    {
      type: 'text',
      title: 'What is RSI?',
      content: `The Relative Strength Index (RSI) is a momentum oscillator that measures the speed and magnitude of recent price changes.

**The Basics:**
- RSI ranges from 0 to 100
- Developed by J. Welles Wilder in 1978
- Standard setting: 14 periods (days on daily chart)
- Measures the ratio of average gains to average losses

**The Formula (Simplified):**
RSI = 100 - (100 / (1 + RS))
Where RS = Average Gain / Average Loss over 14 periods

**What RSI Tells You:**
- High RSI (>70): Buying has been aggressive - potentially overbought
- Low RSI (<30): Selling has been aggressive - potentially oversold
- Middle RSI (40-60): Balanced momentum, no extreme

**For Options Traders:**
RSI helps time entries and identify potential reversal points for credit spreads.`
    },
    {
      type: 'text',
      title: 'Overbought and Oversold Levels',
      content: `**Overbought (RSI > 70):**
- Price has risen rapidly relative to recent history
- Suggests potential for pause, pullback, or reversal
- NOT a sell signal by itself - trends can stay overbought

**Oversold (RSI < 30):**
- Price has fallen rapidly relative to recent history
- Suggests potential for bounce or reversal
- NOT a buy signal by itself - trends can stay oversold

**The Common Mistake:**
Many traders sell when RSI hits 70 and buy when RSI hits 30. This fails in trending markets where RSI can stay extreme for extended periods.

**Better Interpretation:**
- Overbought in uptrend: Normal, expect minor pullback
- Overbought in downtrend: Potential trend reversal
- Oversold in downtrend: Normal, expect minor bounce
- Oversold in uptrend: Potential buying opportunity`
    },
    {
      type: 'example',
      title: 'RSI Extremes on NVDA',
      content: `NVDA rallies strongly, RSI reaches 82:

**The Situation:**
- NVDA is in a strong uptrend
- Just broke to new all-time highs
- RSI hits 82 (overbought)

**What NOT to Do:**
- Don't short NVDA just because RSI is 82
- Don't sell calls immediately
- Trend-following stocks can stay overbought

**What to Do Instead:**
- Recognize that a pullback is possible but not guaranteed
- If selling puts, wait for RSI to cool off (pull back to 50-60)
- If already in puts, consider taking profits into strength
- For iron condors, widen your call side strikes

**Practical Application:**
RSI at 82 = Wait for pullback before selling put spreads
When RSI returns to 50-55 after pullback = Better entry for put credit spread`,
      stock: 'NVDA'
    },
    {
      type: 'text',
      title: 'RSI Divergences',
      content: `Divergences occur when price and RSI move in opposite directions. They often precede reversals.

**Bullish Divergence:**
- Price makes a LOWER low
- RSI makes a HIGHER low
- Signal: Selling momentum is weakening
- Implication: Potential bottom forming

**Bearish Divergence:**
- Price makes a HIGHER high
- RSI makes a LOWER high
- Signal: Buying momentum is weakening
- Implication: Potential top forming

**Why Divergences Work:**
They show that while price is moving in one direction, the momentum behind that move is fading. It's like a car going uphill but losing engine power.

**Important Notes:**
- Divergences can persist for a while before price reverses
- Not all divergences lead to reversals
- Use divergences as warnings, not standalone signals`
    },
    {
      type: 'example',
      title: 'Bullish Divergence on META',
      content: `META shows a bullish RSI divergence at a support level:

**The Pattern:**
- First low: META drops to $450, RSI at 28
- Bounce to $475
- Second low: META drops to $445, RSI at 35

**Analysis:**
- Price made a lower low ($445 vs $450)
- RSI made a higher low (35 vs 28)
- This is a bullish divergence!

**Interpretation:**
Even though price dropped lower, selling pressure decreased (higher RSI low). Sellers are exhausted.

**Options Trade:**
This is an excellent setup for a put credit spread:
- Sell $440 put / Buy $435 put
- The divergence suggests downside is limited
- Entry after the second low is confirmed (price starts rising)
- Stop if price breaks below $440 with RSI making new lows`,
      stock: 'META'
    },
    {
      type: 'example',
      title: 'Bearish Divergence on RDDT',
      content: `RDDT shows a bearish RSI divergence at resistance:

**The Pattern:**
- First high: RDDT hits $180, RSI at 75
- Pullback to $165
- Second high: RDDT hits $185, RSI at 68

**Analysis:**
- Price made a higher high ($185 vs $180)
- RSI made a lower high (68 vs 75)
- This is a bearish divergence!

**Interpretation:**
Price pushed higher but with less momentum. Buyers are running out of steam.

**Options Trade:**
This supports a call credit spread:
- Sell $190 call / Buy $195 call
- The divergence suggests upside is limited
- Entry after the second high is confirmed (price starts falling)
- The $185 high becomes your reference for the divergence failure`,
      stock: 'RDDT'
    },
    {
      type: 'warning',
      title: 'RSI Mistakes to Avoid',
      content: `**Mistake #1: Trading Overbought/Oversold in Trends**
- Strong trends can stay overbought/oversold for weeks
- NVDA at RSI 75 in an uptrend may go to RSI 85 before pulling back
- Solution: Only fade extremes when trend is unclear or at major S/R

**Mistake #2: Ignoring Time Frame**
- Daily RSI overbought doesn't mean weekly RSI is
- Trade the time frame that matches your option's expiration
- 30 DTE options = daily RSI. 90 DTE = consider weekly.

**Mistake #3: Acting on Divergence Too Early**
- Divergences can persist for many bars
- Wait for price confirmation (trend line break, candlestick pattern)
- Divergence + confirmation = trade

**Mistake #4: Using RSI Alone**
- RSI is one tool, not a complete system
- Combine with support/resistance, trend analysis, and volume
- RSI confirms other signals; rarely use it as standalone`
    },
    {
      type: 'text',
      title: 'RSI for Options Timing',
      content: `Here's how to use RSI specifically for options trading:

**Timing Put Credit Spreads:**
- Wait for RSI pullback to 40-50 in uptrends (not at extremes)
- Enter after RSI shows oversold bounce (rising from <35)
- Avoid entry when RSI is already >70 (wait for pullback)

**Timing Call Credit Spreads:**
- Wait for RSI rally to 55-65 in downtrends
- Enter after RSI shows overbought rejection (falling from >70)
- Avoid entry when RSI is already <30 (wait for bounce)

**Timing Iron Condors:**
- Best when RSI is 40-60 (balanced, no extreme)
- Avoid when RSI is showing divergence (potential reversal)
- Enter after extreme RSI has normalized (post-move stabilization)

**RSI and Premium:**
- Extreme RSI often coincides with high IV (fear or greed)
- This means better premium for credit spreads
- But also means higher risk - balance R/R carefully`
    },
    {
      type: 'example',
      title: 'RSI Entry Timing on SHOP',
      content: `Using RSI to time a put credit spread on SHOP:

**Starting Situation:**
- SHOP in overall uptrend (above 50 and 200 MA)
- RSI ran up to 78 on a big rally
- You want to sell puts but RSI is too high

**The Wait:**
- Day 1-3: RSI starts declining as price consolidates
- Day 4: SHOP pulls back, RSI drops to 52
- Day 5: RSI shows uptick from 48 to 53

**The Entry:**
- RSI now at neutral level (52)
- Price pulled back to 20 EMA
- Uptrend still intact
- Now sell your put credit spread!

**Why This Works:**
- You avoided selling puts at the RSI extreme (78)
- The pullback gave you a better entry price
- RSI confirming momentum returning (uptick from 48)
- Much better risk/reward than chasing the top`,
      stock: 'SHOP'
    },
    {
      type: 'tip',
      title: 'RSI Settings for Options',
      content: `**Standard RSI (14-period):**
- Best for: Most situations, 30-45 DTE options
- Pros: Smooth, fewer false signals
- Cons: Slower to react

**Fast RSI (7-period):**
- Best for: Short-term options (0-14 DTE)
- Pros: Earlier signals, more responsive
- Cons: More noise, more false signals

**Slow RSI (21-period):**
- Best for: Longer-term options (60+ DTE)
- Pros: Very smooth, high-quality signals
- Cons: Late signals, may miss turns

**My Recommendation:**
- Use 14-period RSI as your default
- Check 7-period for additional confirmation on short-term trades
- Don't over-optimize - the standard works well for most traders`
    },
    {
      type: 'text',
      title: 'RSI and Support/Resistance',
      content: `RSI becomes more powerful when combined with price levels:

**RSI + Support:**
- RSI oversold AT a support level = high probability bounce
- This is a "confluence" signal - multiple factors align
- Great setup for put credit spreads

**RSI + Resistance:**
- RSI overbought AT a resistance level = high probability rejection
- Another confluence signal
- Great setup for call credit spreads

**RSI + Moving Average:**
- RSI oversold + price at 50 MA = strong support
- RSI overbought + price at declining 50 MA = strong resistance

**The More Confluence, The Better:**
RSI oversold + horizontal support + 50 MA = excellent put credit spread opportunity
RSI overbought + horizontal resistance + 200 MA = excellent call credit spread opportunity`
    },
    {
      type: 'example',
      title: 'RSI Confluence Trade on QQQ',
      content: `QQQ presents a confluence opportunity:

**The Setup:**
- QQQ pulled back from $490 to $472
- $470 is horizontal support (previous breakout level)
- 50-day MA is at $468
- RSI dropped to 32 (nearly oversold)

**Confluence Checklist:**
- Near horizontal support ($470)
- Near 50-day MA ($468)
- RSI approaching oversold (32)
- Overall trend is still up (above 200 MA at $420)

**The Trade:**
- Sell $465 put / Buy $460 put
- Short strike below both the horizontal support AND 50 MA
- RSI at 32 suggests selling pressure is peaking
- Wait for RSI to tick up from 32 as confirmation

**Exit Plan:**
- Target: 50% of max profit
- Stop: If RSI breaks below 25 AND price breaks $465
- Time: Close by 14 DTE regardless`,
      stock: 'QQQ'
    },
    {
      type: 'exercise',
      title: 'Practice: RSI Analysis',
      content: `Open your charts and add the 14-period RSI indicator:

**1. NVDA**
- What is the current RSI reading?
- Is it overbought, oversold, or neutral?
- Would you sell puts, calls, or both (iron condor)?

**2. META**
- Look for any recent RSI divergences
- Did price follow through on the divergence signal?
- How would you have traded it with options?

**3. SHOP**
- Find the last time RSI was below 35
- What happened to the stock price afterward?
- Where would you have placed a put credit spread strike?

Record your observations and track what happens over the next week.`
    }
  ],
  quiz: [
    {
      id: 'w1d5q1',
      question: 'What does an RSI reading of 75 typically indicate?',
      options: [
        'The stock is a strong buy',
        'The stock may be overbought and due for a pullback',
        'The stock will definitely drop tomorrow',
        'RSI is broken and should be recalculated'
      ],
      correctAnswer: 1,
      explanation: 'An RSI above 70 indicates the stock is potentially overbought - meaning buying has been aggressive recently and the stock may be due for a pullback. However, this is not a guarantee; strong trends can maintain overbought RSI readings for extended periods.',
      difficulty: 'easy'
    },
    {
      id: 'w1d5q2',
      question: 'A bullish RSI divergence occurs when:',
      options: [
        'Price makes a higher high while RSI makes a higher high',
        'Price makes a lower low while RSI makes a higher low',
        'Price makes a higher high while RSI makes a lower high',
        'Both price and RSI are below their 50 levels'
      ],
      correctAnswer: 1,
      explanation: 'A bullish divergence occurs when price makes a lower low (suggesting continued weakness) but RSI makes a higher low (showing reduced selling momentum). This divergence suggests sellers are exhausted and a potential bottom is forming.',
      difficulty: 'medium'
    },
    {
      id: 'w1d5q3',
      question: 'NVDA is in a strong uptrend and RSI just hit 80. What is the best approach for selling a put credit spread?',
      options: [
        'Sell the put credit spread immediately - strong momentum',
        'Wait for RSI to pull back to 50-60 before entering',
        'Don\'t sell puts when RSI is above 70',
        'Switch to selling call credit spreads instead'
      ],
      correctAnswer: 1,
      explanation: 'In an uptrend, an RSI of 80 suggests the stock is extended and may pull back. The best approach is to wait for RSI to cool off to the 50-60 range before selling put credit spreads. This gives you a better entry after a pullback rather than chasing the extreme.',
      difficulty: 'medium'
    },
    {
      id: 'w1d5q4',
      question: 'You observe that SHOP has: RSI at 28, price touching the 50-day moving average, and horizontal support at this level. This represents:',
      options: [
        'A signal to sell the stock immediately',
        'A confluence of factors suggesting potential bounce - good for put credit spreads',
        'A sign the uptrend has ended',
        'An indication that RSI is malfunctioning'
      ],
      correctAnswer: 1,
      explanation: 'This is a confluence setup - multiple technical factors (oversold RSI, 50-day MA support, and horizontal support) all aligning at the same price level. Confluence setups have higher probability because multiple factors support the same directional bias. This would be an excellent opportunity for a put credit spread.',
      difficulty: 'hard'
    },
    {
      id: 'w1d5q5',
      question: 'What is the primary danger of trading RSI overbought/oversold signals in a strong trending market?',
      options: [
        'RSI signals are always accurate in trends',
        'Trends can stay overbought or oversold for extended periods, leading to losses',
        'RSI stops working when trends are strong',
        'You need to use a 7-period RSI instead'
      ],
      correctAnswer: 1,
      explanation: 'In strong trends, RSI can remain overbought or oversold for extended periods as momentum persists. Fading these extremes (selling when overbought, buying when oversold) in trending markets often leads to losses because the trend continues despite the extreme reading. This is why RSI works best with trend context and confluence factors.',
      difficulty: 'medium'
    }
  ]
}

export default lesson
