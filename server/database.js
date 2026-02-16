/**
 * Lightweight JSON file-based database.
 * Stores all data in server/data.json — zero native dependencies.
 */
const fs = require('fs');
const path = require('path');

const DATA_PATH = process.env.DB_PATH || '/tmp/optiontrainer-db.json';

const WEEKLY_CHALLENGES = [
  // Week 1
  { id: 1, week_number: 1, title: 'Hot Streak', description: 'Complete 3 lessons in a row', xp_reward: 150, requirement_type: 'streak', requirement_value: 3 },
  { id: 2, week_number: 1, title: 'Perfect Week', description: 'Complete all 7 Week 1 lessons', xp_reward: 500, requirement_type: 'week1_complete', requirement_value: 7 },
  { id: 3, week_number: 1, title: 'Quiz Ace', description: 'Score 100% on any Week 1 quiz', xp_reward: 200, requirement_type: 'perfect_quiz_w1', requirement_value: 1 },
  // Week 2
  { id: 4, week_number: 2, title: 'Greek God In Training', description: 'Complete all Greeks lessons', xp_reward: 500, requirement_type: 'week2_complete', requirement_value: 7 },
  { id: 5, week_number: 2, title: 'No Mistakes', description: 'Score 90%+ on 3 Week 2 quizzes', xp_reward: 300, requirement_type: 'high_score_w2', requirement_value: 3 },
  { id: 6, week_number: 2, title: 'Speed Runner', description: 'Complete 3 lessons in one day', xp_reward: 250, requirement_type: 'lessons_per_day', requirement_value: 3 },
  // Week 3
  { id: 7, week_number: 3, title: 'Iron Will', description: 'Complete the Iron Condor lesson', xp_reward: 200, requirement_type: 'day15_complete', requirement_value: 1 },
  { id: 8, week_number: 3, title: '21 Day Challenge', description: 'Complete all 21 lessons', xp_reward: 1000, requirement_type: 'all_complete', requirement_value: 21 },
  { id: 9, week_number: 3, title: 'Master Scorer', description: 'Average 90%+ across all quizzes', xp_reward: 750, requirement_type: 'avg_score_90', requirement_value: 90 },
];

const DEFAULT_USERS = [
  { id: 1, name: 'Devan', avatar: 'Devan.PNG' },
  { id: 2, name: 'Nanda', avatar: 'Nanda.PNG' },
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
  try {
    if (fs.existsSync(DATA_PATH)) {
      const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
      // Ensure new analytics collections exist (migration support)
      let needsSave = false;
      if (!data.request_logs) { data.request_logs = []; needsSave = true; }
      if (!data.login_events) { data.login_events = []; needsSave = true; }
      if (!data.sessions) { data.sessions = []; needsSave = true; }
      if (!data.geo_cache) { data.geo_cache = {}; needsSave = true; }
      if (!data._seq.request_logs) { data._seq.request_logs = 1; needsSave = true; }
      if (!data._seq.login_events) { data._seq.login_events = 1; needsSave = true; }
      if (!data._seq.sessions) { data._seq.sessions = 1; needsSave = true; }
      if (needsSave) {
        try { save(data); } catch { /* ignore save errors during migration */ }
      }
      return data;
    }
  } catch (err) {
    // If EPERM or other error reading existing file, try to recreate
    console.warn('Warning: Could not read data.json, creating fresh copy:', err.message);
    try { fs.unlinkSync(DATA_PATH); } catch { /* ignore unlink errors */ }
  }

  const initial = {
    users: DEFAULT_USERS,
    lesson_progress: [],
    quiz_attempts: [],
    user_achievements: [],
    user_stats: DEFAULT_USERS.map(u => defaultStats(u.id)),
    weekly_challenges: WEEKLY_CHALLENGES,
    user_challenge_completions: [],
    request_logs: [],
    login_events: [],
    sessions: [],
    geo_cache: {},
    _seq: {
      quiz_attempts: 1,
      user_achievements: 1,
      challenge_completions: 1,
      lesson_progress: 1,
      request_logs: 1,
      login_events: 1,
      sessions: 1,
    },
  };
  save(initial);
  return initial;
}

function save(data) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

