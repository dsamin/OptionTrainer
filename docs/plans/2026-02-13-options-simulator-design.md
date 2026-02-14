# Options Simulator Design

## Overview

An interactive options pricing simulator that helps learners visualize how option prices change based on stock price, time to expiration, and other factors. The simulator demonstrates theta decay and price sensitivity in real-time through drag-and-drop interactions.

## Architecture

### Two Components

1. **Full Simulator Page** (`/simulator`) — Standalone sandbox with all controls
2. **Mini Simulator** — Embeddable component for lessons with contextual presets

### Tech Stack

- React + TypeScript (existing)
- Zustand for simulator state (optional, could use local state)
- Lightweight Charts or custom SVG/Canvas for visualizations
- Black-Scholes model for option pricing

---

## Task Breakdown

### Phase 1: Core Pricing Engine

#### Task 1.1: Create Options Pricing Types
**File:** `src/lib/options/types.ts`

```typescript
// Types to implement:
interface OptionContract {
  type: 'call' | 'put'
  strikePrice: number
  stockPrice: number
  daysToExpiration: number
  impliedVolatility: number  // default to 0.30 (30%)
  riskFreeRate: number       // default to 0.05 (5%)
}

interface OptionGreeks {
  delta: number    // price sensitivity to stock
  gamma: number    // delta sensitivity to stock
  theta: number    // time decay per day
  vega: number     // IV sensitivity
}

interface SimulationResult {
  theoreticalPrice: number
  greeks: OptionGreeks
  intrinsicValue: number
  timeValue: number
}

interface PricePoint {
  daysToExpiration: number
  price: number
}
```

**Acceptance criteria:**
- All types exported from `src/lib/options/types.ts`
- Types support both calls and puts

---

#### Task 1.2: Implement Black-Scholes Pricing
**File:** `src/lib/options/blackScholes.ts`

Implement the Black-Scholes formula for European options:

```
d1 = (ln(S/K) + (r + σ²/2)T) / (σ√T)
d2 = d1 - σ√T

Call Price = S·N(d1) - K·e^(-rT)·N(d2)
Put Price = K·e^(-rT)·N(-d2) - S·N(-d1)
```

Where:
- S = stock price
- K = strike price
- T = time to expiration (in years)
- r = risk-free rate
- σ = implied volatility
- N() = cumulative normal distribution

**Functions to implement:**
```typescript
function calculateOptionPrice(contract: OptionContract): number
function calculateGreeks(contract: OptionContract): OptionGreeks
function simulatePriceOverTime(contract: OptionContract, days: number[]): PricePoint[]
```

**Acceptance criteria:**
- Prices within 1% of online options calculators
- Greeks calculated correctly
- Handle edge cases (0 DTE, deep ITM/OTM)

---

#### Task 1.3: Implement Normal Distribution Helper
**File:** `src/lib/options/math.ts`

Black-Scholes requires cumulative normal distribution (CDF).

```typescript
function normalCDF(x: number): number
function normalPDF(x: number): number
```

Use the approximation formula (no external libraries needed).

**Acceptance criteria:**
- Accurate to 6 decimal places
- Works for all real numbers

---

### Phase 2: Full Simulator Page

#### Task 2.1: Create Simulator Page Layout
**File:** `src/pages/SimulatorPage.tsx`

Layout structure:
```
┌─────────────────────────────────────────────────┐
│  Options Pricing Simulator          [Call][Put] │
├─────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌───────────────────────┐ │
│  │  INPUT PANEL    │  │  PRICE CHART          │ │
│  │                 │  │  (option price over   │ │
│  │  Stock: $___    │  │   time as you drag)   │ │
│  │  Strike: $___   │  │                       │ │
│  │  DTE: __ days   │  │  [====|====] timeline │ │
│  │  IV: __%        │  │                       │ │
│  └─────────────────┘  └───────────────────────┘ │
│  ┌─────────────────────────────────────────────┐│
│  │  RESULTS: Price $X.XX | Theta -$X.XX/day   ││
│  │           Delta 0.XX  | Gamma 0.XX         ││
│  └─────────────────────────────────────────────┘│
└─────────────────────────────────────────────────┘
```

**Acceptance criteria:**
- Responsive layout (mobile-friendly)
- Matches existing app styling (dark theme, cards)
- All inputs update results in real-time

---

#### Task 2.2: Create Input Controls Component
**File:** `src/components/simulator/SimulatorControls.tsx`

Controls needed:
- **Stock Price Slider**: Range $10-$500, step $1
- **Strike Price Slider**: Range relative to stock price
- **Days to Expiration Slider**: 1-90 days
- **IV Slider**: 10%-100%, default 30%
- **Option Type Toggle**: Call / Put buttons

