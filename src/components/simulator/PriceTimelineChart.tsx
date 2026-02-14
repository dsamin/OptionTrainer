import { useMemo } from 'react'
import type { PricePoint, OptionContract } from '../../lib/options/types'

interface PriceTimelineChartProps {
    contract: OptionContract
    priceData: PricePoint[]
    currentDTE: number
    onDTEChange: (dte: number) => void
}

export function PriceTimelineChart({ priceData, currentDTE, onDTEChange }: PriceTimelineChartProps) {
    const chartDimensions = {
        width: 600,
        height: 300,
        padding: { top: 20, right: 20, bottom: 40, left: 60 }
    }

    const { width, height, padding } = chartDimensions
    const chartWidth = width - padding.left - padding.right
    const chartHeight = height - padding.top - padding.bottom

    // Calculate scales
    const { xScale, yScale, maxPrice } = useMemo(() => {
        const maxDTE = Math.max(...priceData.map(p => p.daysToExpiration))
        const maxPrice = Math.max(...priceData.map(p => p.price))

        return {
            xScale: (dte: number) => padding.left + (chartWidth * (maxDTE - dte) / maxDTE),
            yScale: (price: number) => padding.top + chartHeight - (chartHeight * price / maxPrice),
            maxPrice
        }
    }, [priceData, chartWidth, chartHeight, padding])

    // Generate path for the price curve
    const pricePath = useMemo(() => {
        if (priceData.length === 0) return ''

        const points = priceData.map(p => `${xScale(p.daysToExpiration)},${yScale(p.price)}`)
        return `M ${points.join(' L ')}`
    }, [priceData, xScale, yScale])

    // Current position marker
    const currentX = xScale(currentDTE)
    const currentPrice = priceData.find(p => p.daysToExpiration === currentDTE)?.price || 0
    const currentY = yScale(currentPrice)

    // Handle click/drag on chart
    const handleChartInteraction = (e: React.MouseEvent<SVGSVGElement>) => {
        const svg = e.currentTarget
        const rect = svg.getBoundingClientRect()
        const x = e.clientX - rect.left

        // Convert x position to DTE
        const maxDTE = Math.max(...priceData.map(p => p.daysToExpiration))
        const dte = Math.round(maxDTE * (1 - (x - padding.left) / chartWidth))
        const clampedDTE = Math.max(0, Math.min(maxDTE, dte))

        onDTEChange(clampedDTE)
    }

    return (
        <div className="card">
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Theta Decay Curve</h3>
            <div className="relative">
                <svg
                    width="100%"
                    height={height}
                    viewBox={`0 0 ${width} ${height}`}
                    className="cursor-pointer"
                    onClick={handleChartInteraction}
                    onMouseMove={(e) => {
                        if (e.buttons === 1) handleChartInteraction(e)
                    }}
                >
                    {/* Grid lines */}
                    {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
                        <line
                            key={`grid-y-${ratio}`}
                            x1={padding.left}
                            y1={padding.top + chartHeight * ratio}
                            x2={width - padding.right}
                            y2={padding.top + chartHeight * ratio}
                            stroke="#374151"
                            strokeWidth="1"
                            strokeDasharray="4"
                        />
                    ))}

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

                    {/* Price curve */}
                    <path
                        d={pricePath}
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Area under curve */}
                    <path
                        d={`${pricePath} L ${width - padding.right},${height - padding.bottom} L ${padding.left},${height - padding.bottom} Z`}
                        fill="url(#priceGradient)"
                        opacity="0.2"
                    />

                    {/* Current position marker */}
                    <line
                        x1={currentX}
                        y1={padding.top}
                        x2={currentX}
                        y2={height - padding.bottom}
                        stroke="#F59E0B"
                        strokeWidth="2"
                        strokeDasharray="4"
                    />
                    <circle
                        cx={currentX}
                        cy={currentY}
                        r="6"
                        fill="#F59E0B"
                        stroke="#FFF"
                        strokeWidth="2"
                    />

                    {/* Y-axis labels */}
                    {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
                        <text
                            key={`label-y-${ratio}`}
                            x={padding.left - 10}
                            y={padding.top + chartHeight * (1 - ratio)}
                            textAnchor="end"
                            dominantBaseline="middle"
                            fill="#9CA3AF"
                            fontSize="12"
                        >
                            ${(maxPrice * ratio).toFixed(2)}
                        </text>
                    ))}

                    {/* X-axis labels */}
                    {[90, 60, 30, 0].map((dte) => (
                        <text
                            key={`label-x-${dte}`}
                            x={xScale(dte)}
                            y={height - padding.bottom + 20}
                            textAnchor="middle"
                            fill="#9CA3AF"
                            fontSize="12"
                        >
                            {dte}
                        </text>
                    ))}

                    {/* Axis titles */}
                    <text
                        x={width / 2}
                        y={height - 5}
                        textAnchor="middle"
                        fill="#9CA3AF"
                        fontSize="14"
                        fontWeight="600"
                    >
                        Days to Expiration
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
                        Option Price ($)
                    </text>

                    {/* Gradient definition */}
                    <defs>
                        <linearGradient id="priceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Current value tooltip */}
                <div className="absolute top-2 right-2 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm">
                    <p className="text-gray-400">At {currentDTE} DTE:</p>
                    <p className="text-primary-400 font-bold">${currentPrice.toFixed(2)}</p>
                </div>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
                Click or drag on the chart to adjust days to expiration
            </p>
        </div>
    )
}
