/**
 * Admin routes — login and protected endpoints.
 */
const express = require('express');
const router = express.Router();
const { generateToken } = require('../auth');
const adminAuth = require('../middleware/adminAuth');

// POST /api/admin/login — validate password, return token
router.post('/login', (req, res) => {
    const { password } = req.body;

    if (!password || password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ error: 'Invalid password' });
    }

    const token = generateToken();
    res.json({ token });
});

// All routes below require admin auth
router.use(adminAuth);

// GET /api/admin/analytics — placeholder, will be filled in Phase 4
router.get('/analytics', (req, res) => {
    res.json({ message: 'Analytics endpoint ready — data coming in Phase 4' });
});

// GET /api/admin/logs — placeholder
router.get('/logs', (req, res) => {
    res.json({ logs: [], total: 0, page: 1, pages: 0 });
});

// GET /api/admin/sessions — placeholder
router.get('/sessions', (req, res) => {
    res.json({ sessions: [], total: 0 });
});

module.exports = router;
