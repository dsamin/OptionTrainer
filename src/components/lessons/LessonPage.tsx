import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    BookOpen,
    Lightbulb,
    AlertTriangle,
    Code2,
    BarChart3,
    Dumbbell,
    ChevronLeft,
    ChevronRight,
    Clock,
    Target,
    CheckCircle2,
    Play
} from 'lucide-react'
import { getDayContent, type ContentSection } from '../../data/curriculum'
import { useProgressStore } from '../../stores/progressStore'
import { cn } from '../../lib/utils'

const sectionIcons: Record<ContentSection['type'], typeof BookOpen> = {
    text: BookOpen,
    chart: BarChart3,
    example: Code2,
    tip: Lightbulb,
    warning: AlertTriangle,
    exercise: Dumbbell,
}

const sectionStyles: Record<ContentSection['type'], { bg: string; border: string; iconColor: string; label: string }> = {
    text: { bg: 'bg-gray-800/30', border: 'border-gray-700/30', iconColor: 'text-gray-400', label: '' },
    chart: { bg: 'bg-primary-900/20', border: 'border-primary-700/30', iconColor: 'text-primary-400', label: 'Chart' },
    example: { bg: 'bg-purple-900/20', border: 'border-purple-700/30', iconColor: 'text-purple-400', label: 'Example' },
    tip: { bg: 'bg-primary-900/20', border: 'border-primary-700/30', iconColor: 'text-primary-400', label: 'Pro Tip' },
    warning: { bg: 'bg-warning-600/10', border: 'border-warning-600/30', iconColor: 'text-warning-400', label: 'Warning' },
    exercise: { bg: 'bg-success-600/10', border: 'border-success-600/30', iconColor: 'text-success-400', label: 'Exercise' },
}

function ContentBlock({ section, index }: { section: ContentSection; index: number }) {
    const style = sectionStyles[section.type]
    const Icon = sectionIcons[section.type]

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className={cn(
                'rounded-xl p-4 sm:p-6 border',
                style.bg,
                style.border
            )}
        >
            {/* Section Header */}
            {(section.title || style.label) && (
                <div className="flex items-center gap-3 mb-4">
                    <div className={cn('p-2 rounded-lg', style.bg)}>
                        <Icon className={cn('w-5 h-5', style.iconColor)} />
                    </div>
                    <div>
                        {style.label && (
                            <span className={cn('text-xs font-semibold uppercase tracking-wider', style.iconColor)}>
                                {style.label}
                            </span>
                        )}
                        {section.title && (
                            <h3 className="text-lg font-semibold text-gray-100">{section.title}</h3>
                        )}
                    </div>
                    {section.stock && (
                        <span className="ml-auto badge-primary">{section.stock}</span>
                    )}
                </div>
            )}

            {/* Content */}
            <div className="prose prose-invert max-w-none">
                {section.content.split('\n\n').map((paragraph, i) => (
                    <div key={i} className="mb-3 last:mb-0">
                        {paragraph.split('\n').map((line, j) => {
                            // Handle markdown-style bold
                            const parts = line.split(/(\*\*[^*]+\*\*)/g)
                            return (
                                <p key={j} className="text-gray-300 leading-relaxed mb-1 last:mb-0">
                                    {parts.map((part, k) => {
                                        if (part.startsWith('**') && part.endsWith('**')) {
                                            return <strong key={k} className="text-gray-100 font-semibold">{part.slice(2, -2)}</strong>
                                        }
                                        // Handle list items
                                        if (part.trim().startsWith('- ') || part.trim().startsWith('• ')) {
                                            return <span key={k} className="block pl-4 text-gray-400">{part}</span>
                                        }
                                        // Handle numbered lists
                                        if (/^\d+\.\s/.test(part.trim())) {
                                            return <span key={k} className="block pl-4 text-gray-400">{part}</span>
                                        }
                                        return <span key={k}>{part}</span>
                                    })}
                                </p>
                            )
                        })}
                    </div>
                ))}
            </div>
        </motion.div>
    )
}

