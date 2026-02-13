import { useState, useMemo } from 'react'
import type { OptionContract } from '../../lib/options/types'
import { calculateSimulationResult, simulatePriceOverTime } from '../../lib/options/blackScholes'

export interface MiniSimulatorPreset {
    stockPrice: number
    strikePrice: number
    optionType: 'call' | 'put'
    scenario: 'theta-decay' | 'delta-sensitivity' | 'full'
}

interface MiniSimulatorProps {
    preset: MiniSimulatorPreset
    showControls?: ('dte' | 'stockPrice' | 'strike' | 'iv')[]
}

export function MiniSimulator({ preset, showControls = ['dte'] }: MiniSimulatorProps) {
    const [contract, setContract] = useState<OptionContract>({
        type: preset.optionType,
        stockPrice: preset.stockPrice,
        strikePrice: preset.strikePrice,
        daysToExpiration: 30,
        impliedVolatility: 0.30,
        riskFreeRate: 0.05
    })

    const result = useMemo(() => calculateSimulationResult(contract), [contract])

    const priceData = useMemo(() => {
        const days = Array.from({ length: 91 }, (_, i) => 90 - i)
        return simulatePriceOverTime(contract, days)
    }, [contract])

    const handleChange = (field: keyof OptionContract, value: number) => {
        setContract(prev => ({ ...prev, [field]: value }))
    }

    // Simplified chart for mini version
    const maxPrice = Math.max(...priceData.map(p => p.price))
    const chartHeight = 120
    const chartWidth = 300

    return (
        <div className="card bg-primary-900/10 border-primary-700/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Controls */}
                <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-300 mb-3">Interactive Controls</h4>

                    {showControls.includes('stockPrice') && (
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">
                                Stock Price: <span className="text-primary-400 font-bold">${contract.stockPrice}</span>
                            </label>
                            <input
                                type="range"
                                min={Math.max(10, preset.stockPrice - 50)}
                                max={preset.stockPrice + 50}
                                step="1"
                                value={contract.stockPrice}
                                onChange={(e) => handleChange('stockPrice', Number(e.target.value))}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                            />
                        </div>
                    )}

                    {showControls.includes('strike') && (
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">
                                Strike Price: <span className="text-primary-400 font-bold">${contract.strikePrice}</span>
                            </label>
                            <input
                                type="range"
                                min={Math.max(10, preset.strikePrice - 50)}
                                max={preset.strikePrice + 50}
                                step="5"
                                value={contract.strikePrice}
                                onChange={(e) => handleChange('strikePrice', Number(e.target.value))}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                            />
                        </div>
                    )}

                    {showControls.includes('dte') && (
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">
                                Days to Expiration: <span className="text-primary-400 font-bold">{contract.daysToExpiration}</span>
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="90"
                                step="1"
                                value={contract.daysToExpiration}
                                onChange={(e) => handleChange('daysToExpiration', Number(e.target.value))}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                            />
                        </div>
                    )}

                    {showControls.includes('iv') && (
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">
                                Implied Volatility: <span className="text-primary-400 font-bold">{(contract.impliedVolatility * 100).toFixed(0)}%</span>
                            </label>
                            <input
                                type="range"
                                min="0.10"
                                max="1.00"
                                step="0.01"
                                value={contract.impliedVolatility}
                                onChange={(e) => handleChange('impliedVolatility', Number(e.target.value))}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                            />
                        </div>
                    )}

                    {/* Key Metrics */}
                    <div className="pt-2 border-t border-gray-700/30">
                        <div className="text-center mb-2">
                            <p className="text-xs text-gray-400">Option Price</p>
                            <p className="text-2xl font-bold text-primary-400">${result.theoreticalPrice.toFixed(2)}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="text-center p-2 rounded bg-gray-800/30">
                                <p className="text-gray-400">Delta</p>
                                <p className="font-semibold text-gray-200">{result.greeks.delta.toFixed(3)}</p>
                            </div>
                            <div className="text-center p-2 rounded bg-gray-800/30">
                                <p className="text-gray-400">Theta</p>
                                <p className="font-semibold text-warning-400">${result.greeks.theta.toFixed(2)}/day</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mini Chart */}
                <div>
                    <h4 className="text-sm font-semibold text-gray-300 mb-3">
                        {preset.scenario === 'theta-decay' ? 'Theta Decay Curve' :
                            preset.scenario === 'delta-sensitivity' ? 'Price vs Stock' : 'Option Price'}
                    </h4>
                    <svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="bg-gray-800/20 rounded-lg">
                        {/* Simple line chart */}
                        <path
                            d={priceData.map((p, i) => {
                                const x = (i / (priceData.length - 1)) * chartWidth
                                const y = chartHeight - (p.price / maxPrice) * (chartHeight - 20)
                                return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
                            }).join(' ')}
                            fill="none"
                            stroke="#3B82F6"
                            strokeWidth="2"
                        />

                        {/* Current position marker */}
                        {(() => {
                            const currentIndex = priceData.findIndex(p => p.daysToExpiration === contract.daysToExpiration)
                            if (currentIndex === -1) return null
                            const x = (currentIndex / (priceData.length - 1)) * chartWidth
                            const y = chartHeight - (priceData[currentIndex].price / maxPrice) * (chartHeight - 20)
                            return (
                                <>
                                    <line x1={x} y1="0" x2={x} y2={chartHeight} stroke="#F59E0B" strokeWidth="1" strokeDasharray="2" />
                                    <circle cx={x} cy={y} r="4" fill="#F59E0B" stroke="#FFF" strokeWidth="1" />
                                </>
                            )
                        })()}

                        {/* Axis labels */}
                        <text x="5" y="15" fill="#9CA3AF" fontSize="10">${maxPrice.toFixed(0)}</text>
                        <text x="5" y={chartHeight - 5} fill="#9CA3AF" fontSize="10">$0</text>
                        <text x={chartWidth - 30} y={chartHeight - 5} fill="#9CA3AF" fontSize="10">0 DTE</text>
                    </svg>

                    <p className="text-xs text-gray-500 mt-2 text-center">
                        {preset.scenario === 'theta-decay' && 'Notice how the option loses value as expiration approaches'}
                        {preset.scenario === 'delta-sensitivity' && 'See how the option price changes with stock price'}
                        {preset.scenario === 'full' && 'Adjust all controls to see how they affect option price'}
                    </p>
                </div>
            </div>
        </div>
    )
}
