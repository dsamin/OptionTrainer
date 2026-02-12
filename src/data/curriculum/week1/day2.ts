// Week 1, Day 2: Support & Resistance
// Identifying key levels and using them for options strike selection

import { LessonContent } from './day1'

export const lesson: LessonContent = {
  day: 2,
  week: 1,
  title: 'Support & Resistance',
  description: 'Learn to identify key price levels and use them strategically for selecting strike prices on credit spreads and iron condors.',
  duration: 50,
  keyPoints: [
    'Identify horizontal support and resistance levels',
    'Understand why levels form and their psychological significance',
    'Use support/resistance for optimal strike selection',
    'Recognize when levels are likely to hold or break',
    'Apply level analysis to real stocks in your watchlist'
  ],
  yourStocks: ['NVDA', 'META', 'GOOG', 'MELI', 'SHOP'],
  content: [
    {
      type: 'text',
      title: 'What is Support and Resistance?',
      content: `Support and resistance are price levels where buying or selling pressure historically concentrates.

**Support**: A price level where buying interest is strong enough to prevent further decline. Think of it as a "floor" where buyers step in.

**Resistance**: A price level where selling pressure is strong enough to prevent further advance. Think of it as a "ceiling" where sellers emerge.

**Why Options Traders Care:**
- Support levels = potential short put strike locations
- Resistance levels = potential short call strike locations
- These levels help you place strikes where price is unlikely to reach`
    },
    {
      type: 'text',
      title: 'Why Support and Resistance Form',
      content: `These levels form due to market psychology and institutional activity:

**1. Round Numbers**
- Traders place orders at $100, $150, $200, etc.
- Creates natural clustering of buy/sell orders
- Example: NVDA often reacts at $50 increments

**2. Previous Highs and Lows**
- Old resistance becomes new support (and vice versa)
- Traders remember these levels and act on them
- Institutional algorithms are programmed to react here

**3. Institutional Order Flow**
- Large funds accumulate/distribute at specific levels
- Their buying/selling creates visible price reactions
- Multiple tests of a level = stronger level

**4. Psychological Anchoring**
- Traders anchor to prices where they bought/sold
- Creates emotional decision-making at key prices
- Breakeven levels often become support/resistance`
    },
    {
      type: 'example',
      title: 'Identifying Levels on NVDA',
      content: `Let's analyze NVDA for support and resistance:

**Resistance Levels:**
- $950: Recent swing high, tested twice and rejected
- $900: Round number, previous consolidation zone
- $875: Multiple daily closes clustered here

**Support Levels:**
- $825: Previous breakout level, now support
- $800: Major round number, high volume at this level
- $750: Swing low from last month's pullback

**For an Iron Condor:**
If NVDA is trading at $860:
- Sell call spread with short strike at $950+ (above resistance)
- Sell put spread with short strike at $800 or below (below support)
- Your short strikes are protected by these key levels`,
      stock: 'NVDA'
    },
    {
      type: 'text',
      title: 'Types of Support and Resistance',
      content: `**Static Levels (Horizontal):**
- Based on historical price points
- Examples: Previous highs, lows, round numbers
- Don't move with time

**Dynamic Levels:**
- Moving averages (covered in Day 4)
- Trend lines (covered in Day 3)
- Move with price over time

**Zone vs. Exact Level:**
- Rarely does price respect an exact number
- Think in terms of zones: $895-$905 instead of exactly $900
- For options: Place strikes outside the zone, not at the edge

**The More Touches, The Stronger:**
- Level tested 5 times > level tested once
- But each touch weakens the level slightly
- Eventually, heavily tested levels break`
    },
    {
      type: 'example',
      title: 'Strike Selection Using Support',
      content: `META is trading at $485 with clear support at $450:

**Analysis:**
- $450 was the low from 3 weeks ago
- Price bounced sharply from this level
- Volume spike confirmed buying interest
- It's also near the 50-day moving average

**Put Credit Spread Setup:**
- Sell the $445 put (below support)
- Buy the $440 put (protection)
- $5 wide spread for defined risk
- Support at $450 gives you a $5+ buffer

**Why This Works:**
- For META to reach $445, it must first break $450 support
- Breaking support takes significant selling pressure
- Your trade profits as long as META stays above $445
- Time decay accelerates in your favor`,
      stock: 'META'
    },
    {
      type: 'example',
      title: 'Strike Selection Using Resistance',
      content: `GOOG is trading at $172 with resistance at $185:

**Analysis:**
- $185 was rejected 3 times in the past month
- Each test showed selling (upper wicks on candles)
- This level aligns with an old breakout point
- Volume decreased on each attempt (weakening momentum)

**Call Credit Spread Setup:**
- Sell the $190 call (above resistance)
- Buy the $195 call (protection)
- $5 wide spread

**Why This Works:**
- GOOG must first break $185 resistance
- Then push another $5 to reach your short strike
- Three rejections suggest sellers are defending this level
- Each day GOOG stays below $185, your spread decays`,
      stock: 'GOOG'
    },
    {
      type: 'warning',
      title: 'When Levels Fail',
      content: `Support and resistance are not guarantees. They fail when:

**1. Major News/Earnings**
- Fundamental changes override technical levels
- Avoid holding through earnings if near max profit

**2. High Volume Breakouts**
- Volume confirms breakout validity
- Low volume breaks often reverse (fakeouts)

**3. Multiple Failed Tests**
- Each touch weakens the level
- 6th test of resistance is more likely to break than 2nd

**4. Gap Through Levels**
- Morning gaps skip over your expected support/resistance
- This is why we use spreads (defined risk) not naked options

**Protection Strategy:**
- Always use defined-risk strategies (spreads, not naked)
- Place stops or adjustment triggers before levels break
- Don't hold losers hoping the level will save you`
    },
    {
      type: 'tip',
      title: 'The Role Reversal Principle',
      content: `One of the most reliable patterns in technical analysis:

**Old Resistance Becomes New Support**
- Once price breaks above resistance, that level often becomes support
- Traders who sold at resistance now regret it and buy on pullbacks
- Example: MELI broke $1,800 resistance, now it acts as support

**Old Support Becomes New Resistance**
- Once price breaks below support, that level often becomes resistance
- Trapped buyers sell on bounces to minimize losses
- Failed attempts to reclaim old support confirm the breakdown

**For Options:**
- If price just broke above resistance, the old resistance is your new support for put credit spreads
- If price just broke below support, the old support is your new resistance for call credit spreads`
    },
    {
      type: 'example',
      title: 'Role Reversal Trade on MELI',
      content: `MELI recently broke above $1,800 resistance:

**Before the Breakout:**
- $1,800 was tested 4 times as resistance
- Each test saw rejection (selling)
- You would have sold call credit spreads above $1,800

**After the Breakout:**
- $1,800 is now support (role reversal)
- Price pulled back and bounced at $1,810
- This confirms the new support level

**New Trade Setup:**
- Sell put credit spread with short strike at $1,790
- Buy put at $1,780
- The old resistance at $1,800 now protects your position
- You're trading WITH the breakout momentum`,
      stock: 'MELI'
    },
    {
      type: 'text',
      title: 'Volume Confirmation at Levels',
      content: `Volume tells you how significant a support/resistance level is:

**High Volume at a Level:**
- Many traders participated in the reaction
- Level is more significant and reliable
- Good for placing short strikes near

**Low Volume at a Level:**
- Few traders involved
- Level may not hold on retest
- Place strikes further away for safety

**Volume on Breakout:**
- High volume breakout = likely real, respect the move
- Low volume breakout = potential fakeout, may reverse

**Volume on Bounce:**
- High volume bounce from support = strong buying, level holds
- Low volume bounce = weak buying, level may eventually fail`
    },
    {
      type: 'example',
      title: 'Complete Analysis: SHOP',
      content: `Let's do a full support/resistance analysis on SHOP trading at $78:

**Key Levels Identified:**
- Resistance: $85 (recent high, 2 touches, round number zone)
- Resistance: $82 (last week's high, volume rejection)
- Support: $75 (previous breakout level)
- Support: $70 (major support, high volume, round number)

**Iron Condor Structure:**
Given these levels, if selling a 30 DTE iron condor:
- Sell $90 call / Buy $95 call (above $85 resistance)
- Sell $68 put / Buy $63 put (below $70 support)

**Rationale:**
- Call side: Short strike $5 above resistance
- Put side: Short strike $2 below support
- Put side has less buffer because $70 is stronger support (more touches, round number)
- Both sides give price room to move within range`,
      stock: 'SHOP'
    },
    {
      type: 'exercise',
      title: 'Practice: Finding Levels',
      content: `Open charts for these stocks and identify key levels:

**1. NVDA**
- Find the nearest significant support below current price
- Find the nearest significant resistance above current price
- How many times has each level been tested?

**2. META**
- Identify any role reversal levels (old resistance now support)
- What round number levels are nearby?

**3. GOOG**
- Find a support level with high volume confirmation
- Would you sell a put credit spread below this level? Why/why not?

For each level, note:
- Exact price or zone
- Number of touches
- Volume characteristics
- How you'd use it for strike selection`
    },
    {
      type: 'tip',
      title: 'Building a Level Watchlist',
      content: `Create a support/resistance "cheat sheet" for your watchlist stocks:

For each stock, track:
1. **Major Support Levels** (list 2-3)
2. **Major Resistance Levels** (list 2-3)
3. **Key Round Numbers**
4. **Recent Role Reversals**

Update weekly, noting:
- Which levels held or broke
- New levels forming
- Changes in strength (more/fewer touches)

This reference helps you quickly identify strike prices when opportunities arise. Professional traders always know their key levels before the market opens.`
    }
  ],
  quiz: [
    {
      id: 'w1d2q1',
      question: 'NVDA has tested $900 resistance four times in the past month and been rejected each time. You want to sell a call credit spread. Where should you place your short strike?',
      options: [
        'At exactly $900',
        'Below $900 to collect more premium',
        'Above $900, giving room beyond the resistance',
        'Resistance levels don\'t matter for strike selection'
      ],
      correctAnswer: 2,
      explanation: 'You should place your short strike above the resistance level, giving price room beyond the resistance. This way, NVDA would need to break through $900 resistance AND continue higher to reach your short strike. Placing it at or below resistance means any touch of resistance threatens your position.',
      difficulty: 'medium'
    },
    {
      id: 'w1d2q2',
      question: 'META just broke above $500 resistance on high volume after being rejected at this level 3 times. What does the "role reversal" principle suggest?',
      options: [
        '$500 is no longer relevant',
        '$500 will now likely act as support',
        '$500 will become even stronger resistance',
        'The breakout will immediately fail'
      ],
      correctAnswer: 1,
      explanation: 'The role reversal principle states that old resistance often becomes new support after a breakout. With META breaking above $500, this level should now act as support on pullbacks. Traders who sold at $500 may now buy at this level, and new buyers use it as a reference point.',
      difficulty: 'easy'
    },
    {
      id: 'w1d2q3',
      question: 'You identify support at $150 on a stock. The level has been tested twice with low volume bounces. How should this affect your put credit spread placement?',
      options: [
        'Place short strike right at $150 since it\'s support',
        'Low volume doesn\'t matter for options trading',
        'Place short strike further below $150 for extra buffer',
        'Only sell call spreads when volume is low'
      ],
      correctAnswer: 2,
      explanation: 'Low volume bounces from support indicate the level may not be as strong as it appears. Fewer traders participated in defending this level, making it more likely to fail on a future test. For safety, place your short strike further below the support level to give yourself extra buffer.',
      difficulty: 'medium'
    },
    {
      id: 'w1d2q4',
      question: 'GOOG is trading at $175. You identify support at $165 and resistance at $190. Which iron condor structure makes the most sense?',
      options: [
        'Sell $165 put, sell $190 call (short strikes at the levels)',
        'Sell $160 put, sell $195 call (short strikes beyond the levels)',
        'Sell $170 put, sell $180 call (short strikes inside the levels)',
        'Sell $175 put, sell $175 call (at current price)'
      ],
      correctAnswer: 1,
      explanation: 'For an iron condor, you want short strikes beyond support and resistance levels. Placing short strikes at $160 (below $165 support) and $195 (above $190 resistance) means price would need to break through these key levels AND continue moving to reach your short strikes. This gives you the protection of support/resistance plus additional buffer.',
      difficulty: 'hard'
    },
    {
      id: 'w1d2q5',
      question: 'Which of the following would make a support level MORE reliable?',
      options: [
        'Only one previous touch with low volume',
        'Multiple touches with high volume rejections',
        'The level is far from any round numbers',
        'Price quickly passed through the level before'
      ],
      correctAnswer: 1,
      explanation: 'Support levels are more reliable when they have multiple touches with high volume rejections. Multiple touches show the level is well-known and respected by the market. High volume indicates significant participation - many traders are defending this level. Low volume single touches or quick breaches indicate weak levels.',
      difficulty: 'easy'
    }
  ]
}

export default lesson
