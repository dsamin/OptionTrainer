import type { LessonContent } from '../index'

export const day18: LessonContent = {
  day: 18,
  week: 3,
  title: 'Rolling Strategies',
  description:
    'Master the art of rolling options positions to manage risk, avoid assignment, and extend profitable trades. Learn when rolling makes sense and when to accept a loss.',
  duration: 45,
  keyPoints: [
    'Rolling is closing one option and opening another in a single transaction',
    'Roll for a credit whenever possible - rolling for a debit adds to losses',
    'Rolling out adds time; rolling up/down changes strike price',
    'The cost of rolling includes bid-ask spreads and opportunity cost',
    'Sometimes accepting a loss is better than rolling into a worse position',
  ],
  yourStocks: ['NVDA', 'META', 'GOOG', 'QQQ', 'SHOP', 'AMZN'],
  content: [
    {
      type: 'text',
      title: 'Understanding Rolling Mechanics',
      content: `Rolling is a defensive adjustment technique where you close your current option position and simultaneously open a new position. It's essentially two trades executed together.

**The Rolling Transaction:**
1. Buy to close your current short option (at a loss typically)
2. Sell to open a new option (collecting new premium)

**Net Result:**
If the new premium exceeds your closing cost, you roll for a NET CREDIT.
If the closing cost exceeds new premium, you roll for a NET DEBIT.

**Types of Rolls:**

**Roll Out (Time):**
- Same strike, later expiration
- Adds time to the position
- Usually done for a credit (later expiration = more extrinsic value)

**Roll Down (Puts) / Roll Up (Calls):**
- Different strike, same expiration
- Moves strike further from current price
- Often done for a debit (moving OTM requires paying)

**Roll Down and Out / Roll Up and Out:**
- Different strike AND later expiration
- Most common defensive roll
- Combines more time with better strike placement
- Can often achieve a credit`,
    },
    {
      type: 'text',
      title: 'When to Roll',
      content: `Rolling should be a strategic decision, not an emotional reaction to a losing trade. Here are the criteria for when rolling makes sense:

**Roll When:**
1. Your fundamental thesis is still intact
   - Stock is down but company fundamentals haven't changed
   - Temporary market selloff, not company-specific bad news

2. You can roll for a credit or even money
   - Collecting more premium improves your break-even
   - Rolling for a debit adds to your losses

3. Technical support/resistance levels still exist
   - Stock is approaching a level where it might bounce
   - Your new strike aligns with technical levels

4. The new position has a favorable risk/reward
   - New delta is reasonable (not too high)
   - Enough DTE for theta decay

5. You have the capital and margin for the extended trade
   - Rolling extends your exposure
   - Make sure you can afford the continued risk

**Do NOT Roll When:**
1. Fundamental thesis has changed (bad earnings, guidance cut)
2. You can only roll for a significant debit
3. You've already rolled 2-3 times on this position
4. The stock is in a clear technical breakdown
5. Rolling would tie up capital you need elsewhere`,
    },
    {
      type: 'example',
      title: 'Roll Out Example on META',
      stock: 'META',
      content: `**Initial Position:**
- Sold META 480 put for $6.00
- 30 DTE
- META at $520

**Situation at 10 DTE:**
- META dropped to $490 (just above strike)
- 480 put now worth $8.00 (showing $2.00 loss)
- Delta has increased from 18 to 35
- Position is concerning but not critical

**Roll Out Decision:**
- Buy to close 480 put @ $8.00 (10 DTE)
- Sell to open 480 put @ $11.50 (38 DTE)
- Net credit: $3.50

**Analysis:**
- Same strike (480), more time (38 DTE vs 10 DTE)
- Collected $3.50 additional credit
- Total credit now: $6.00 + $3.50 = $9.50
- New break-even: $480 - $9.50 = $470.50
- Gave yourself 28 more days for META to stay above $480

**Why This Works:**
The 38 DTE option has significantly more extrinsic value than the 10 DTE option. By rolling out, you capture this time value difference as a credit while giving the position more time to work.`,
    },
    {
      type: 'example',
      title: 'Roll Down and Out on NVDA',
      stock: 'NVDA',
      content: `**Initial Position:**
- Sold NVDA 750 put for $12.00
- 35 DTE
- NVDA at $820

**Situation at 14 DTE:**
- NVDA dropped to $730 (below strike - ITM)
- 750 put now worth $28.00 (showing $16.00 loss)
- Delta has spiked to 65
- Extrinsic value only $8.00
- Assignment risk is real

**Roll Down and Out Decision:**
- Buy to close 750 put @ $28.00 (14 DTE)
- Sell to open 700 put @ $32.00 (42 DTE)
- Net credit: $4.00

**Analysis:**
- Rolled strike down $50 (750 to 700)
- Rolled out 28 days (14 DTE to 42 DTE)
- Collected $4.00 additional credit
- Total credit: $12.00 + $4.00 = $16.00
- New break-even: $700 - $16 = $684

**Position Improvement:**
- Short strike moved from $20 ITM to $30 OTM
- New delta: ~25 (vs previous 65)
- Extrinsic value restored (full 42 DTE)
- Break-even improved by $66 ($750 - $12 = $738 vs $700 - $16 = $684)

This is the power of rolling down and out - you dramatically improve your position while collecting more credit.`,
    },
    {
      type: 'text',
      title: 'The True Cost of Rolling',
      content: `Rolling isn't free. Understanding the real costs helps you make better decisions.

**Direct Costs:**

1. **Bid-Ask Spread:**
   - You pay the spread to close (buy at ask)
   - You pay the spread to open (sell at bid)
   - On illiquid options, this can be $0.10-$0.50 per leg
   - Total cost: 4 spreads (2 legs x 2 transactions)

2. **Commissions:**
   - Four option contracts transacted
   - Even at $0.65/contract, that's $2.60 per roll

**Indirect Costs:**

3. **Opportunity Cost:**
   - Capital remains tied up in this position
   - Could have closed and deployed capital elsewhere
   - Time spent managing instead of finding new trades

4. **Extended Risk Exposure:**
   - Rolling out means longer exposure to adverse moves
   - More time for black swan events
   - Additional earnings cycles may come into play

5. **Psychological Cost:**
   - Being stuck in a trade affects your mindset
   - May lead to overtrading or revenge trading
   - Mental energy spent on losing position

**Calculating True Roll Cost:**
If rolling 750/700 put spread:
- Bid-ask on 750 put: $0.30 wide
- Bid-ask on 700 put: $0.25 wide
- Commissions: $2.60
- Slippage estimate: $0.20

True cost beyond stated credit: ~$0.75 + $2.60 = ~$35 per spread`,
    },
    {
      type: 'warning',
      title: 'The Rolling Trap',
      content: `Rolling can become a trap that turns small losses into large ones. Watch for these warning signs:

**You're in a Rolling Trap If:**
1. You've rolled the same position 3+ times
2. Each roll is for a smaller credit (or now debits)
3. Your break-even keeps getting worse
4. The stock is in a clear downtrend (for puts) or uptrend (for calls)
5. You're rolling past earnings or major events
6. Your position size has grown from rolling

**The Sunk Cost Fallacy:**
Just because you've already lost money doesn't mean you should keep rolling. Each roll should be evaluated as a new trade:

"Would I enter this new position if I had no existing exposure?"

If the answer is no, close the position and accept the loss.

**Example of a Rolling Trap:**
- Roll 1: 750 put to 730 put, +$3.00 credit
- Roll 2: 730 put to 710 put, +$1.50 credit
- Roll 3: 710 put to 690 put, +$0.50 credit
- Roll 4: 690 put to 670 put, -$1.00 debit (NOW PAYING)

You've now rolled 4 times, each time for less benefit. The stock is clearly in a downtrend. Close the position.`,
    },
    {
      type: 'example',
      title: 'When NOT to Roll: SHOP Example',
      stock: 'SHOP',
      content: `**Initial Position:**
- Sold SHOP 75 put for $2.50
- 30 DTE
- SHOP at $82

**The Downtrend:**
- Week 1: SHOP drops to $78 on e-commerce weakness
- Week 2: SHOP drops to $72 (below strike)
- Week 3: SHOP drops to $66 after earnings miss

**Rolling Attempts:**
- Roll 1 (at $72): 75 put to 70 put, +$1.00 credit
- Roll 2 (at $68): 70 put to 65 put, +$0.50 credit
- Roll 3 (at $66): 65 put to 60 put, -$0.50 debit

**Current State:**
- Now short 60 put
- Total credits: $2.50 + $1.00 + $0.50 - $0.50 = $3.50
- SHOP at $66, showing loss despite rolls
- Fundamentals changed (earnings miss)

**The Right Decision:**
Should have closed after Roll 1 or Roll 2.

**Mistake Analysis:**
1. Rolled into deteriorating fundamentals (earnings miss)
2. Each roll was for less credit
3. Technical breakdown (no support levels held)
4. By Roll 3, paying debit = adding to losses

**Better Approach:**
After earnings miss, close position. Accept $10-15 loss instead of continuing to roll into a $25+ loss.

**Lesson:** Fundamentals > Rolling. When the thesis breaks, exit.`,
    },
    {
      type: 'text',
      title: 'Rolling Credit Spreads',
      content: `Rolling credit spreads is more complex than rolling single options because you have two legs to manage.

**Options for Rolling Credit Spreads:**

1. **Roll the Entire Spread:**
   - Close both legs
   - Open new spread at later expiration
   - Often done for a credit if rolling out in time

2. **Roll Only the Short Leg:**
   - Keep the long leg (it's already cheap)
   - Roll short leg to better strike
   - Creates a calendar/diagonal element
   - Advanced technique with additional risk

3. **Roll to a Wider Spread:**
   - Same strikes but move the long leg further out
   - Increases max loss but collects more credit
   - Only do if very confident in direction

**Put Credit Spread Roll Example:**
Original: AMZN 180/175 put spread @ $1.50 credit (14 DTE)
AMZN drops, spread now worth $3.00 (showing $1.50 loss)

Roll to: AMZN 175/170 put spread @ $2.00 credit (42 DTE)
- Close 180/175 @ $3.00 (lose $1.50)
- Open 175/170 @ $2.00 (new credit)
- Net: Lost $1.00 on the roll

But now:
- Short strike moved from 180 to 175 (improvement)
- More time for recovery (42 DTE vs 14 DTE)
- New break-even: $175 - $2.00 = $173

Sometimes rolling for a small debit is acceptable if the new position is significantly better.`,
    },
    {
      type: 'tip',
      title: 'Rolling Decision Framework',
      content: `Use this checklist before any roll:

**Step 1: Thesis Check**
- Is my original thesis still valid?
- Have fundamentals changed? (Earnings, news, guidance)
- If thesis broken = CLOSE, don't roll

**Step 2: Technical Check**
- Is there a support/resistance level for my new strike?
- Is the trend still favorable or has it reversed?
- If technical breakdown = CLOSE, don't roll

**Step 3: Credit Check**
- Can I roll for a credit?
- At minimum, can I roll for even money?
- If only debit available = probably CLOSE

**Step 4: Position Check**
- Have I already rolled this position before?
- How many times? (Max 2 rolls recommended)
- If rolled 2+ times = CLOSE

**Step 5: Capital Check**
- Is my capital better used elsewhere?
- Am I rolling because of ego or strategy?
- What's the opportunity cost?

**Final Decision:**
If 4+ checks are positive = Roll
If 2-3 checks are positive = Case-by-case
If 0-1 checks are positive = Close the position`,
    },
    {
      type: 'exercise',
      title: 'Rolling Decision Practice',
      content: `Evaluate these scenarios and decide: ROLL or CLOSE?

**Scenario 1: QQQ Put Spread**
- Original: 380/375 put spread @ $1.80 credit
- Current: 18 DTE, QQQ at $382 (near short strike)
- Spread worth $2.50
- Can roll to 375/370 at 46 DTE for $0.50 credit
- No fundamental news, just market pullback
**Answer: ROLL** - Thesis intact, can roll for credit, only first roll

**Scenario 2: GOOG Put**
- Original: 165 put @ $4.00 credit
- Current: 10 DTE, GOOG at $158 (ITM)
- Put worth $9.50
- Already rolled once before
- GOOG just missed earnings and cut guidance
**Answer: CLOSE** - Fundamental thesis broken (earnings miss), already rolled once

**Scenario 3: META Call Spread**
- Original: 600/610 call spread @ $2.50 credit
- Current: 21 DTE, META at $612 (ITM)
- Spread worth $5.50
- Can roll to 620/630 at 49 DTE for $0.30 credit
- META rallying on AI advertising growth
**Answer: CASE-BY-CASE** - Credit is small, thesis may be broken (continued rally), but first roll. Consider closing if META momentum is strong.`,
    },
  ],
  quiz: [
    {
      id: 'w3d18q1',
      question:
        'What does "rolling down and out" mean for a put option?',
      options: [
        'Moving to a higher strike and earlier expiration',
        'Moving to a lower strike and later expiration',
        'Moving to the same strike and later expiration',
        'Moving to a higher strike and later expiration',
      ],
      correctAnswer: 1,
      explanation:
        'Rolling down and out means moving your short put to a LOWER strike price (down) and a LATER expiration (out). This gives the stock more room to recover and more time for the position to work.',
      difficulty: 'easy',
    },
    {
      id: 'w3d18q2',
      question:
        'You can roll your 800 put to a 780 put with 28 more DTE for a $3.00 credit. Why is this generally a good roll?',
      options: [
        'Because the stock price will definitely recover',
        'Because you collect additional credit while improving your strike',
        'Because it guarantees a profit',
        'Because it reduces your margin requirement',
      ],
      correctAnswer: 1,
      explanation:
        'Rolling for a credit while moving to a better strike (further OTM) improves your position in two ways: the credit lowers your break-even price, and the lower strike gives you more cushion before the option goes ITM.',
      difficulty: 'easy',
    },
    {
      id: 'w3d18q3',
      question:
        'What is a sign that you are caught in a "rolling trap"?',
      options: [
        'You roll for a large credit',
        'Each subsequent roll is for less credit or requires a debit',
        'You have only rolled once',
        'The stock has stabilized near your strike',
      ],
      correctAnswer: 1,
      explanation:
        'A rolling trap is indicated when each roll generates less credit than the previous one, or when you have to pay a debit to roll. This pattern suggests the stock is trending against you and rolling is just delaying the inevitable loss.',
      difficulty: 'medium',
    },
    {
      id: 'w3d18q4',
      question:
        'Your NVDA put is ITM after an earnings miss and guidance cut. You can roll for a small credit. What should you do?',
      options: [
        'Roll because you can collect a credit',
        'Roll because NVDA always recovers',
        'Close the position because the fundamental thesis has changed',
        'Roll and double your position size',
      ],
      correctAnswer: 2,
      explanation:
        'When fundamentals change (earnings miss, guidance cut), your original thesis is no longer valid. Even if you can roll for a credit, you are rolling into a fundamentally impaired situation. Close the position and accept the loss.',
      difficulty: 'hard',
    },
    {
      id: 'w3d18q5',
      question:
        'What are the "hidden costs" of rolling that traders often overlook?',
      options: [
        'Only the commission cost',
        'Bid-ask spreads, commissions, opportunity cost, and extended risk exposure',
        'Just the premium difference',
        'There are no hidden costs if you roll for a credit',
      ],
      correctAnswer: 1,
      explanation:
        'Hidden costs include: bid-ask spreads on 4 option legs (2 to close, 2 to open), commissions on all contracts, opportunity cost of capital tied up, extended time exposure to adverse events, and psychological costs of managing a losing position.',
      difficulty: 'hard',
    },
  ],
}
