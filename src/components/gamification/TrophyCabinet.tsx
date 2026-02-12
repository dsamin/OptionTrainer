import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface AchievementDef {
  id: string;
  icon: string;
  title: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  xpReward: number;
}

export const ACHIEVEMENT_DEFS: AchievementDef[] = [
  { id: 'first-steps',       icon: '🎯', title: 'First Steps',          description: 'Complete your first lesson',                rarity: 'common',    xpReward: 50   },
  { id: 'week1-complete',    icon: '📚', title: 'Week 1 Complete',      description: 'Finish all Technical Analysis lessons',     rarity: 'rare',     xpReward: 150  },
  { id: 'week2-complete',    icon: '📈', title: 'Week 2 Complete',      description: 'Master all Options Greeks lessons',          rarity: 'rare',     xpReward: 200  },
  { id: 'week3-complete',    icon: '🏆', title: 'Week 3 Complete',      description: 'Complete all Advanced Strategy lessons',    rarity: 'epic',     xpReward: 300  },
  { id: 'streak-starter',    icon: '🔥', title: 'Streak Starter',       description: '3-day consecutive learning streak',         rarity: 'common',    xpReward: 75   },
  { id: 'week-warrior',      icon: '⚡', title: 'Week Warrior',         description: '7-day learning streak',                     rarity: 'rare',     xpReward: 150  },
  { id: 'consistency-king',  icon: '👑', title: 'Consistency King',     description: '14-day learning streak',                    rarity: 'epic',     xpReward: 300  },
  { id: 'master-trader',     icon: '🎓', title: 'Master Trader',        description: 'Complete all 21 days',                      rarity: 'legendary', xpReward: 500  },
  { id: 'quiz-master',       icon: '🧠', title: 'Quiz Master',          description: 'Score 100% on 5 quizzes',                   rarity: 'rare',     xpReward: 200  },
  { id: 'rsi-expert',        icon: '📊', title: 'RSI Expert',           description: 'Ace the RSI lesson with 100%',              rarity: 'common',    xpReward: 100  },
  { id: 'theta-king',        icon: '⏰', title: 'Theta King',           description: 'Ace the Theta lesson with 100%',            rarity: 'rare',     xpReward: 150  },
  { id: 'greek-god',         icon: '🏛️', title: 'Greek God',            description: 'Score 90%+ on all Week 2 lessons',          rarity: 'epic',     xpReward: 350  },
];

const RARITY_CONFIG = {
  common:    { border: 'border-gray-600',   bg: 'bg-gray-800/60',   label: 'bg-gray-700 text-gray-400',    glow: '',                         labelText: 'Common'    },
  rare:      { border: 'border-blue-600',   bg: 'bg-blue-900/20',   label: 'bg-blue-900/50 text-blue-400', glow: 'shadow-blue-500/20',       labelText: 'Rare'      },
  epic:      { border: 'border-purple-600', bg: 'bg-purple-900/20', label: 'bg-purple-900/50 text-purple-400', glow: 'shadow-purple-500/30', labelText: 'Epic'      },
  legendary: { border: 'border-orange-500', bg: 'bg-orange-900/20', label: 'bg-orange-900/50 text-orange-400', glow: 'shadow-orange-500/40',labelText: 'Legendary' },
};

interface TrophyCabinetProps {
  unlockedIds: string[];
}

export default function TrophyCabinet({ unlockedIds }: TrophyCabinetProps) {
  const unlocked = new Set(unlockedIds);
  const unlockedCount = unlockedIds.length;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">🏆</span>
          <h2 className="text-lg font-bold text-white">Trophy Cabinet</h2>
        </div>
        <span className="text-sm text-gray-500">
          <span className="text-white font-bold">{unlockedCount}</span>/{ACHIEVEMENT_DEFS.length} unlocked
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {ACHIEVEMENT_DEFS.map((def, i) => {
          const isUnlocked = unlocked.has(def.id);
          const cfg = RARITY_CONFIG[def.rarity];

          return (
            <motion.div
              key={def.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              className={cn(
                'relative rounded-xl border p-3 flex flex-col items-center text-center transition-all duration-300',
                isUnlocked
                  ? `${cfg.border} ${cfg.bg} shadow-lg ${cfg.glow}`
                  : 'border-gray-800 bg-gray-900/40 opacity-50 grayscale',
              )}
              title={isUnlocked ? def.description : `🔒 ${def.description}`}
            >
              {/* Rarity label */}
              {isUnlocked && (
                <span className={cn('absolute top-1.5 right-1.5 text-xs px-1.5 py-0.5 rounded-full font-medium', cfg.label)}>
                  {cfg.labelText}
                </span>
              )}

              {/* Icon */}
              <motion.div
                animate={isUnlocked ? { rotate: [0, -5, 5, 0] } : {}}
                transition={{ duration: 0.4, delay: i * 0.05 + 0.2 }}
                className="text-3xl mb-2 mt-1"
              >
                {isUnlocked ? def.icon : '🔒'}
              </motion.div>

              <p className="text-xs font-bold text-white leading-tight mb-1">{def.title}</p>

              {isUnlocked && (
                <span className="text-xs text-yellow-500 font-medium">+{def.xpReward} XP</span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
