import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Zap, Trophy, Star, TrendingUp } from 'lucide-react';
import { api, type ApiUser } from '../services/api';
import { cn } from '../lib/utils';

import devanImg   from '../Images/Devan.PNG';
import nandaImg   from '../Images/Nanda.PNG';
import sriharImg  from '../Images/Srihari.PNG';

const AVATAR_MAP: Record<string, string> = {
  'Devan.PNG':   devanImg,
  'Nanda.PNG':   nandaImg,
  'Srihari.PNG': sriharImg,
};

const FALLBACK_USERS: ApiUser[] = [
  { id: 1, name: 'Devan',   avatar: 'Devan.PNG',   total_xp: 0, current_streak: 0, longest_streak: 0, level: 1, level_name: 'Rookie', lessons_completed: 0, average_quiz_score: 0, achievements_count: 0 },
  { id: 2, name: 'Nanda',   avatar: 'Nanda.PNG',   total_xp: 0, current_streak: 0, longest_streak: 0, level: 1, level_name: 'Rookie', lessons_completed: 0, average_quiz_score: 0, achievements_count: 0 },
  { id: 3, name: 'Srihari', avatar: 'Srihari.PNG', total_xp: 0, current_streak: 0, longest_streak: 0, level: 1, level_name: 'Rookie', lessons_completed: 0, average_quiz_score: 0, achievements_count: 0 },
];

const LEVEL_CONFIG: Record<string, { color: string; glow: string; border: string; badge: string }> = {
  Rookie:  { color: 'text-gray-400',   glow: '',                        border: 'border-gray-600',   badge: 'bg-gray-700 text-gray-300' },
  Learner: { color: 'text-blue-400',   glow: 'shadow-blue-500/20',      border: 'border-blue-600',   badge: 'bg-blue-900/50 text-blue-300' },
  Trader:  { color: 'text-indigo-400', glow: 'shadow-indigo-500/30',    border: 'border-indigo-500', badge: 'bg-indigo-900/50 text-indigo-300' },
  Pro:     { color: 'text-purple-400', glow: 'shadow-purple-500/40',    border: 'border-purple-500', badge: 'bg-purple-900/50 text-purple-300' },
  Expert:  { color: 'text-amber-400',  glow: 'shadow-amber-500/40',     border: 'border-amber-500',  badge: 'bg-amber-900/50 text-amber-300' },
  Master:  { color: 'text-orange-400', glow: 'shadow-orange-500/50',    border: 'border-orange-400', badge: 'bg-orange-900/50 text-orange-300' },
};

interface ProgressRingProps {
  pct: number;
  size?: number;
  stroke?: number;
  color?: string;
}
function ProgressRing({ pct, size = 96, stroke = 4, color = '#6366f1' }: ProgressRingProps) {
  const r   = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = circ * (pct / 100);
  return (
    <svg width={size} height={size} className="absolute inset-0 -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1f2937" strokeWidth={stroke} />
      <motion.circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ - dash }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
      />
    </svg>
  );
}

