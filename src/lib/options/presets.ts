import type { OptionContract } from './types'

export interface SimulatorPreset {
    name: string
    description: string
    contract: Omit<OptionContract, 'riskFreeRate'>
    category: 'basics' | 'greeks' | 'strategies'
}

export const simulatorPresets: SimulatorPreset[] = [
    // Basics
    {
        name: 'At-The-Money Call',
        description: 'Classic ATM call with 30 days to expiration. Delta ~0.50, balanced risk/reward.',
        contract: {
            type: 'call',
            stockPrice: 150,
            strikePrice: 150,
            daysToExpiration: 30,
            impliedVolatility: 0.30
        },
        category: 'basics'
    },
    {
        name: 'Out-of-the-Money Put',
        description: 'OTM put for premium selling. Low delta (~0.16), high probability of profit.',
        contract: {
            type: 'put',
            stockPrice: 150,
            strikePrice: 135,
            daysToExpiration: 30,
            impliedVolatility: 0.30
        },
        category: 'basics'
    },
    {
        name: 'In-the-Money Call',
        description: 'Deep ITM call with high delta (~0.85). Behaves like stock ownership.',
        contract: {
            type: 'call',
            stockPrice: 150,
            strikePrice: 130,
            daysToExpiration: 30,
            impliedVolatility: 0.30
        },
        category: 'basics'
    },

    // Greeks Focus
    {
        name: 'High Theta Decay',
        description: '7 DTE ATM option. Watch theta accelerate as expiration approaches.',
        contract: {
            type: 'call',
            stockPrice: 150,
            strikePrice: 150,
            daysToExpiration: 7,
            impliedVolatility: 0.30
        },
        category: 'greeks'
    },
    {
        name: 'High Vega Sensitivity',
        description: 'Long-dated ATM option. Most sensitive to IV changes.',
        contract: {
            type: 'call',
            stockPrice: 150,
            strikePrice: 150,
            daysToExpiration: 90,
            impliedVolatility: 0.30
        },
        category: 'greeks'
    },
    {
        name: 'High Gamma Risk',
        description: 'Near-expiration ATM option. Delta changes rapidly with stock price.',
        contract: {
            type: 'call',
            stockPrice: 150,
            strikePrice: 150,
            daysToExpiration: 3,
            impliedVolatility: 0.30
        },
        category: 'greeks'
    },

    // Strategy Examples
    {
        name: 'Credit Spread Short Strike',
        description: '16-delta short put for credit spreads. ~84% probability of profit.',
        contract: {
            type: 'put',
            stockPrice: 150,
            strikePrice: 140,
            daysToExpiration: 30,
            impliedVolatility: 0.30
        },
        category: 'strategies'
    },
    {
        name: 'Covered Call Strike',
        description: '30-delta call for covered calls. Good premium with upside potential.',
        contract: {
            type: 'call',
            stockPrice: 150,
            strikePrice: 160,
            daysToExpiration: 30,
            impliedVolatility: 0.30
        },
        category: 'strategies'
    },
    {
        name: 'Iron Condor Wing',
        description: '10-delta wing for iron condors. Far OTM for defined risk.',
        contract: {
            type: 'put',
            stockPrice: 150,
            strikePrice: 130,
            daysToExpiration: 45,
            impliedVolatility: 0.30
        },
        category: 'strategies'
    }
]