```typescript
interface SimulatorControlsProps {
  contract: OptionContract
  onChange: (contract: OptionContract) => void
}
```

**Acceptance criteria:**
- Sliders are draggable with real-time updates
- Show current values next to each slider
- Strike price options adjust based on stock price

---

#### Task 2.3: Create Price Timeline Chart
**File:** `src/components/simulator/PriceTimelineChart.tsx`

Interactive chart showing option price decay over time.

Features:
- X-axis: Days to expiration (90 → 0)
- Y-axis: Option price ($)
- Draggable marker on timeline
- Shows current position based on DTE slider
- Displays theta decay curve

```typescript
interface PriceTimelineChartProps {
  contract: OptionContract
  priceData: PricePoint[]
  currentDTE: number
  onDTEChange: (dte: number) => void
}
```

**Acceptance criteria:**
- Smooth dragging interaction
- Updates other controls when dragged
- Shows price at cursor position
- Visualizes acceleration of theta near expiration

---

#### Task 2.4: Create Results Display Panel
**File:** `src/components/simulator/SimulatorResults.tsx`

Display calculated values with explanations:

```typescript
interface SimulatorResultsProps {
  result: SimulationResult
  contract: OptionContract
}
```

Show:
- **Theoretical Price**: $X.XX
- **Intrinsic Value**: $X.XX (in-the-money amount)
- **Time Value**: $X.XX (extrinsic value)
- **Greeks Panel**:
  - Delta: 0.XX — "For every $1 stock move, option moves $X.XX"
  - Theta: -$X.XX — "Option loses $X.XX per day"
  - Gamma: 0.XX — "Delta changes by X.XX per $1 stock move"

**Acceptance criteria:**
- Values update in real-time
- Include helper tooltips explaining each Greek
- Color-code positive/negative values

---

#### Task 2.5: Create Payoff Diagram
**File:** `src/components/simulator/PayoffDiagram.tsx`

Shows profit/loss at various stock prices at expiration.

Features:
- X-axis: Stock price range
- Y-axis: Profit/Loss ($)
- Vertical line at current stock price
- Horizontal line at $0 (breakeven)
- Shaded profit/loss regions

```typescript
interface PayoffDiagramProps {
  contract: OptionContract
  premium: number  // what you paid for the option
}
```

**Acceptance criteria:**
- Shows breakeven point clearly
- Max loss/max gain labeled
- Updates when inputs change

---

#### Task 2.6: Wire Up Simulator Page
**File:** `src/pages/SimulatorPage.tsx` (update)

Integrate all components:
1. Local state for `OptionContract`
2. Calculate results using pricing engine
3. Pass data to all child components
4. Handle bidirectional updates (slider ↔ chart)

**Acceptance criteria:**
- All components communicate properly
- No lag when dragging sliders
- State persists during session

---

#### Task 2.7: Add Simulator Route and Navigation
**Files:**
- `src/App.tsx` — Add route
- `src/components/layout/Sidebar.tsx` — Add nav item

Add `/simulator` route and sidebar link with chart icon.

**Acceptance criteria:**
- Route works
- Sidebar shows "Simulator" with icon
- Active state styling

---

### Phase 3: Mini Simulator for Lessons

#### Task 3.1: Create Mini Simulator Component
**File:** `src/components/simulator/MiniSimulator.tsx`

Simplified version for embedding in lessons:

```typescript
interface MiniSimulatorProps {
  // Preset values based on lesson context
  preset: {
    stockPrice: number
    strikePrice: number
    optionType: 'call' | 'put'
    scenario: string  // "theta-decay" | "delta-sensitivity" | "full"
  }
  // Which controls to show
  showControls?: ('dte' | 'stockPrice' | 'strike')[]
}
```

Scenarios:
- **theta-decay**: Only DTE slider, focus on time decay
- **delta-sensitivity**: Only stock price slider, focus on delta
- **full**: All controls (mini version of full page)

**Acceptance criteria:**
- Compact design (fits in lesson content flow)
- Works on mobile
- Presets load correctly

---

#### Task 3.2: Add Simulator Content Type to Curriculum
**File:** `src/data/curriculum/week1/day1.ts` (and others)

Add new content section type:

```typescript
interface ContentSection {
  type: 'text' | 'chart' | 'example' | 'tip' | 'warning' | 'exercise' | 'simulator'
  // ... existing fields
  simulatorPreset?: {
    stockPrice: number
    strikePrice: number
    optionType: 'call' | 'put'
    scenario: string
  }
}
```

**Acceptance criteria:**
- Type system updated
- Backwards compatible with existing lessons

---

