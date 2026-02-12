import type { LessonContent } from '../index'

export const day21: LessonContent = {
  day: 21,
  week: 3,
  title: 'Final Assessment',
  description:
    'Comprehensive review of the entire 3-week curriculum covering technical analysis, options Greeks, and advanced strategies. Test your knowledge with a final assessment covering all key concepts.',
  duration: 60,
  keyPoints: [
    'Technical analysis provides the WHERE and WHEN of trade entries',
    'Greeks determine the HOW - proper structure and risk management',
    'Position sizing protects your account from catastrophic loss',
    'A written trading plan removes emotion and creates consistency',
    'Continuous learning and adaptation separate successful traders from the rest',
  ],
  yourStocks: ['NVDA', 'META', 'GOOG', 'QQQ', 'AMZN', 'SHOP', 'PLTR', 'MELI', 'HOOD', 'RDDT'],
  content: [
    {
      type: 'text',
      title: 'Course Summary: The Complete Framework',
      content: `Congratulations on completing the 3-week options trading curriculum. Let's review how all the pieces fit together.

**Week 1: Technical Analysis Foundation**
You learned to read price charts and identify key levels:
- Support and resistance define your strike placement
- RSI identifies overbought/oversold conditions for timing
- Moving averages reveal trend direction
- Volume confirms price moves
- Trend lines guide directional bias

**Week 2: Options Greeks Mastery**
You mastered the mechanics of options pricing:
- Delta measures probability and directional exposure
- Theta is your primary profit driver as a premium seller
- Vega exposes you to volatility changes
- DTE selection balances theta decay with gamma risk
- Probability of profit helps select appropriate strike prices

**Week 3: Advanced Strategy Execution**
You learned to put it all together:
- Iron condor optimization for range-bound markets
- Credit spread timing using TA + Greeks
- Assignment management when trades go wrong
- Rolling techniques to extend and improve positions
- Position sizing to survive and thrive
- Trading plan to ensure consistent execution

**The Complete Trade Process:**
1. Scan for technical setups (Week 1 skills)
2. Verify IV and Greeks support the trade (Week 2 skills)
3. Size and execute with proper risk management (Week 3 skills)
4. Manage according to your written plan (Week 3 skills)
5. Review and improve (ongoing)`,
    },
    {
      type: 'text',
      title: 'Week 1 Review: Technical Analysis',
      content: `**Key Concepts to Remember:**

**Support and Resistance:**
- Support: Price level where buying interest stops declines
- Resistance: Price level where selling interest stops advances
- These levels guide your strike selection for credit spreads
- Failed support becomes resistance (and vice versa)

**RSI (Relative Strength Index):**
- Below 30: Oversold - potential bounce
- Above 70: Overbought - potential pullback
- Divergences are powerful signals
- Use for timing credit spread entries

**Moving Averages:**
- 20 MA: Short-term trend
- 50 MA: Intermediate trend
- 200 MA: Long-term trend
- Price above MAs = bullish; below = bearish
- MAs act as dynamic support/resistance

**Volume:**
- Volume confirms price moves
- High volume breakouts are more reliable
- Declining volume in trends warns of exhaustion
- Volume spikes at key levels are significant

**Application to Options:**
- Sell put credit spreads at support when RSI is oversold
- Sell call credit spreads at resistance when RSI is overbought
- Iron condors work best in consolidating markets (price between MAs)`,
    },
    {
      type: 'text',
      title: 'Week 2 Review: Options Greeks',
      content: `**Key Concepts to Remember:**

**Delta:**
- Measures probability of expiring ITM (roughly)
- Also measures directional exposure
- For credit spreads: Target 15-25 delta on short strike
- Higher delta = more premium but higher risk

**Theta:**
- Time decay - your profit engine
- Accelerates as expiration approaches
- Maximum theta at 45-21 DTE for premium sellers
- Theta is highest for ATM options

**Vega:**
- Sensitivity to implied volatility changes
- Short options benefit from IV decrease
- Sell premium when IV is high (IV Rank > 30%)
- IV crush after earnings benefits premium sellers

**Gamma:**
- Rate of change of delta
- Increases rapidly near expiration
- Danger zone: <14 DTE for premium sellers
- Why we close positions early

**DTE Selection:**
- 30-45 DTE: Optimal for premium selling
- Sweet spot balances theta decay with gamma risk
- Close or roll by 21 DTE
- Never hold through final week

**Probability of Profit:**
- 1 - Short Strike Delta = approximate POP
- Target 65-80% POP for credit spreads
- Higher POP = lower premium (trade-off)`,
    },
    {
      type: 'text',
      title: 'Week 3 Review: Advanced Strategies',
      content: `**Key Concepts to Remember:**

**Iron Condor Optimization:**
- Wing width determines risk/reward profile
- Adjust when short delta exceeds 30-35
- Close at 50% profit or 21 DTE
- Never let one side blow through your strike

**Credit Spread Entry Timing:**
- Combine TA levels with options mechanics
- Enter put spreads at support, RSI oversold
- Enter call spreads at resistance, RSI overbought
- Multiple confirmations increase success rate

**Managing Assignments:**
- Assignment is manageable, not catastrophic
- Roll to avoid when possible (for credit)
- If assigned, sell covered calls to reduce cost basis
- Only sell puts on stocks you would own

**Rolling Strategies:**
- Roll for credit whenever possible
- Roll down and out for puts, up and out for calls
- Maximum 2-3 rolls per position
- If thesis breaks, close don't roll

**Position Sizing:**
- 2% max risk per trade
- 15% max buying power per underlying
- 40% max sector concentration
- Reduce size in high VIX environment

**Trading Plan:**
- Pre-trade checklist prevents bad entries
- Entry/exit rules remove emotion
- Risk rules are non-negotiable
- Review process enables improvement`,
    },
    {
      type: 'example',
      title: 'Putting It All Together: Complete Trade Example',
      stock: 'NVDA',
      content: `**Step 1: Technical Analysis (Week 1)**
- NVDA at $795, pulled back from $850
- Strong support at $760 (tested 3 times)
- RSI at 38 (approaching oversold)
- 50-day MA at $770 (additional support)
- Volume declining on pullback (healthy)
**Conclusion:** Bullish bias, support zone identified

**Step 2: Options Analysis (Week 2)**
- IV Rank: 45% (elevated, good premium)
- 35 DTE options available
- 760 put delta: 22 (good probability)
- Credit for 760/750 put spread: $2.20
- Probability of profit: ~78%
**Conclusion:** Options support put credit spread

**Step 3: Position Sizing (Week 3)**
- Account: $75,000
- 2% risk = $1,500 max
- Max loss per spread: $10 - $2.20 = $7.80 = $780
- Max contracts: $1,500 / $780 = 1.9 = 1 contract
- Wait - only 1 contract? Consider different trade.
- Alternative: 760/755 spread (narrower)
- Credit: $1.30, Max loss: $370
- Max contracts: 4
**Conclusion:** 4 contracts of 760/755 put spread

**Step 4: Trade Execution**
- Sell 4x NVDA 760/755 put spread @ $1.30
- Credit: $520
- Max loss: $1,480 (within 2% budget)
- Buying power: ~$1,480

**Step 5: Management Plan**
- Profit target: 50% ($260 profit, close at $0.65)
- Loss limit: 2x credit ($1,040 loss, close at $3.90)
- Delta exit: Close if 760 delta exceeds 35
- Time exit: Close at 21 DTE or before
- Adjustment: Roll to 745/740 if tested for credit

**This is professional-grade trade planning.**`,
    },
    {
      type: 'tip',
      title: 'Keys to Long-Term Success',
      content: `**1. Consistency Over Brilliance**
Small, consistent wins compound better than occasional big wins with big losses mixed in. Follow your plan every time.

**2. Risk Management Is Everything**
Position sizing protects you from yourself. Even the best analysis fails sometimes. Size so you can survive the failures.

**3. Continuous Improvement**
Keep a trading journal. Review weekly. What worked? What didn't? Adapt your plan based on data, not emotion.

**4. Patience Pays**
Wait for A-setups. The market is always there. Forcing trades costs money. Walk away when conditions aren't right.

**5. Manage, Don't Predict**
You can't predict where stocks will go. You can manage your risk, size your positions, and follow your rules. Focus on what you control.

**6. Stay Humble**
Markets humiliate overconfident traders. Respect the market. Acknowledge you can be wrong. Size accordingly.

**7. Never Stop Learning**
This course is a foundation. Markets evolve. Strategies evolve. Keep reading, learning, and adapting.

**Your Edge:**
As a premium seller, your edge is theta decay and probability. You don't need to be right about direction 100% of the time. You need to be right about range most of the time, and manage the exceptions well.`,
    },
    {
      type: 'exercise',
      title: 'Final Self-Assessment',
      content: `Before taking the final quiz, honestly assess your understanding:

**Technical Analysis (1-5 rating):**
- [ ] I can identify support and resistance on any chart
- [ ] I understand RSI and how to use it for timing
- [ ] I can read moving averages and identify trends
- [ ] I understand volume analysis basics

**Options Greeks (1-5 rating):**
- [ ] I understand delta and probability
- [ ] I understand theta and time decay
- [ ] I understand vega and implied volatility
- [ ] I can select appropriate DTE for my strategy
- [ ] I understand gamma risk near expiration

**Advanced Strategies (1-5 rating):**
- [ ] I can structure iron condors with proper wing width
- [ ] I can time credit spread entries using TA
- [ ] I understand assignment and how to manage it
- [ ] I know when and how to roll positions
- [ ] I can size positions appropriately for my account
- [ ] I have a written trading plan

**Areas to Review:**
Any topic rated 3 or below, go back and review that day's lesson before taking the final quiz.

**Next Steps After This Course:**
1. Paper trade for 2-4 weeks
2. Start with small positions (1-2 contracts)
3. Keep a detailed trading journal
4. Review performance monthly
5. Gradually increase position size as you prove consistency`,
    },
    {
      type: 'text',
      title: 'Your Trading Checklist Summary',
      content: `Keep this reference handy when trading:

**Pre-Trade:**
- [ ] Check VIX level
- [ ] Check earnings calendar
- [ ] Identify support/resistance
- [ ] Check RSI
- [ ] Check IV Rank
- [ ] Calculate position size
- [ ] Run pre-trade checklist

**Entry Criteria:**
- [ ] RSI supports direction
- [ ] Price near key level
- [ ] IV Rank > 30%
- [ ] DTE: 30-45 days
- [ ] Delta: 15-25 on short strike
- [ ] Risk < 2% of account

**During Trade:**
- [ ] Monitor short delta daily
- [ ] Watch for 50% profit opportunity
- [ ] Watch for 2x loss threshold
- [ ] Check for news/earnings
- [ ] Prepare adjustment orders if delta > 30

**Exit Triggers:**
- [ ] 50% profit achieved - CLOSE
- [ ] 75% profit achieved - CLOSE
- [ ] 21 DTE reached - CLOSE
- [ ] Short delta > 35 - CLOSE or ROLL
- [ ] 2x credit loss - CLOSE
- [ ] Earnings within window - CLOSE

**Post-Trade:**
- [ ] Record in trading journal
- [ ] Calculate actual P/L
- [ ] Note what worked/didn't
- [ ] Review weekly for patterns

**Good luck on your final assessment!**`,
    },
  ],
  quiz: [
    {
      id: 'w3d21q1',
      question:
        'RSI shows 28 and price is at a strong support level on NVDA. What is the most appropriate options strategy?',
      options: [
        'Buy calls',
        'Sell put credit spread below support',
        'Sell call credit spread above resistance',
        'Iron condor centered on current price',
      ],
      correctAnswer: 1,
      explanation:
        'With RSI oversold (28) and price at support, you expect a bounce. A put credit spread with short strike at or below support benefits from a bounce or sideways movement. This combines Week 1 TA signals with Week 2/3 options strategy.',
      difficulty: 'easy',
    },
    {
      id: 'w3d21q2',
      question:
        'What is the approximate probability of profit for a put credit spread where the short put has a delta of 25?',
      options: ['25%', '50%', '75%', '95%'],
      correctAnswer: 2,
      explanation:
        'Probability of profit is approximately 1 - delta for the short strike. If short put delta is 25, POP is approximately 1 - 0.25 = 0.75 or 75%. This is why we target 20-25 delta on short strikes.',
      difficulty: 'easy',
    },
    {
      id: 'w3d21q3',
      question:
        'Why do professional premium sellers typically close iron condors at 50% of max profit?',
      options: [
        'Because the remaining profit is guaranteed',
        'Because risk/reward deteriorates - you risk more than you can gain',
        'Because theta stops working after 50%',
        'Because brokers require it',
      ],
      correctAnswer: 1,
      explanation:
        'At 50% profit, the remaining potential gain equals the profit already captured, but the potential loss is still the full max loss minus credits. This creates an unfavorable risk/reward ratio (risking more to make less) as gamma risk increases.',
      difficulty: 'medium',
    },
    {
      id: 'w3d21q4',
      question:
        'You are assigned on a META 500 put and collected $12.00 premium. What is your effective cost basis per share?',
      options: ['$500', '$512', '$488', '$500 minus your broker fees'],
      correctAnswer: 2,
      explanation:
        'Effective cost basis = Strike price - Premium collected. $500 - $12 = $488 per share. The premium you collected reduces your effective purchase price, which is why assignment is not necessarily a disaster.',
      difficulty: 'easy',
    },
    {
      id: 'w3d21q5',
      question:
        'Your short put has moved from 20 delta to 38 delta with 14 DTE remaining. What should you do?',
      options: [
        'Wait until delta reaches 50',
        'Add more contracts to average down',
        'Close or roll immediately - delta is approaching danger zone',
        'Do nothing - theta will save the trade',
      ],
      correctAnswer: 2,
      explanation:
        'At 38 delta (approaching 40 threshold) with only 14 DTE, gamma is high and the position is in danger. Exit rules say prepare to close/roll at 35 delta and hard stop at 40. With 14 DTE, there is little time for recovery.',
      difficulty: 'medium',
    },
    {
      id: 'w3d21q6',
      question:
        'With a $100,000 account and 2% risk rule, what is the maximum number of iron condor contracts you can trade if max loss per condor is $700?',
      options: ['1 contract', '2 contracts', '3 contracts', '5 contracts'],
      correctAnswer: 1,
      explanation:
        '$100,000 x 2% = $2,000 max risk. $2,000 / $700 = 2.86 contracts. Round down to 2 contracts for max risk of $1,400, which is within your 2% budget of $2,000.',
      difficulty: 'medium',
    },
    {
      id: 'w3d21q7',
      question:
        'What is the primary purpose of checking IV Rank before entering a credit spread?',
      options: [
        'To determine the stock direction',
        'To ensure sufficient premium relative to historical volatility',
        'To calculate the exact profit',
        'To determine support and resistance levels',
      ],
      correctAnswer: 1,
      explanation:
        'IV Rank tells you how current implied volatility compares to historical levels. High IV Rank means elevated premiums, which provides better compensation for the risk you take as a premium seller. We target IV Rank > 30%.',
      difficulty: 'medium',
    },
    {
      id: 'w3d21q8',
      question:
        'Why is tech concentration a significant risk for your portfolio?',
      options: [
        'Tech stocks have lower volatility',
        'Tech stocks are uncorrelated with each other',
        'Tech stocks often move together, causing multiple positions to lose simultaneously',
        'Tech stocks have lower options premiums',
      ],
      correctAnswer: 2,
      explanation:
        'Tech stocks (NVDA, META, GOOG, etc.) are highly correlated. When tech sells off, they typically all decline together, causing multiple positions to hit max loss at the same time. This is why we limit sector concentration to 40%.',
      difficulty: 'medium',
    },
    {
      id: 'w3d21q9',
      question:
        'What is the recommended DTE range for selling iron condors and credit spreads?',
      options: ['5-14 days', '15-21 days', '30-45 days', '60-90 days'],
      correctAnswer: 2,
      explanation:
        '30-45 DTE is optimal because it provides strong theta decay while maintaining manageable gamma. Shorter DTE has high gamma risk; longer DTE has slower theta decay. Most traders close by 21 DTE.',
      difficulty: 'easy',
    },
    {
      id: 'w3d21q10',
      question:
        'You rolled a put twice already, and the stock continues to decline. You can only roll again for a $0.50 debit. What should you do?',
      options: [
        'Roll again to avoid assignment',
        'Roll again and add more contracts',
        'Close the position and accept the loss',
        'Wait until expiration to see what happens',
      ],
      correctAnswer: 2,
      explanation:
        'After 2+ rolls with diminishing credits (now requiring a debit), you are in a rolling trap. The thesis is broken, and rolling is just delaying an inevitable loss while adding to it. Close the position and move on.',
      difficulty: 'hard',
    },
    {
      id: 'w3d21q11',
      question:
        'What is the relationship between delta and theta for options sellers?',
      options: [
        'Higher delta means higher theta',
        'Lower delta means higher theta',
        'Theta is highest at-the-money regardless of delta',
        'Delta and theta are completely independent',
      ],
      correctAnswer: 2,
      explanation:
        'Theta is highest for at-the-money options (where delta is ~50). However, ATM options also have the highest gamma risk. Premium sellers target slightly OTM options (15-25 delta) to balance theta collection with probability of profit.',
      difficulty: 'hard',
    },
    {
      id: 'w3d21q12',
      question:
        'A bullish RSI divergence occurs when:',
      options: [
        'Price and RSI both make higher highs',
        'Price makes a lower low but RSI makes a higher low',
        'RSI stays above 70 for multiple days',
        'Price and RSI both make lower lows',
      ],
      correctAnswer: 1,
      explanation:
        'Bullish divergence occurs when price makes a lower low while RSI makes a higher low. This indicates weakening selling momentum despite lower prices, suggesting a potential bounce - ideal for put credit spreads at support.',
      difficulty: 'medium',
    },
    {
      id: 'w3d21q13',
      question:
        'You have an iron condor showing 40% profit with 28 DTE remaining. GOOG earnings are in 2 weeks. What should you do?',
      options: [
        'Hold through earnings to capture remaining 60% profit',
        'Close the position before earnings to lock in profits',
        'Add more contracts before earnings for higher premium',
        'Wait until 7 DTE to decide',
      ],
      correctAnswer: 1,
      explanation:
        'Never hold through earnings with an iron condor. The binary event creates gap risk that can blow through both strikes. You have 40% profit locked in - close and avoid the earnings gamble. Earnings risk is not worth the remaining 60%.',
      difficulty: 'hard',
    },
    {
      id: 'w3d21q14',
      question:
        'What is the primary benefit of using defined-risk strategies (spreads) versus undefined-risk (naked options)?',
      options: [
        'Higher profit potential',
        'No margin requirement',
        'Known maximum loss that can be sized appropriately',
        'No assignment risk',
      ],
      correctAnswer: 2,
      explanation:
        'Defined-risk strategies like spreads have a known maximum loss, allowing you to size positions according to your risk rules. Naked options have theoretically unlimited loss, making proper position sizing much more difficult.',
      difficulty: 'medium',
    },
    {
      id: 'w3d21q15',
      question:
        'What is the most important element of a successful options trading career?',
      options: [
        'Finding the perfect entry timing',
        'Using complex strategies',
        'Consistent execution of a written trading plan with proper risk management',
        'Trading as frequently as possible',
      ],
      correctAnswer: 2,
      explanation:
        'Consistent execution of a written trading plan with proper risk management is the foundation of trading success. Perfect entries are impossible, complex strategies are not necessary, and overtrading hurts returns. Discipline and risk management separate successful traders from the rest.',
      difficulty: 'easy',
    },
  ],
}