export function LessonPage() {
    const { day } = useParams<{ day: string }>()
    const navigate = useNavigate()
    const dayNumber = parseInt(day || '1', 10)
    const lesson = getDayContent(dayNumber)
    const { lessons, isLessonUnlocked } = useProgressStore()

    const isCompleted = lessons[dayNumber]?.completed
    const isUnlocked = isLessonUnlocked(dayNumber)
    const weekNumber = Math.ceil(dayNumber / 6)

    if (!lesson) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Lesson Not Found</h2>
                    <p className="text-gray-400 mb-4">Day {dayNumber} doesn't exist in the curriculum.</p>
                    <Link to="/" className="btn-primary">Back to Dashboard</Link>
                </div>
            </div>
        )
    }

    if (!isUnlocked) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <div className="text-6xl mb-4">🔒</div>
                    <h2 className="text-2xl font-bold mb-2">Lesson Locked</h2>
                    <p className="text-gray-400 mb-4">Complete Day {dayNumber - 1} first to unlock this lesson.</p>
                    <Link to={`/lesson/${dayNumber - 1}`} className="btn-primary">
                        Go to Day {dayNumber - 1}
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-12">
            {/* Breadcrumb + Navigation */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Link to="/" className="hover:text-gray-200 transition-colors">Dashboard</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="hidden sm:inline">Week {weekNumber}</span>
                    <ChevronRight className="w-4 h-4 hidden sm:block" />
                    <span className="text-gray-200">Day {dayNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                    {dayNumber > 1 && (
                        <Link
                            to={`/lesson/${dayNumber - 1}`}
                            className="btn-secondary flex items-center gap-1 text-sm !py-2 !px-3 min-h-[44px]"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            <span className="hidden xs:inline">Prev</span>
                        </Link>
                    )}
                    {dayNumber < 18 && (
                        <Link
                            to={`/lesson/${dayNumber + 1}`}
                            className={cn(
                                'flex items-center gap-1 text-sm !py-2 !px-3 min-h-[44px]',
                                isLessonUnlocked(dayNumber + 1) ? 'btn-secondary' : 'btn-secondary opacity-50 cursor-not-allowed'
                            )}
                            onClick={e => !isLessonUnlocked(dayNumber + 1) && e.preventDefault()}
                        >
                            <span className="hidden xs:inline">Next</span>
                            <ChevronRight className="w-4 h-4" />
                        </Link>
                    )}
                </div>
            </motion.div>

            {/* Lesson Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card bg-gradient-to-r from-primary-900/40 to-primary-800/20 border-primary-700/30"
            >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="badge-primary">Day {dayNumber}</span>
                            <span className="badge-warning">Week {weekNumber}</span>
                            {isCompleted && (
                                <span className="badge-success flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3" />
                                    Completed
                                </span>
                            )}
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold mb-2">{lesson.title}</h1>
                        <p className="text-gray-400 text-base sm:text-lg">{lesson.description}</p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-4 pt-4 border-t border-primary-700/20 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>~{lesson.duration} min</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        <span>{lesson.content.length} sections</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        <span>{lesson.quiz.length} questions</span>
                    </div>
                </div>

                {/* Key Points */}
                {lesson.keyPoints && lesson.keyPoints.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-primary-700/20">
                        <h3 className="text-sm font-semibold text-gray-300 mb-2">Learning Objectives:</h3>
                        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                            {lesson.keyPoints.map((point, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                                    <ChevronRight className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" />
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </motion.div>

            {/* Referenced Stocks */}
            {lesson.yourStocks && lesson.yourStocks.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 px-4 py-3 rounded-lg bg-gray-800/30 border border-gray-700/30"
                >
                    <span className="text-sm text-gray-400 shrink-0">Stocks referenced:</span>
                    <div className="flex gap-2 flex-wrap">
                        {lesson.yourStocks.map(stock => (
                            <span key={stock} className="badge-primary">{stock}</span>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Content Sections */}
            <div className="space-y-4">
                {lesson.content.map((section, index) => (
                    <ContentBlock key={index} section={section} index={index} />
                ))}
            </div>

            {/* Continue to Quiz CTA */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="card bg-gradient-to-r from-success-600/10 to-primary-600/10 border-success-600/30"
            >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h3 className="text-lg sm:text-xl font-bold mb-1">
                            {isCompleted ? 'Retake the Quiz?' : 'Ready to Test Your Knowledge?'}
                        </h3>
                        <p className="text-gray-400 text-sm sm:text-base">
                            {isCompleted
                                ? `You scored ${lessons[dayNumber]?.quizScore || 0}% last time. Try to improve!`
                                : `Complete the ${lesson.quiz.length}-question quiz to earn XP and unlock the next lesson.`
                            }
                        </p>
                    </div>
                    <button
                        onClick={() => navigate(`/quiz/${dayNumber}`)}
                        className="btn-success flex items-center justify-center gap-2 text-base sm:text-lg !px-6 !py-3 min-h-[48px] w-full sm:w-auto shrink-0"
                    >
                        <Play className="w-5 h-5" />
                        {isCompleted ? 'Retake Quiz' : 'Start Quiz'}
                    </button>
                </div>
            </motion.div>
        </div>
    )
}
