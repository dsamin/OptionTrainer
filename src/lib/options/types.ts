/**
 * Options Pricing Types
 * Issue #3: Core type definitions for options contracts and pricing calculations
 */

/**
 * Represents an option contract with all necessary parameters for pricing
 */
export interface OptionContract {
    /** Type of option: 'call' or 'put' */
    type: 'call' | 'put'

    /** Strike price of the option */
    strikePrice: number

    /** Current stock price */
    stockPrice: number

    /** Days until expiration */
    daysToExpiration: number

    /** Implied volatility as a decimal (e.g., 0.30 for 30%) */
    impliedVolatility: number

    /** Risk-free interest rate as a decimal (e.g., 0.05 for 5%) */
    riskFreeRate: number
}

/**
 * The Greeks - measures of option price sensitivity
 */
export interface OptionGreeks {
    /** Delta: Price sensitivity to stock price changes (-1 to 1) */
    delta: number

    /** Gamma: Rate of change of delta (always positive) */
    gamma: number

    /** Theta: Time decay per day (usually negative) */
    theta: number

    /** Vega: Sensitivity to implied volatility changes */
    vega: number
}

/**
 * Complete simulation result including price and greeks
 */
export interface SimulationResult {
    /** Theoretical option price from Black-Scholes */
    theoreticalPrice: number

    /** The Greeks for this option */
    greeks: OptionGreeks

    /** Intrinsic value (in-the-money amount) */
    intrinsicValue: number

    /** Time value (extrinsic value) */
    timeValue: number
}

/**
 * A single point in a price-over-time series
 */
export interface PricePoint {
    /** Days to expiration for this point */
    daysToExpiration: number

    /** Option price at this DTE */
    price: number
}

/**
 * Preset configuration for the simulator
 */
export interface SimulatorPreset {
    name: string
    stockPrice: number
    strikePrice: number
    optionType: 'call' | 'put'
    daysToExpiration: number
    impliedVolatility: number
}
