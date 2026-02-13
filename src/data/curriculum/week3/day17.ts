import type { LessonContent } from '../index'

export const day17: LessonContent = {
  day: 17,
  week: 3,
  title: 'Position Sizing & Trading Plan',
  description: 'Size positions correctly and build a trading plan for consistent execution.',
  duration: 25,
  keyPoints: [
    'Never risk more than 2% of account on a single trade',
    'Tech concentration creates correlated risk - diversify',
    'A written trading plan removes emotion',
    'Pre-trade checklists prevent impulsive entries',
  ],
  yourStocks: ['NVDA', 'META', 'GOOG', 'QQQ', 'AMZN', 'SPY'],
  content: [
    {
      type: 'text',
      title: 'The 2% Rule',
      content: `Position sizing matters more than entry timing. Even the best entry is worthless if the position forces you out during a drawdown.

**The Math of Survival:**
- A 50% loss requires 100% gain to recover
- A 25% loss requires 33% gain to recover
- A 10% loss requires only 11% gain to recover

**Position Size Rules:**
1. **2% Rule:** Never risk more than 2% on single trade
2. **5% Rule:** Max 5% only on highest-conviction setups
3. **15% Rule:** No single underlying uses more than 15% of buying power
4. **40% Rule:** No sector exceeds 40% of positions`
    },
    {
      type: 'example',
      title: 'Position Size Calculation - NVDA',
      content: `**Account:** $100,000
**Risk per trade:** 2% = $2,000 max loss

**Trade:** NVDA Iron Condor
- NVDA at $800
- Sell 740/730 put, 860/870 call spreads
- Credit: $3.00
- Max loss: $7.00 per contract = $700

**Calculation:**
Max contracts = $2,000 / $700 = 2.85 = **2 contracts**

**Final Position:**
- 2 iron condors
- Credit: $600
- Max loss: $1,400 (1.4% of account)

Don't think "I'll open 5 because I'm confident" - that's $3,500 risk, exceeding your rule.`,
      stock: 'NVDA'
    },
    {
      type: 'warning',
      title: 'Tech Concentration Risk',
      content: `Your watchlist (NVDA, META, GOOG, AMZN, SHOP) is all correlated to tech.

**2022 Tech Crash:**
- NVDA: -66% peak to trough
- META: -77%
- SHOP: -85%

If you had positions on all during 2022, EVERY position hit max loss simultaneously.

**Solutions:**
1. Limit tech to 40-50% of positions
2. Add non-tech (financials, healthcare, energy)
3. Use QQQ as hedge indicator
4. Stagger entries - don't open all tech same week`
    },
    {
      type: 'text',
      title: 'Pre-Trade Checklist',
      content: `Before ANY position, verify:

**Market Conditions:**
- [ ] VIX level checked
- [ ] No major news in 24 hours
- [ ] No earnings within DTE window
- [ ] No Fed announcements during position

**Technical Analysis:**
- [ ] Support/resistance identified
- [ ] RSI reading noted
- [ ] Trend aligned with trade

**Options Analysis:**
- [ ] IV Rank > 30%
- [ ] Delta 15-25 on short strike
- [ ] DTE 30-45 days

**Position Sizing:**
- [ ] Max loss < 2% of account
- [ ] Not over-concentrated in sector`
    },
    {
      type: 'text',
      title: 'Exit Rules',
      content: `Define exits BEFORE entering:

**Profit Target Exits:**
- Close at 50% of max profit
- Close at 21 DTE if profitable
- Close at 75% profit regardless

**Loss Limit Exits:**
- Exit if short delta > 35
- Exit if loss = 2x credit (hard stop)
- Exit at 7 DTE regardless

**Non-Negotiable Rules:**
- Never risk > 2% per trade
- Stop trading after 2 consecutive losses
- Never hold through earnings
- Review every trade in journal`
    },
    {
      type: 'tip',
      title: 'Your Trading Rules Template',
      content: `**I Will:**
- Follow pre-trade checklist every trade
- Size positions to max 2% risk
- Close at 50% profit
- Close at 2x credit loss
- Review trades weekly

**I Will NOT:**
- Trade during first 30 minutes
- Hold through earnings
- Let short delta exceed 40
- Average down on losers
- Trade when emotional

**Position Limits:**
- Max contracts per position: ___
- Max positions at once: ___
- Max tech exposure: ___%

Write it down. Follow it every time.`
    }
  ],
  quiz: [
    {
      id: 'w3d17q1',
      question: 'With $100,000 account and 2% risk rule, what is max loss allowed per trade?',
      options: ['$500', '$1,000', '$2,000', '$5,000'],
      correctAnswer: 2,
      explanation: '$100,000 x 2% = $2,000 maximum risk per trade.',
      difficulty: 'easy'
    },
    {
      id: 'w3d17q2',
      question: 'Your put spread has max loss $450/contract. With $50,000 account (2% = $1,000 risk), how many contracts?',
      options: ['1 contract', '2 contracts', '3 contracts', '5 contracts'],
      correctAnswer: 1,
      explanation: '$1,000 / $450 = 2.22. Round DOWN to 2 contracts for max loss $900, within 2% budget.',
      difficulty: 'easy'
    },
    {
      id: 'w3d17q3',
      question: 'Why is a written trading plan important?',
      options: ['It guarantees profits', 'It removes emotion and creates consistency', 'It\'s required by brokers', 'It eliminates all risk'],
      correctAnswer: 1,
      explanation: 'A written plan removes emotion from decisions by providing predetermined rules. Creates consistency essential for long-term success.',
      difficulty: 'medium'
    }
  ]
}
