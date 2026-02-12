const express = require('express');
const router = express.Router();
const { db } = require('../database');

// GET /api/challenges?userId=X
router.get('/', (req, res) => {
  const { userId } = req.query;
  const challenges = db.getChallenges();

  if (!userId) return res.json(challenges);

  const completions = new Set(db.getCompletions(userId).map(c => c.challenge_id));
  res.json(challenges.map(c => ({ ...c, completed: completions.has(c.id) })));
});

// POST /api/challenges/complete
router.post('/complete', (req, res) => {
  const { userId, challengeId } = req.body;
  if (!userId || !challengeId) return res.status(400).json({ error: 'userId and challengeId required' });

  const added = db.completeChallenge(userId, challengeId);
  if (!added) return res.json({ success: true, alreadyCompleted: true });

  // Award XP
  const challenge = db.getChallenges().find(c => c.id === Number(challengeId));
  if (challenge) {
    const stats = db.getStats(userId);
    stats.total_xp += challenge.xp_reward;
    db.saveStats(stats);
  }

  res.json({ success: true, xpAwarded: challenge?.xp_reward ?? 0 });
});

module.exports = router;
