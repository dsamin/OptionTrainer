import type { LessonContent } from '../index'

export const day17: LessonContent = {
  day: 17,
  week: 3,
  title: 'Managing Assignments',
  description:
    'Understand when assignment happens, how to roll to avoid it, and how to handle assignment profitably when it occurs. Includes real case studies from MELI, META, and NVDA assignments.',
  duration: 55,
  keyPoints: [
    'Assignment typically occurs when options are ITM and have little extrinsic value',
    'Early assignment is more likely near ex-dividend dates and at expiration',
    'Rolling before assignment is usually preferable to being assigned',
    'If assigned, you can manage the position or let shares get called away',
    'Assignment is not a disaster - it is a manageable event with clear strategies',
  ],
  yourStocks: ['MELI', 'META', 'NVDA', 'GOOG', 'AMZN'],
  content: [
    {
      type: 'text',
      title: 'When Assignment Happens',
      content: `Understanding assignment mechanics prevents panic when it occurs. Assignment is when the option holder exercises their right, and you (the seller) must fulfill your obligation.

**Put Assignment (You sold a put):**
- You must BUY 100 shares at the strike price
- Happens when put is ITM (stock below strike)
- You now own shares at your strike price

**Call Assignment (You sold a call):**
- You must SELL 100 shares at the strike price
- Happens when call is ITM (stock above strike)
- Your shares are sold at the strike price

**Assignment Is Most Likely When:**
1. Option is deep ITM (high intrinsic value)
2. Little extrinsic value remaining (time value < $0.05)
3. Approaching expiration (especially last week)
4. Near ex-dividend date (for calls on dividend stocks)
5. Interest rates are high (puts may be exercised early for cash)

**The Extrinsic Value Rule:**
Options with significant extrinsic (time) value rarely get exercised early. Why? The holder would lose that time value by exercising.

If your short 450 put on META is trading at $12.00 and has $2.00 of extrinsic value, the holder is better off selling the option than exercising. But if extrinsic value drops to $0.03, early exercise becomes likely.`,
    },
    {
      type: 'warning',
      title: 'Dividend Risk for Call Sellers',
      content: `If you're short a call on a dividend-paying stock, beware of ex-dividend dates!

**Why Calls Get Assigned Before Dividends:**
The call holder may exercise to capture the dividend. If the dividend exceeds the remaining extrinsic value in the call, exercise is profitable for them.

**Example:**
- You're short AMZN 180 calls
- AMZN at $185, ex-dividend tomorrow
- Dividend: $0.50
- Call trading at $5.20 with only $0.20 extrinsic value

The call holder can exercise, buy shares at $180, collect the $0.50 dividend, and is better off than selling the call for $5.20.

**Prevention:**
- Close ITM short calls the day before ex-dividend
- Roll out short calls before dividend date
- Factor dividend dates into your trading calendar

Note: Most tech stocks (NVDA, META, GOOG) don't pay dividends or pay very small ones, so this is less of a concern for your watchlist.`,
    },
    {
      type: 'text',
      title: 'Rolling to Avoid Assignment',
      content: `Rolling is the best way to avoid assignment while staying in a similar position. You're closing the current option and opening a new one further out in time.

**When to Roll:**
- Option is ITM but you still have a bullish/bearish thesis
- Extrinsic value is declining rapidly (below $0.50)
- You want to avoid taking on shares (capital reasons)
- You can roll for a credit or even money

**How to Roll:**
1. Buy to close your current short option
2. Sell to open a new option at a later expiration

**Roll Down and Out (Puts):**
- Current short put is ITM
- Roll to a LOWER strike AND later expiration
- Often can be done for a credit

**Roll Up and Out (Calls):**
- Current short call is ITM
- Roll to a HIGHER strike AND later expiration
- Often can be done for a credit

**The Roll Credit Rule:**
Only roll if you can collect additional credit. Rolling for a debit is adding to a losing trade - often better to close and accept the loss.`,
    },
    {
      type: 'example',
      title: 'Rolling to Avoid Assignment on NVDA',
      stock: 'NVDA',
      content: `**Situation:**
- You sold NVDA 700 put at 30 DTE for $8.00 credit
- NVDA dropped to $680, now 10 DTE
- 700 put now worth $24.00 (showing $16.00 loss)
- Extrinsic value: only $4.00
- You don't want to own 100 shares of NVDA at $700 ($70,000 capital)

**Roll Analysis:**
- Buy to close 700 put @ $24.00 (10 DTE)
- Sell to open 680 put @ $28.00 (38 DTE)
- Net credit: $4.00

**Result:**
- Rolled down $20 (from 700 to 680 strike)
- Rolled out 28 days (from 10 DTE to 38 DTE)
- Collected additional $4.00 credit
- New break-even: $680 - $12 total credit = $668
- Avoided assignment and $70,000 capital tie-up

**Why This Works:**
The 38 DTE option has more extrinsic value than the 10 DTE option, allowing you to collect a credit while moving to a better strike.`,
    },
    {
      type: 'text',
      title: 'Handling Assignment Profitably',
      content: `Sometimes assignment happens despite your best efforts, or you may choose to accept it. Here's how to handle it:

**When Assigned on a Put (You Now Own Shares):**

Option 1: Sell Covered Calls
- You own shares at your strike price (cost basis)
- Sell calls against your shares to reduce cost basis
- Target strikes above your cost basis
- This turns the position into a covered call / wheel strategy

Option 2: Hold the Shares
- If you're bullish on the stock long-term
- Set a stop-loss to limit downside
- Your effective purchase price includes the premium received

Option 3: Sell Immediately
- If your thesis has changed
- If the stock is in a clear downtrend
- Accept the loss and move on

**When Assigned on a Call (Shares Called Away):**
- Your shares are sold at the strike price
- You keep the premium received
- If you want to stay long, buy shares back or sell puts

**Cost Basis Calculation:**
Your true cost basis when assigned on a put:
Strike Price - Premium Received = Effective Cost Basis

Example: Assigned on META 500 put, received $8.00 premium
Effective cost basis: $500 - $8 = $492 per share`,
    },
    {
      type: 'example',
      title: 'Case Study: MELI Put Assignment',
      stock: 'MELI',
      content: `**The Setup:**
- Sold MELI 1600 put for $45.00 credit (30 DTE)
- MELI was at $1,700 at entry
- Thesis: MELI would hold above $1,600 support

**What Happened:**
- MELI dropped on Latin America economic concerns
- Fell to $1,520, put went deep ITM
- At 7 DTE, extrinsic value dropped to $5.00
- Rolled twice but MELI kept dropping
- Eventually assigned at $1,600

**Assignment Reality:**
- Paid $160,000 for 100 shares of MELI
- Effective cost basis: $1,600 - $45 - $12 (roll credits) = $1,543
- MELI trading at $1,520 (on paper loss of $2,300)

**Recovery Strategy:**
Started selling covered calls:
- Week 1: Sold 1600 call for $18 (OTM at the time)
- Week 2: MELI at $1,540, sold 1580 call for $22
- Week 3: MELI rallied to $1,620, shares called away at $1,580
- Total call premium collected: $40

**Final Result:**
- Bought at effective $1,543
- Sold at $1,580
- Gain: $37 per share = $3,700 profit
- What looked like a losing trade became profitable through management

**Lesson:** Assignment is not the end. Strategic covered call selling can turn losers into winners.`,
    },
    {
      type: 'example',
      title: 'Case Study: META Call Assignment',
      stock: 'META',
      content: `**The Setup:**
- Owned 100 shares of META at $380 cost basis
- Sold 520 covered call for $6.00 (45 DTE)
- META was at $495 at entry

**What Happened:**
- META rallied on strong advertising revenue
- Stock hit $560 before expiration
- Call went deep ITM, assigned at expiration

**Assignment Reality:**
- Shares called away at $520
- Profit on shares: $520 - $380 = $140/share
- Plus call premium: $6/share
- Total profit: $146/share = $14,600

**The "Problem":**
META continued to $600 after assignment
- "Missed" $80/share of upside
- But still made $14,600 profit

**Key Insight:**
Getting called away on a covered call is not losing. You made money. The opportunity cost of missing further upside is not the same as a loss.

**Recovery if Still Bullish:**
- Wait for pullback
- Sell put at strike you'd like to re-enter (e.g., 550 put)
- If assigned, you own META again
- If not assigned, keep the premium
- This is the "wheel strategy" in action`,
    },
    {
      type: 'example',
      title: 'Case Study: NVDA Put Assignment During Drawdown',
      stock: 'NVDA',
      content: `**The Setup:**
- Sold NVDA 800 put for $22.00 (35 DTE)
- NVDA was at $880 (put was 25 delta)
- Support level at $820

**What Happened:**
- Semiconductor sector sold off on China concerns
- NVDA dropped from $880 to $720 in 3 weeks
- Support at $820 failed completely
- Put went from $22 to $95, deep ITM

**Rolling Attempts:**
- At $780: Tried to roll 800 put to 750 put, could only do for $5 debit (rejected)
- At $740: No reasonable roll available
- Decided to accept assignment

**Assignment Reality:**
- Assigned 100 shares at $800
- Effective cost: $800 - $22 = $778 per share
- NVDA at $720 (paper loss of $5,800)

**Recovery Strategy (Aggressive):**
- Sold 750 calls for $32 (14 DTE) - above current price but below cost
- NVDA bounced to $765, called away
- Loss on shares: $778 - $750 = $28/share
- Call premium received: $32/share
- Net result: +$4/share = $400 profit

**Alternative Strategy (Conservative):**
Could have:
- Held shares, sold 800+ calls (above cost basis)
- Waited for full recovery
- Slower but guaranteed no loss if patient

**Lesson:** Even catastrophic drops can be managed. Selling calls above current price (but below cost) can accelerate recovery while accepting capped upside.`,
    },
    {
      type: 'tip',
      title: 'Assignment Preparation Checklist',
      content: `Before selling any put, answer these questions:

1. **Do I have the capital to own 100 shares?**
   - MELI 1600 put = $160,000 if assigned
   - NVDA 800 put = $80,000 if assigned
   - If no, use defined-risk spreads instead

2. **Am I willing to own this stock at this price?**
   - Only sell puts on stocks you want to own
   - Your strike price should be a price you consider a good value

3. **What's my plan if assigned?**
   - Sell covered calls immediately?
   - Hold for long-term?
   - Sell shares with stop-loss?

4. **What strike will I sell calls at if assigned?**
   - Know your covered call strategy in advance
   - Above cost basis for conservative
   - Below cost basis for aggressive recovery

5. **How does assignment affect my portfolio balance?**
   - One NVDA assignment = $80,000 in one stock
   - Consider position size implications`,
    },
    {
      type: 'exercise',
      title: 'Assignment Scenario Analysis',
      content: `**Scenario:**
You sold a GOOG 170 put for $5.50 credit when GOOG was at $180.
GOOG has dropped to $162 with 3 DTE.
Your put is now worth $9.20.
Extrinsic value is $1.20.

**Questions:**
1. What is the probability of assignment? (High - ITM with low extrinsic value)

2. If assigned, what is your effective cost basis? ($170 - $5.50 = $164.50)

3. If you're assigned at $170 and GOOG is at $162, what's your paper loss? ($164.50 - $162 = $2.50/share = $250)

4. What call strike should you consider selling first? ($165-$170 range - close to money for high premium)

5. Should you try to roll?
   - Check: Can you roll to 160 put at 30 DTE for a credit?
   - If yes (e.g., 160 put at 30 DTE = $10.50), roll for net credit of $1.30
   - If no reasonable roll exists, accept assignment

**Decision Framework:**
- Roll if credit available and thesis intact
- Accept assignment if you want to own shares
- Close for loss if thesis is broken (e.g., GOOG fundamentally impaired)`,
    },
  ],
  quiz: [
    {
      id: 'w3d17q1',
      question:
        'When is early assignment MOST likely to occur?',
      options: [
        'When the option has high extrinsic value',
        'When the option is deep ITM with little extrinsic value',
        'When the stock is at the strike price',
        'When there are 45+ DTE remaining',
      ],
      correctAnswer: 1,
      explanation:
        'Early assignment is most likely when the option is deep in-the-money with little extrinsic (time) value remaining. Option holders have no incentive to exercise when significant extrinsic value exists, as they would forfeit that value.',
      difficulty: 'easy',
    },
    {
      id: 'w3d17q2',
      question:
        'You sold a META 500 put and collected $12.00 premium. If assigned, what is your effective cost basis per share?',
      options: ['$500', '$512', '$488', '$506'],
      correctAnswer: 2,
      explanation:
        'Effective cost basis = Strike Price - Premium Received. So $500 - $12 = $488 per share. The premium you collected reduces your effective purchase price.',
      difficulty: 'easy',
    },
    {
      id: 'w3d17q3',
      question:
        'Your short NVDA 750 put is ITM and you want to roll. Which roll is ideal?',
      options: [
        'Roll to 750 put at same expiration',
        'Roll to 780 put at later expiration for a credit',
        'Roll to 720 put at later expiration for a credit',
        'Roll to 750 put at later expiration for a debit',
      ],
      correctAnswer: 2,
      explanation:
        'The ideal roll is down and out for a credit. Rolling to a lower strike (720) and later expiration, while collecting a credit, improves your position by lowering your effective cost basis and giving more time for the stock to recover.',
      difficulty: 'medium',
    },
    {
      id: 'w3d17q4',
      question:
        'You are assigned on a put and now own 100 shares below your cost basis. What is the MOST common recovery strategy?',
      options: [
        'Immediately sell shares at a loss',
        'Buy more shares to average down',
        'Sell covered calls against the shares',
        'Buy protective puts',
      ],
      correctAnswer: 2,
      explanation:
        'Selling covered calls against assigned shares is the most common recovery strategy. It generates premium income that reduces your cost basis and can help you profit even if shares are eventually called away below your original cost basis.',
      difficulty: 'medium',
    },
    {
      id: 'w3d17q5',
      question:
        'Why should you be especially cautious about short calls before ex-dividend dates?',
      options: [
        'Dividends always cause stock prices to rise',
        'Call holders may exercise early to capture the dividend',
        'Put holders will exercise their options',
        'Option prices are not affected by dividends',
      ],
      correctAnswer: 1,
      explanation:
        'Before ex-dividend dates, call holders may exercise early to capture the dividend, especially if the dividend exceeds the remaining extrinsic value in the call. This is why ITM short calls should be closed or rolled before ex-dividend dates.',
      difficulty: 'hard',
    },
  ],
}