interface ProfileCardProps {
  user: ApiUser;
  index: number;
  onSelect: (user: ApiUser) => void;
  isSelecting: boolean;
}
function ProfileCard({ user, index, onSelect, isSelecting }: ProfileCardProps) {
  const [hovered, setHovered] = useState(false);
  const lvlCfg = LEVEL_CONFIG[user.level_name] ?? LEVEL_CONFIG.Rookie;
  const completionPct = Math.round((user.lessons_completed / 18) * 100);
  const avatarSrc = AVATAR_MAP[user.avatar] ?? devanImg;

  const ringColor =
    user.level_name === 'Master'  ? '#f97316' :
    user.level_name === 'Expert'  ? '#f59e0b' :
    user.level_name === 'Pro'     ? '#a855f7' :
    user.level_name === 'Trader'  ? '#6366f1' :
    user.level_name === 'Learner' ? '#3b82f6' : '#4b5563';

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => !isSelecting && onSelect(user)}
      className={cn(
        'relative cursor-pointer rounded-2xl p-6 backdrop-blur-sm transition-all duration-300',
        'bg-gray-900/70 border',
        hovered ? `${lvlCfg.border} shadow-2xl ${lvlCfg.glow}` : 'border-gray-800 shadow-lg',
      )}
    >
      {/* Subtle background gradient */}
      <div className={cn(
        'absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300',
        hovered && 'opacity-100',
        'bg-gradient-to-br from-white/5 to-transparent'
      )} />

      {/* Level badge */}
      <div className="absolute top-4 right-4">
        <span className={cn('text-xs font-bold px-2 py-1 rounded-full', lvlCfg.badge)}>
          Lv.{user.level} {user.level_name}
        </span>
      </div>

      {/* Avatar with progress ring */}
      <div className="flex flex-col items-center mb-5">
        <div className="relative w-24 h-24 mb-3">
          <ProgressRing pct={completionPct} size={96} stroke={4} color={ringColor} />
          <div className="absolute inset-1 rounded-full overflow-hidden border-2 border-gray-700">
            <img
              src={avatarSrc}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Completion % badge */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-gray-800 border border-gray-700 rounded-full px-2 py-0.5 text-xs font-bold text-white whitespace-nowrap">
            {completionPct}%
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mt-2">{user.name}</h3>

        {user.lessons_completed > 0 ? (
          <p className="text-xs text-indigo-400 font-medium mt-0.5">
            {user.lessons_completed}/18 lessons complete
          </p>
        ) : (
          <p className="text-xs text-gray-500 mt-0.5">Not started yet</p>
        )}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 mb-5">
        <div className="flex flex-col items-center bg-gray-800/60 rounded-xl p-2">
          <Zap className="w-4 h-4 text-yellow-400 mb-1" />
          <span className="text-sm font-bold text-white">{user.total_xp.toLocaleString()}</span>
          <span className="text-xs text-gray-500">XP</span>
        </div>
        <div className="flex flex-col items-center bg-gray-800/60 rounded-xl p-2">
          <Flame className={cn('w-4 h-4 mb-1', user.current_streak > 0 ? 'text-orange-400' : 'text-gray-600')} />
          <span className="text-sm font-bold text-white">{user.current_streak}</span>
          <span className="text-xs text-gray-500">Streak</span>
        </div>
        <div className="flex flex-col items-center bg-gray-800/60 rounded-xl p-2">
          <Trophy className={cn('w-4 h-4 mb-1', user.achievements_count > 0 ? 'text-amber-400' : 'text-gray-600')} />
          <span className="text-sm font-bold text-white">{user.achievements_count}</span>
          <span className="text-xs text-gray-500">Badges</span>
        </div>
      </div>

      {/* Avg quiz score */}
      {user.lessons_completed > 0 && (
        <div className="mb-5">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Avg Quiz Score</span>
            <span className="font-semibold text-white">{user.average_quiz_score}%</span>
          </div>
          <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${user.average_quiz_score}%` }}
              transition={{ duration: 1, delay: index * 0.12 + 0.4 }}
            />
          </div>
        </div>
      )}

      {/* CTA button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200',
          user.lessons_completed > 0
            ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
            : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
        )}
      >
        {user.lessons_completed > 0 ? '▶ Continue' : '🚀 Start Training'}
      </motion.button>
    </motion.div>
  );
}

interface LandingPageProps {
  onSelectUser: (user: ApiUser) => void;
}

export default function LandingPage({ onSelectUser }: LandingPageProps) {
  const [users, setUsers]           = useState<ApiUser[]>(FALLBACK_USERS);
  const [loading, setLoading]       = useState(true);
  const [apiOnline, setApiOnline]   = useState(false);
  const [selecting, setSelecting]   = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    api.getUsers()
      .then(data => { setUsers(data); setApiOnline(true); })
      .catch(() => { /* use fallback silently */ })
      .finally(() => setLoading(false));
  }, []);

  const handleSelect = async (user: ApiUser) => {
    setSelecting(true);
    setSelectedId(user.id);
    await new Promise(r => setTimeout(r, 400));
    onSelectUser(user);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99,102,241,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.15) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Background glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-indigo-600/20 border border-indigo-500/30">
              <TrendingUp className="w-8 h-8 text-indigo-400" />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-black mb-3 tracking-tight">
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              OptionTrainer
            </span>
          </h1>
          <p className="text-lg text-gray-400 font-medium">
            Master Options Trading in 18 Days
          </p>

          <div className="flex items-center justify-center gap-6 mt-6">
            {[
              { icon: Star, label: '18 Lessons', color: 'text-yellow-400' },
              { icon: Zap,  label: 'XP Rewards',  color: 'text-indigo-400' },
              { icon: Trophy, label: 'Badges',    color: 'text-amber-400' },
            ].map(({ icon: Icon, label, color }) => (
              <div key={label} className="flex items-center gap-1.5 text-sm text-gray-500">
                <Icon className={cn('w-4 h-4', color)} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* "Choose your profile" label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-xs font-semibold uppercase tracking-widest text-gray-600 mb-6"
        >
          — Select Your Profile —
        </motion.p>

        {/* Profile cards */}
        {loading ? (
          <div className="flex justify-center gap-6">
            {[0, 1, 2].map(i => (
              <div key={i} className="w-64 h-80 bg-gray-900/50 rounded-2xl border border-gray-800 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {users.map((user, i) => (
              <AnimatePresence key={user.id}>
                {selectedId === user.id ? (
                  <motion.div
                    key="selected"
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.05, 0.95, 1.02, 0], opacity: [1, 1, 1, 1, 0] }}
                    transition={{ duration: 0.5 }}
                    className="rounded-2xl bg-indigo-600/20 border border-indigo-500 p-6 flex items-center justify-center"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.5, ease: 'linear' }}
                    >
                      <Zap className="w-8 h-8 text-indigo-400" />
                    </motion.div>
                  </motion.div>
                ) : (
                  <ProfileCard
                    key="card"
                    user={user}
                    index={i}
                    onSelect={handleSelect}
                    isSelecting={selecting}
                  />
                )}
              </AnimatePresence>
            ))}
          </div>
        )}

        {/* API status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex items-center justify-center gap-2 mt-8 text-xs text-gray-700"
        >
          <div className={cn('w-1.5 h-1.5 rounded-full', apiOnline ? 'bg-green-500' : 'bg-gray-600')} />
          <span>{apiOnline ? 'Progress synced' : 'Run server for progress sync'}</span>
          {!apiOnline && (
            <span className="text-gray-600 font-mono ml-1">
              cd server && npm start
            </span>
          )}
        </motion.div>
      </div>
    </div>
  );
}
