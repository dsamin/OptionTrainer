const express = require('express');
const router = express.Router();
const { db } = require('../database');

// GET /api/leaderboard
router.get('/', (req, res) => {
  const users = db.getUsers().map(u => {
    const stats    = db.getStats(u.id);
    const lessons  = db.getLessons(u.id).filter(l => l.completed);
    const achieved = db.getAchievements(u.id);

    const avgScore = lessons.length
      ? Math.round(lessons.reduce((sum, l) => sum + (l.quiz_score || 0), 0) / lessons.length)
      : 0;

    return {
      id:                  u.id,
      name:                u.name,
      avatar:              u.avatar,
      total_xp:            stats.total_xp,
      current_streak:      stats.current_streak,
      longest_streak:      stats.longest_streak,
      level:               stats.level,
      level_name:          stats.level_name,
      lessons_completed:   lessons.length,
      average_quiz_score:  avgScore,
      achievements_count:  achieved.length,
    };
  });

  // Sort by XP descending, add rank
  users.sort((a, b) => b.total_xp - a.total_xp);
  const ranked = users.map((u, i) => ({ rank: i + 1, ...u }));

  res.json(ranked);
});

module.exports = router;
