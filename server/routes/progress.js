const express = require('express');
const router = express.Router();
const { db } = require('../database');
const { calcLessonXp } = require('../xp');
const { getLevel } = require('../leveling');
const { checkAndGrantAchievements } = require('../achievements');

// GET /api/progress/:userId
router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  res.json({
    lessons:       db.getLessons(userId),
    quizAttempts:  db.getQuizAttempts(userId),
    achievements:  db.getAchievements(userId),
    stats:         db.getStats(userId),
  });
});

// POST /api/progress/:userId/lesson
router.post('/:userId/lesson', (req, res) => {
  const { userId } = req.params;
  const { dayNumber, completed, quizScore, exerciseCompleted, timeSpentMinutes } = req.body;

  const uid = Number(userId);
  const day = Number(dayNumber);

  const existing       = db.getLesson(uid, day);
  const isFirstCompletion = !existing || !existing.completed;

  // Save lesson record
  db.saveLesson({
    user_id:            uid,
    day_number:         day,
    completed:          !!completed,
    completed_at:       completed ? new Date().toISOString() : null,
    quiz_score:         quizScore ?? null,
    exercise_completed: !!exerciseCompleted,
    time_spent_minutes: (existing?.time_spent_minutes || 0) + (timeSpentMinutes || 0),
  });

  // Update stats (only if first completion)
  let stats = { ...db.getStats(uid) };
  if (completed && isFirstCompletion) {
    const today = new Date().toISOString().slice(0, 10);

    if (!stats.start_date) stats.start_date = today;

    if (!stats.last_completed_date) {
      stats.current_streak = 1;
    } else {
      const last  = new Date(stats.last_completed_date);
      const now   = new Date(today);
      const diff  = Math.round((now - last) / 86400000);
      if (diff === 1)      stats.current_streak += 1;
      else if (diff > 1)   stats.current_streak = 1;
      // diff === 0 → same day, no change
    }

    stats.longest_streak      = Math.max(stats.longest_streak, stats.current_streak);
    stats.last_completed_date = today;

    const xpEarned  = calcLessonXp(quizScore ?? 0, stats.current_streak, true);
    stats.total_xp += xpEarned;

    const levelInfo = getLevel(stats.total_xp);
    stats.level      = levelInfo.level;
    stats.level_name = levelInfo.name;

    db.saveStats(stats);
  }

  // Auto-grant achievements
  const newAchievements = checkAndGrantAchievements(db, uid);

  res.json({
    success: true,
    newAchievements,
    total_xp:       stats.total_xp,
    current_streak: stats.current_streak,
    level:          getLevel(stats.total_xp),
  });
});

// POST /api/progress/:userId/quiz-attempt
router.post('/:userId/quiz-attempt', (req, res) => {
  const { userId } = req.params;
  const { dayNumber, score } = req.body;
  db.addQuizAttempt({ user_id: Number(userId), day_number: Number(dayNumber), score: Number(score) });
  res.json({ success: true });
});

module.exports = router;
