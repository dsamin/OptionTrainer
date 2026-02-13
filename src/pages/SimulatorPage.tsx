import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Sparkles } from 'lucide-react'
import type { OptionContract } from '../lib/options/types'
import { calculateSimulationResult, simulatePriceOverTime } from '../lib/options/blackScholes'
import { simulatorPresets } from '../lib/options/presets'
import { SimulatorControls } from '../components/simulator/SimulatorControls'
import { SimulatorResults } from '../components/simulator/SimulatorResults'
import { PriceTimelineChart } from '../components/simulator/PriceTimelineChart'
import { PayoffDiagram } from '../components/simulator/PayoffDiagram'

export default function SimulatorPage() {
    // Default contract state
    const [contract, setContract] = useState<OptionContract>({
        type: 'call',
        stockPrice: 150,
        strikePrice: 150,
        daysToExpiration: 30,
        impliedVolatility: 0.30,
        riskFreeRate: 0.05
    })

    // Calculate results
    const result = useMemo(() => calculateSimulationResult(contract), [contract])

    // Generate price over time data for chart
    const priceData = useMemo(() => {
        const days = Array.from({ length: 91 }, (_, i) => 90 - i) // 90 to 0
        return simulatePriceOverTime(contract, days)
    }, [contract])

    // Handle DTE change from chart
    const handleDTEChange = (dte: number) => {
        setContract(prev => ({ ...prev, daysToExpiration: dte }))
    }

    // Handle preset selection
    const handlePresetSelect = (presetContract: Omit<OptionContract, 'riskFreeRate'>) => {
        setContract({ ...presetContract, riskFreeRate: 0.05 })
    }

    return (
        <div className="max-w-7xl mx-auto space-y-6 pb-12">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3"
            >
                <div className="p-3 rounded-xl bg-primary-600/20 border border-primary-600/30">
                    <BarChart3 className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold">Options Pricing Simulator</h1>
                    <p className="text-gray-400">Visualize how option prices change with stock price, time, and volatility</p>
                </div>
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Controls */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-1"
                >
                    <div className="card sticky top-6">
                        {/* Preset Scenarios */}
                        <div className="mb-6 pb-6 border-b border-gray-700/30">
                            <div className="flex items-center gap-2 mb-3">
                                <Sparkles className="w-4 h-4 text-primary-400" />
                                <h3 className="text-sm font-semibold text-gray-200">Quick Scenarios</h3>
                            </div>
                            <div className="space-y-2">
                                {simulatorPresets.slice(0, 5).map((preset) => (
                                    <button
                                        key={preset.name}
                                        onClick={() => handlePresetSelect(preset.contract)}
                                        className="w-full text-left px-3 py-2 rounded-lg bg-gray-800/30 hover:bg-primary-900/30 border border-gray-700/30 hover:border-primary-700/50 transition-colors group"
                                    >
                                        <p className="text-sm font-medium text-gray-200 group-hover:text-primary-400 transition-colors">
                                            {preset.name}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-0.5">{preset.description}</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <h2 className="text-xl font-semibold mb-4 text-gray-200">Controls</h2>
                        <SimulatorControls contract={contract} onChange={setContract} />
                    </div>
                </motion.div>

                {/* Right Column: Charts and Results */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2 space-y-6"
                >
                    {/* Price Timeline Chart */}
                    <PriceTimelineChart
                        contract={contract}
                        priceData={priceData}
                        currentDTE={contract.daysToExpiration}
                        onDTEChange={handleDTEChange}
                    />

                    {/* Results Panel */}
                    <SimulatorResults result={result} contract={contract} />

                    {/* Payoff Diagram */}
                    <PayoffDiagram contract={contract} premium={result.theoreticalPrice} />
                </motion.div>
            </div>

            {/* Educational Note */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="card bg-primary-900/20 border-primary-700/30"
            >
                <h3 className="text-lg font-semibold mb-2 text-primary-400">💡 How to Use This Simulator</h3>
                <div className="text-sm text-gray-300 space-y-2">
                    <p>
                        <strong>Adjust the controls</strong> on the left to see how option prices respond to changes in stock price,
                        time to expiration, and implied volatility.
                    </p>
                    <p>
                        <strong>The Theta Decay Curve</strong> shows how the option loses value as expiration approaches.
                        Notice how decay accelerates in the final weeks!
                    </p>
                    <p>
                        <strong>The Payoff Diagram</strong> shows your profit or loss at expiration based on where the stock price ends up.
                    </p>
                    <p>
                        <strong>The Greeks</strong> measure how sensitive the option price is to different factors.
                        Delta measures stock price sensitivity, Theta measures time decay, and Vega measures volatility sensitivity.
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
