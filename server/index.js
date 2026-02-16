try { require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') }); } catch { /* dotenv optional */ }
// Fallback env vars for local dev when .env can't be read
if (!process.env.ADMIN_PASSWORD) process.env.ADMIN_PASSWORD = 'DEVAN';
if (!process.env.ADMIN_TOKEN_SECRET) process.env.ADMIN_TOKEN_SECRET = 'optiontrainer-admin-secret-key-2026';

const express = require('express');
const cors = require('cors');
const { db } = require('./database');
const requestLogger = require('./middleware/requestLogger');

const app = express();
const PORT = 3001;

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:3000'] }));
app.use(express.json());

// Request logging middleware — must be before all routes
app.use(requestLogger);

// Initialize DB on startup (creates data.json if needed)
db.load();

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/progress', require('./routes/progress'));
app.use('/api/leaderboard', require('./routes/leaderboard'));
app.use('/api/achievements', require('./routes/achievements'));
app.use('/api/challenges', require('./routes/challenges'));

// Admin routes
app.use('/api/admin', require('./routes/admin'));

// Session tracking routes
app.use('/api/session', require('./routes/session'));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`OptionTrainer API running on http://localhost:${PORT}`);
});
