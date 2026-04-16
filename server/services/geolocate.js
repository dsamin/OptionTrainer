/**
 * IP Geolocation service using ip-api.com (free tier — HTTP only).
 * Caches results in the database, handles rate limiting.
 */
const http = require('http');
const { db } = require('../database');

// Rate limiting: track recent API call timestamps
const recentCalls = [];
const RATE_LIMIT = 45; // max calls per minute
const RATE_WINDOW_MS = 60 * 1000;

// Private/local IP patterns
const LOCAL_IPS = ['127.0.0.1', '::1', '::ffff:127.0.0.1'];

function isPrivateIP(ip) {
    if (LOCAL_IPS.includes(ip)) return true;
    if (ip.startsWith('192.168.')) return true;
    if (ip.startsWith('10.')) return true;
    // 172.16.x.x - 172.31.x.x
    if (ip.startsWith('172.')) {
        const second = parseInt(ip.split('.')[1], 10);
        if (second >= 16 && second <= 31) return true;
    }
    return false;
}

/**
 * Resolve an IP to geolocation data.
 * Returns { city, region, country, lat, lon } or null on error.
 */
async function geolocate(ip) {
    try {
        // Local/private IPs
        if (isPrivateIP(ip)) {
            return { city: 'Local', region: 'Local', country: 'Local', lat: 0, lon: 0 };
        }

        // Check cache
        const cached = db.getGeoCache(ip);
        if (cached) {
            const age = Date.now() - new Date(cached.cached_at).getTime();
            if (age < 7 * 24 * 60 * 60 * 1000) { // 7 days
                return cached;
            }
        }

        // Rate limiting
        const now = Date.now();
        // Clean old timestamps
        while (recentCalls.length && recentCalls[0] < now - RATE_WINDOW_MS) {
            recentCalls.shift();
        }
        if (recentCalls.length >= RATE_LIMIT) {
            return null; // Rate limited
        }
        recentCalls.push(now);

        // Call ip-api.com (HTTP only for free tier)
        const data = await new Promise((resolve, reject) => {
            const req = http.get(
                `http://ip-api.com/json/${ip}?fields=city,regionName,country,lat,lon`,
                { timeout: 5000 },
                (res) => {
                    let body = '';
                    res.on('data', chunk => body += chunk);
                    res.on('end', () => {
                        try {
                            resolve(JSON.parse(body));
                        } catch {
                            reject(new Error('Invalid JSON response'));
                        }
                    });
                }
            );
            req.on('error', reject);
            req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
        });

        if (data && data.city) {
            const result = {
                city: data.city,
                region: data.regionName,
                country: data.country,
                lat: data.lat,
                lon: data.lon,
            };
            db.setGeoCache(ip, result);
            return result;
        }

        return null;
    } catch {
        // Never throw — return null on any error
        return null;
    }
}

module.exports = { geolocate };
