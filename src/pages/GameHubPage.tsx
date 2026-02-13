import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Zap, Star, Target } from 'lucide-react';
import { useUserStore } from '../stores/userStore';
import { api } from '../services/api';
import Leaderboard from '../components/gamification/Leaderboard';
import TrophyCabinet from '../components/gamification/TrophyCabinet';
import WeeklyChallenges from '../components/gamification/WeeklyChallenges';
import LevelBadge from '../components/gamification/LevelBadge';
import { cn } from '../lib/utils';

type Tab = 'leaderboard' | 'trophies' | 'challenges';

const TABS: { id: Tab; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
  { id: 'trophies',    label: 'Trophies',    icon: Star   },
  { id: 'challenges',  label: 'Challenges',  icon: Target },
];

export default function GameHubPage() {
  const { currentUser, setCurrentUser } = useUserStore();
  const [tab, setTab]                   = useState<Tab>('leaderboard');
  const [achievements, setAchievements] = useState<string[]>([]);
  const [xpPopup, setXpPopup]           = useState<number | null>(null);

  useEffect(() => {
    if (!currentUser) return;
    api.getAchievements(currentUser.id)
      .then(list => setAchievements(list.map(a => a.achievement_id)))
      .catch(console.error);
  }, [currentUser]);

  const handleXpGained = (xp: number) => {
    setXpPopup(xp);
    setTimeout(() => setXpPopup(null), 2500);
    // Refresh user stats
    if (currentUser) {
      api.getUsers().then(users => {
        const updated = users.find(u => u.id === currentUser.id);
        if (updated) setCurrentUser(updated);
      }).catch(console.error);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white">Game Hub</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Track your progress and compete</p>
        </div>
        <div className="sm:text-right">
          <LevelBadge totalXp={currentUser.total_xp} size="md" showBar />
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
        {[
          { icon: Zap,    label: 'Total XP',  value: currentUser.total_xp.toLocaleString(),   color: 'text-yellow-400', bg: 'bg-yellow-900/20' },
          { icon: Star,   label: 'Trophies',  value: achievements.length,                      color: 'text-amber-400',  bg: 'bg-amber-900/20'  },
          { icon: Target, label: 'Lessons',   value: `${currentUser.lessons_completed}/18`,    color: 'text-indigo-400', bg: 'bg-indigo-900/20' },
        ].map(({ icon: Icon, label, value, color, bg }) => (
          <div key={label} className={cn('rounded-xl border border-gray-800 p-2.5 sm:p-4 flex flex-col sm:flex-row items-center sm:items-center gap-1 sm:gap-3', bg)}>
            <Icon className={cn('w-4 h-4 sm:w-5 sm:h-5', color)} />
            <div className="text-center sm:text-left">
              <p className="text-[10px] sm:text-xs text-gray-500">{label}</p>
              <p className="text-sm sm:text-lg font-bold text-white">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 bg-gray-900/50 p-1 rounded-xl border border-gray-800 mb-6">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={cn(
              'flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-3 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all min-h-[44px]',
              tab === id
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-gray-800',
            )}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden xs:inline sm:inline">{label}</span>
            <span className="xs:hidden sm:hidden">{label.slice(0, 3)}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2 }}
        >
          {tab === 'leaderboard' && <Leaderboard />}
          {tab === 'trophies'    && <TrophyCabinet unlockedIds={achievements} />}
          {tab === 'challenges'  && (
            <WeeklyChallenges userId={currentUser.id} onXpGained={handleXpGained} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* XP popup toast */}
      <AnimatePresence>
        {xpPopup !== null && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            className="fixed bottom-6 sm:bottom-8 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 bg-indigo-600 text-white px-4 sm:px-6 py-3 rounded-2xl font-bold shadow-2xl flex items-center justify-center gap-2 z-50 mx-auto max-w-xs sm:max-w-none"
          >
            <Zap className="w-5 h-5 text-yellow-300" />
            +{xpPopup} XP earned!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
