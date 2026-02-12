/**
 * Lightweight JSON file-based database.
 * Stores all data in server/data.json — zero native dependencies.
 */
const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, 'data.json');

const WEEKLY_CHALLENGES = [
  // Week 1
  { id: 1, week_number: 1, title: 'Hot Streak',    description: 'Complete 3 lessons in a row',        xp_reward: 150, requirement_type: 'streak',          requirement_value: 3  },
  { id: 2, week_number: 1, title: 'Perfect Week',  description: 'Complete all 7 Week 1 lessons',      xp_reward: 500, requirement_type: 'week1_complete',  requirement_value: 7  },
  { id: 3, week_number: 1, title: 'Quiz Ace',       description: 'Score 100% on any Week 1 quiz',      xp_reward: 200, requirement_type: 'perfect_quiz_w1', requirement_value: 1  },
  // Week 2
  { id: 4, week_number: 2, title: 'Greek God In Training', description: 'Complete all Greeks lessons', xp_reward: 500, requirement_type: 'week2_complete',  requirement_value: 7  },
  { id: 5, week_number: 2, title: 'No Mistakes',   description: 'Score 90%+ on 3 Week 2 quizzes',     xp_reward: 300, requirement_type: 'high_score_w2',   requirement_value: 3  },
  { id: 6, week_number: 2, title: 'Speed Runner',  description: 'Complete 3 lessons in one day',      xp_reward: 250, requirement_type: 'lessons_per_day', requirement_value: 3  },
  // Week 3
  { id: 7, week_number: 3, title: 'Iron Will',       description: 'Complete the Iron Condor lesson',  xp_reward: 200, requirement_type: 'day15_complete',  requirement_value: 1  },
  { id: 8, week_number: 3, title: '21 Day Challenge', description: 'Complete all 21 lessons',         xp_reward: 1000,requirement_type: 'all_complete',    requirement_value: 21 },
  { id: 9, week_number: 3, title: 'Master Scorer',   description: 'Average 90%+ across all quizzes', xp_reward: 750, requirement_type: 'avg_score_90',   requirement_value: 90 },
];

const DEFAULT_USERS = [
  { id: 1, name: 'Devan',   avatar: 'Devan.PNG' },
  { id: 2, name: 'Nanda',   avatar: 'Nanda.PNG' },
  { id: 3, name: 'Srihari', avatar: 'Srihari.PNG' },
];

function defaultStats(userId) {
  return {
    user_id: userId,
    total_xp: 0,
    current_streak: 0,
    longest_streak: 0,
    last_completed_date: null,
    start_date: null,
    level: 1,
    level_name: 'Rookie',
  };
}

function load() {
  if (!fs.existsSync(DATA_PATH)) {
    const initial = {
      users: DEFAULT_USERS,
      lesson_progress: [],       // { user_id, day_number, completed, completed_at, quiz_score, exercise_completed, time_spent_minutes }
      quiz_attempts: [],         // { id, user_id, day_number, score, attempted_at }
      user_achievements: [],     // { user_id, achievement_id, unlocked_at }
      user_stats: DEFAULT_USERS.map(u => defaultStats(u.id)),
      weekly_challenges: WEEKLY_CHALLENGES,
      user_challenge_completions: [], // { user_id, challenge_id, completed_at }
      _seq: { quiz_attempts: 1, user_achievements: 1, challenge_completions: 1, lesson_progress: 1 },
    };
    save(initial);
    return initial;
  }
  return JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
}

function save(data) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

// Simple query helpers that mimic a DB API
const db = {
  load,
  save,

  // Users
  getUsers()          { return load().users; },
  getUserById(id)     { return load().users.find(u => u.id === Number(id)); },

  // Stats
  getStats(userId)    {
    const d = load();
    return d.user_stats.find(s => s.user_id === Number(userId)) || defaultStats(Number(userId));
  },
  saveStats(stats) {
    const d = load();
    const idx = d.user_stats.findIndex(s => s.user_id === stats.user_id);
    if (idx >= 0) d.user_stats[idx] = stats; else d.user_stats.push(stats);
    save(d);
  },

  // Lesson progress
  getLessons(userId)  { return load().lesson_progress.filter(l => l.user_id === Number(userId)); },
  getLesson(userId, dayNumber) {
    return load().lesson_progress.find(l => l.user_id === Number(userId) && l.day_number === Number(dayNumber));
  },
  saveLesson(record) {
    const d = load();
    const idx = d.lesson_progress.findIndex(l => l.user_id === record.user_id && l.day_number === record.day_number);
    if (idx >= 0) {
      d.lesson_progress[idx] = { ...d.lesson_progress[idx], ...record };
    } else {
      d.lesson_progress.push({ id: d._seq.lesson_progress++, ...record });
    }
    save(d);
  },

  // Quiz attempts
  getQuizAttempts(userId) { return load().quiz_attempts.filter(a => a.user_id === Number(userId)); },
  addQuizAttempt(record) {
    const d = load();
    d.quiz_attempts.push({ id: d._seq.quiz_attempts++, ...record, attempted_at: new Date().toISOString() });
    save(d);
  },

  // Achievements
  getAchievements(userId) { return load().user_achievements.filter(a => a.user_id === Number(userId)); },
  grantAchievement(userId, achievementId) {
    const d = load();
    const exists = d.user_achievements.some(a => a.user_id === Number(userId) && a.achievement_id === achievementId);
    if (!exists) {
      d.user_achievements.push({ id: d._seq.user_achievements++, user_id: Number(userId), achievement_id: achievementId, unlocked_at: new Date().toISOString() });
      save(d);
      return true;
    }
    return false;
  },

  // Challenges
  getChallenges()          { return load().weekly_challenges; },
  getCompletions(userId)   { return load().user_challenge_completions.filter(c => c.user_id === Number(userId)); },
  completeChallenge(userId, challengeId) {
    const d = load();
    const exists = d.user_challenge_completions.some(c => c.user_id === Number(userId) && c.challenge_id === Number(challengeId));
    if (!exists) {
      d.user_challenge_completions.push({ id: d._seq.challenge_completions++, user_id: Number(userId), challenge_id: Number(challengeId), completed_at: new Date().toISOString() });
      save(d);
      return true;
    }
    return false;
  },
};

module.exports = { db };
