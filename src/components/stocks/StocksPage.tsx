import { motion } from 'framer-motion'
import {
    TrendingUp,
    BarChart3,
    Eye,
    ExternalLink,
    ArrowUpRight,
    ArrowDownRight,
    Minus
} from 'lucide-react'
import { WATCHED_STOCKS } from '../../stores/settingsStore'
import { cn } from '../../lib/utils'

// Simulated mini sparkline data for visual interest
const generateSparkline = (seed: number): number[] => {
    const data: number[] = []
    let value = 50 + (seed % 30)
    for (let i = 0; i < 20; i++) {
        value += (Math.sin(seed * i * 0.3) * 5) + (Math.cos(seed * i * 0.7) * 3)
        data.push(Math.max(10, Math.min(90, value)))
    }
    return data
}

const generateTrend = (seed: number): 'up' | 'down' | 'flat' => {
    const mod = seed % 3
    return mod === 0 ? 'up' : mod === 1 ? 'down' : 'flat'
}

function MiniSparkline({ data, trend }: { data: number[], trend: string }) {
    const min = Math.min(...data)
    const max = Math.max(...data)
    const range = max - min || 1
    const width = 120
    const height = 40

    const points = data.map((v, i) => {
        const x = (i / (data.length - 1)) * width
        const y = height - ((v - min) / range) * height
        return `${x},${y}`
    }).join(' ')

    return (
        <svg width={width} height={height} className="overflow-visible">
            <polyline
                points={points}
                fill="none"
                stroke={trend === 'up' ? '#4ade80' : trend === 'down' ? '#f87171' : '#94a3b8'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export function StocksPage() {
    return (
        <div className="max-w-6xl mx-auto space-y-6 pb-12">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-1">Your Watchlist</h1>
                        <p className="text-gray-400">Stocks referenced throughout your options trading curriculum</p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-900/30 border border-primary-700/30">
                        <Eye className="w-5 h-5 text-primary-400" />
                        <span className="text-primary-400 font-medium">{WATCHED_STOCKS.length} stocks</span>
                    </div>
                </div>
            </motion.div>

            {/* Info Banner */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="card bg-gradient-to-r from-primary-900/30 to-purple-900/20 border-primary-700/20"
            >
                <div className="flex items-start gap-3">
                    <BarChart3 className="w-6 h-6 text-primary-400 shrink-0 mt-0.5" />
                    <div>
                        <h3 className="font-semibold mb-1">Practice with Real Stocks</h3>
                        <p className="text-gray-400 text-sm">
                            These are the stocks used in your curriculum examples. As you progress through lessons,
                            you'll learn to analyze these tickers using technical indicators, read their option chains,
                            and apply strategies like iron condors and credit spreads.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Stocks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {WATCHED_STOCKS.map((stock, i) => {
                    const trend = generateTrend(i + stock.symbol.charCodeAt(0))
                    const sparklineData = generateSparkline(i + stock.symbol.charCodeAt(0))
                    const TrendIcon = trend === 'up' ? ArrowUpRight : trend === 'down' ? ArrowDownRight : Minus

                    return (
                        <motion.div
                            key={stock.symbol}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + i * 0.04 }}
                            className={cn(
                                'card group cursor-pointer transition-all duration-300',
                                'hover:border-primary-600/50 hover:bg-gray-800/50'
                            )}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-xl font-bold">{stock.symbol}</h3>
                                        <TrendIcon className={cn(
                                            'w-4 h-4',
                                            trend === 'up' ? 'text-success-400' :
                                                trend === 'down' ? 'text-danger-400' : 'text-gray-400'
                                        )} />
                                    </div>
                                    <p className="text-sm text-gray-500">{stock.name}</p>
                                </div>
                                <div className="p-2 rounded-lg bg-gray-800 group-hover:bg-primary-600/20 transition-colors">
                                    <TrendingUp className="w-5 h-5 text-gray-400 group-hover:text-primary-400 transition-colors" />
                                </div>
                            </div>

                            {/* Mini Chart */}
                            <div className="mb-4 flex justify-center opacity-60 group-hover:opacity-100 transition-opacity">
                                <MiniSparkline data={sparklineData} trend={trend} />
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <span className={cn(
                                    'flex items-center gap-1 font-medium',
                                    trend === 'up' ? 'text-success-400' :
                                        trend === 'down' ? 'text-danger-400' : 'text-gray-400'
                                )}>
                                    {trend === 'up' ? '▲ Bullish' :
                                        trend === 'down' ? '▼ Bearish' : '— Neutral'}
                                </span>
                                <span className="text-gray-500 flex items-center gap-1 group-hover:text-primary-400 transition-colors">
                                    View Analysis
                                    <ExternalLink className="w-3 h-3" />
                                </span>
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            {/* Study Tip */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="card bg-gradient-to-r from-success-600/10 to-primary-600/10 border-success-600/20"
            >
                <div className="flex items-start gap-3">
                    <div className="text-2xl">💡</div>
                    <div>
                        <h3 className="font-semibold mb-1">Tip: Multi-Time Frame Analysis</h3>
                        <p className="text-gray-400 text-sm">
                            When analyzing these stocks for options trades, always check the weekly chart for overall direction,
                            the daily chart for entry timing, and the 4-hour chart for fine-tuning your strikes. This approach
                            is covered in detail during Week 1 of the curriculum.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
