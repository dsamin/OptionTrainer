import type { LessonContent } from '../index'

export const day19: LessonContent = {
  day: 19,
  week: 3,
  title: 'Position Sizing',
  description:
    'Learn to size positions correctly to survive drawdowns and compound gains. Master portfolio allocation, manage concentration risk, and establish position size rules for your trading account.',
  duration: 50,
  keyPoints: [
    'Position sizing is more important than entry timing for long-term success',
    'Never risk more than 2-5% of your account on a single trade',
    'Tech concentration creates correlated risk - diversify across sectors',
    'Account for max loss scenarios, not just expected outcomes',
    'Smaller positions with higher frequency outperform large positions',
  ],
  yourStocks: ['NVDA', 'META', 'GOOG', 'QQQ', 'AMZN', 'SHOP', 'PLTR', 'MELI', 'HOOD', 'RDDT'],
  content: [
    {
      type: 'text',
      title: 'Why Position Sizing Matters More Than Entries',
      content: `Most traders obsess over entry timing while ignoring position sizing. This is backwards. Even the best entry is worthless if the position is too large and forces you out during a drawdown.

**The Math of Survival:**
- A 50% loss requires a 100% gain to recover
- A 25% loss requires a 33% gain to recover
- A 10% loss requires only an 11% gain to recover

If you risk 50% of your account on one trade and lose, you need to double your remaining capital just to break even. That's nearly impossible.

**Position Sizing Objectives:**
1. Survive losing streaks (they happen to everyone)
2. Stay in the game long enough for edge to compound
3. Avoid emotional trading from oversized losses
4. Maintain ability to take advantage of opportunities

**The Professional Approach:**
Professional traders size positions so that even a MAX LOSS scenario doesn't significantly impact their ability to trade. They expect losses and plan for them.

A 2% account loss is recoverable. A 20% account loss changes your trading psychology and ability to recover.`,
    },
    {
      type: 'text',
      title: 'Portfolio Allocation Framework',
      content: `Your portfolio allocation determines how much capital goes to each strategy and position. Here's a framework for options traders selling premium:

**Account Allocation by Strategy:**

**Conservative (Lower Risk):**
- 50% in cash or short-term bonds
- 30% in defined-risk positions (credit spreads, iron condors)
- 20% in undefined-risk positions (naked puts, if any)

**Moderate:**
- 30% in cash
- 50% in defined-risk positions
- 20% in undefined-risk positions

**Aggressive:**
- 10% in cash (minimum for adjustments)
- 60% in defined-risk positions
- 30% in undefined-risk positions

**Position Limits Within Allocation:**
Even within your allocated capital, diversify:
- No single underlying: more than 15-20% of options allocation
- No single sector: more than 40% of options allocation
- No single trade: more than 5% of total account at risk

**Example: $100,000 Account (Moderate)**
- Cash: $30,000
- Credit spreads/ICs: $50,000 (buying power used)
- Naked puts: $20,000 (buying power used)
- Max single position: $10,000 buying power
- Max single trade risk: $5,000`,
    },
    {
      type: 'warning',
      title: 'The Tech Concentration Problem',
      content: `Look at your watchlist: NVDA, META, GOOG, AMZN, SHOP, PLTR, QQQ, HOOD, RDDT, MELI.

**Notice something?** They're all correlated to tech/growth performance.

**What Happens in Tech Selloffs:**
- NVDA drops 10%
- META drops 8%
- GOOG drops 9%
- SHOP drops 15%
- PLTR drops 12%
- QQQ drops 7%
- ALL YOUR POSITIONS LOSE SIMULTANEOUSLY

**Real Example - 2022 Tech Crash:**
- NVDA: -66% peak to trough
- META: -77% peak to trough
- SHOP: -85% peak to trough

If you had iron condors or put spreads on all these during 2022, every position hit max loss at the same time.

**Correlation Risk Management:**
1. Limit tech exposure to 40-50% of positions
2. Add non-tech names (financials, healthcare, energy)
3. Use QQQ as a hedge indicator - if QQQ is weak, reduce tech positions
4. During high IV in tech, reduce position sizes
5. Stagger entries - don't open all tech positions the same week`,
    },
    {
      type: 'example',
      title: 'Position Size Calculation',
      stock: 'NVDA',
      content: `**Account: $100,000**
**Risk per trade: 2% = $2,000 max loss per position**

**Trade: NVDA Iron Condor**
- NVDA at $800
- Sell 740/730 put spread, Sell 860/870 call spread
- Credit: $3.00 per iron condor
- Max loss: $10 - $3 = $7.00 per contract = $700

**Position Sizing:**
Max loss allowed: $2,000
Max loss per contract: $700
Maximum contracts: $2,000 / $700 = 2.85 = 2 contracts

**Trade Size:**
- Open 2 iron condors
- Credit received: $600 (2 x $3.00 x 100)
- Max loss if tested: $1,400 (2 x $7.00 x 100)
- Actual risk: 1.4% of account

**Buying Power Required:**
- Margin for 2 iron condors: ~$1,400
- This fits within single position limits

**What NOT to do:**
Don't think "I'll open 5 contracts because I'm confident" - that's $3,500 at risk, exceeding your 2% rule. One bad trade shouldn't hurt this much.`,
    },
    {
      type: 'text',
      title: 'Max Position Size Rules',
      content: `Establish firm rules that you never violate, regardless of how confident you feel:

**Rule 1: The 2% Rule**
Never risk more than 2% of account on a single trade
- $50,000 account: Max risk = $1,000
- $100,000 account: Max risk = $2,000
- $500,000 account: Max risk = $10,000

**Rule 2: The 5% Rule for Aggressive Traders**
Maximum 5% risk, but only on highest-conviction setups
- Requires 3+ confirming signals
- Never more than 1 position at 5% risk at a time
- Reserved for A+ setups only

**Rule 3: The Capital Allocation Rule**
No single underlying should use more than 15% of buying power
- $100,000 account with $50,000 BP allocated to options
- Max per underlying: $7,500 BP

**Rule 4: The Sector Rule**
No single sector should exceed 40% of open positions
- If you have 10 positions, max 4 in same sector
- Prevents correlation blow-ups

**Rule 5: The High-Priced Stock Rule**
For expensive stocks, use spreads to control risk
- MELI at $1,800: naked put = $180,000 assignment risk
- Use spreads to cap max loss
- Or size down to 1 contract maximum`,
    },
    {
      type: 'example',
      title: 'Portfolio Diversification in Practice',
      content: `**$100,000 Account - Properly Sized Portfolio**

**Position 1: NVDA Iron Condor**
- Max loss: $1,400 (1.4% of account)
- Sector: Semiconductors

**Position 2: META Put Credit Spread**
- Max loss: $1,200 (1.2% of account)
- Sector: Social Media/Tech

**Position 3: QQQ Iron Condor**
- Max loss: $1,800 (1.8% of account)
- Sector: Broad Tech (diversified)

**Position 4: AMZN Put Credit Spread**
- Max loss: $1,600 (1.6% of account)
- Sector: E-commerce/Cloud

**Position 5: JPM Put Credit Spread**
- Max loss: $1,000 (1.0% of account)
- Sector: FINANCIALS (non-tech!)

**Position 6: XLE Iron Condor**
- Max loss: $1,100 (1.1% of account)
- Sector: ENERGY (non-tech!)

**Portfolio Analysis:**
- Total max loss if ALL hit: $8,100 (8.1% of account)
- Probability of all hitting max loss: Very low
- Expected max drawdown: 3-4% in normal conditions
- Tech exposure: 4/6 positions = 67% (could be lower)
- Adding JPM and XLE reduces correlation

**Stress Test:** If tech drops 20% in a week:
- NVDA, META, QQQ, AMZN positions stressed
- JPM and XLE likely flat or up
- Partial hedge from diversification`,
    },
    {
      type: 'tip',
      title: 'Position Sizing by IV and Market Conditions',
      content: `Adjust your position sizes based on market conditions:

**Low VIX Environment (VIX < 15):**
- Premiums are low
- Size DOWN because risk/reward is worse
- Consider 1.5% max risk instead of 2%
- Focus on fewer, higher-quality setups

**Normal VIX Environment (VIX 15-20):**
- Standard sizing applies
- 2% max risk
- Normal trade frequency

**High VIX Environment (VIX 20-30):**
- Premiums are elevated
- Better risk/reward
- Can maintain 2% sizing
- More opportunities available
- Be patient - don't chase every high-premium trade

**Extreme VIX Environment (VIX > 30):**
- Markets are in panic mode
- Size DOWN despite high premiums
- 1-1.5% max risk
- Gamma risk is extreme
- Spreads are wider, slippage is higher
- Wait for VIX to stabilize before normal sizing

**Individual Stock IV:**
- If a stock's IV rank is above 80, size down by 25%
- Very high IV often precedes big moves
- The premium looks great until the stock moves 20%`,
    },
    {
      type: 'exercise',
      title: 'Position Sizing Practice',
      content: `**Your Account: $75,000**
**Risk Tolerance: 2% per trade = $1,500 max risk**

Calculate the correct position size for each trade:

**Trade 1: GOOG 160/155 Put Credit Spread**
- Credit: $1.40
- Max loss per spread: $5 - $1.40 = $3.60 = $360
- How many contracts? $1,500 / $360 = 4.16 = **4 contracts max**
- Total max loss: $1,440 (1.92% of account) - ACCEPTABLE

**Trade 2: MELI 1750/1700 Put Credit Spread**
- Credit: $18.00
- Max loss per spread: $50 - $18 = $32.00 = $3,200
- How many contracts? $1,500 / $3,200 = 0.47 = **0 contracts!**
- Max loss exceeds your risk budget even at 1 contract
- Solution: Use narrower wings (1750/1730 = $20 wide)
  - New max loss: $2,000 - $1,800 = $200 (depending on premium)
  - Or skip this trade

**Trade 3: PLTR 22/20 Put Credit Spread**
- Credit: $0.50
- Max loss per spread: $2 - $0.50 = $1.50 = $150
- How many contracts? $1,500 / $150 = 10 contracts max
- But wait - check buying power and position limits
- 10 contracts on PLTR might be too large for the underlying
- Consider capping at 5-7 contracts

**Key Insight:** Position sizing isn't just about max loss - also consider buying power usage and underlying concentration.`,
    },
    {
      type: 'text',
      title: 'Scaling Into Positions',
      content: `Instead of putting on your full position at once, consider scaling in:

**The Scaling Approach:**
- Enter with 50% of intended position
- Add remaining 50% if trade moves in your favor
- Or add on a pullback to better levels

**Benefits of Scaling:**
1. Reduces timing risk
2. Better average entry if you add on pullback
3. Forces patience
4. Smaller initial commitment

**Example: Scaling into QQQ Iron Condor**

Full intended position: 4 contracts
Entry 1: Open 2 contracts at 45 DTE
Entry 2: Open 2 more contracts at 35 DTE if position is working

**When to Use Scaling:**
- Uncertain market conditions
- New strategy you're testing
- Larger than normal position size
- Elevated IV with potential for more expansion

**When NOT to Scale:**
- Low IV - get full position on
- High conviction setup with multiple confirmations
- Short DTE where you need full theta collection
- Position size is already small (1-2 contracts)`,
    },
  ],
  quiz: [
    {
      id: 'w3d19q1',
      question:
        'With a $100,000 account and 2% risk rule, what is your maximum loss allowed per trade?',
      options: ['$500', '$1,000', '$2,000', '$5,000'],
      correctAnswer: 2,
      explanation:
        '$100,000 x 2% = $2,000 maximum risk per trade. This means if your trade hits max loss, you should lose no more than $2,000.',
      difficulty: 'easy',
    },
    {
      id: 'w3d19q2',
      question:
        'Your put credit spread has a max loss of $450 per contract. With a $50,000 account and 2% risk rule ($1,000), how many contracts should you trade?',
      options: ['1 contract', '2 contracts', '3 contracts', '5 contracts'],
      correctAnswer: 1,
      explanation:
        '$1,000 max risk / $450 per contract = 2.22. Round down to 2 contracts for a max loss of $900, which is within your 2% risk budget.',
      difficulty: 'easy',
    },
    {
      id: 'w3d19q3',
      question:
        'Why is tech concentration particularly dangerous for options sellers?',
      options: [
        'Tech stocks have lower volatility',
        'Tech stocks are correlated - they often move together, causing multiple positions to lose simultaneously',
        'Tech stocks have lower premiums',
        'Tech stocks never have earnings',
      ],
      correctAnswer: 1,
      explanation:
        'Tech stocks are highly correlated, especially during market selloffs. When tech sells off, stocks like NVDA, META, GOOG, SHOP, and QQQ all drop together, causing all your positions to hit max loss at the same time.',
      difficulty: 'medium',
    },
    {
      id: 'w3d19q4',
      question:
        'In a high VIX environment (VIX > 30), how should you adjust your position sizing?',
      options: [
        'Increase position sizes because premiums are higher',
        'Maintain normal sizing - VIX does not affect sizing',
        'Decrease position sizes because markets are unstable',
        'Stop trading entirely',
      ],
      correctAnswer: 2,
      explanation:
        'When VIX is very high, markets are volatile and unpredictable. Despite attractive premiums, you should decrease position sizes because gamma risk is elevated, bid-ask spreads are wider, and large moves can happen quickly.',
      difficulty: 'medium',
    },
    {
      id: 'w3d19q5',
      question:
        'What is the recommended maximum percentage of buying power to allocate to a single underlying?',
      options: ['5%', '15%', '35%', '50%'],
      correctAnswer: 1,
      explanation:
        'No single underlying should use more than 15% of your buying power. This prevents a catastrophic event in one stock from destroying your portfolio. Diversification across underlyings is essential for risk management.',
      difficulty: 'hard',
    },
  ],
}
