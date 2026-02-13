import type { LessonContent } from '../index'

export const day18: LessonContent = {
  day: 18,
  week: 3,
  title: 'Final Assessment',
  description: 'Comprehensive review covering technical analysis, Greeks, and strategy execution.',
  duration: 30,
  keyPoints: [
    'Technical analysis provides WHERE and WHEN to enter',
    'Greeks determine HOW to structure trades',
    'Position sizing protects from catastrophic loss',
    'Consistent execution of a plan separates winners from losers',
  ],
  yourStocks: ['NVDA', 'META', 'GOOG', 'QQQ', 'AMZN'],
  content: [
    {
      type: 'text',
      title: 'Course Summary',
      content: `Congratulations on completing the 18-day options trading curriculum.

**Week 1: Technical Analysis Foundation**
- Support/resistance define strike placement
- RSI identifies overbought/oversold for timing
- Moving averages reveal trend direction
- Volume confirms price moves

**Week 2: Options Greeks Mastery**
- Delta = probability and directional exposure
- Theta = your profit driver as premium seller
- Vega = volatility exposure
- DTE selection balances theta with gamma risk

**Week 3: Strategy Execution**
- Iron condor optimization
- Credit spread timing using TA + Greeks
- Assignment and rolling management
- Position sizing and trading plan`
    },
    {
      type: 'text',
      title: 'The Complete Trade Process',
      content: `**Step 1: Technical Analysis (Week 1)**
Scan for setups - support/resistance, RSI extremes, volume confirmation

**Step 2: Options Analysis (Week 2)**
Verify IV Rank > 30%, select appropriate delta (15-25), choose 30-45 DTE

**Step 3: Position Sizing (Week 3)**
Calculate max loss, ensure < 2% of account, check sector concentration

**Step 4: Execute with Plan**
Follow pre-trade checklist, set profit targets (50%), set loss limits (2x credit)

**Step 5: Manage and Review**
Monitor delta, close at targets, review in journal`
    },
    {
      type: 'tip',
      title: 'Keys to Long-Term Success',
      content: `**1. Consistency Over Brilliance**
Small, consistent wins compound better than occasional big wins with big losses.

**2. Risk Management Is Everything**
Size so you can survive failures. Even the best analysis fails sometimes.

**3. Patience Pays**
Wait for A-setups. Forcing trades costs money.

**4. Manage, Don't Predict**
You can't predict stocks. You can manage risk and follow rules.

**5. Never Stop Learning**
This course is a foundation. Markets evolve.`
    },
    {
      type: 'text',
      title: 'Trading Checklist Summary',
      content: `**Pre-Trade:**
- [ ] Check VIX level
- [ ] Identify support/resistance
- [ ] Check RSI and IV Rank
- [ ] Calculate position size

**Entry Criteria:**
- [ ] Price near key level
- [ ] IV Rank > 30%
- [ ] DTE 30-45 days
- [ ] Delta 15-25 on short strike
- [ ] Risk < 2% of account

**Exit Triggers:**
- [ ] 50% profit - CLOSE
- [ ] 21 DTE - CLOSE
- [ ] Short delta > 35 - CLOSE or ROLL
- [ ] 2x credit loss - CLOSE

**Good luck on your assessment!**`
    }
  ],
  quiz: [
    {
      id: 'w3d18q1',
      question: 'RSI shows 28 and price is at strong support on NVDA. What is the most appropriate strategy?',
      options: ['Buy calls', 'Sell put credit spread below support', 'Sell call credit spread above resistance', 'Iron condor centered on current price'],
      correctAnswer: 1,
      explanation: 'With RSI oversold (28) and price at support, expect a bounce. Put credit spread with short strike below support benefits from bounce or sideways movement.',
      difficulty: 'easy'
    },
    {
      id: 'w3d18q2',
      question: 'What is approximate probability of profit for a put credit spread with 25-delta short put?',
      options: ['25%', '50%', '75%', '95%'],
      correctAnswer: 2,
      explanation: 'POP ≈ 1 - delta. If short put delta is 25, POP is approximately 75%. This is why we target 20-25 delta.',
      difficulty: 'easy'
    },
    {
      id: 'w3d18q3',
      question: 'Why close iron condors at 50% profit?',
      options: ['Remaining profit is guaranteed', 'Risk/reward deteriorates - you risk more than you can gain', 'Theta stops working', 'Brokers require it'],
      correctAnswer: 1,
      explanation: 'At 50% profit, remaining potential gain equals profit captured, but potential loss is still full max loss. Creates unfavorable risk/reward as gamma increases.',
      difficulty: 'medium'
    },
    {
      id: 'w3d18q4',
      question: 'You sold META 500 put and collected $12 premium. If assigned, what is your effective cost basis?',
      options: ['$500', '$512', '$488', '$500 minus fees'],
      correctAnswer: 2,
      explanation: 'Effective cost = Strike - Premium = $500 - $12 = $488. Premium reduces effective purchase price.',
      difficulty: 'easy'
    },
    {
      id: 'w3d18q5',
      question: 'Your short put moved from 20 to 38 delta with 14 DTE. What should you do?',
      options: ['Wait until 50 delta', 'Add more contracts', 'Close or roll immediately - approaching danger zone', 'Do nothing - theta will save it'],
      correctAnswer: 2,
      explanation: 'At 38 delta (approaching 40 threshold) with 14 DTE, gamma is high. Exit rules say prepare to close/roll at 35 delta. Little time for recovery.',
      difficulty: 'medium'
    },
    {
      id: 'w3d18q6',
      question: 'With $100,000 account and 2% rule, max iron condor contracts if max loss is $700 per condor?',
      options: ['1 contract', '2 contracts', '3 contracts', '5 contracts'],
      correctAnswer: 1,
      explanation: '$100,000 x 2% = $2,000 max risk. $2,000 / $700 = 2.86. Round DOWN to 2 contracts ($1,400 risk).',
      difficulty: 'medium'
    },
    {
      id: 'w3d18q7',
      question: 'What is the purpose of checking IV Rank before entering a credit spread?',
      options: ['Determine stock direction', 'Ensure sufficient premium relative to historical volatility', 'Calculate exact profit', 'Determine support levels'],
      correctAnswer: 1,
      explanation: 'IV Rank shows if current IV is elevated vs history. High IV Rank means better premium compensation for risk. Target > 30%.',
      difficulty: 'medium'
    },
    {
      id: 'w3d18q8',
      question: 'Why is tech concentration dangerous for options portfolios?',
      options: ['Tech has lower volatility', 'Tech stocks are uncorrelated', 'Tech stocks move together, causing multiple positions to lose simultaneously', 'Tech has lower premiums'],
      correctAnswer: 2,
      explanation: 'Tech stocks are highly correlated. When tech sells off, NVDA, META, GOOG all drop together, causing multiple positions to hit max loss at once.',
      difficulty: 'medium'
    },
    {
      id: 'w3d18q9',
      question: 'What is the recommended DTE range for selling iron condors?',
      options: ['5-14 days', '15-21 days', '30-45 days', '60-90 days'],
      correctAnswer: 2,
      explanation: '30-45 DTE is optimal: strong theta decay with manageable gamma. Most traders close by 21 DTE.',
      difficulty: 'easy'
    },
    {
      id: 'w3d18q10',
      question: 'You rolled a put twice. Stock continues declining. Can only roll again for $0.50 debit. What should you do?',
      options: ['Roll to avoid assignment', 'Roll and add more contracts', 'Close and accept the loss', 'Wait until expiration'],
      correctAnswer: 2,
      explanation: 'After 2+ rolls with diminishing credits (now requiring debit), you\'re in a rolling trap. Thesis is broken. Close and move on.',
      difficulty: 'hard'
    },
    {
      id: 'w3d18q11',
      question: 'A bullish RSI divergence occurs when:',
      options: ['Price and RSI both make higher highs', 'Price makes lower low but RSI makes higher low', 'RSI stays above 70', 'Price and RSI both make lower lows'],
      correctAnswer: 1,
      explanation: 'Bullish divergence: price lower low, RSI higher low. Indicates weakening selling momentum - ideal for put spreads at support.',
      difficulty: 'medium'
    },
    {
      id: 'w3d18q12',
      question: 'What is the most important element of successful options trading?',
      options: ['Perfect entry timing', 'Complex strategies', 'Consistent execution of trading plan with proper risk management', 'Trading frequently'],
      correctAnswer: 2,
      explanation: 'Consistent execution with risk management is the foundation. Perfect entries are impossible, complex strategies unnecessary, overtrading hurts returns.',
      difficulty: 'easy'
    }
  ]
}
