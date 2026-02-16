import { motion } from 'framer-motion'

interface QuizEntry {
    day_number: number
    title: string
    attempts: number
    avg_score: number
    perfect_scores: number
}

export default function QuizPerformance({ data }: { data: QuizEntry[] }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="rounded-xl"
            style={{
                background: '#12121f',
                border: '1px solid rgba(99, 102, 241, 0.15)',
            }}
        >
            <div className="px-5 py-4" style={{ borderBottom: '1px solid rgba(99, 102, 241, 0.1)' }}>
                <h3 className="text-base font-semibold" style={{ color: '#e2e8f0' }}>Quiz Performance</h3>
            </div>
            <div className="p-5">
                {data.length === 0 ? (
                    <div className="text-center py-6">
                        <p className="text-sm" style={{ color: '#64748b' }}>No quiz data yet</p>
                    </div>
                ) : (
                    <div className="flex items-end gap-2 h-48">
                        {data.map((entry, i) => {
                            const barColor = entry.avg_score >= 90 ? '#22c55e' :
                                entry.avg_score >= 70 ? '#f59e0b' : '#ef4444'
                            return (
                                <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                                    <span className="text-[10px] font-medium" style={{ color: barColor }}>
                                        {entry.avg_score}%
                                    </span>
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${Math.max(entry.avg_score, 5)}%` }}
                                        transition={{ delay: i * 0.05, duration: 0.5, ease: 'easeOut' }}
                                        className="w-full rounded-t-md relative group cursor-default"
                                        style={{
                                            background: `${barColor}30`,
                                            border: `1px solid ${barColor}50`,
                                            borderBottom: 'none',
                                            minHeight: 4,
                                        }}
                                    >
                                        <div
                                            className="absolute -top-20 left-1/2 -translate-x-1/2 px-3 py-2 rounded-lg text-xs whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                            style={{ background: '#1e1e2f', border: '1px solid rgba(99,102,241,0.2)', color: '#e2e8f0' }}
                                        >
                                            <div className="font-medium">{entry.title}</div>
                                            <div style={{ color: '#94a3b8' }}>{entry.attempts} attempts · {entry.perfect_scores} perfect</div>
                                        </div>
                                    </motion.div>
                                    <span className="text-[10px]" style={{ color: '#64748b' }}>D{entry.day_number}</span>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </motion.div>
    )
}
