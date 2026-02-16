/**
 * Express middleware that protects admin routes.
 * Reads Authorization: Bearer <token> header and verifies via auth.verifyToken().
 */
const { verifyToken } = require('../auth');

function adminAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Missing or invalid authorization header' });
    }

    const token = authHeader.slice(7); // Remove "Bearer "
    const payload = verifyToken(token);

    if (!payload) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }

    req.adminPayload = payload;
    next();
}

module.exports = adminAuth;
