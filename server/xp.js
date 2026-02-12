/**
 * XP calculation rules:
 * - Base: 100 XP per lesson (first completion only)
 * - Quiz bonus: floor((score / 100) * 50)  → up to 50 XP
 * - Streak bonus: min(currentStreak * 5, 50) → up to 50 XP
 * - Perfect score bonus (100%): +25 XP
 */
function calcLessonXp(score, currentStreak, isFirstCompletion) {
  if (!isFirstCompletion) return 0;
  const base = 100;
  const quizBonus = Math.floor((score / 100) * 50);
  const streakBonus = Math.min(currentStreak * 5, 50);
  const perfectBonus = score === 100 ? 25 : 0;
  return base + quizBonus + streakBonus + perfectBonus;
}

module.exports = { calcLessonXp };
