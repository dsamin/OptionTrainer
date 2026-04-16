/**
 * Session tracking routes.
 * POST /api/session/start — creates login event + session
 * POST /api/session/heartbeat — updates last_heartbeat
 * POST /api/session/end — ends session with duration
 */
const express = require('express');
const router = express.Router();
const { db } = require('../database');

// POST /api/session/start
router.post('/start', (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) return res.status(400).json({ error: 'userId required' });

        const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip || 'unknown';
        const now = new Date().toISOString();

        // Create login event
        db.addLoginEvent({
            user_id: Number(userId),
            timestamp: now,
            ip,
            user_agent: req.headers['user-agent'] || 'unknown',
        });

        // Create session
        const session = db.addSession({
            user_id: Number(userId),
            started_at: now,
            last_heartbeat: now,
            ip,
            ended_at: null,
            duration_minutes: null,
        });

        res.json({ sessionId: session.id });
    } catch (err) {
        console.error('Session start error:', err.message);
        res.status(500).json({ error: 'Failed to start session' });
    }
});

// POST /api/session/heartbeat
router.post('/heartbeat', (req, res) => {
    try {
        let sessionId;

        // Handle both JSON and text/plain (sendBeacon)
        if (typeof req.body === 'string') {
            try { sessionId = JSON.parse(req.body).sessionId; } catch { /* ignore parse error */ }
        } else {
            sessionId = req.body?.sessionId;
        }

        if (!sessionId) return res.status(400).json({ error: 'sessionId required' });

        db.updateSession(sessionId, { last_heartbeat: new Date().toISOString() });
        res.json({ ok: true });
    } catch (err) {
        console.error('Heartbeat error:', err.message);
        res.status(500).json({ error: 'Failed to update heartbeat' });
    }
});

// POST /api/session/end — supports both JSON and text/plain for sendBeacon
router.post('/end', express.text({ type: 'text/plain' }), (req, res) => {
    try {
        let sessionId;

        if (typeof req.body === 'string') {
            try { sessionId = JSON.parse(req.body).sessionId; } catch { /* ignore parse error */ }
        } else {
            sessionId = req.body?.sessionId;
        }

        if (!sessionId) return res.status(400).json({ error: 'sessionId required' });

        db.endSession(sessionId);
        res.json({ ok: true });
    } catch (err) {
        console.error('Session end error:', err.message);
        res.status(500).json({ error: 'Failed to end session' });
    }
});

module.exports = router;
