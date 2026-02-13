/**
 * Black-Scholes Option Pricing Model
 * Issue #4: Core pricing engine for European-style options
 */

import type { OptionContract, OptionGreeks, SimulationResult, PricePoint } from './types'
import { normalCDF, normalPDF, safeLn } from './math'

/**
 * Calculate d1 parameter for Black-Scholes formula
 */
function calculateD1(
    stockPrice: number,
    strikePrice: number,
    timeToExpiration: number,
    riskFreeRate: number,
    volatility: number
): number {
    const numerator = safeLn(stockPrice / strikePrice) +
        (riskFreeRate + (volatility * volatility) / 2) * timeToExpiration
    const denominator = volatility * Math.sqrt(timeToExpiration)

    return numerator / denominator
}

/**
 * Calculate d2 parameter for Black-Scholes formula
 */
function calculateD2(d1: number, volatility: number, timeToExpiration: number): number {
    return d1 - volatility * Math.sqrt(timeToExpiration)
}

/**
 * Calculate the theoretical price of an option using Black-Scholes formula
 * 
 * @param contract - The option contract parameters
 * @returns The theoretical option price
 */
export function calculateOptionPrice(contract: OptionContract): number {
    const { type, stockPrice, strikePrice, daysToExpiration, impliedVolatility, riskFreeRate } = contract

    // Handle edge case: 0 DTE
    if (daysToExpiration <= 0) {
        return calculateIntrinsicValue(contract)
    }

    // Convert days to years
    const timeToExpiration = daysToExpiration / 365

    // Calculate d1 and d2
    const d1 = calculateD1(stockPrice, strikePrice, timeToExpiration, riskFreeRate, impliedVolatility)
    const d2 = calculateD2(d1, impliedVolatility, timeToExpiration)

    // Calculate option price based on type
    if (type === 'call') {
        const callPrice = stockPrice * normalCDF(d1) -
            strikePrice * Math.exp(-riskFreeRate * timeToExpiration) * normalCDF(d2)
        return Math.max(0, callPrice)
    } else {
        const putPrice = strikePrice * Math.exp(-riskFreeRate * timeToExpiration) * normalCDF(-d2) -
            stockPrice * normalCDF(-d1)
        return Math.max(0, putPrice)
    }
}

/**
 * Calculate intrinsic value of an option
 */
export function calculateIntrinsicValue(contract: OptionContract): number {
    const { type, stockPrice, strikePrice } = contract

    if (type === 'call') {
        return Math.max(0, stockPrice - strikePrice)
    } else {
        return Math.max(0, strikePrice - stockPrice)
    }
}

/**
 * Calculate time value of an option
 */
export function calculateTimeValue(contract: OptionContract, theoreticalPrice: number): number {
    const intrinsicValue = calculateIntrinsicValue(contract)
    return Math.max(0, theoreticalPrice - intrinsicValue)
}

/**
 * Calculate the Greeks for an option
 * 
 * @param contract - The option contract parameters
 * @returns The option Greeks (delta, gamma, theta, vega)
 */
export function calculateGreeks(contract: OptionContract): OptionGreeks {
    const { type, stockPrice, strikePrice, daysToExpiration, impliedVolatility, riskFreeRate } = contract

    // Handle edge case: 0 DTE
    if (daysToExpiration <= 0) {
        const intrinsicValue = calculateIntrinsicValue(contract)
        return {
            delta: intrinsicValue > 0 ? (type === 'call' ? 1 : -1) : 0,
            gamma: 0,
            theta: 0,
            vega: 0
        }
    }

    // Convert days to years
    const timeToExpiration = daysToExpiration / 365

    // Calculate d1 and d2
    const d1 = calculateD1(stockPrice, strikePrice, timeToExpiration, riskFreeRate, impliedVolatility)
    const d2 = calculateD2(d1, impliedVolatility, timeToExpiration)

    // Calculate Delta
    let delta: number
    if (type === 'call') {
        delta = normalCDF(d1)
    } else {
        delta = normalCDF(d1) - 1
    }

    // Calculate Gamma (same for calls and puts)
    const gamma = normalPDF(d1) / (stockPrice * impliedVolatility * Math.sqrt(timeToExpiration))

    // Calculate Theta (per year, we'll convert to per day)
    let thetaPerYear: number
    const term1 = -(stockPrice * normalPDF(d1) * impliedVolatility) / (2 * Math.sqrt(timeToExpiration))

    if (type === 'call') {
        const term2 = riskFreeRate * strikePrice * Math.exp(-riskFreeRate * timeToExpiration) * normalCDF(d2)
        thetaPerYear = term1 - term2
    } else {
        const term2 = riskFreeRate * strikePrice * Math.exp(-riskFreeRate * timeToExpiration) * normalCDF(-d2)
        thetaPerYear = term1 + term2
    }

    // Convert theta from per year to per day
    const theta = thetaPerYear / 365

    // Calculate Vega (per 1% change in IV)
    // Vega is the same for calls and puts
    const vega = stockPrice * normalPDF(d1) * Math.sqrt(timeToExpiration) / 100

    return {
        delta,
        gamma,
        theta,
        vega
    }
}

/**
 * Simulate option price over time (theta decay curve)
 * 
 * @param contract - The option contract parameters
 * @param days - Array of days to expiration to simulate
 * @returns Array of price points showing option value at each DTE
 */
export function simulatePriceOverTime(contract: OptionContract, days: number[]): PricePoint[] {
    return days.map(dte => {
        const contractAtDTE: OptionContract = {
            ...contract,
            daysToExpiration: dte
        }

        return {
            daysToExpiration: dte,
            price: calculateOptionPrice(contractAtDTE)
        }
    })
}

/**
 * Calculate a complete simulation result with all metrics
 * 
 * @param contract - The option contract parameters
 * @returns Complete simulation result including price, greeks, and value breakdown
 */
export function calculateSimulationResult(contract: OptionContract): SimulationResult {
    const theoreticalPrice = calculateOptionPrice(contract)
    const greeks = calculateGreeks(contract)
    const intrinsicValue = calculateIntrinsicValue(contract)
    const timeValue = calculateTimeValue(contract, theoreticalPrice)

    return {
        theoreticalPrice,
        greeks,
        intrinsicValue,
        timeValue
    }
}
