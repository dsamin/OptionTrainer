import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Zap, Trophy, Star } from 'lucide-react';
import { api, type LeaderboardEntry } from '../../services/api';
import { cn } from '../../lib/utils';

import devanImg   from '../../Images/Devan.PNG';
import nandaImg   from '../../Images/Nanda.PNG';
import sriharImg  from '../../Images/Srihari.PNG';

const AVATAR_MAP: Record<string, string> = {
  'Devan.PNG':   devanImg,
  'Nanda.PNG':   nandaImg,
  'Srihari.PNG': sriharImg,
};

const RANK_CONFIG = [
  { bg: 'from-yellow-500/20 to-amber-500/10',  border: 'border-yellow-500/40', medal: '🥇', glow: 'shadow-yellow-500/10' },
  { bg: 'from-gray-400/20 to-gray-500/10',     border: 'border-gray-400/40',   medal: '🥈', glow: 'shadow-gray-400/10' },
  { bg: 'from-amber-700/20 to-amber-800/10',   border: 'border-amber-700/40',  medal: '🥉', glow: 'shadow-amber-700/10' },
];

export default function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getLeaderboard()
      .then(setEntries)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-3">
        {[0, 1, 2].map(i => (
          <div key={i} className="h-24 bg-gray-900/50 rounded-2xl border border-gray-800 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-5 h-5 text-amber-400" />
        <h2 className="text-base sm:text-lg font-bold text-white">Leaderboard</h2>
      </div>

      {entries.map((entry, i) => {
        const rank = RANK_CONFIG[i] ?? { bg: 'from-gray-800/50 to-gray-900/30', border: 'border-gray-700/40', medal: `#${i + 1}`, glow: '' };
        const completionPct = Math.round((entry.lessons_completed / 18) * 100);

        return (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              'relative rounded-2xl border p-3 sm:p-4 bg-gradient-to-r shadow-lg',
              rank.bg, rank.border, rank.glow,
            )}
          >
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Rank medal */}
              <div className="flex-shrink-0 w-8 sm:w-10 text-center">
                <span className="text-xl sm:text-2xl">{rank.medal}</span>
              </div>

              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <img
                  src={AVATAR_MAP[entry.avatar]}
                  alt={entry.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-gray-700"
                />
                <div className="absolute -bottom-1 -right-1 bg-gray-800 rounded-full px-1 sm:px-1.5 py-0.5 text-[10px] sm:text-xs font-bold text-indigo-400 border border-gray-700">
                  {entry.level}
                </div>
              </div>

              {/* Name + level */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
                  <span className="font-bold text-white text-xs sm:text-sm truncate">{entry.name}</span>
                  <span className="text-[10px] sm:text-xs text-gray-500 hidden sm:inline">{entry.level_name}</span>
                </div>

                {/* Progress bar */}
                <div className="h-1 sm:h-1.5 bg-gray-800 rounded-full overflow-hidden mb-1.5 sm:mb-2">
                  <motion.div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${completionPct}%` }}
                    transition={{ duration: 1, delay: i * 0.1 + 0.3 }}
                  />
                </div>

                <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-gray-500">
                  <span>{entry.lessons_completed}/18</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline">Avg {entry.average_quiz_score}%</span>
                </div>
              </div>

              {/* Stats - collapsed on mobile */}
              <div className="flex flex-col items-end gap-1 sm:gap-1.5 flex-shrink-0">
                <div className="flex items-center gap-1">
                  <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-400" />
                  <span className="text-xs sm:text-sm font-bold text-white">{entry.total_xp.toLocaleString()}</span>
                  <span className="text-[10px] sm:text-xs text-gray-600 hidden sm:inline">XP</span>
                </div>
                <div className="hidden sm:flex items-center gap-1">
                  <Flame className={cn('w-3.5 h-3.5', entry.current_streak > 0 ? 'text-orange-400' : 'text-gray-600')} />
                  <span className="text-xs text-gray-400">{entry.current_streak}d streak</span>
                </div>
                <div className="hidden sm:flex items-center gap-1">
                  <Star className={cn('w-3.5 h-3.5', entry.achievements_count > 0 ? 'text-amber-400' : 'text-gray-600')} />
                  <span className="text-xs text-gray-400">{entry.achievements_count} badges</span>
                </div>
                {/* Mobile compact stats */}
                <div className="flex sm:hidden items-center gap-2 text-[10px] text-gray-500">
                  <span className="flex items-center gap-0.5">
                    <Flame className={cn('w-3 h-3', entry.current_streak > 0 ? 'text-orange-400' : 'text-gray-600')} />
                    {entry.current_streak}d
                  </span>
                  <span className="flex items-center gap-0.5">
                    <Star className={cn('w-3 h-3', entry.achievements_count > 0 ? 'text-amber-400' : 'text-gray-600')} />
                    {entry.achievements_count}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
