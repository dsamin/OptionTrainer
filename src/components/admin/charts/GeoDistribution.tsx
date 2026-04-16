import { motion } from 'framer-motion'
import { Globe } from 'lucide-react'

interface GeoEntry {
    location: string
    count: number
}

export default function GeoDistribution({ data }: { data: GeoEntry[] }) {
    const max = Math.max(...data.map(d => d.count), 1)

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl"
            style={{
                background: '#12121f',
                border: '1px solid rgba(99, 102, 241, 0.15)',
            }}
        >
            <div className="px-5 py-4 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(99, 102, 241, 0.1)' }}>
                <Globe className="w-4 h-4" style={{ color: '#6366f1' }} />
                <h3 className="text-base font-semibold" style={{ color: '#e2e8f0' }}>Geo Distribution</h3>
            </div>
            <div className="p-5 space-y-3">
                {data.length === 0 ? (
                    <div className="text-center py-6">
                        <Globe className="w-8 h-8 mx-auto mb-2" style={{ color: '#334155' }} />
                        <p className="text-sm" style={{ color: '#64748b' }}>No location data yet</p>
                    </div>
                ) : (
                    data.slice(0, 8).map((entry, i) => (
                        <div key={i} className="space-y-1.5">
                            <div className="flex items-center justify-between text-sm">
                                <span style={{ color: '#e2e8f0' }}>{entry.location}</span>
                                <span style={{ color: '#94a3b8' }}>{entry.count}</span>
                            </div>
                            <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(99,102,241,0.08)' }}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(entry.count / max) * 100}%` }}
                                    transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
                                    className="h-full rounded-full"
                                    style={{
                                        background: 'linear-gradient(90deg, #6366f1, #818cf8)',
                                    }}
                                />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </motion.div>
    )
}
