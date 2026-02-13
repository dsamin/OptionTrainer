/**
 * Manual Test for Black-Scholes Pricing Engine
 * This file can be run with: npx tsx src/lib/options/__test__.ts
 */

import { calculateOptionPrice, calculateGreeks, simulatePriceOverTime, calculateSimulationResult } from './blackScholes'
import type { OptionContract } from './types'

console.log('🧪 Testing Black-Scholes Pricing Engine\n')

// Test Case 1: ATM Call Option (AAPL example)
console.log('Test 1: ATM Call Option')
console.log('Stock: $150, Strike: $150, 30 DTE, 30% IV')
const atmCall: OptionContract = {
    type: 'call',
    stockPrice: 150,
    strikePrice: 150,
    daysToExpiration: 30,
    impliedVolatility: 0.30,
    riskFreeRate: 0.05
}

const atmCallPrice = calculateOptionPrice(atmCall)
const atmCallGreeks = calculateGreeks(atmCall)
console.log(`Price: $${atmCallPrice.toFixed(2)}`)
console.log(`Delta: ${atmCallGreeks.delta.toFixed(4)} (expected ~0.5 for ATM call)`)
console.log(`Gamma: ${atmCallGreeks.gamma.toFixed(4)}`)
console.log(`Theta: $${atmCallGreeks.theta.toFixed(2)}/day`)
console.log(`Vega: ${atmCallGreeks.vega.toFixed(4)}\n`)

// Test Case 2: OTM Put Option
console.log('Test 2: OTM Put Option')
console.log('Stock: $150, Strike: $140, 30 DTE, 30% IV')
const otmPut: OptionContract = {
    type: 'put',
    stockPrice: 150,
    strikePrice: 140,
    daysToExpiration: 30,
    impliedVolatility: 0.30,
    riskFreeRate: 0.05
}

const otmPutPrice = calculateOptionPrice(otmPut)
const otmPutGreeks = calculateGreeks(otmPut)
console.log(`Price: $${otmPutPrice.toFixed(2)}`)
console.log(`Delta: ${otmPutGreeks.delta.toFixed(4)} (expected negative for puts)`)
console.log(`Theta: $${otmPutGreeks.theta.toFixed(2)}/day\n`)

// Test Case 3: Deep ITM Call
console.log('Test 3: Deep ITM Call')
console.log('Stock: $150, Strike: $120, 30 DTE, 30% IV')
const itmCall: OptionContract = {
    type: 'call',
    stockPrice: 150,
    strikePrice: 120,
    daysToExpiration: 30,
    impliedVolatility: 0.30,
    riskFreeRate: 0.05
}

const itmCallResult = calculateSimulationResult(itmCall)
console.log(`Price: $${itmCallResult.theoreticalPrice.toFixed(2)}`)
console.log(`Intrinsic Value: $${itmCallResult.intrinsicValue.toFixed(2)}`)
console.log(`Time Value: $${itmCallResult.timeValue.toFixed(2)}`)
console.log(`Delta: ${itmCallResult.greeks.delta.toFixed(4)} (expected ~1.0 for deep ITM call)\n`)

// Test Case 4: Theta Decay Over Time
console.log('Test 4: Theta Decay Simulation')
console.log('ATM Call: Stock $150, Strike $150, 30% IV')
const decayDays = [90, 60, 45, 30, 21, 14, 7, 1, 0]
const decayContract: OptionContract = {
    type: 'call',
    stockPrice: 150,
    strikePrice: 150,
    daysToExpiration: 90,
    impliedVolatility: 0.30,
    riskFreeRate: 0.05
}

const priceOverTime = simulatePriceOverTime(decayContract, decayDays)
console.log('DTE → Price')
priceOverTime.forEach(point => {
    console.log(`${point.daysToExpiration.toString().padStart(3)} → $${point.price.toFixed(2)}`)
})
console.log('\n✅ All tests completed!')
console.log('\nNote: Compare these values with an online Black-Scholes calculator')
console.log('Recommended: https://www.optionsprofitcalculator.com/')
