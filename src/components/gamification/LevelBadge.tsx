import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export const LEVELS = [
  { level: 1, name: 'Rookie',  minXp: 0,    maxXp: 500,  color: 'text-gray-400',   bg: 'bg-gray-700',      glow: ''                    },
  { level: 2, name: 'Learner', minXp: 500,  maxXp: 1200, color: 'text-blue-400',   bg: 'bg-blue-900/50',   glow: 'shadow-blue-500/20'  },
  { level: 3, name: 'Trader',  minXp: 1200, maxXp: 2200, color: 'text-indigo-400', bg: 'bg-indigo-900/50', glow: 'shadow-indigo-500/30'},
  { level: 4, name: 'Pro',     minXp: 2200, maxXp: 3500, color: 'text-purple-400', bg: 'bg-purple-900/50', glow: 'shadow-purple-500/30'},
  { level: 5, name: 'Expert',  minXp: 3500, maxXp: 5000, color: 'text-amber-400',  bg: 'bg-amber-900/50',  glow: 'shadow-amber-500/30' },
  { level: 6, name: 'Master',  minXp: 5000, maxXp: Infinity, color: 'text-orange-400', bg: 'bg-orange-900/50', glow: 'shadow-orange-500/40' },
];

export function getLevelInfo(totalXp: number) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (totalXp >= LEVELS[i].minXp) return LEVELS[i];
  }
  return LEVELS[0];
}

export function getLevelProgress(totalXp: number) {
  const info = getLevelInfo(totalXp);
  if (info.maxXp === Infinity) return { ...info, pct: 100, xpToNext: 0 };
  const range = info.maxXp - info.minXp;
  const earned = totalXp - info.minXp;
  return { ...info, pct: Math.round((earned / range) * 100), xpToNext: info.maxXp - totalXp };
}

interface LevelBadgeProps {
  totalXp: number;
  size?: 'sm' | 'md' | 'lg';
  showBar?: boolean;
}

export default function LevelBadge({ totalXp, size = 'md', showBar = false }: LevelBadgeProps) {
  const info = getLevelProgress(totalXp);

  const textSize = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm';
  const padSize  = size === 'sm' ? 'px-2 py-0.5' : size === 'lg' ? 'px-4 py-2' : 'px-3 py-1';

  return (
    <div className="flex flex-col gap-1">
      <span className={cn('inline-flex items-center gap-1.5 rounded-full font-bold', textSize, padSize, info.bg, info.color)}>
        <span>Lv.{info.level}</span>
        <span>{info.name}</span>
      </span>

      {showBar && (
        <div>
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>{totalXp.toLocaleString()} XP</span>
            {info.xpToNext > 0 && <span>{info.xpToNext.toLocaleString()} to next</span>}
          </div>
          <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className={cn('h-full rounded-full', info.bg)}
              initial={{ width: 0 }}
              animate={{ width: `${info.pct}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
