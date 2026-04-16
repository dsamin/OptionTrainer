import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { useAdminStore } from '../../stores/adminStore'
import { useNavigate } from 'react-router-dom'

export default function AdminLoginPage() {
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const login = useAdminStore(s => s.login)
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const success = await login(password)
        setLoading(false)

        if (success) {
            navigate('/admin/dashboard')
        } else {
            setError('Invalid password')
            setPassword('')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0a14' }}>
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="w-full max-w-md mx-4"
            >
                <div
                    className="rounded-2xl p-8 shadow-2xl"
                    style={{
                        background: '#12121f',
                        border: '1px solid rgba(99, 102, 241, 0.15)',
                        boxShadow: '0 0 40px rgba(99, 102, 241, 0.08), 0 25px 50px rgba(0, 0, 0, 0.4)',
                    }}
                >
                    {/* Logo/Title */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-center mb-8"
                    >
                        <div
                            className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                            style={{
                                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(99, 102, 241, 0.05))',
                                border: '1px solid rgba(99, 102, 241, 0.2)',
                            }}
                        >
                            <Shield className="w-8 h-8" style={{ color: '#6366f1' }} />
                        </div>
                        <h1 className="text-2xl font-bold" style={{ color: '#e2e8f0' }}>
                            OptionTrainer Admin
                        </h1>
                        <p className="text-sm mt-1" style={{ color: '#94a3b8' }}>
                            Enter your password to continue
                        </p>
                    </motion.div>

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="relative mb-6">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    autoFocus
                                    className="w-full px-4 py-3.5 rounded-xl text-base outline-none transition-all duration-200 pr-12"
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.03)',
                                        border: error
                                            ? '1px solid rgba(239, 68, 68, 0.5)'
                                            : '1px solid rgba(99, 102, 241, 0.15)',
                                        color: '#e2e8f0',
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = 'rgba(99, 102, 241, 0.5)'
                                        e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)'
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = error
                                            ? 'rgba(239, 68, 68, 0.5)'
                                            : 'rgba(99, 102, 241, 0.15)'
                                        e.target.style.boxShadow = 'none'
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg transition-colors"
                                    style={{ color: '#94a3b8' }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = '#e2e8f0')}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>

                            {/* Error */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg"
                                    style={{
                                        background: 'rgba(239, 68, 68, 0.1)',
                                        border: '1px solid rgba(239, 68, 68, 0.2)',
                                        color: '#f87171',
                                    }}
                                >
                                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                    <span className="text-sm">{error}</span>
                                </motion.div>
                            )}

                            <button
                                type="submit"
                                disabled={loading || !password}
                                className="w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{
                                    background: loading
                                        ? 'rgba(99, 102, 241, 0.5)'
                                        : 'linear-gradient(135deg, #6366f1, #4f46e5)',
                                    boxShadow: loading ? 'none' : '0 4px 15px rgba(99, 102, 241, 0.3)',
                                }}
                                onMouseEnter={(e) => {
                                    if (!loading) e.currentTarget.style.boxShadow = '0 4px 20px rgba(99, 102, 241, 0.5)'
                                }}
                                onMouseLeave={(e) => {
                                    if (!loading) e.currentTarget.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.3)'
                                }}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Authenticating...
                                    </span>
                                ) : (
                                    'Sign In'
                                )}
                            </button>
                        </motion.div>
                    </form>
                </div>
            </motion.div>
        </div>
    )
}
