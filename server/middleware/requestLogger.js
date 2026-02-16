/**
 * Express middleware that logs every API request to the database.
 * Skips /api/admin/* routes to avoid noise.
 * Non-blocking: calls next() immediately.
 */
const { db } = require('../database');

function requestLogger(req, res, next) {
    // Skip admin routes to avoid noise
    if (req.path.startsWith('/api/admin')) {
        return next();
    }

    // Call next immediately — logging is non-blocking
    next();

    // Extract data asynchronously
    try {
        const userId = req.body?.userId || req.params?.userId || req.query?.userId || null;
        const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip || 'unknown';
        const userAgent = req.headers['user-agent'] || 'unknown';

        db.addRequestLog({
            timestamp: new Date().toISOString(),
            method: req.method,
            endpoint: req.originalUrl || req.url,
            user_id: userId ? Number(userId) : null,
            ip,
            user_agent: userAgent,
            status_code: res.statusCode,
        });
    } catch (err) {
        // Never let logging break the app
        console.error('Request logger error:', err.message);
    }
}

module.exports = requestLogger;
