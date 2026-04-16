/**
 * Admin routes — login and protected analytics endpoints.
 */
const express = require('express');
const router = express.Router();
const { generateToken } = require('../auth');
const adminAuth = require('../middleware/adminAuth');
const { db } = require('../database');

// Rate limiting for login
const loginAttempts = {}; // { ip: [timestamps] }

// Lesson day-to-title map
const DAY_TITLES = {
    1: 'Price Action Basics',
    2: 'Support & Resistance',
    3: 'Trend Lines & Channels',
    4: 'Moving Averages',
    5: 'RSI Fundamentals',
    6: 'Volume Analysis',
    7: 'Delta & Probability',
    8: 'Theta & Time Decay',
    9: 'Implied Volatility',
    10: 'Vega & Volatility Risk',
    11: 'DTE Selection',
    12: 'Strike Selection',
    13: 'Iron Condors',
    14: 'Credit Spread Timing',
    15: 'Managing Assignments',
    16: 'Rolling Strategies',
    17: 'Position Sizing & Trading Plan',
    18: 'Final Assessment',
};

// POST /api/admin/login — validate password, return token
router.post('/login', (req, res) => {
    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip || 'unknown';
    const now = Date.now();

    // Rate limiting: 5 failures per minute per IP
    if (!loginAttempts[ip]) loginAttempts[ip] = [];
    loginAttempts[ip] = loginAttempts[ip].filter(t => t > now - 60000);
    if (loginAttempts[ip].length >= 5) {
        return res.status(429).json({ error: 'Too many login attempts. Try again in a minute.' });
    }

    const { password } = req.body;
    if (!password || password !== process.env.ADMIN_PASSWORD) {
        loginAttempts[ip].push(now);
        return res.status(401).json({ error: 'Invalid password' });
    }

    // Clear failed attempts on success
    delete loginAttempts[ip];

    const token = generateToken();
    res.json({ token });
});

// All routes below require admin auth
router.use(adminAuth);

