const LEVELS = [
  { level: 1, name: 'Rookie',  minXp: 0,    maxXp: 500  },
  { level: 2, name: 'Learner', minXp: 500,  maxXp: 1200 },
  { level: 3, name: 'Trader',  minXp: 1200, maxXp: 2200 },
  { level: 4, name: 'Pro',     minXp: 2200, maxXp: 3500 },
  { level: 5, name: 'Expert',  minXp: 3500, maxXp: 5000 },
  { level: 6, name: 'Master',  minXp: 5000, maxXp: Infinity },
];

function getLevel(totalXp) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (totalXp >= LEVELS[i].minXp) {
      return LEVELS[i];
    }
  }
  return LEVELS[0];
}

function getLevelProgress(totalXp) {
  const current = getLevel(totalXp);
  if (current.maxXp === Infinity) return { ...current, progressPct: 100 };
  const range = current.maxXp - current.minXp;
  const earned = totalXp - current.minXp;
  return { ...current, progressPct: Math.round((earned / range) * 100) };
}

module.exports = { LEVELS, getLevel, getLevelProgress };
