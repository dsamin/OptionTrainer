import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ChevronRight,
    CheckCircle2,
    XCircle,
    RotateCcw,
    Trophy,
    Zap,
    ArrowRight,
    ChevronLeft,
    HelpCircle
} from 'lucide-react'
import { getDayContent } from '../../data/curriculum'
import { useProgressStore } from '../../stores/progressStore'
import { cn } from '../../lib/utils'

type AnswerState = {
    selected: number | null
    confirmed: boolean
}

const difficultyColors: Record<string, { bg: string; text: string }> = {
    easy: { bg: 'bg-success-600/20', text: 'text-success-400' },
    medium: { bg: 'bg-warning-600/20', text: 'text-warning-400' },
    hard: { bg: 'bg-danger-400/20', text: 'text-danger-400' },
}

export function QuizPage() {
    const { day } = useParams<{ day: string }>()
    const dayNumber = parseInt(day || '1', 10)
    const lesson = getDayContent(dayNumber)
    const { completeLesson, isLessonUnlocked } = useProgressStore()

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState<AnswerState[]>([])
    const [showResults, setShowResults] = useState(false)
    const [startTime] = useState(Date.now())

    const isUnlocked = isLessonUnlocked(dayNumber)

    // Initialize answers array
    useMemo(() => {
        if (lesson) {
            setAnswers(lesson.quiz.map(() => ({ selected: null, confirmed: false })))
        }
    }, [dayNumber])

    if (!lesson) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Quiz Not Found</h2>
                    <p className="text-gray-400 mb-4">Day {dayNumber} doesn't exist.</p>
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
                    <h2 className="text-2xl font-bold mb-2">Quiz Locked</h2>
                    <p className="text-gray-400 mb-4">Complete the previous lessons first.</p>
                    <Link to="/" className="btn-primary">Back to Dashboard</Link>
                </div>
            </div>
        )
    }

    const quiz = lesson.quiz
    const question = quiz[currentQuestion]
    const answer = answers[currentQuestion]
    const totalQuestions = quiz.length

    const correctCount = answers.filter(
        (a, i) => a.confirmed && a.selected === quiz[i].correctAnswer
    ).length

    const score = Math.round((correctCount / totalQuestions) * 100)

    const handleSelect = (optionIndex: number) => {
        if (answer?.confirmed) return
        const newAnswers = [...answers]
        newAnswers[currentQuestion] = { selected: optionIndex, confirmed: false }
        setAnswers(newAnswers)
    }

    const handleConfirm = () => {
        if (answer?.selected === null || answer?.selected === undefined) return
        const newAnswers = [...answers]
        newAnswers[currentQuestion] = { ...answer, confirmed: true }
        setAnswers(newAnswers)
    }

    const handleNext = () => {
        if (currentQuestion < totalQuestions - 1) {
            setCurrentQuestion(currentQuestion + 1)
        } else {
            // All questions answered
            const timeSpent = Math.round((Date.now() - startTime) / 60000)
            completeLesson(dayNumber, score, Math.max(timeSpent, 1))
            setShowResults(true)
        }
    }

    const handleRetry = () => {
        setAnswers(quiz.map(() => ({ selected: null, confirmed: false })))
        setCurrentQuestion(0)
        setShowResults(false)
    }

    // Results screen
    if (showResults) {
        const xpEarned = 100 + Math.round((score / 100) * 50)
        return (
            <div className="max-w-2xl mx-auto space-y-6 pb-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="card text-center"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="text-7xl mb-4"
                    >
                        {score >= 80 ? '🎉' : score >= 60 ? '👍' : '📚'}
                    </motion.div>

                    <h1 className="text-3xl font-bold mb-2">
                        {score === 100 ? 'Perfect Score!' : score >= 80 ? 'Great Job!' : score >= 60 ? 'Good Effort!' : 'Keep Studying!'}
                    </h1>

                    <p className="text-gray-400 text-lg mb-6">
                        Day {dayNumber}: {lesson.title}
                    </p>

                    {/* Score Circle */}
                    <div className="flex justify-center mb-6">
                        <div className={cn(
                            'w-32 h-32 rounded-full flex flex-col items-center justify-center border-4',
                            score >= 80 ? 'border-success-500 bg-success-900/20' :
                                score >= 60 ? 'border-warning-500 bg-warning-900/20' :
                                    'border-danger-400 bg-danger-400/10'
                        )}>
                            <span className="text-4xl font-bold">{score}%</span>
                            <span className="text-sm text-gray-400">{correctCount}/{totalQuestions}</span>
                        </div>
                    </div>

                    {/* XP Earned */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center justify-center gap-2 text-xl mb-6"
                    >
                        <Zap className="w-6 h-6 text-primary-400" />
                        <span className="font-bold text-primary-400">+{xpEarned} XP</span>
                        <span className="text-gray-500">earned</span>
                    </motion.div>

                    {/* Question Summary */}
                    <div className="grid grid-cols-5 gap-2 mb-6 max-w-xs mx-auto">
                        {quiz.map((q, i) => {
                            const isCorrect = answers[i]?.selected === q.correctAnswer
                            return (
                                <div
                                    key={i}
                                    className={cn(
                                        'w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium',
                                        isCorrect ? 'bg-success-600/30 text-success-400' : 'bg-danger-400/20 text-danger-400'
                                    )}
                                >
                                    {isCorrect ? '✓' : '✗'}
                                </div>
                            )
                        })}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-center gap-3">
                        {score < 100 && (
                            <button onClick={handleRetry} className="btn-secondary flex items-center gap-2">
                                <RotateCcw className="w-4 h-4" />
                                Retry Quiz
                            </button>
                        )}
                        <Link to={`/lesson/${dayNumber}`} className="btn-secondary flex items-center gap-2">
                            <ChevronLeft className="w-4 h-4" />
                            Review Lesson
                        </Link>
                        {dayNumber < 18 ? (
                            <Link to={`/lesson/${dayNumber + 1}`} className="btn-primary flex items-center gap-2">
                                Next Lesson
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        ) : (
                            <Link to="/progress" className="btn-primary flex items-center gap-2">
                                <Trophy className="w-4 h-4" />
                                View Progress
                            </Link>
                        )}
                    </div>
                </motion.div>
            </div>
        )
    }

    // Quiz question screen
    const isCorrect = answer?.confirmed && answer.selected === question.correctAnswer

    const diffStyle = difficultyColors[question.difficulty]

    return (
        <div className="max-w-3xl mx-auto space-y-6 pb-12">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
            >
                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Link to={`/lesson/${dayNumber}`} className="hover:text-gray-200 transition-colors">
                        Day {dayNumber}: {lesson.title}
                    </Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-gray-200">Quiz</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className={cn('badge', diffStyle.bg, diffStyle.text)}>
                        {question.difficulty}
                    </span>
                    <span className="text-sm text-gray-400">
                        {currentQuestion + 1} of {totalQuestions}
                    </span>
                </div>
            </motion.div>

            {/* Progress Bar */}
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-primary-600 to-primary-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + (answer?.confirmed ? 1 : 0)) / totalQuestions) * 100}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            {/* Question */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    className="card"
                >
                    <div className="flex items-start gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-primary-600/20 shrink-0">
                            <HelpCircle className="w-6 h-6 text-primary-400" />
                        </div>
                        <h2 className="text-xl font-semibold leading-relaxed">
                            {question.question}
                        </h2>
                    </div>

                    {/* Options */}
                    <div className="space-y-3">
                        {question.options.map((option, i) => {
                            const isSelected = answer?.selected === i
                            const isCorrectOption = i === question.correctAnswer
                            const showCorrect = answer?.confirmed && isCorrectOption
                            const showWrong = answer?.confirmed && isSelected && !isCorrectOption

                            return (
                                <motion.button
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    onClick={() => handleSelect(i)}
                                    disabled={answer?.confirmed}
                                    className={cn(
                                        'w-full text-left p-4 rounded-xl border transition-all duration-200',
                                        !answer?.confirmed && isSelected && 'bg-primary-900/30 border-primary-600/50 text-gray-100',
                                        !answer?.confirmed && !isSelected && 'bg-gray-800/30 border-gray-700/30 text-gray-300 hover:bg-gray-800/60 hover:border-gray-600/50',
                                        showCorrect && 'bg-success-600/20 border-success-500/50 text-success-300',
                                        showWrong && 'bg-danger-400/10 border-danger-400/50 text-danger-400',
                                        answer?.confirmed && !showCorrect && !showWrong && 'opacity-50'
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border shrink-0',
                                            !answer?.confirmed && isSelected && 'bg-primary-600 border-primary-600 text-white',
                                            !answer?.confirmed && !isSelected && 'border-gray-600 text-gray-500',
                                            showCorrect && 'bg-success-600 border-success-600 text-white',
                                            showWrong && 'bg-danger-500 border-danger-500 text-white',
                                        )}>
                                            {showCorrect ? <CheckCircle2 className="w-4 h-4" /> :
                                                showWrong ? <XCircle className="w-4 h-4" /> :
                                                    String.fromCharCode(65 + i)}
                                        </div>
                                        <span className="flex-1">{option}</span>
                                    </div>
                                </motion.button>
                            )
                        })}
                    </div>

                    {/* Explanation */}
                    <AnimatePresence>
                        {answer?.confirmed && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-6 pt-6 border-t border-gray-700/50"
                            >
                                <div className={cn(
                                    'p-4 rounded-xl',
                                    isCorrect ? 'bg-success-600/10 border border-success-600/30' : 'bg-warning-600/10 border border-warning-600/30'
                                )}>
                                    <div className="flex items-center gap-2 mb-2">
                                        {isCorrect ? (
                                            <CheckCircle2 className="w-5 h-5 text-success-400" />
                                        ) : (
                                            <XCircle className="w-5 h-5 text-warning-400" />
                                        )}
                                        <span className={cn(
                                            'font-semibold',
                                            isCorrect ? 'text-success-400' : 'text-warning-400'
                                        )}>
                                            {isCorrect ? 'Correct!' : 'Not quite right'}
                                        </span>
                                    </div>
                                    <p className="text-gray-300 leading-relaxed">
                                        {question.explanation}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </AnimatePresence>

            {/* Actions */}
            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                    Score so far: {correctCount}/{answers.filter(a => a.confirmed).length || 0} correct
                </div>
                <div className="flex items-center gap-3">
                    {!answer?.confirmed ? (
                        <button
                            onClick={handleConfirm}
                            disabled={answer?.selected === null || answer?.selected === undefined}
                            className={cn(
                                'btn-primary flex items-center gap-2',
                                (answer?.selected === null || answer?.selected === undefined) && 'opacity-50 cursor-not-allowed'
                            )}
                        >
                            Confirm Answer
                            <CheckCircle2 className="w-4 h-4" />
                        </button>
                    ) : (
                        <button onClick={handleNext} className="btn-primary flex items-center gap-2">
                            {currentQuestion < totalQuestions - 1 ? (
                                <>
                                    Next Question
                                    <ChevronRight className="w-4 h-4" />
                                </>
                            ) : (
                                <>
                                    See Results
                                    <Trophy className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