// GET /api/admin/analytics — full dashboard data
router.get('/analytics', (req, res) => {
    try {
        // Cleanup stale sessions first
        db.cleanupStaleSessions();

        const users = db.getUsers();
        const loginEvents = db.getLoginEvents();
        const sessions = db.getSessions();
        const d = db.load();
        const lessonProgress = d.lesson_progress || [];
        const quizAttempts = d.quiz_attempts || [];
        const userStats = d.user_stats || [];

        const now = new Date();
        const todayStr = now.toISOString().slice(0, 10);
        const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);

        // === OVERVIEW ===
        const todayLogins = loginEvents.filter(e => e.timestamp?.startsWith(todayStr)).length;
        const weekLogins = loginEvents.filter(e => new Date(e.timestamp) >= weekAgo).length;
        const activeSessions = sessions.filter(s => {
            if (s.ended_at) return false;
            if (!s.last_heartbeat) return false;
            return (Date.now() - new Date(s.last_heartbeat).getTime()) < 3 * 60 * 1000;
        }).length;

        const totalLessonsCompleted = lessonProgress.filter(l => l.completed).length;
        const totalQuizAttempts = quizAttempts.length;
        const avgQuizScore = totalQuizAttempts > 0
            ? Math.round(quizAttempts.reduce((sum, q) => sum + (q.score || 0), 0) / totalQuizAttempts)
            : 0;

        const overview = {
            total_logins_all_time: loginEvents.length,
            total_logins_today: todayLogins,
            total_logins_this_week: weekLogins,
            active_sessions: activeSessions,
            total_users: users.length,
            total_lessons_completed: totalLessonsCompleted,
            total_quiz_attempts: totalQuizAttempts,
            average_quiz_score: avgQuizScore,
        };

        // === PER USER ===
        const per_user = users.map(user => {
            const userLogins = loginEvents.filter(e => e.user_id === user.id).length;
            const userSessions = sessions.filter(s => s.user_id === user.id);
            const lastSession = userSessions.sort((a, b) =>
                new Date(b.started_at) - new Date(a.started_at))[0];
            const totalTime = userSessions
                .filter(s => s.duration_minutes)
                .reduce((sum, s) => sum + s.duration_minutes, 0);
            const userLessons = lessonProgress.filter(l => l.user_id === user.id && l.completed).length;
            const userQuizzes = quizAttempts.filter(q => q.user_id === user.id);
            const userAvgScore = userQuizzes.length > 0
                ? Math.round(userQuizzes.reduce((sum, q) => sum + (q.score || 0), 0) / userQuizzes.length)
                : 0;
            const stats = userStats.find(s => s.user_id === user.id) || {};

            return {
                user_id: user.id,
                name: user.name,
                avatar: user.avatar,
                total_logins: userLogins,
                last_seen: lastSession?.started_at || null,
                total_time_minutes: Math.round(totalTime * 10) / 10,
                lessons_completed: userLessons,
                average_quiz_score: userAvgScore,
                current_streak: stats.current_streak || 0,
                level: stats.level || 1,
                level_name: stats.level_name || 'Rookie',
            };
        });

        // === LOGIN TIMELINE (last 30 days) ===
        const login_timeline = [];
        for (let i = 29; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().slice(0, 10);
            const count = loginEvents.filter(e => e.timestamp?.startsWith(dateStr)).length;
            login_timeline.push({ date: dateStr, count });
        }

        // === GEO DISTRIBUTION ===
        const geoCache = d.geo_cache || {};
        const geoCounts = {};
        // Count unique locations from login events IP -> geo
        loginEvents.forEach(event => {
            const geo = geoCache[event.ip];
            if (geo && geo.city) {
                const location = geo.city === 'Local' ? 'Local Network' : `${geo.city}, ${geo.region}, ${geo.country}`;
                geoCounts[location] = (geoCounts[location] || 0) + 1;
            }
        });
        const geo_distribution = Object.entries(geoCounts)
            .map(([location, count]) => ({ location, count }))
            .sort((a, b) => b.count - a.count);

        // === POPULAR LESSONS ===
        const lessonMap = {};
        lessonProgress.filter(l => l.completed).forEach(l => {
            if (!lessonMap[l.day_number]) {
                lessonMap[l.day_number] = { completions: 0, scores: [] };
            }
            lessonMap[l.day_number].completions++;
        });
        quizAttempts.forEach(q => {
            if (!lessonMap[q.day_number]) {
                lessonMap[q.day_number] = { completions: 0, scores: [] };
            }
            lessonMap[q.day_number].scores.push(q.score || 0);
        });

        const popular_lessons = Object.entries(lessonMap)
            .map(([day, data]) => ({
                day_number: Number(day),
                title: DAY_TITLES[day] || `Day ${day}`,
                completions: data.completions,
                avg_score: data.scores.length > 0
                    ? Math.round(data.scores.reduce((a, b) => a + b, 0) / data.scores.length)
                    : 0,
            }))
            .sort((a, b) => b.completions - a.completions);

        // === QUIZ PERFORMANCE ===
        const quizMap = {};
        quizAttempts.forEach(q => {
            if (!quizMap[q.day_number]) {
                quizMap[q.day_number] = { attempts: 0, scores: [], perfect: 0 };
            }
            quizMap[q.day_number].attempts++;
            quizMap[q.day_number].scores.push(q.score || 0);
            if (q.score === 100) quizMap[q.day_number].perfect++;
        });

        const quiz_performance = Object.entries(quizMap)
            .map(([day, data]) => ({
                day_number: Number(day),
                title: DAY_TITLES[day] || `Day ${day}`,
                attempts: data.attempts,
                avg_score: Math.round(data.scores.reduce((a, b) => a + b, 0) / data.scores.length),
                perfect_scores: data.perfect,
            }))
            .sort((a, b) => a.day_number - b.day_number);

        // === RECENT ACTIVITY ===
        const activities = [];

        // Login events
        loginEvents.slice(-50).forEach(e => {
            const userName = users.find(u => u.id === e.user_id)?.name || `User ${e.user_id}`;
            activities.push({
                type: 'login',
                user_name: userName,
                timestamp: e.timestamp,
                detail: 'Logged in',
            });
        });

        // Lesson completions
        lessonProgress.filter(l => l.completed && l.completed_at).slice(-50).forEach(l => {
            const userName = users.find(u => u.id === l.user_id)?.name || `User ${l.user_id}`;
            activities.push({
                type: 'lesson_complete',
                user_name: userName,
                timestamp: l.completed_at,
                detail: `Completed ${DAY_TITLES[l.day_number] || `Day ${l.day_number}`}`,
            });
        });

        // Quiz attempts
        quizAttempts.slice(-50).forEach(q => {
            const userName = users.find(u => u.id === q.user_id)?.name || `User ${q.user_id}`;
            activities.push({
                type: 'quiz_attempt',
                user_name: userName,
                timestamp: q.attempted_at,
                detail: `Scored ${q.score}% on ${DAY_TITLES[q.day_number] || `Day ${q.day_number}`}`,
            });
        });

        const recent_activity = activities
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, 50);

        res.json({
            overview,
            per_user,
            login_timeline,
            geo_distribution,
            popular_lessons,
            quiz_performance,
            recent_activity,
        });
    } catch (err) {
        console.error('Analytics error:', err.message);
        res.status(500).json({ error: 'Failed to compute analytics' });
    }
});

// GET /api/admin/logs — paginated request logs
router.get('/logs', (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const result = db.getRequestLogs(page, limit);
        res.json(result);
    } catch (err) {
        console.error('Logs error:', err.message);
        res.status(500).json({ error: 'Failed to fetch logs' });
    }
});

// GET /api/admin/sessions — session history with optional userId filter
router.get('/sessions', (req, res) => {
    try {
        const userId = req.query.userId ? Number(req.query.userId) : undefined;
        const sessions = db.getSessions(userId);
        res.json({ sessions, total: sessions.length });
    } catch (err) {
        console.error('Sessions error:', err.message);
        res.status(500).json({ error: 'Failed to fetch sessions' });
    }
});

module.exports = router;
