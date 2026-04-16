import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'

interface LessonEntry {
    day_number: number
    title: string
    completions: number
    avg_score: number
}

export default function PopularLessons({ data }: { data: LessonEntry[] }) {
    const max = Math.max(...data.map(d => d.completions), 1)

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
            <div className="px-5 py-4 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(99, 102, 241, 0.1)' }}>
                <BookOpen className="w-4 h-4" style={{ color: '#8b5cf6' }} />
                <h3 className="text-base font-semibold" style={{ color: '#e2e8f0' }}>Popular Lessons</h3>
            </div>
            <div className="p-5 space-y-3">
                {data.length === 0 ? (
                    <div className="text-center py-6">
                        <p className="text-sm" style={{ color: '#64748b' }}>No lesson data yet</p>
                    </div>
                ) : (
                    data.slice(0, 8).map((lesson, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <span
                                className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                                style={{ background: 'rgba(139,92,246,0.15)', color: '#a78bfa' }}
                            >
                                {i + 1}
                            </span>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-sm truncate" style={{ color: '#e2e8f0' }}>
                                        Day {lesson.day_number}: {lesson.title}
                                    </span>
                                    <span className="text-xs flex-shrink-0 ml-2" style={{ color: '#94a3b8' }}>
                                        {lesson.completions} completed
                                    </span>
                                </div>
                                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(139,92,246,0.08)' }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(lesson.completions / max) * 100}%` }}
                                        transition={{ delay: i * 0.08, duration: 0.5, ease: 'easeOut' }}
                                        className="h-full rounded-full"
                                        style={{ background: 'linear-gradient(90deg, #8b5cf6, #a78bfa)' }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </motion.div>
    )
}
