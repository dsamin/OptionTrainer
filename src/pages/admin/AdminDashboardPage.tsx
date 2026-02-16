import { useState, useEffect, useCallback } from 'react'
import { adminApi } from '../../services/adminApi'
import { motion } from 'framer-motion'
import { BarChart3, RefreshCw } from 'lucide-react'
import OverviewCards from '../../components/admin/cards/OverviewCards'
import UserStatsTable from '../../components/admin/cards/UserStatsTable'
import LoginTimeline from '../../components/admin/charts/LoginTimeline'
import GeoDistribution from '../../components/admin/charts/GeoDistribution'
import QuizPerformance from '../../components/admin/charts/QuizPerformance'
import PopularLessons from '../../components/admin/charts/PopularLessons'
import UserProgressComparison from '../../components/admin/charts/UserProgressComparison'
import ActivityFeed from '../../components/admin/ActivityFeed'

export default function AdminDashboardPage() {
    const [analytics, setAnalytics] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [refreshing, setRefreshing] = useState(false)

    const fetchAnalytics = useCallback(async (isRefresh = false) => {
        try {
            setError('')
            if (isRefresh) setRefreshing(true)
            const data = await adminApi.getAnalytics()
            setAnalytics(data)
        } catch (err: any) {
            setError(err.message || 'Failed to load analytics')
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }, [])

    useEffect(() => {
        fetchAnalytics()
        // Auto-refresh every 5 minutes
        const interval = setInterval(() => fetchAnalytics(true), 300000)
        return () => clearInterval(interval)
    }, [fetchAnalytics])

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <BarChart3 className="w-6 h-6" style={{ color: '#6366f1' }} />
                    <h1 className="text-2xl font-bold" style={{ color: '#e2e8f0' }}>Dashboard</h1>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-28 rounded-xl animate-pulse" style={{ background: '#12121f' }} />
                    ))}
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                    <div className="xl:col-span-2 h-80 rounded-xl animate-pulse" style={{ background: '#12121f' }} />
                    <div className="h-80 rounded-xl animate-pulse" style={{ background: '#12121f' }} />
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
                    className="px-4 py-2 rounded-lg text-white font-medium"
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
            className="space-y-6 pb-8"
        >
            {/* Header */}
            <div className="flex items-center gap-3">
                <BarChart3 className="w-6 h-6" style={{ color: '#6366f1' }} />
                <h1 className="text-2xl font-bold" style={{ color: '#e2e8f0' }}>Dashboard</h1>
                <div className="ml-auto flex items-center gap-3">
                    <button
                        onClick={() => fetchAnalytics(true)}
                        disabled={refreshing}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                        style={{
                            background: 'rgba(99,102,241,0.1)',
                            border: '1px solid rgba(99,102,241,0.2)',
                            color: refreshing ? '#64748b' : '#818cf8',
                        }}
                    >
                        <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
                        {refreshing ? 'Refreshing...' : 'Refresh'}
                    </button>
                </div>
            </div>

            {/* Overview Cards */}
            <OverviewCards data={analytics.overview} />

            {/* Row: Login Timeline + Activity Feed */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                <div className="xl:col-span-2">
                    <LoginTimeline data={analytics.login_timeline} />
                </div>
                <ActivityFeed data={analytics.recent_activity} />
            </div>

            {/* User Stats Table */}
            <UserStatsTable users={analytics.per_user} />

            {/* Row: Quiz Performance + Geo Distribution */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <QuizPerformance data={analytics.quiz_performance} />
                <GeoDistribution data={analytics.geo_distribution} />
            </div>

            {/* Row: Popular Lessons + User Progress Comparison */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <PopularLessons data={analytics.popular_lessons} />
                <UserProgressComparison users={analytics.per_user} />
            </div>
        </motion.div>
    )
}
