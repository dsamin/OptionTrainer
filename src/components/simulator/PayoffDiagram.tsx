import { useMemo } from 'react'
import type { OptionContract } from '../../lib/options/types'
import { calculateIntrinsicValue } from '../../lib/options/blackScholes'

interface PayoffDiagramProps {
    contract: OptionContract
    premium: number
}

export function PayoffDiagram({ contract, premium }: PayoffDiagramProps) {
    const chartDimensions = {
        width: 600,
        height: 250,
        padding: { top: 20, right: 20, bottom: 40, left: 60 }
    }

    const { width, height, padding } = chartDimensions
    const chartWidth = width - padding.left - padding.right
    const chartHeight = height - padding.top - padding.bottom

    // Generate payoff data
    const { payoffData, minStock, maxStock, maxProfit, maxLoss } = useMemo(() => {
        const { stockPrice } = contract

        // Stock price range: ±50% of current price
        const minStock = Math.max(1, stockPrice * 0.5)
        const maxStock = stockPrice * 1.5
        const step = (maxStock - minStock) / 100

        const payoffData: { stockPrice: number; profitLoss: number }[] = []

        for (let s = minStock; s <= maxStock; s += step) {
            const contractAtExpiration = { ...contract, stockPrice: s, daysToExpiration: 0 }
            const intrinsic = calculateIntrinsicValue(contractAtExpiration)
            const profitLoss = intrinsic - premium
            payoffData.push({ stockPrice: s, profitLoss })
        }

        const maxProfit = Math.max(...payoffData.map(d => d.profitLoss))
        const maxLoss = Math.min(...payoffData.map(d => d.profitLoss))

        return { payoffData, minStock, maxStock, maxProfit, maxLoss }
    }, [contract, premium])

    // Calculate scales
    const xScale = (stockPrice: number) =>
        padding.left + (chartWidth * (stockPrice - minStock) / (maxStock - minStock))

    const yRange = Math.max(Math.abs(maxProfit), Math.abs(maxLoss)) * 1.2
    const yScale = (profitLoss: number) =>
        padding.top + chartHeight / 2 - (chartHeight / 2) * (profitLoss / yRange)

    // Generate path for payoff line
    const payoffPath = useMemo(() => {
        if (payoffData.length === 0) return ''
        const points = payoffData.map(d => `${xScale(d.stockPrice)},${yScale(d.profitLoss)}`)
        return `M ${points.join(' L ')}`
    }, [payoffData, xScale, yScale])

    // Current stock price position
    const currentX = xScale(contract.stockPrice)
    const zeroY = yScale(0)

    // Breakeven point
    const breakeven = contract.type === 'call'
        ? contract.strikePrice + premium
        : contract.strikePrice - premium

    return (
        <div className="card">
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Payoff Diagram at Expiration</h3>
            <svg
                width="100%"
                height={height}
                viewBox={`0 0 ${width} ${height}`}
            >
                {/* Zero line */}
                <line
                    x1={padding.left}
                    y1={zeroY}
                    x2={width - padding.right}
                    y2={zeroY}
                    stroke="#6B7280"
                    strokeWidth="2"
                    strokeDasharray="4"
                />

                {/* Profit/Loss regions */}
                <path
                    d={`${payoffPath} L ${width - padding.right},${zeroY} L ${padding.left},${zeroY} Z`}
                    fill="url(#profitGradient)"
                    opacity="0.3"
                />

                {/* Axes */}
                <line
                    x1={padding.left}
                    y1={padding.top}
                    x2={padding.left}
                    y2={height - padding.bottom}
                    stroke="#9CA3AF"
                    strokeWidth="2"
                />
                <line
                    x1={padding.left}
                    y1={height - padding.bottom}
                    x2={width - padding.right}
                    y2={height - padding.bottom}
                    stroke="#9CA3AF"
                    strokeWidth="2"
                />

                {/* Payoff line */}
                <path
                    d={payoffPath}
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Current stock price marker */}
                <line
                    x1={currentX}
                    y1={padding.top}
                    x2={currentX}
                    y2={height - padding.bottom}
                    stroke="#F59E0B"
                    strokeWidth="2"
                    strokeDasharray="4"
                />
                <text
                    x={currentX}
                    y={padding.top - 5}
                    textAnchor="middle"
                    fill="#F59E0B"
                    fontSize="12"
                    fontWeight="600"
                >
                    Current
                </text>

                {/* Strike price marker */}
                <line
                    x1={xScale(contract.strikePrice)}
                    y1={padding.top}
                    x2={xScale(contract.strikePrice)}
                    y2={height - padding.bottom}
                    stroke="#8B5CF6"
                    strokeWidth="2"
                    strokeDasharray="2"
                />
                <text
                    x={xScale(contract.strikePrice)}
                    y={height - padding.bottom + 15}
                    textAnchor="middle"
                    fill="#8B5CF6"
                    fontSize="11"
                    fontWeight="600"
                >
                    Strike
                </text>

                {/* Y-axis labels */}
                {[-1, -0.5, 0, 0.5, 1].map((ratio) => {
                    const value = yRange * ratio
                    return (
                        <text
                            key={`label-y-${ratio}`}
                            x={padding.left - 10}
                            y={yScale(value)}
                            textAnchor="end"
                            dominantBaseline="middle"
                            fill="#9CA3AF"
                            fontSize="12"
                        >
                            ${value.toFixed(0)}
                        </text>
                    )
                })}

                {/* X-axis labels */}
                {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                    const stockPrice = minStock + (maxStock - minStock) * ratio
                    return (
                        <text
                            key={`label-x-${ratio}`}
                            x={xScale(stockPrice)}
                            y={height - padding.bottom + 20}
                            textAnchor="middle"
                            fill="#9CA3AF"
                            fontSize="12"
                        >
                            ${stockPrice.toFixed(0)}
                        </text>
                    )
                })}

                {/* Axis titles */}
                <text
                    x={width / 2}
                    y={height - 5}
                    textAnchor="middle"
                    fill="#9CA3AF"
                    fontSize="14"
                    fontWeight="600"
                >
                    Stock Price at Expiration
                </text>
                <text
                    x={15}
                    y={height / 2}
                    textAnchor="middle"
                    fill="#9CA3AF"
                    fontSize="14"
                    fontWeight="600"
                    transform={`rotate(-90, 15, ${height / 2})`}
                >
                    Profit/Loss ($)
                </text>

                {/* Gradient definitions */}
                <defs>
                    <linearGradient id="profitGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.6" />
                        <stop offset="50%" stopColor="#6B7280" stopOpacity="0" />
                        <stop offset="100%" stopColor="#EF4444" stopOpacity="0.6" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mt-4 text-sm">
                <div className="text-center p-2 rounded-lg bg-gray-800/30">
                    <p className="text-gray-400 text-xs mb-1">Max Profit</p>
                    <p className="text-success-400 font-bold">
                        {contract.type === 'call' ? 'Unlimited' : `$${maxProfit.toFixed(2)}`}
                    </p>
                </div>
                <div className="text-center p-2 rounded-lg bg-gray-800/30">
                    <p className="text-gray-400 text-xs mb-1">Max Loss</p>
                    <p className="text-warning-400 font-bold">${Math.abs(maxLoss).toFixed(2)}</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-gray-800/30">
                    <p className="text-gray-400 text-xs mb-1">Breakeven</p>
                    <p className="text-primary-400 font-bold">${breakeven.toFixed(2)}</p>
                </div>
            </div>
        </div>
    )
}
