const express = require('express');
const router = express.Router();
const { db } = require('../database');

// GET /api/achievements/:userId
router.get('/:userId', (req, res) => {
  res.json(db.getAchievements(req.params.userId));
});

// POST /api/achievements/:userId
router.post('/:userId', (req, res) => {
  const { achievementId } = req.body;
  if (!achievementId) return res.status(400).json({ error: 'achievementId required' });
  const granted = db.grantAchievement(Number(req.params.userId), achievementId);
  res.json({ success: true, granted });
});

module.exports = router;