// Simple query helpers that mimic a DB API
const db = {
  load,
  save,

  // Users
  getUsers() { return load().users; },
  getUserById(id) { return load().users.find(u => u.id === Number(id)); },

  // Stats
  getStats(userId) {
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
  getLessons(userId) { return load().lesson_progress.filter(l => l.user_id === Number(userId)); },
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
  getChallenges() { return load().weekly_challenges; },
  getCompletions(userId) { return load().user_challenge_completions.filter(c => c.user_id === Number(userId)); },
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

  // ─── Admin Analytics Methods ───────────────────────────────────────

  // Request Logs
  addRequestLog(entry) {
    const d = load();
    if (!d.request_logs) d.request_logs = [];
    if (!d._seq.request_logs) d._seq.request_logs = 1;
    d.request_logs.push({ id: d._seq.request_logs++, ...entry });
    // Enforce 10K cap
    if (d.request_logs.length > 10000) {
      d.request_logs = d.request_logs.slice(-10000);
    }
    save(d);
  },

  getRequestLogs(page = 1, limit = 50) {
    const d = load();
    const logs = (d.request_logs || []).slice().reverse(); // newest first
    const total = logs.length;
    const pages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    return {
      logs: logs.slice(start, start + limit),
      total,
      page,
      pages,
    };
  },

  // Login Events
  addLoginEvent(entry) {
    const d = load();
    if (!d.login_events) d.login_events = [];
    if (!d._seq.login_events) d._seq.login_events = 1;
    d.login_events.push({ id: d._seq.login_events++, ...entry });
    // Enforce 1K cap
    if (d.login_events.length > 1000) {
      d.login_events = d.login_events.slice(-1000);
    }
    save(d);
  },

  getLoginEvents() {
    const d = load();
    return d.login_events || [];
  },

  // Sessions
  addSession(entry) {
    const d = load();
    if (!d.sessions) d.sessions = [];
    if (!d._seq.sessions) d._seq.sessions = 1;
    const session = { id: d._seq.sessions++, ...entry };
    d.sessions.push(session);
    save(d);
    return session;
  },

  updateSession(sessionId, updates) {
    const d = load();
    const idx = (d.sessions || []).findIndex(s => s.id === Number(sessionId));
    if (idx >= 0) {
      d.sessions[idx] = { ...d.sessions[idx], ...updates };
      save(d);
      return d.sessions[idx];
    }
    return null;
  },

  endSession(sessionId) {
    const d = load();
    const idx = (d.sessions || []).findIndex(s => s.id === Number(sessionId));
    if (idx >= 0) {
      const session = d.sessions[idx];
      const endedAt = new Date().toISOString();
      const startedAt = new Date(session.started_at);
      const durationMs = new Date(endedAt) - startedAt;
      const durationMinutes = Math.round(durationMs / 60000 * 10) / 10; // 1 decimal

      d.sessions[idx] = {
        ...session,
        ended_at: endedAt,
        duration_minutes: durationMinutes,
      };
      save(d);
      return d.sessions[idx];
    }
    return null;
  },

  getSessions(userId) {
    const d = load();
    let sessions = d.sessions || [];
    if (userId) {
      sessions = sessions.filter(s => s.user_id === Number(userId));
    }
    return sessions;
  },

  // Geo Cache
  getGeoCache(ip) {
    const d = load();
    const cache = d.geo_cache || {};
    return cache[ip] || null;
  },

  setGeoCache(ip, data) {
    const d = load();
    if (!d.geo_cache) d.geo_cache = {};
    d.geo_cache[ip] = { ...data, cached_at: new Date().toISOString() };
    save(d);
  },

  // Cleanup stale sessions — sessions with no ended_at and last_heartbeat older than 3 minutes
  cleanupStaleSessions() {
    const d = load();
    const threeMinAgo = Date.now() - 3 * 60 * 1000;
    let changed = false;

    (d.sessions || []).forEach(session => {
      if (!session.ended_at && session.last_heartbeat) {
        const lastBeat = new Date(session.last_heartbeat).getTime();
        if (lastBeat < threeMinAgo) {
          const endedAt = session.last_heartbeat; // Use last heartbeat as end time
          const startedAt = new Date(session.started_at);
          const durationMs = new Date(endedAt) - startedAt;
          session.ended_at = endedAt;
          session.duration_minutes = Math.round(durationMs / 60000 * 10) / 10;
          changed = true;
        }
      }
    });

    if (changed) {
      save(d);
    }
  },
};

module.exports = { db };
