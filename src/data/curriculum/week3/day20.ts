import type { LessonContent } from '../index'

export const day20: LessonContent = {
  day: 20,
  week: 3,
  title: 'Trading Plan',
  description:
    'Build a comprehensive trading plan that ties together technical analysis, Greeks knowledge, and strategy execution. Create your pre-trade checklist, entry/exit rules, and risk management framework.',
  duration: 55,
  keyPoints: [
    'A trading plan removes emotion from decision-making',
    'Pre-trade checklists prevent impulsive entries',
    'Clear exit rules protect profits and limit losses',
    'Risk management rules are non-negotiable',
    'Your plan should be written down and followed consistently',
  ],
  yourStocks: ['NVDA', 'META', 'GOOG', 'QQQ', 'AMZN', 'SHOP', 'PLTR', 'MELI', 'HOOD', 'RDDT'],
  content: [
    {
      type: 'text',
      title: 'Why You Need a Written Trading Plan',
      content: `Trading without a plan is gambling. A written trading plan:

**Removes Emotion:**
When you're in the heat of a trade, emotions cloud judgment. A plan made during calm market hours guides you when fear or greed takes over.

**Creates Consistency:**
Professional traders succeed through consistent execution, not lucky trades. Your plan ensures you execute the same way every time.

**Enables Review:**
You can only improve what you measure. A plan creates a framework for tracking what works and what doesn't.

**Builds Confidence:**
When you have a plan, you know what to do in every scenario. This confidence prevents panic decisions.

**Your Trading Plan Should Include:**
1. Pre-trade checklist (what must be true before entry)
2. Entry rules (specific criteria for opening positions)
3. Exit rules (when and how to close)
4. Risk management rules (position sizing, max loss)
5. Trade management rules (rolling, adjustments)
6. Review process (how you learn from trades)

A plan doesn't guarantee profits, but trading without one nearly guarantees failure.`,
    },
    {
      type: 'text',
      title: 'Pre-Trade Checklist',
      content: `Before opening ANY position, run through this checklist. If any item fails, do not enter the trade.

**Market Conditions Checklist:**
- [ ] VIX level checked (current: ___)
- [ ] No major news events in next 24 hours
- [ ] No earnings within DTE window for this stock
- [ ] No Fed announcements during position lifetime
- [ ] Market trend aligned with trade direction (or neutral)

**Technical Analysis Checklist:**
- [ ] Key support/resistance levels identified
- [ ] Current RSI reading noted (current: ___)
- [ ] 20/50/200 MA positions checked
- [ ] No concerning divergences against my trade
- [ ] Volume pattern supports my thesis

**Options Analysis Checklist:**
- [ ] IV Rank checked (current: ___)
- [ ] Delta of short strike is appropriate (15-25 range)
- [ ] Bid-ask spread is reasonable (< 5% of credit)
- [ ] DTE is in preferred range (30-45 days)
- [ ] Premium collected justifies risk taken

**Position Sizing Checklist:**
- [ ] Max loss calculated: $___
- [ ] Max loss is within 2% account rule
- [ ] Position size determined: ___ contracts
- [ ] Buying power impact acceptable
- [ ] Not over-concentrated in this sector

**Final Confirmation:**
- [ ] Can I afford max loss without stress?
- [ ] Am I trading based on analysis, not impulse?
- [ ] Is this an A or B setup (not C)?`,
    },
    {
      type: 'example',
      title: 'Pre-Trade Checklist Applied to NVDA',
      stock: 'NVDA',
      content: `**Trade Idea:** NVDA Iron Condor

**Market Conditions:**
- [x] VIX: 18 (normal, acceptable)
- [x] No major news today
- [x] NVDA earnings: 40 days out (outside DTE window)
- [x] Fed: No meeting for 3 weeks
- [x] Market: Sideways, supports iron condor

**Technical Analysis:**
- [x] Support at $760, Resistance at $850
- [x] RSI: 55 (neutral - good for iron condor)
- [x] Price between 20 and 50 MA (consolidation)
- [x] No divergences present
- [x] Volume declining (consolidation pattern)

**Options Analysis:**
- [x] IV Rank: 42% (above average, good premium)
- [x] Short put delta: 18, Short call delta: 18
- [x] Bid-ask spread: $0.15 (acceptable)
- [x] DTE: 35 days (optimal range)
- [x] Credit: $3.20, Max loss: $6.80 (fair risk/reward)

**Position Sizing:**
- [x] Max loss: $680 per contract
- [x] Account risk: 2 contracts = $1,360 (1.8% of $75K)
- [x] Buying power: $1,360 (within limits)
- [x] Tech exposure: Have 2 other tech positions (acceptable)

**Final Confirmation:**
- [x] Can afford $1,360 loss without stress
- [x] Trade based on technical consolidation thesis
- [x] B+ setup (strong technicals, average IV)

**DECISION: ENTER TRADE - 2 contracts**`,
    },
    {
      type: 'text',
      title: 'Entry Rules',
      content: `Your entry rules define exactly when you open a position. Be specific.

**Iron Condor Entry Rules:**
1. Enter only when RSI is between 40-60 (neutral)
2. Stock must be in consolidation (not trending)
3. Short strikes placed at or beyond support/resistance
4. IV Rank minimum: 30%
5. Target DTE: 30-45 days
6. Delta on short strikes: 15-25 each side
7. Credit must be at least 25% of wing width

**Put Credit Spread Entry Rules:**
1. Stock at or near identified support level
2. RSI below 40 (oversold) or bullish divergence
3. Short strike at or below support
4. IV Rank minimum: 25%
5. Target DTE: 30-45 days
6. Delta on short put: 20-30
7. Uptrend or neutral trend on weekly chart

**Call Credit Spread Entry Rules:**
1. Stock at or near identified resistance level
2. RSI above 60 (overbought) or bearish divergence
3. Short strike at or above resistance
4. IV Rank minimum: 25%
5. Target DTE: 30-45 days
6. Delta on short call: 20-30
7. Downtrend or neutral trend on weekly chart

**Universal Entry Rules:**
- Never enter on earnings week
- Never enter during first 30 minutes of market
- Never enter on FOMC announcement days
- Maximum 2 new positions per day
- If unsure, don't trade`,
    },
    {
      type: 'text',
      title: 'Exit Rules',
      content: `Exit rules are MORE important than entry rules. Define your exits before entering.

**Profit Target Exits:**

**Iron Condors:**
- Close at 50% of max profit
- Close at 21 DTE if less than 50% profit captured
- Close at 75% profit regardless of time

**Credit Spreads:**
- Close at 50-75% of max profit
- Close at 21 DTE if less than 50% profit captured
- Close if stock breaks through your key level favorably

**Loss Limit Exits:**

**Delta-Based Exits:**
- Exit if short strike delta exceeds 35
- Exit if short strike delta exceeds 40 (hard stop)

**Percentage-Based Exits:**
- Exit if loss equals 1x credit received (warning)
- Exit if loss equals 2x credit received (hard stop)
- Exit if loss equals 3x credit - you waited too long

**Time-Based Exits:**
- Exit at 7 DTE regardless (gamma risk too high)
- Exit if 50%+ of time passed with no profit

**Event-Based Exits:**
- Exit before earnings announcements
- Exit before major product launches
- Exit before FDA decisions (biotech)
- Exit if fundamental news changes thesis

**Hard Rules (Never Violate):**
- If loss hits 2x credit, EXIT immediately
- If short delta exceeds 40, EXIT immediately
- If at 5 DTE, EXIT regardless of P/L`,
    },
    {
      type: 'example',
      title: 'Exit Rules in Action on META',
      stock: 'META',
      content: `**Position:** META 480/470 Put Credit Spread
**Entry:** Credit $2.50, 35 DTE, META at $520
**Profit target:** 50% = $1.25 profit
**Loss limit:** 2x credit = $5.00 loss

**Scenario A: Winner**
- Day 12: META at $530, spread worth $0.80
- Profit: $2.50 - $0.80 = $1.70 (68% of max)
- Action: CLOSE - exceeded 50% target
- Result: +$170 per spread

**Scenario B: Loser with Management**
- Day 8: META drops to $495 on ad revenue concerns
- Short 480 put delta rises from 18 to 32
- Spread worth $4.20 (loss of $1.70)
- Action: Close or roll - delta approaching 35 threshold
- Decision: Roll to 460/450 put spread for $0.50 credit
- Result: Reduced loss, extended time, better strike

**Scenario C: Quick Loss**
- Day 3: META gaps down to $475 on earnings miss
- Short 480 put now ITM, delta 55
- Spread worth $7.50 (loss of $5.00 = 2x credit)
- Action: IMMEDIATE EXIT - hard stop triggered
- Result: -$500 per spread, but avoided max loss of $750

**Key Lesson:** Following exit rules in Scenario C saved $250 per spread. Many traders would "hope" for recovery and lose the full $750.`,
    },
    {
      type: 'text',
      title: 'Risk Management Rules',
      content: `These rules are non-negotiable. They protect your account from catastrophic loss.

**Position Size Rules:**
1. Maximum 2% account risk per trade
2. Maximum 5% account risk on high-conviction only
3. Maximum 15% of buying power in single underlying
4. Maximum 40% of positions in single sector

**Account Rules:**
1. Stop trading for the day after 2 consecutive losses
2. Stop trading for the week if down 5% MTD
3. Reduce position sizes by 50% if down 10% MTD
4. Take a week off if down 15% MTD

**Trade Frequency Rules:**
1. Maximum 3-5 new positions per week
2. Maximum 10 open positions at any time
3. Maximum 2 new positions per day
4. Wait 24 hours after a losing trade before new entry

**Margin Rules:**
1. Never use more than 50% of available buying power
2. Keep 30%+ cash for adjustments and opportunities
3. If margin call approaches, close positions immediately
4. Never add to losers unless planned adjustment

**Volatility Rules:**
1. When VIX > 30, reduce position sizes by 50%
2. When VIX > 35, close existing positions or go to cash
3. Do not sell premium into earnings announcements
4. Widen wings or reduce contracts in high IV`,
    },
    {
      type: 'tip',
      title: 'Your Personal Trading Rules Template',
      content: `Copy and customize this template:

**MY TRADING RULES**

**I Will:**
- Follow my pre-trade checklist before every trade
- Size positions to risk no more than 2% per trade
- Close positions at 50% profit
- Close positions at 2x credit loss
- Take profits and losses - never "hope"
- Review every trade in my journal
- Take a break after 2 consecutive losses

**I Will NOT:**
- Trade during the first 30 minutes
- Trade on earnings weeks for that stock
- Hold through earnings announcements
- Let short delta exceed 40 before acting
- Average down on losing positions
- Risk more than 5% on any single trade ever
- Trade when emotional (angry, excited, revenge)

**My Position Limits:**
- Max contracts per position: ___
- Max positions at one time: ___
- Max tech sector exposure: ___% of positions
- Max weekly new positions: ___

**My Review Schedule:**
- Daily: End of day position check
- Weekly: Win/loss review, lessons learned
- Monthly: Performance analysis, rule adjustments`,
    },
    {
      type: 'exercise',
      title: 'Build Your Trading Plan',
      content: `Complete this exercise to create your personal trading plan:

**Step 1: Define Your Setup Criteria**
For your primary strategy (iron condor or credit spread), write down:
- Minimum IV Rank required: ____%
- Delta range for short strikes: ___ to ___
- DTE range: ___ to ___ days
- RSI zone for entry: ___
- Required technical setup: _______________

**Step 2: Define Your Exit Rules**
- Take profit at: ___% of max profit
- Cut loss at: ___x credit received
- Maximum delta on short strike: ___
- Maximum DTE to hold: ___ days

**Step 3: Define Your Position Size**
- Account size: $___________
- Risk per trade: ___% = $___________
- Maximum contracts calculation formula:
  Max contracts = Risk per trade / Max loss per contract

**Step 4: Define Your Limits**
- Maximum open positions: ___
- Maximum positions in one underlying: ___
- Maximum positions in tech: ___
- Daily loss limit: $___
- Weekly loss limit: $___

**Step 5: Define Your Review Process**
- Trade journal location: _______________
- What I will record: _______________
- When I will review: _______________

**Action Item:** Write out your trading plan and put it next to your trading computer. Reference it before every trade.`,
    },
    {
      type: 'warning',
      title: 'Common Plan Violations and Consequences',
      content: `These are the most common ways traders violate their plans:

**1. "Just This Once" Syndrome**
- Violation: "I'll take 5 contracts instead of 2, just this once"
- Consequence: The one time you do this is the trade that loses
- Solution: Rules are rules. No exceptions.

**2. Moving the Stop**
- Violation: "I'll let this run a bit more, it might come back"
- Consequence: 2x loss becomes 5x loss
- Solution: Set alerts. When they trigger, act immediately.

**3. Revenge Trading**
- Violation: Taking a trade immediately after a loss to "get it back"
- Consequence: Emotional trade leads to another loss
- Solution: Mandatory 24-hour waiting period after losses

**4. Overtrading**
- Violation: Taking 10 trades in a week instead of 3-5
- Consequence: Commission drag, attention spread thin, poor entries
- Solution: Hard cap on weekly trades. Close your platform.

**5. Ignoring Sector Concentration**
- Violation: "These are all different companies"
- Consequence: All positions lose together in sector selloff
- Solution: Mandatory sector diversification check

**The Fix:** Write down every time you violate a rule. Review weekly. If you violate the same rule 3 times, you have a discipline problem, not a knowledge problem.`,
    },
  ],
  quiz: [
    {
      id: 'w3d20q1',
      question:
        'Why is it important to have a written trading plan?',
      options: [
        'It guarantees profits',
        'It removes emotion from decision-making and creates consistency',
        'It is required by brokers',
        'It eliminates all trading risk',
      ],
      correctAnswer: 1,
      explanation:
        'A written trading plan removes emotion from decisions by providing predetermined rules to follow. This creates consistency in your trading, which is essential for long-term success and enables you to review and improve your process.',
      difficulty: 'easy',
    },
    {
      id: 'w3d20q2',
      question:
        'Your iron condor entry rules require IV Rank above 30%. Current IV Rank is 22%. What should you do?',
      options: [
        'Enter anyway since the chart looks good',
        'Enter with smaller position size',
        'Do not enter - criteria not met',
        'Enter with wider wings to compensate',
      ],
      correctAnswer: 2,
      explanation:
        'If a criterion in your pre-trade checklist is not met, you do not enter the trade. Your plan exists to prevent impulsive decisions. Wait for a setup that meets all your criteria.',
      difficulty: 'easy',
    },
    {
      id: 'w3d20q3',
      question:
        'Your put credit spread is showing a loss equal to 2x the credit received. According to typical risk management rules, what should you do?',
      options: [
        'Add more contracts to average down',
        'Wait for the stock to recover',
        'Close the position immediately',
        'Roll to the next month',
      ],
      correctAnswer: 2,
      explanation:
        'A 2x credit loss is typically a hard stop exit rule. When this level is hit, you should close immediately to prevent further losses. Adding to losers or hoping for recovery often leads to much larger losses.',
      difficulty: 'medium',
    },
    {
      id: 'w3d20q4',
      question:
        'You have 2 consecutive losing trades. What does proper risk management suggest?',
      options: [
        'Double down on the next trade to recover',
        'Stop trading for the day and review what happened',
        'Switch to a completely different strategy',
        'Keep trading to get back to breakeven',
      ],
      correctAnswer: 1,
      explanation:
        'After 2 consecutive losses, you should stop trading for the day. This prevents revenge trading and emotional decisions. Use the time to review what happened and whether you followed your plan.',
      difficulty: 'medium',
    },
    {
      id: 'w3d20q5',
      question:
        'Your short put delta is now 38 (started at 20). According to exit rules, what action is required?',
      options: [
        'No action needed until delta reaches 50',
        'Add a protective long put',
        'Prepare to exit or roll - delta is approaching danger zone',
        'Wait until expiration to see what happens',
      ],
      correctAnswer: 2,
      explanation:
        'When short delta exceeds 35, you should be preparing to exit or roll. Delta of 40+ is typically a hard stop trigger. At 38, you are approaching danger zone and should be actively managing the position, not waiting.',
      difficulty: 'hard',
    },
  ],
}
