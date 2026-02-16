import { useState, useEffect } from 'react'
import { adminApi } from '../../services/adminApi'
import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'

export default function AdminLogsPage() {
    const [logs, setLogs] = useState<any[]>([])
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
            <div className="flex items-center gap-3">
                <FileText className="w-6 h-6" style={{ color: '#6366f1' }} />
                <h1 className="text-2xl font-bold" style={{ color: '#e2e8f0' }}>Request Logs</h1>
                <span className="text-sm ml-auto" style={{ color: '#94a3b8' }}>
                    {total} total entries
                </span>
            </div>

            {loading ? (
                <div className="space-y-2">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="h-10 rounded-lg animate-pulse" style={{ background: '#12121f' }} />
                    ))}
                </div>
            ) : error ? (
                <div className="text-center py-10">
                    <p className="text-red-400 mb-4">{error}</p>
                    <button
                        onClick={() => fetchLogs()}
                        className="px-4 py-2 rounded-lg text-white"
                        style={{ background: '#6366f1' }}
                    >
                        Retry
                    </button>
                </div>
            ) : (
                <>
                    <pre className="text-xs overflow-auto p-4 rounded-xl" style={{ background: '#12121f', color: '#94a3b8' }}>
                        {JSON.stringify(logs, null, 2)}
                    </pre>
                    {/* Pagination */}
                    <div className="flex items-center justify-center gap-4">
                        <button
                            onClick={() => fetchLogs(page - 1)}
                            disabled={page <= 1}
                            className="px-4 py-2 rounded-lg text-sm disabled:opacity-30"
                            style={{ background: '#12121f', color: '#e2e8f0' }}
                        >
                            Previous
                        </button>
                        <span className="text-sm" style={{ color: '#94a3b8' }}>
                            Page {page} of {pages}
                        </span>
                        <button
                            onClick={() => fetchLogs(page + 1)}
                            disabled={page >= pages}
                            className="px-4 py-2 rounded-lg text-sm disabled:opacity-30"
                            style={{ background: '#12121f', color: '#e2e8f0' }}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </motion.div>
    )
}
