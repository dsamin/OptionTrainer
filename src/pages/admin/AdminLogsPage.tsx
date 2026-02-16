import { useState, useEffect } from 'react'
import { adminApi } from '../../services/adminApi'
import { motion } from 'framer-motion'
import { FileText, Clock, Globe, Monitor, ChevronLeft, ChevronRight } from 'lucide-react'

interface LogEntry {
    id: number
    timestamp: string
    method: string
    endpoint: string
    user_id: number | null
    ip: string
    user_agent: string
    status_code: number
}

function formatTimestamp(ts: string): string {
    const d = new Date(ts)
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

function methodColor(method: string): { bg: string; text: string } {
    switch (method) {
        case 'GET': return { bg: 'rgba(34,197,94,0.15)', text: '#22c55e' }
        case 'POST': return { bg: 'rgba(59,130,246,0.15)', text: '#3b82f6' }
        case 'PUT': return { bg: 'rgba(245,158,11,0.15)', text: '#f59e0b' }
        case 'DELETE': return { bg: 'rgba(239,68,68,0.15)', text: '#ef4444' }
        default: return { bg: 'rgba(148,163,184,0.15)', text: '#94a3b8' }
    }
}

function statusColor(code: number): string {
    if (code >= 200 && code < 300) return '#22c55e'
    if (code >= 400 && code < 500) return '#f59e0b'
    if (code >= 500) return '#ef4444'
    return '#94a3b8'
}

function shortenUA(ua: string): string {
    if (ua.includes('Chrome')) return 'Chrome'
    if (ua.includes('Firefox')) return 'Firefox'
    if (ua.includes('Safari')) return 'Safari'
    if (ua.includes('curl')) return 'curl'
    return ua.slice(0, 20)
}

export default function AdminLogsPage() {
    const [logs, setLogs] = useState<LogEntry[]>([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const fetchLogs = async (p = 1) => {
        try {
            setError('')
            setLoading(true)
            const data = await adminApi.getLogs(p, 50)
            setLogs(data.logs)
            setTotal(data.total)
            setPage(data.page)
            setPages(data.pages)
        } catch (err: any) {
            setError(err.message || 'Failed to load logs')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchLogs()
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            {/* Header */}
            <div className="flex items-center gap-3">
                <FileText className="w-6 h-6" style={{ color: '#6366f1' }} />
                <h1 className="text-2xl font-bold" style={{ color: '#e2e8f0' }}>Request Logs</h1>
                <span className="text-sm ml-auto px-3 py-1 rounded-full" style={{ background: 'rgba(99,102,241,0.1)', color: '#818cf8' }}>
                    {total} entries
                </span>
            </div>

            {/* Table Container */}
            <div
                className="rounded-xl overflow-hidden"
                style={{
                    background: '#12121f',
                    border: '1px solid rgba(99, 102, 241, 0.15)',
                }}
            >
                {loading ? (
                    <div className="p-4 space-y-2">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="h-10 rounded-lg animate-pulse" style={{ background: 'rgba(99,102,241,0.05)' }} />
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-center py-10">
                        <p className="text-red-400 mb-4">{error}</p>
                        <button onClick={() => fetchLogs()} className="px-4 py-2 rounded-lg text-white" style={{ background: '#6366f1' }}>
                            Retry
                        </button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr style={{ borderBottom: '1px solid rgba(99, 102, 241, 0.1)' }}>
                                    {['Time', 'Method', 'Endpoint', 'Status', 'User', 'IP', 'Client'].map(h => (
                                        <th key={h} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#64748b' }}>
                                            <div className="flex items-center gap-1.5">
                                                {h === 'Time' && <Clock className="w-3 h-3" />}
                                                {h === 'IP' && <Globe className="w-3 h-3" />}
                                                {h === 'Client' && <Monitor className="w-3 h-3" />}
                                                {h}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {logs.map((log, i) => {
                                    const mc = methodColor(log.method)
                                    return (
                                        <tr
                                            key={log.id}
                                            className="transition-colors"
                                            style={{
                                                borderBottom: '1px solid rgba(99, 102, 241, 0.05)',
                                                background: i % 2 === 1 ? 'rgba(255,255,255,0.01)' : 'transparent',
                                            }}
                                            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(99,102,241,0.04)')}
                                            onMouseLeave={(e) => (e.currentTarget.style.background = i % 2 === 1 ? 'rgba(255,255,255,0.01)' : 'transparent')}
                                        >
                                            <td className="px-4 py-2.5 whitespace-nowrap text-xs" style={{ color: '#94a3b8' }}>
                                                {formatTimestamp(log.timestamp)}
                                            </td>
                                            <td className="px-4 py-2.5">
                                                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold" style={{ background: mc.bg, color: mc.text }}>
                                                    {log.method}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2.5 font-mono text-xs" style={{ color: '#e2e8f0' }}>
                                                {log.endpoint}
                                            </td>
                                            <td className="px-4 py-2.5">
                                                <span className="font-mono text-xs font-bold" style={{ color: statusColor(log.status_code) }}>
                                                    {log.status_code}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2.5 text-xs" style={{ color: '#94a3b8' }}>
                                                {log.user_id || '—'}
                                            </td>
                                            <td className="px-4 py-2.5 font-mono text-xs" style={{ color: '#94a3b8' }}>
                                                {log.ip}
                                            </td>
                                            <td className="px-4 py-2.5 text-xs" style={{ color: '#64748b' }}>
                                                {shortenUA(log.user_agent)}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                {!loading && !error && pages > 1 && (
                    <div
                        className="px-4 py-3 flex items-center justify-between"
                        style={{ borderTop: '1px solid rgba(99, 102, 241, 0.1)' }}
                    >
                        <span className="text-xs" style={{ color: '#64748b' }}>
                            Showing page {page} of {pages}
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => fetchLogs(page - 1)}
                                disabled={page <= 1}
                                className="p-1.5 rounded-lg transition-colors disabled:opacity-30"
                                style={{ background: 'rgba(99,102,241,0.1)', color: '#818cf8' }}
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            {/* Page numbers */}
                            {Array.from({ length: Math.min(5, pages) }, (_, i) => {
                                let pageNum: number
                                if (pages <= 5) pageNum = i + 1
                                else if (page <= 3) pageNum = i + 1
                                else if (page >= pages - 2) pageNum = pages - 4 + i
                                else pageNum = page - 2 + i

                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => fetchLogs(pageNum)}
                                        className="w-8 h-8 rounded-lg text-xs font-medium transition-colors"
                                        style={{
                                            background: pageNum === page ? 'rgba(99,102,241,0.2)' : 'transparent',
                                            color: pageNum === page ? '#818cf8' : '#64748b',
                                        }}
                                    >
                                        {pageNum}
                                    </button>
                                )
                            })}
                            <button
                                onClick={() => fetchLogs(page + 1)}
                                disabled={page >= pages}
                                className="p-1.5 rounded-lg transition-colors disabled:opacity-30"
                                style={{ background: 'rgba(99,102,241,0.1)', color: '#818cf8' }}
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    )
}
