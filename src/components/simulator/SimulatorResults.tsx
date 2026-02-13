import type { SimulationResult, OptionContract } from '../../lib/options/types'
import { TrendingUp, Clock, Zap, Activity } from 'lucide-react'

interface SimulatorResultsProps {
    result: SimulationResult
    contract: OptionContract
}

export function SimulatorResults({ result, contract }: SimulatorResultsProps) {
    const { theoreticalPrice, greeks, intrinsicValue, timeValue } = result

    return (
        <div className="space-y-4">
            {/* Main Price Display */}
            <div className="card bg-gradient-to-br from-primary-900/40 to-primary-800/20 border-primary-700/30">
                <div className="text-center">
                    <p className="text-sm text-gray-400 mb-1">Theoretical Option Price</p>
                    <p className="text-4xl font-bold text-primary-400">${theoreticalPrice.toFixed(2)}</p>
                    <div className="flex justify-center gap-4 mt-3 text-sm">
                        <div>
                            <span className="text-gray-400">Intrinsic: </span>
                            <span className="text-gray-200 font-semibold">${intrinsicValue.toFixed(2)}</span>
                        </div>
                        <div>
                            <span className="text-gray-400">Time: </span>
                            <span className="text-gray-200 font-semibold">${timeValue.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Greeks Panel */}
            <div className="card">
                <h3 className="text-lg font-semibold mb-4 text-gray-200">The Greeks</h3>
                <div className="space-y-3">
                    {/* Delta */}
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-800/50">
                        <div className="p-2 rounded-lg bg-primary-600/20">
                            <TrendingUp className="w-5 h-5 text-primary-400" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <span className="font-semibold text-gray-200">Delta</span>
                                <span className="text-primary-400 font-bold">{greeks.delta.toFixed(4)}</span>
                            </div>
                            <p className="text-xs text-gray-400">
                                For every $1 stock move, option moves ${Math.abs(greeks.delta).toFixed(2)}
                            </p>
                        </div>
                    </div>

                    {/* Gamma */}
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-800/50">
                        <div className="p-2 rounded-lg bg-purple-600/20">
                            <Activity className="w-5 h-5 text-purple-400" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <span className="font-semibold text-gray-200">Gamma</span>
                                <span className="text-purple-400 font-bold">{greeks.gamma.toFixed(4)}</span>
                            </div>
                            <p className="text-xs text-gray-400">
                                Delta changes by {greeks.gamma.toFixed(4)} per $1 stock move
                            </p>
                        </div>
                    </div>

                    {/* Theta */}
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-800/50">
                        <div className="p-2 rounded-lg bg-warning-600/20">
                            <Clock className="w-5 h-5 text-warning-400" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <span className="font-semibold text-gray-200">Theta</span>
                                <span className={`font-bold ${greeks.theta < 0 ? 'text-warning-400' : 'text-success-400'}`}>
                                    ${greeks.theta.toFixed(2)}/day
                                </span>
                            </div>
                            <p className="text-xs text-gray-400">
                                Option {greeks.theta < 0 ? 'loses' : 'gains'} ${Math.abs(greeks.theta).toFixed(2)} per day
                            </p>
                        </div>
                    </div>

                    {/* Vega */}
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-800/50">
                        <div className="p-2 rounded-lg bg-blue-600/20">
                            <Zap className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <span className="font-semibold text-gray-200">Vega</span>
                                <span className="text-blue-400 font-bold">{greeks.vega.toFixed(4)}</span>
                            </div>
                            <p className="text-xs text-gray-400">
                                Option price changes ${greeks.vega.toFixed(2)} per 1% IV change
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="card bg-gray-800/30">
                    <p className="text-gray-400 mb-1">Moneyness</p>
                    <p className="font-semibold text-gray-200">
                        {intrinsicValue > 0 ? 'ITM' : intrinsicValue === 0 ? 'ATM' : 'OTM'}
                    </p>
                </div>
                <div className="card bg-gray-800/30">
                    <p className="text-gray-400 mb-1">Risk-Free Rate</p>
                    <p className="font-semibold text-gray-200">{(contract.riskFreeRate * 100).toFixed(1)}%</p>
                </div>
            </div>
        </div>
    )
}