#### Task 3.3: Render Mini Simulator in LessonPage
**File:** `src/components/lessons/LessonPage.tsx`

Update `ContentBlock` component to render `MiniSimulator` when `type === 'simulator'`.

**Acceptance criteria:**
- Renders inline with other content
- Proper spacing and styling
- Lazy loads simulator code

---

#### Task 3.4: Add Simulators to Relevant Lessons
**Files:** Various curriculum files

Add simulator sections to these lessons:
- **Day 4** (Theta Decay): theta-decay scenario
- **Day 5** (The Greeks): full scenario
- **Day 6** (Option Pricing): delta-sensitivity scenario

**Acceptance criteria:**
- Each simulator has appropriate preset values
- Instructions explain what to observe

---

### Phase 4: Polish and Integration

#### Task 4.1: Add Preset Scenarios to Full Simulator
**File:** `src/pages/SimulatorPage.tsx`

Quick-load presets:
- "AAPL Weekly Call" — Near ATM, 7 DTE
- "High IV Put" — 60% IV, 30 DTE
- "LEAPS Call" — 365 DTE, low theta

**Acceptance criteria:**
- Dropdown or button group to select presets
- Resets all inputs to preset values

---

#### Task 4.2: Mobile Optimization
**Files:** All simulator components

Ensure:
- Touch-friendly sliders (larger hit targets)
- Stacked layout on mobile
- Charts scale properly

**Acceptance criteria:**
- Works on 375px width screens
- No horizontal scroll
- Sliders respond to touch drag

---

#### Task 4.3: Add Educational Tooltips
**Files:** All simulator components

Add `?` icons with tooltips explaining:
- What each input means
- What each Greek represents
- How to interpret the charts

**Acceptance criteria:**
- Tooltips work on hover (desktop) and tap (mobile)
- Clear, concise explanations

---

## File Structure

```
src/
├── lib/
│   └── options/
│       ├── types.ts          # Task 1.1
│       ├── math.ts           # Task 1.3
│       └── blackScholes.ts   # Task 1.2
├── components/
│   └── simulator/
│       ├── SimulatorControls.tsx    # Task 2.2
│       ├── PriceTimelineChart.tsx   # Task 2.3
│       ├── SimulatorResults.tsx     # Task 2.4
│       ├── PayoffDiagram.tsx        # Task 2.5
│       └── MiniSimulator.tsx        # Task 3.1
├── pages/
│   └── SimulatorPage.tsx     # Tasks 2.1, 2.6
└── data/
    └── curriculum/           # Tasks 3.2, 3.4
```

---

## Dependencies

**No new dependencies required.** Using:
- Existing `lightweight-charts` for price visualization (or custom SVG)
- Existing `framer-motion` for animations
- Native math for Black-Scholes calculations

---

## Task Summary for GitHub Projects

| ID | Task | Phase | Est. | Dependencies |
|----|------|-------|------|--------------|
| 1.1 | Options Pricing Types | 1 | 30m | None |
| 1.2 | Black-Scholes Implementation | 1 | 2h | 1.1, 1.3 |
| 1.3 | Normal Distribution Helper | 1 | 30m | None |
| 2.1 | Simulator Page Layout | 2 | 1h | None |
| 2.2 | Input Controls Component | 2 | 1.5h | 1.1 |
| 2.3 | Price Timeline Chart | 2 | 2h | 1.2 |
| 2.4 | Results Display Panel | 2 | 1h | 1.2 |
| 2.5 | Payoff Diagram | 2 | 1.5h | 1.1 |
| 2.6 | Wire Up Simulator Page | 2 | 1h | 2.1-2.5 |
| 2.7 | Add Route and Navigation | 2 | 30m | 2.6 |
| 3.1 | Mini Simulator Component | 3 | 1.5h | 2.2-2.4 |
| 3.2 | Curriculum Type Update | 3 | 30m | None |
| 3.3 | LessonPage Integration | 3 | 30m | 3.1, 3.2 |
| 3.4 | Add to Relevant Lessons | 3 | 1h | 3.3 |
| 4.1 | Preset Scenarios | 4 | 30m | 2.6 |
| 4.2 | Mobile Optimization | 4 | 1h | All Phase 2-3 |
| 4.3 | Educational Tooltips | 4 | 1h | All Phase 2-3 |

**Total Estimated Time: ~16 hours**

---

## Suggested Implementation Order

1. **Start with Phase 1** (pricing engine) — Pure logic, no UI, easy to test
2. **Phase 2** in order (2.1 → 2.7) — Build up the full page
3. **Phase 3** after Phase 2 works — Extract into mini version
4. **Phase 4** last — Polish and edge cases
