import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, Zap } from 'lucide-react';
import { api, type Challenge } from '../../services/api';
import { cn } from '../../lib/utils';

const WEEK_LABELS = ['', 'Technical Analysis', 'Options Greeks', 'Advanced Strategies'];
const WEEK_ICONS  = ['', '📊', '🏛️', '🎯'];

interface WeeklyChallengesProps {
  userId: number;
  onXpGained?: (xp: number) => void;
}

export default function WeeklyChallenges({ userId, onXpGained }: WeeklyChallengesProps) {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading]       = useState(true);
  const [completing, setCompleting] = useState<number | null>(null);

  const load = () =>
    api.getChallenges(userId)
      .then(setChallenges)
      .catch(console.error)
      .finally(() => setLoading(false));

  useEffect(() => { load(); }, [userId]);

  const handleComplete = async (challenge: Challenge) => {
    if (challenge.completed || completing !== null) return;
    setCompleting(challenge.id);
    try {
      const res = await api.completeChallenge(userId, challenge.id);
      if (res.success) {
        await load();
        onXpGained?.(res.xpAwarded);
      }
    } catch { /* swallow */ }
    setCompleting(null);
  };

  if (loading) {
    return (
      <div className="space-y-2">
        {[0, 1, 2].map(i => (
          <div key={i} className="h-14 bg-gray-900/50 rounded-xl border border-gray-800 animate-pulse" />
        ))}
      </div>
    );
  }

  // Group by week
  const byWeek = [1, 2, 3].map(w => ({
    week: w,
    challenges: challenges.filter(c => c.week_number === w),
  }));

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">⚡</span>
        <h2 className="text-lg font-bold text-white">Weekly Challenges</h2>
      </div>

      <div className="space-y-5">
        {byWeek.map(({ week, challenges: wc }) => {
          const completedCount = wc.filter(c => c.completed).length;

          return (
            <div key={week}>
              <div className="flex items-center gap-2 mb-2">
                <span>{WEEK_ICONS[week]}</span>
                <span className="text-sm font-semibold text-gray-400">Week {week} · {WEEK_LABELS[week]}</span>
                <span className="ml-auto text-xs text-gray-600">{completedCount}/{wc.length}</span>
              </div>

              <div className="space-y-2">
                {wc.map((challenge, i) => (
                  <motion.div
                    key={challenge.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleComplete(challenge)}
                    className={cn(
                      'flex items-center gap-3 p-3 rounded-xl border transition-all',
                      challenge.completed
                        ? 'bg-green-900/20 border-green-700/40 cursor-default'
                        : 'bg-gray-900/50 border-gray-800 hover:border-indigo-700/50 hover:bg-indigo-900/10 cursor-pointer',
                    )}
                  >
                    {challenge.completed ? (
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    )}

                    <div className="flex-1 min-w-0">
                      <p className={cn('text-sm font-semibold leading-tight', challenge.completed ? 'text-green-300' : 'text-white')}>
                        {challenge.title}
                      </p>
                      <p className="text-xs text-gray-500 leading-tight">{challenge.description}</p>
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Zap className="w-3.5 h-3.5 text-yellow-400" />
                      <span className={cn('text-xs font-bold', challenge.completed ? 'text-gray-500 line-through' : 'text-yellow-400')}>
                        +{challenge.xp_reward}
                      </span>
                    </div>

                    {completing === challenge.id && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full"
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
