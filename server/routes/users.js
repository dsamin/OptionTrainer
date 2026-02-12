const express = require('express');
const router = express.Router();
const { db } = require('../database');

function enrichUser(u) {
  const stats    = db.getStats(u.id);
  const lessons  = db.getLessons(u.id).filter(l => l.completed);
  const achieved = db.getAchievements(u.id);

  const avgScore = lessons.length
    ? Math.round(lessons.reduce((sum, l) => sum + (l.quiz_score || 0), 0) / lessons.length)
    : 0;

  return {
    ...u,
    ...stats,
    lessons_completed:   lessons.length,
    average_quiz_score:  avgScore,
    achievements_count:  achieved.length,
  };
}

// GET /api/users
router.get('/', (req, res) => {
  const users = db.getUsers().map(enrichUser);
  res.json(users);
});

// GET /api/users/:id
router.get('/:id', (req, res) => {
  const user = db.getUserById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const lessons      = db.getLessons(req.params.id);
  const achievements = db.getAchievements(req.params.id);
  const quizAttempts = db.getQuizAttempts(req.params.id);
  const stats        = db.getStats(req.params.id);

  res.json({ ...user, ...stats, lessons, achievements, quizAttempts });
});

module.exports = router;
