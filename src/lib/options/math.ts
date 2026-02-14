/**
 * Mathematical Helper Functions
 * Issue #5: Normal distribution functions for Black-Scholes calculations
 */

/**
 * Cumulative Normal Distribution Function (CDF)
 * Uses Abramowitz and Stegun approximation (accurate to 6 decimal places)
 * 
 * @param x - The value to evaluate
 * @returns Probability that a standard normal random variable is less than or equal to x
 */
export function normalCDF(x: number): number {
    // Constants for the approximation
    const a1 = 0.254829592
    const a2 = -0.284496736
    const a3 = 1.421413741
    const a4 = -1.453152027
    const a5 = 1.061405429
    const p = 0.3275911

    // Save the sign of x
    const sign = x >= 0 ? 1 : -1
    const absX = Math.abs(x) / Math.sqrt(2)

    // A&S formula 7.1.26
    const t = 1 / (1 + p * absX)
    const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX)

    return 0.5 * (1 + sign * y)
}

/**
 * Probability Density Function (PDF) for standard normal distribution
 * 
 * @param x - The value to evaluate
 * @returns The probability density at x
 */
export function normalPDF(x: number): number {
    return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI)
}

/**
 * Natural logarithm helper with safety check
 * 
 * @param x - The value to take the log of
 * @returns Natural logarithm of x
 */
export function safeLn(x: number): number {
    if (x <= 0) {
        throw new Error(`Cannot take logarithm of non-positive number: ${x}`)
    }
    return Math.log(x)
}
