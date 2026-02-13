// Week 1, Day 2: Support & Resistance
// Identifying key levels for options strike selection

import type { LessonContent } from './day1'

export const lesson: LessonContent = {
  day: 2,
  week: 1,
  title: 'Support & Resistance',
  description: 'Learn to identify key price levels where buying or selling pressure concentrates.',
  duration: 20,
  keyPoints: [
    'Support is where buyers step in; resistance is where sellers emerge',
    'Levels form at round numbers, previous highs/lows, and high-volume areas',
    'More touches = stronger level, but each touch weakens it slightly',
    'Old resistance becomes new support (role reversal)',
  ],
  yourStocks: ['NVDA', 'META', 'GOOG', 'MELI', 'SHOP'],
  content: [
    {
      type: 'text',
      title: 'What is Support and Resistance?',
      content: `Support and resistance are price levels where buying or selling pressure historically concentrates.

**Support**: A price level where buying interest prevents further decline. Think of it as a "floor."

**Resistance**: A price level where selling pressure prevents further advance. Think of it as a "ceiling."

**Why Options Traders Care:**
- Support levels = potential short put strike locations
- Resistance levels = potential short call strike locations
- These levels help you place strikes where price is unlikely to reach`
    },
    {
      type: 'text',
      title: 'Why Levels Form',
      content: `**Round Numbers**: Traders cluster orders at $100, $150, $200. Creates natural buy/sell zones.

**Previous Highs and Lows**: Traders remember these levels. Old resistance becomes new support (and vice versa).

**Institutional Order Flow**: Large funds accumulate/distribute at specific levels. Their activity creates visible price reactions.

**The More Touches, The Stronger**: A level tested 5 times is stronger than one tested once. But each touch weakens the level slightly - eventually, heavily tested levels break.`
    },
    {
      type: 'example',
      title: 'Identifying Levels on NVDA',
      content: `Let's analyze NVDA for support and resistance:

**Resistance Levels:**
- $950: Recent swing high, tested twice and rejected
- $900: Round number, previous consolidation zone

**Support Levels:**
- $825: Previous breakout level, now support
- $800: Major round number, high volume at this level

**For an Iron Condor with NVDA at $860:**
- Sell call spread with short strike at $950+ (above resistance)
- Sell put spread with short strike at $800 or below (below support)
- Your short strikes are protected by these key levels`,
      stock: 'NVDA'
    },
    {
      type: 'tip',
      title: 'The Role Reversal Principle',
      content: `One of the most reliable patterns in technical analysis:

**Old Resistance Becomes New Support**
- Once price breaks above resistance, that level often becomes support
- Traders who sold at resistance now regret it and buy on pullbacks

**Old Support Becomes New Resistance**
- Once price breaks below support, that level often becomes resistance
- Trapped buyers sell on bounces to minimize losses

**For Options:**
- If price just broke above resistance, the old resistance is your new support for put credit spreads
- If price just broke below support, the old support is your new resistance for call credit spreads`
    },
    {
      type: 'text',
      title: 'Volume Confirmation',
      content: `Volume tells you how significant a level is:

**High Volume at a Level:**
- Many traders participated in the reaction
- Level is more significant and reliable

**Low Volume at a Level:**
- Few traders involved
- Level may not hold on retest

**Volume on Breakout:**
- High volume breakout = likely real
- Low volume breakout = potential fakeout, may reverse`
    },
    {
      type: 'warning',
      title: 'When Levels Fail',
      content: `Support and resistance are not guarantees. They fail when:

**Major News/Earnings**: Fundamental changes override technical levels.

**High Volume Breakouts**: Volume confirms breakout validity.

**Multiple Failed Tests**: Each touch weakens the level. The 6th test is more likely to break than the 2nd.

**Protection**: Always use defined-risk strategies (spreads, not naked options). Don't hold losers hoping the level will save you.`
    }
  ],
  quiz: [
    {
      id: 'w1d2q1',
      question: 'NVDA has tested $900 resistance four times and been rejected each time. Where should you place your short call strike?',
      options: [
        'At exactly $900',
        'Below $900 to collect more premium',
        'Above $900, giving room beyond the resistance',
        'Resistance levels don\'t matter for strike selection'
      ],
      correctAnswer: 2,
      explanation: 'Place your short strike above the resistance level. This way, NVDA would need to break through $900 resistance AND continue higher to reach your strike.',
      difficulty: 'medium'
    },
    {
      id: 'w1d2q2',
      question: 'META just broke above $500 resistance on high volume after 3 rejections. What does role reversal suggest?',
      options: [
        '$500 is no longer relevant',
        '$500 will now likely act as support',
        '$500 will become even stronger resistance',
        'The breakout will immediately fail'
      ],
      correctAnswer: 1,
      explanation: 'The role reversal principle states that old resistance often becomes new support after a breakout. Traders who sold at $500 may now buy at this level.',
      difficulty: 'easy'
    },
    {
      id: 'w1d2q3',
      question: 'You identify support at $150 with low volume bounces. How should this affect your put credit spread?',
      options: [
        'Place short strike right at $150',
        'Low volume doesn\'t matter',
        'Place short strike further below $150 for extra buffer',
        'Only sell call spreads when volume is low'
      ],
      correctAnswer: 2,
      explanation: 'Low volume bounces indicate the level may not be as strong. For safety, place your short strike further below the support level.',
      difficulty: 'medium'
    }
  ]
}

export default lesson
