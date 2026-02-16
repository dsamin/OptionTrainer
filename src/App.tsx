import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Layout } from './components/layout/Layout'
import { Dashboard } from './components/layout/Dashboard'
import { LessonPage } from './components/lessons/LessonPage'
import { QuizPage } from './components/lessons/QuizPage'
import { ProgressPage } from './components/progress/ProgressPage'
import { StocksPage } from './components/stocks/StocksPage'
import { SettingsPage } from './components/settings/SettingsPage'
import LandingPage from './pages/LandingPage'
import GameHubPage from './pages/GameHubPage'
import SimulatorPage from './pages/SimulatorPage'
import AdminLoginPage from './pages/admin/AdminLoginPage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import AdminLogsPage from './pages/admin/AdminLogsPage'
import AdminLayout from './components/admin/AdminLayout'
import AdminRouteGuard from './components/admin/AdminRouteGuard'
import { useUserStore } from './stores/userStore'
import type { ApiUser } from './services/api'

function AppRoutes() {
  const { currentUser, setCurrentUser } = useUserStore()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSelectUser = (user: ApiUser) => {
    setCurrentUser(user)
    navigate('/')
  }

  // Send session end beacon on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      const sid = useUserStore.getState().sessionId
      if (sid) {
        navigator.sendBeacon(
          'http://localhost:3001/api/session/end',
          new Blob([JSON.stringify({ sessionId: sid })], { type: 'application/json' })
        )
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])

  // Check if we're on an admin route
  const isAdminRoute = location.pathname.startsWith('/admin')

  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminRouteGuard><AdminLayout /></AdminRouteGuard>}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="logs" element={<AdminLogsPage />} />
        </Route>
      </Routes>
    )
  }

  if (!currentUser) {
    return (
      <Routes>
        <Route path="*" element={<LandingPage onSelectUser={handleSelectUser} />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="lesson/:day" element={<LessonPage />} />
        <Route path="quiz/:day" element={<QuizPage />} />
        <Route path="progress" element={<ProgressPage />} />
        <Route path="stocks" element={<StocksPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="gamehub" element={<GameHubPage />} />
        <Route path="simulator" element={<SimulatorPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

function App() {
  return <AppRoutes />
}

export default App
