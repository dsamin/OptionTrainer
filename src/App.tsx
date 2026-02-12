import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Dashboard } from './components/layout/Dashboard'
import { LessonPage } from './components/lessons/LessonPage'
import { QuizPage } from './components/lessons/QuizPage'
import { ProgressPage } from './components/progress/ProgressPage'
import { StocksPage } from './components/stocks/StocksPage'
import { SettingsPage } from './components/settings/SettingsPage'
import LandingPage from './pages/LandingPage'
import GameHubPage from './pages/GameHubPage'
import { useUserStore } from './stores/userStore'
import type { ApiUser } from './services/api'

function AppRoutes() {
  const { currentUser, setCurrentUser } = useUserStore()
  const navigate = useNavigate()

  const handleSelectUser = (user: ApiUser) => {
    setCurrentUser(user)
    navigate('/')
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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

function App() {
  return <AppRoutes />
}

export default App
