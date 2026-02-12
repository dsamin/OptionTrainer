import type { LessonContent } from '../index'

export const day16: LessonContent = {
  day: 16,
  week: 3,
  title: 'Credit Spread Entry Timing',
  description:
    'Learn to combine technical analysis with options entries for higher-probability credit spreads. Master support/resistance-based entries and RSI timing rules.',
  duration: 50,
  keyPoints: [
    'Technical analysis identifies WHERE to place strikes; options knowledge tells you HOW',
    'Enter put credit spreads at support, call credit spreads at resistance',
    'RSI extremes improve entry timing and probability',
    'Combine multiple technical signals for highest conviction entries',
    'Failed support/resistance becomes your stop-loss signal',
  ],
  yourStocks: ['NVDA', 'META', 'GOOG', 'PLTR', 'SHOP', 'QQQ'],
  content: [
    {
      type: 'text',
      title: 'Integrating Technical Analysis with Credit Spreads',
      content: `In Week 1, you learned technical analysis - support, resistance, RSI, moving averages. In Week 2, you mastered the Greeks - delta, theta, vega. Now we combine them into a unified entry strategy.

**The Core Principle:**
Technical analysis tells you WHERE price is likely to stop or reverse. Options Greeks tell you how to structure a profitable trade around that level.

**Credit Spread Direction Rules:**
- **Sell PUT credit spreads** when you expect price to stay ABOVE a level (bullish/neutral bias)
- **Sell CALL credit spreads** when you expect price to stay BELOW a level (bearish/neutral bias)

**The Perfect Setup:**
The ideal credit spread entry occurs when:
1. Price approaches a strong technical level (support or resistance)
2. RSI confirms oversold/overbought condition
3. Implied volatility is elevated (bigger premium to collect)
4. You have enough DTE for theta to work (30-45 days)

When all four align, you have a high-probability entry.`,
    },
    {
      type: 'text',
      title: 'Entry at Support: Put Credit Spreads',
      content: `When price approaches a strong support level, it's an opportunity to sell put credit spreads. Your thesis: price will bounce off support, and your short put below support will expire worthless.

**Identifying Strong Support:**
- Multiple touches in the past (at least 2-3)
- Round numbers ($100, $150, $200)
- Previous breakout levels
- 50-day or 200-day moving averages
- High volume nodes on volume profile

**Entry Criteria Checklist:**
1. Price within 3-5% of identified support
2. RSI below 40 (approaching oversold)
3. IV rank above 30 (decent premium available)
4. Short strike at or below the support level
5. At least 30 DTE

**Strike Selection:**
- Short strike: AT or just BELOW the support level
- Target delta: 20-25 on the short strike
- Wing width: Based on stock price and your risk tolerance

The support level becomes your "line in the sand" - if it breaks, you know immediately that your trade thesis is wrong.`,
    },
    {
      type: 'example',
      title: 'Put Credit Spread Entry on NVDA Support',
      stock: 'NVDA',
      content: `NVDA Technical Setup:
- Current price: $750
- Strong support at $700 (tested 3 times in past 2 months)
- 50-day MA at $710 (additional support)
- RSI: 38 (approaching oversold)
- IV Rank: 45 (above average premium)

**Trade Entry:**
- Sell NVDA 700/690 put spread
- 35 DTE
- Short 700 put delta: 22
- Credit received: $2.40
- Max profit: $2.40
- Max loss: $7.60

**Why This Works:**
- Short strike right at support ($700)
- Support has proven strong (3 touches)
- RSI suggests selling pressure exhausting
- Good premium due to elevated IV
- Clear invalidation: if $700 breaks, exit

**Exit Rules:**
- Close at 50% profit ($1.20 gain)
- Close if NVDA closes below $695 (support broken)
- Close at 21 DTE regardless`,
    },
    {
      type: 'text',
      title: 'Entry at Resistance: Call Credit Spreads',
      content: `When price approaches strong resistance, it's time to sell call credit spreads. Your thesis: price will reverse at resistance, and your short call above resistance will expire worthless.

**Identifying Strong Resistance:**
- Previous all-time highs
- Multiple failed breakout attempts
- Round numbers ($500, $1000)
- Upper Bollinger Band touches
- Previous support (now flipped to resistance)

**Entry Criteria Checklist:**
1. Price within 3-5% of identified resistance
2. RSI above 60 (approaching overbought)
3. IV rank above 30
4. Short strike at or above the resistance level
5. At least 30 DTE

**Strike Selection:**
- Short strike: AT or just ABOVE the resistance level
- Target delta: 20-25 on the short strike
- Wing width: Based on stock price

Resistance levels are often more fragile than support. Stocks can break out to new highs more easily than they can break down to new lows. Be ready to adjust call credit spreads faster than put credit spreads.`,
    },
    {
      type: 'example',
      title: 'Call Credit Spread Entry on META Resistance',
      stock: 'META',
      content: `META Technical Setup:
- Current price: $580
- Strong resistance at $600 (all-time high area)
- Failed breakout attempt 2 weeks ago
- RSI: 68 (overbought territory)
- IV Rank: 52 (elevated, good premium)

**Trade Entry:**
- Sell META 605/615 call spread
- 32 DTE
- Short 605 call delta: 24
- Credit received: $2.80
- Max profit: $2.80
- Max loss: $7.20

**Why This Works:**
- Short strike just above resistance ($605)
- Previous failed breakout shows sellers present
- RSI overbought suggests rally exhaustion
- Elevated IV provides good credit
- Clear invalidation: sustained close above $605

**Management:**
- Close at 50% profit ($1.40 gain)
- Close if META closes above $610 for 2 days (breakout confirmed)
- Close at 21 DTE regardless

**Warning:** If META breaks $600 with volume, don't fight it. All-time highs can extend further than you expect.`,
    },
    {
      type: 'text',
      title: 'RSI-Based Entry Rules',
      content: `RSI is your timing indicator. While support/resistance tells you WHERE to trade, RSI tells you WHEN.

**RSI Rules for Put Credit Spreads (Bullish):**
- RSI below 30: Strong buy signal - aggressive entry
- RSI 30-40: Good entry zone - standard position size
- RSI 40-50: Neutral - wait for better setup
- RSI above 50: Not ideal for bullish spreads unless at major support

**RSI Rules for Call Credit Spreads (Bearish):**
- RSI above 70: Strong sell signal - aggressive entry
- RSI 60-70: Good entry zone - standard position size
- RSI 50-60: Neutral - wait for better setup
- RSI below 50: Not ideal for bearish spreads unless at major resistance

**RSI Divergence Entries:**
The most powerful RSI signals are divergences:
- **Bullish divergence**: Price makes lower low, RSI makes higher low
  - Enter put credit spread at support
  - Very high probability setup
- **Bearish divergence**: Price makes higher high, RSI makes lower high
  - Enter call credit spread at resistance
  - High probability but can take time to play out

**Time Frame Consideration:**
- Use daily RSI for swing trades (30-45 DTE spreads)
- Use weekly RSI for confirmation
- Avoid fighting the weekly RSI trend`,
    },
    {
      type: 'example',
      title: 'RSI Divergence Trade on PLTR',
      stock: 'PLTR',
      content: `PLTR Setup with Bullish RSI Divergence:
- PLTR pulls back to $22 (support level)
- First low: $22.50, RSI at 28
- Second low: $22.00, RSI at 35 (HIGHER - divergence!)
- Current RSI: 32
- IV Rank: 48

**Divergence Analysis:**
Price made a lower low ($22 vs $22.50), but RSI made a higher low (35 vs 28). This bullish divergence suggests selling pressure is weakening and a bounce is likely.

**Trade Entry:**
- Sell PLTR 21/19 put spread
- 38 DTE
- Short 21 put delta: 28
- Credit: $0.55
- Max loss: $1.45

**This Setup Is High Probability Because:**
1. Strong support at $22 (multiple tests)
2. Bullish RSI divergence (momentum improving)
3. Short strike BELOW support (extra cushion)
4. Elevated IV (good premium)

**Expected Outcome:**
PLTR bounces off $22 support, confirming the divergence. Put credit spread decays as price moves higher. Close at 50% profit.`,
    },
    {
      type: 'tip',
      title: 'The Multiple Signal Approach',
      content: `Never enter on a single signal. Stack multiple confirmations:

**For Put Credit Spreads, look for:**
- Price at support (primary)
- RSI oversold or showing bullish divergence
- MACD about to cross up
- Volume declining on the pullback
- VIX elevated (fear = premium)

**For Call Credit Spreads, look for:**
- Price at resistance (primary)
- RSI overbought or showing bearish divergence
- MACD rolling over
- Volume declining on the rally
- Stock extended above 20-day MA

**Scoring System:**
Give each signal a point. Only enter when you have 3+ points.

Example scoring for SHOP put credit spread:
- At support: +1
- RSI at 35: +1
- Bullish divergence: +1
- MACD crossing up: +1
- Volume declining on drop: +1
Total: 5/5 - High conviction entry!`,
    },
    {
      type: 'warning',
      title: 'When NOT to Enter',
      content: `Some setups look good but should be avoided:

**Avoid Entry When:**
1. **Earnings within your DTE window** - Binary event can blow through any support/resistance
2. **Support/resistance has already broken** - Don't try to catch a falling knife
3. **RSI in neutral territory (40-60)** - No edge, just gambling
4. **IV Rank below 20** - Not enough premium to compensate for risk
5. **Stock trending strongly against your direction** - Wait for consolidation

**Trend Override:**
If the weekly chart shows a strong downtrend:
- Put credit spreads at "support" often fail
- Support levels break more easily
- Wait for trend change or use call spreads instead

If the weekly chart shows a strong uptrend:
- Call credit spreads at "resistance" often fail
- Resistance breaks more easily
- Stick with put credit spreads on pullbacks`,
    },
    {
      type: 'exercise',
      title: 'Practice: Analyze This Setup',
      content: `GOOG Current Situation:
- Price: $175
- 20-day MA: $170
- 50-day MA: $168
- Support level: $165 (tested twice last month)
- RSI: 42
- IV Rank: 38
- Earnings: In 45 days

Would you enter a put credit spread at the $162.50/$157.50 strikes with 35 DTE?

**Analysis:**
- Price NOT at support yet ($175 vs $165 support)
- RSI in neutral zone (42 - no edge)
- IV rank decent but not great
- Earnings outside DTE window (good)

**Verdict: WAIT**
The setup is not ready. Wait for:
1. GOOG to pull back closer to $165 support
2. RSI to drop below 40 (ideally 35 or lower)
3. Then enter the put credit spread

Patience separates profitable traders from gamblers.`,
    },
  ],
  quiz: [
    {
      id: 'w3d16q1',
      question:
        'Price is at a strong support level and RSI is at 32. What credit spread should you consider?',
      options: [
        'Call credit spread above resistance',
        'Put credit spread below support',
        'Iron condor around the current price',
        'No trade - wait for RSI to go lower',
      ],
      correctAnswer: 1,
      explanation:
        'At support with oversold RSI, you expect price to bounce. Sell a put credit spread with your short strike at or below the support level. Your thesis is that support will hold and the puts will expire worthless.',
      difficulty: 'easy',
    },
    {
      id: 'w3d16q2',
      question:
        'SHOP is at resistance ($95) with RSI at 72. Which setup is most appropriate?',
      options: [
        'Sell 90/85 put spread',
        'Sell 100/105 call spread',
        'Buy 100 calls',
        'Sell 95/90 put spread',
      ],
      correctAnswer: 1,
      explanation:
        'At resistance with overbought RSI, you expect price to reverse or stall. Sell a call credit spread with the short strike above resistance ($100). If resistance holds, the calls expire worthless.',
      difficulty: 'medium',
    },
    {
      id: 'w3d16q3',
      question:
        'What is a bullish RSI divergence?',
      options: [
        'RSI and price both making higher highs',
        'Price makes lower low, RSI makes higher low',
        'RSI above 70 for multiple days',
        'Price makes higher high, RSI makes lower high',
      ],
      correctAnswer: 1,
      explanation:
        'Bullish divergence occurs when price makes a lower low but RSI makes a higher low. This indicates selling pressure is weakening and suggests an impending bounce - ideal for put credit spreads at support.',
      difficulty: 'medium',
    },
    {
      id: 'w3d16q4',
      question:
        'Which scenario should you AVOID for a put credit spread entry?',
      options: [
        'RSI at 28 with price at support',
        'IV Rank at 55 with bullish divergence',
        'Strong weekly downtrend with RSI at 45',
        'Price bouncing off 50-day moving average',
      ],
      correctAnswer: 2,
      explanation:
        'A strong weekly downtrend with RSI in neutral territory (45) means support levels are likely to break. The trend is against you and there is no oversold condition for a bounce. Wait for trend change or use call spreads instead.',
      difficulty: 'hard',
    },
    {
      id: 'w3d16q5',
      question:
        'You want to sell a put credit spread on META. RSI is 38, price is 5% above support, and IV Rank is 42. What should you do?',
      options: [
        'Enter immediately - all signals are positive',
        'Wait for price to move closer to support before entering',
        'Enter with double position size due to high conviction',
        'Use a call credit spread instead',
      ],
      correctAnswer: 1,
      explanation:
        'While RSI is in a decent zone (38) and IV is acceptable, price is 5% above support. Wait for price to pull back closer to the support level. Entering too far from support means your short strike will be too far OTM, reducing premium, or too close to current price, increasing risk.',
      difficulty: 'hard',
    },
  ],
}
