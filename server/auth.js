/**
 * Admin token generation and verification using HMAC-SHA256.
 * Uses Node's built-in crypto module — no JWT library needed.
 */
const crypto = require('crypto');

const SECRET = () => process.env.ADMIN_TOKEN_SECRET || 'fallback-secret';
const TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Generate a signed admin token.
 * Payload: { admin: true, ts: <timestamp> }
 * Format: base64(payload).base64(hmac)
 */
function generateToken() {
    const payload = JSON.stringify({ admin: true, ts: Date.now() });
    const payloadB64 = Buffer.from(payload).toString('base64');
    const hmac = crypto.createHmac('sha256', SECRET()).update(payloadB64).digest('base64');
    return `${payloadB64}.${hmac}`;
}

/**
 * Verify a signed admin token.
 * Returns the decoded payload if valid, or null if invalid/expired.
 */
function verifyToken(token) {
    try {
        const [payloadB64, signature] = token.split('.');
        if (!payloadB64 || !signature) return null;

        // Verify HMAC
        const expectedHmac = crypto.createHmac('sha256', SECRET()).update(payloadB64).digest('base64');
        if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedHmac))) {
            return null;
        }

        // Decode and check expiry
        const payload = JSON.parse(Buffer.from(payloadB64, 'base64').toString('utf8'));
        if (!payload.admin || !payload.ts) return null;
        if (Date.now() - payload.ts > TOKEN_EXPIRY_MS) return null;

        return payload;
    } catch {
        return null;
    }
}

module.exports = { generateToken, verifyToken };
