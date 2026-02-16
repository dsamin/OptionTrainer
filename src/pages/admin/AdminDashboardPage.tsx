import { useState, useEffect } from 'react'
import { adminApi } from '../../services/adminApi'
import { motion } from 'framer-motion'
import { BarChart3 } from 'lucide-react'

export default function AdminDashboardPage() {
    const [analytics, setAnalytics] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const fetchAnalytics = async () => {
        try {
            setError('')
            const data = await adminApi.getAnalytics()
            setAnalytics(data)
        } catch (err: any) {
            setError(err.message || 'Failed to load analytics')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAnalytics()
    }, [])

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <BarChart3 className="w-6 h-6" style={{ color: '#6366f1' }} />
                    <h1 className="text-2xl font-bold" style={{ color: '#e2e8f0' }}>Dashboard</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="h-28 rounded-xl animate-pulse"
                            style={{ background: '#12121f' }}
                        />
                    ))}
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <p className="text-red-400 mb-4">{error}</p>
                <button
                    onClick={() => { setLoading(true); fetchAnalytics(); }}
                    className="px-4 py-2 rounded-lg text-white"
                    style={{ background: '#6366f1' }}
                >
                    Retry
                </button>
            </div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            <div className="flex items-center gap-3">
                <BarChart3 className="w-6 h-6" style={{ color: '#6366f1' }} />
                <h1 className="text-2xl font-bold" style={{ color: '#e2e8f0' }}>Dashboard</h1>
            </div>
            <pre className="text-xs overflow-auto p-4 rounded-xl" style={{ background: '#12121f', color: '#94a3b8' }}>
                {JSON.stringify(analytics, null, 2)}
            </pre>
        </motion.div>
    )
}
