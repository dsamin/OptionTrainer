const express = require('express');
const cors = require('cors');
const { db } = require('./database');

const app = express();
const PORT = 3001;

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:3000'] }));
app.use(express.json());

// Initialize DB on startup (creates data.json if needed)
db.load();

// Routes
app.use('/api/users',        require('./routes/users'));
app.use('/api/progress',     require('./routes/progress'));
app.use('/api/leaderboard',  require('./routes/leaderboard'));
app.use('/api/achievements', require('./routes/achievements'));
app.use('/api/challenges',   require('./routes/challenges'));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`OptionTrainer API running on http://localhost:${PORT}`);
});
