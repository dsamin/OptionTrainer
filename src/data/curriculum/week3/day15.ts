import type { LessonContent } from '../index'

export const day15: LessonContent = {
  day: 15,
  week: 3,
  title: 'Iron Condor Optimization',
  description:
    'Master the art of structuring iron condors for maximum profitability while managing risk through proper wing width selection and adjustment strategies.',
  duration: 45,
  keyPoints: [
    'Wing width determines risk/reward profile',
    'Wider wings = higher max profit but more capital at risk',
    'Adjustment triggers prevent small losses from becoming large ones',
    'Knowing when to close early protects profits and limits drawdowns',
    'Delta of short strikes should align with your probability targets',
  ],
  yourStocks: ['NVDA', 'META', 'GOOG', 'QQQ', 'AMZN'],
  content: [
    {
      type: 'text',
      title: 'Understanding Wing Width Selection',
      content: `Wing width is one of the most critical decisions when structuring an iron condor. The distance between your short and long strikes directly impacts your maximum profit, maximum loss, and capital requirements.

**Narrow Wings ($5 wide on high-priced stocks, $2.50-$5 on lower-priced)**
- Lower max profit per contract
- Lower max loss per contract
- Higher probability of profit (closer long strike provides protection faster)
- Less capital required (lower margin)
- Better for: Smaller accounts, more conservative traders

**Wide Wings ($10-$20 wide)**
- Higher max profit per contract
- Higher max loss per contract
- Lower probability of profit (protection kicks in later)
- More capital required
- Better for: Larger accounts, experienced traders who actively manage

For a stock like NVDA trading at $800, a $10 wide wing means your long options are $10 away from your shorts. If NVDA moves significantly, you're exposed to more loss before the long strike provides meaningful protection.`,
    },
    {
      type: 'example',
      title: 'Wing Width Comparison on NVDA',
      stock: 'NVDA',
      content: `NVDA at $800, 30 DTE Iron Condor:

**Narrow Wings ($10 wide):**
- Sell 760/750 put spread, Sell 840/850 call spread
- Credit received: $3.20
- Max loss: $10 - $3.20 = $6.80
- Margin required: ~$680 per iron condor
- Probability of profit: ~72%

**Wide Wings ($20 wide):**
- Sell 760/740 put spread, Sell 840/860 call spread
- Credit received: $4.80
- Max loss: $20 - $4.80 = $15.20
- Margin required: ~$1,520 per iron condor
- Probability of profit: ~68%

Notice the wide wings collect 50% more premium but risk more than 2x the capital. The risk/reward per dollar invested is often better with narrow wings.`,
    },
    {
      type: 'tip',
      title: 'Wing Width Rule of Thumb',
      content: `For stocks in your watchlist, use these wing width guidelines:

- **QQQ** ($400-500 range): $5-$10 wings work well
- **NVDA, META, GOOG** ($100-800+ range): $10-$20 wings
- **MELI** ($1,500+ range): $20-$25 wings due to higher dollar moves
- **SHOP, PLTR, HOOD, RDDT** ($20-80 range): $2.50-$5 wings

Match wing width to expected move. If a stock's expected move (from IV) is $50, don't use $5 wings - you'll hit max loss too easily.`,
    },
    {
      type: 'text',
      title: 'Adjustment Triggers',
      content: `Waiting until expiration to see if your iron condor works is a recipe for disaster. You need clear triggers that tell you when to adjust or close.

**Delta-Based Triggers:**
The most reliable adjustment trigger is when your short strike delta exceeds a threshold. When you sold the condor, your short strikes likely had 15-20 delta. If that grows to 30-35 delta, you're in trouble.

**Trigger levels:**
- **25 delta on short strike**: Yellow flag - start monitoring closely
- **30 delta on short strike**: Orange flag - prepare adjustment order
- **35+ delta on short strike**: Red flag - adjust immediately or close

**Percentage of Credit Triggers:**
Another approach is watching your P/L:
- If position shows loss equal to 1x your credit received: Consider adjustment
- If position shows loss equal to 2x your credit received: Adjust or close
- If position shows loss equal to 3x your credit received: Close immediately

**Days to Expiration Triggers:**
Time amplifies gamma risk:
- 21+ DTE: More time to recover, can be patient
- 14-21 DTE: Monitor closely, small adjustments okay
- 7-14 DTE: Tight management needed
- <7 DTE: Consider closing profitable side, rolling tested side`,
    },
    {
      type: 'example',
      title: 'Adjustment Trigger in Action on META',
      stock: 'META',
      content: `You opened an iron condor on META at $500:
- Sold 460/450 put spread (16 delta on short put)
- Sold 540/550 call spread (16 delta on short call)
- Credit received: $2.80
- 30 DTE

**Day 5:** META rallies to $520 on strong earnings guidance
- Short 540 call now at 32 delta (was 16)
- Short 460 put now at 8 delta (was 16)
- Position showing $1.50 loss (about 50% of credit)

**Adjustment Options:**
1. Close the call spread for a loss, keep put spread
2. Roll the call spread up and out (540/550 -> 560/570 at 45 DTE)
3. Close entire position for small loss
4. Do nothing and hope (NOT RECOMMENDED)

**Best Choice:** Roll the call spread up and out. This:
- Buys time for the position
- Moves short strike further from current price
- Often can be done for even money or small debit`,
    },
    {
      type: 'warning',
      title: 'The Danger of Hope Trading',
      content: `Never turn a manageable loss into a catastrophic one by hoping the stock reverses. Iron condors are probability trades - sometimes they lose.

Accept the small loss when:
- Your adjustment would create a worse risk/reward
- You've already adjusted twice on the same side
- The stock is moving on fundamental news (earnings, guidance change)
- You're past your predetermined max loss threshold

A 1x credit loss is normal. A 3x credit loss means you let it go too far.`,
    },
    {
      type: 'text',
      title: 'When to Close Early',
      content: `Closing profitable iron condors early is often the right move. Here's when to take your profits and move on:

**50% Profit Rule:**
When you've captured 50% of max profit, strongly consider closing. The remaining potential gain often isn't worth the gamma risk.

Example: Received $3.00 credit, position now worth $1.50 to close
- Max additional profit: $1.50
- Risk: Still $7.00 (on $10 wide wings)
- Risk/reward of staying: 4.7:1 against you

**75% Profit Rule:**
At 75% of max profit, close almost always. You're risking $2.50 to make $0.75 - terrible odds.

**Time-Based Closing:**
- If 50% profit achieved before 50% of time elapsed: Close
- If 21 DTE and profitable: Close unless very high conviction
- If 7 DTE and still open: Should have closed already

**Event-Based Closing:**
Close before:
- Earnings announcements
- Fed meetings
- Major product launches (Apple, NVDA product events)
- Any event that could cause gap moves`,
    },
    {
      type: 'example',
      title: 'Early Close Decision on GOOG',
      stock: 'GOOG',
      content: `GOOG Iron Condor opened at 30 DTE:
- Sold 165/160 put spread, Sold 190/195 call spread
- Credit: $1.80
- Max profit: $1.80
- Max loss: $3.20

**Day 12 (18 DTE remaining):**
- GOOG at $177 (right in the middle)
- Position worth $0.80 to close
- Profit if closed: $1.00 (56% of max)

**Analysis:**
- Captured 56% of max profit in 40% of the time
- 18 DTE means gamma starting to increase
- GOOG earnings in 2 weeks

**Decision: CLOSE**
- Book the $1.00 profit
- Avoid earnings risk
- Free up capital for next trade

Holding would risk $3.20 to make additional $0.80 - that's a 4:1 risk/reward against you.`,
    },
    {
      type: 'tip',
      title: 'The Professional Approach',
      content: `Professional iron condor traders often target smaller wins consistently:

- Enter at 45 DTE
- Target 25-35% of max profit
- Close at 21 DTE regardless (time adjustment)
- Never let losses exceed 2x credit received

This approach:
- Wins more often (higher probability)
- Smaller wins but very consistent
- Avoids the gamma risk of holding to expiration
- Generates more trades (more opportunities to compound)

Your $500 profit closed at 25% is better than your $800 profit that occasionally becomes a $2,000 loss.`,
    },
    {
      type: 'exercise',
      title: 'Practice: Evaluate This Iron Condor',
      content: `QQQ Iron Condor opened at 35 DTE:
- Sold 380/370 put spread, Sold 420/430 call spread
- Credit received: $4.20
- Current QQQ price: $408

It's now 18 DTE:
- QQQ has dropped to $392
- Short 380 put delta: 28
- Position showing breakeven (no profit, no loss)

Questions to consider:
1. Are you at an adjustment trigger? (Yes - 28 delta approaching 30)
2. What's your max additional profit? ($4.20)
3. What's your risk to achieve it? ($5.80 + gamma risk)
4. What would you do?

Recommended: Close the position at breakeven. The trade didn't work, but you're not losing money. Reset and find a better setup.`,
    },
  ],
  quiz: [
    {
      id: 'w3d15q1',
      question:
        'You sold an iron condor with $10 wide wings for a $3.00 credit. The position is now worth $1.50 to close. What percentage of max profit have you captured?',
      options: ['25%', '33%', '50%', '75%'],
      correctAnswer: 2,
      explanation:
        'You received $3.00 credit and can close for $1.50, meaning you would keep $1.50 profit. Max profit was $3.00, so $1.50/$3.00 = 50% of max profit.',
      difficulty: 'easy',
    },
    {
      id: 'w3d15q2',
      question:
        'Your short put has moved from 16 delta to 32 delta. What action is most appropriate?',
      options: [
        'Do nothing - still within normal range',
        'Prepare an adjustment order immediately',
        'Buy more contracts to average down',
        'Wait until it reaches 50 delta',
      ],
      correctAnswer: 1,
      explanation:
        'A short strike reaching 30+ delta is a red/orange flag trigger. At 32 delta, you should prepare an adjustment order immediately, either rolling the strike or closing that side of the trade.',
      difficulty: 'medium',
    },
    {
      id: 'w3d15q3',
      question:
        'What is the primary advantage of using narrow wings ($5) versus wide wings ($20) on an iron condor?',
      options: [
        'Higher max profit per contract',
        'Lower probability of profit',
        'Less capital at risk and lower margin requirement',
        'Wider profit zone',
      ],
      correctAnswer: 2,
      explanation:
        'Narrow wings require less capital and lower margin because the max loss is smaller. While you collect less premium, you risk less per trade, making it suitable for smaller accounts or more conservative traders.',
      difficulty: 'medium',
    },
    {
      id: 'w3d15q4',
      question:
        'MELI is trading at $1,800. You want to sell an iron condor. What wing width is most appropriate given the price level?',
      options: [
        '$5 wings',
        '$10 wings',
        '$20-25 wings',
        '$50 wings',
      ],
      correctAnswer: 2,
      explanation:
        'For a high-priced stock like MELI at $1,800, you need wider wings ($20-25) because the dollar moves are larger. Using $5 wings would result in max loss being reached too easily on normal price fluctuations.',
      difficulty: 'medium',
    },
    {
      id: 'w3d15q5',
      question:
        'You have an iron condor at 18 DTE showing 50% of max profit. GOOG earnings are in 10 days. What should you do?',
      options: [
        'Hold through earnings for the remaining 50% profit',
        'Close the position to lock in profits and avoid earnings risk',
        'Add more contracts to increase position size',
        'Wait until 7 DTE to decide',
      ],
      correctAnswer: 1,
      explanation:
        'You should close before earnings. You have captured 50% of max profit, and holding through earnings risks the entire position due to gap risk. The remaining potential gain is not worth the binary event risk.',
      difficulty: 'hard',
    },
  ],
}
