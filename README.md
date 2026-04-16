# OptionTrainer

> **Master Options Trading in 21 Days** — a structured, gamified learning platform for three traders: Devan, Nanda, and Srihari.

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Curriculum](#curriculum)
- [Gamification System](#gamification-system)
- [Admin Dashboard](#admin-dashboard)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Reference](#api-reference)

---

## Overview

OptionTrainer is a full-stack web application that guides users through a 21-day options trading curriculum. It features:

- **Multi-user login** — profile selection screen for Devan, Nanda, and Srihari, each with persisted progress
- **21-day structured curriculum** across three weeks: Technical Analysis → Options Greeks → Advanced Strategies
- **Interactive quizzes** with instant feedback, explanations, and score tracking
- **Gamification** — XP, levels, streaks, achievement badges, weekly challenges, and a leaderboard
- **Real-time leaderboard** comparing all three users on XP, streaks, and quiz performance
- **Admin analytics dashboard** — password-protected dashboard with login tracking, session monitoring, geo distribution, quiz performance charts, and request logging
- **Lightweight backend** — Express + JSON file store, zero native dependencies, no external database required

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Browser (Client)                            │
│                                                                     │
│  ┌──────────────┐    ┌──────────────────────────────────────────┐  │
│  │  Landing     │    │            Main App (React Router)        │  │
│  │  Page        │───▶│                                          │  │
│  │  (Login)     │    │  ┌──────────┐  ┌──────────┐  ┌───────┐  │  │
│  └──────────────┘    │  │Dashboard │  │ Lessons  │  │ Quiz  │  │  │
│                      │  └──────────┘  └──────────┘  └───────┘  │  │
│  User selects        │  ┌──────────┐  ┌──────────┐  ┌───────┐  │  │
│  profile →           │  │Progress  │  │ Stocks   │  │ Game  │  │  │
│  stored in           │  │  Page    │  │  Page    │  │  Hub  │  │  │
│  Zustand +           │  └──────────┘  └──────────┘  └───────┘  │  │
│  localStorage        └──────────────────────────────────────────┘  │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    State Management (Zustand)                 │  │
│  │  userStore (current user)  │  progressStore (lesson data)    │  │
│  │  settingsStore (theme/prefs)                                  │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                     API Service Layer                        │  │
│  │              src/services/api.ts (fetch wrapper)             │  │
│  └────────────────────────────┬─────────────────────────────────┘  │
└───────────────────────────────┼─────────────────────────────────────┘
                                │ HTTP (localhost:3001)
                                │
┌───────────────────────────────┼─────────────────────────────────────┐
│                Backend        │   (Node.js / Express)                │
│                               │                                      │
│  ┌────────────────────────────▼──────────────────────────────────┐  │
│  │                       Express Router                          │  │
│  │  /api/users  /api/progress  /api/leaderboard                  │  │
│  │  /api/achievements  /api/challenges  /api/admin               │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  ┌────────────┐  ┌─────────────┐  ┌───────────┐  ┌─────────────┐  │
│  │  leveling  │  │     xp      │  │achievement│  │  database   │  │
│  │  .js       │  │   .js       │  │   .js     │  │   .js       │  │
│  │ (6 levels) │  │(XP formula) │  │(auto-grant│  │(JSON store) │  │
│  └────────────┘  └─────────────┘  └───────────┘  └──────┬──────┘  │
│                                                           │         │
│                                               ┌───────────▼──────┐  │
│                                               │  server/data.json │  │
│                                               │  (persistent DB)  │  │
│                                               └──────────────────┘  │
└──────────────────────────────────────────────────────────────────────┘
```

### Data Flow — Completing a Lesson

```
User clicks "Mark Complete"
        │
        ▼
QuizPage.tsx / LessonPage.tsx
        │ calls api.saveLesson(userId, { dayNumber, quizScore, ... })
        ▼
POST /api/progress/:userId/lesson
        │
        ├─▶ Save lesson record in data.json
        ├─▶ Recalculate streak (consecutive-day logic)
        ├─▶ Calculate XP earned (base + quiz bonus + streak bonus)
        ├─▶ Update level (Rookie → Master based on total XP)
        └─▶ checkAndGrantAchievements(db, userId)
                 └─▶ auto-grants any newly earned badges
        │
        ▼
Response: { newAchievements, total_xp, current_streak, level }
        │
        ▼
Frontend updates Zustand userStore
Sidebar shows updated XP / level badge
```

---

## Project Structure

```
OptionTrainer/
│
├── src/                          # Frontend (React + TypeScript)
│   ├── App.tsx                   # Root router — login gate → main app + admin routes
│   ├── main.tsx                  # React entry point
│   ├── vite-env.d.ts             # Type declarations (images, vite)
│   │
│   ├── pages/
│   │   ├── LandingPage.tsx       # Profile selection screen (login)
│   │   ├── GameHubPage.tsx       # Leaderboard / Trophies / Challenges
│   │   └── admin/
│   │       ├── AdminLoginPage.tsx     # Admin password login
│   │       ├── AdminDashboardPage.tsx # Analytics dashboard with 8 widgets
│   │       └── AdminLogsPage.tsx      # Paginated request logs table
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.tsx        # Shell: Sidebar + Header + <Outlet>
│   │   │   ├── Sidebar.tsx       # Navigation + user avatar + logout
│   │   │   ├── Header.tsx        # XP bar + progress stats
│   │   │   └── Dashboard.tsx     # Home — welcome, current lesson, stats
│   │   │
│   │   ├── lessons/
│   │   │   ├── LessonPage.tsx    # Lesson content renderer
│   │   │   └── QuizPage.tsx      # Interactive quiz with feedback
│   │   │
│   │   ├── gamification/
│   │   │   ├── Leaderboard.tsx   # Ranked 3-user board
│   │   │   ├── TrophyCabinet.tsx # All 12 achievements (locked/unlocked)
│   │   │   ├── LevelBadge.tsx    # Level chip + XP progress bar
│   │   │   └── WeeklyChallenges.tsx  # 9 challenges across 3 weeks
│   │   │
│   │   ├── admin/                # Admin dashboard components
│   │   │   ├── AdminLayout.tsx        # Top nav with Dashboard/Logs links
│   │   │   ├── AdminRouteGuard.tsx     # Auth redirect guard
│   │   │   ├── ActivityFeed.tsx        # Scrollable activity feed
│   │   │   ├── cards/
│   │   │   │   ├── OverviewCards.tsx   # 6 animated stat cards
│   │   │   │   └── UserStatsTable.tsx  # User stats with avatars & levels
│   │   │   └── charts/
│   │   │       ├── LoginTimeline.tsx         # 30-day area chart
│   │   │       ├── GeoDistribution.tsx       # Horizontal bar chart
│   │   │       ├── QuizPerformance.tsx       # Color-coded vertical bars
│   │   │       ├── PopularLessons.tsx        # Ranked lesson list
│   │   │       └── UserProgressComparison.tsx # Side-by-side comparison
│   │   │
│   │   ├── progress/
│   │   │   └── ProgressPage.tsx  # Analytics: week breakdown, streaks
│   │   ├── stocks/
│   │   │   └── StocksPage.tsx    # Watchlist with mini charts
│   │   └── settings/
│   │       └── SettingsPage.tsx  # Theme, preferences, reset
│   │
│   ├── data/
│   │   └── curriculum/           # 21 lesson definitions (TypeScript)
│   │       ├── index.ts
│   │       ├── week1/            # Days 1–7: Technical Analysis
│   │       ├── week2/            # Days 8–14: Options Greeks
│   │       └── week3/            # Days 15–21: Advanced Strategies
│   │
│   ├── stores/
│   │   ├── userStore.ts          # Current logged-in user + session tracking
│   │   ├── adminStore.ts         # Admin auth state (token, persisted)
│   │   ├── progressStore.ts      # Local lesson progress (localStorage)
│   │   └── settingsStore.ts      # Theme + preferences (localStorage)
│   │
│   ├── services/
│   │   ├── api.ts                # Typed fetch wrapper for all API calls
│   │   └── adminApi.ts           # Authenticated admin API client
│   │
│   └── Images/
│       ├── Devan.PNG
│       ├── Nanda.PNG
│       └── Srihari.PNG
│
├── server/                       # Backend (Node.js / Express)
│   ├── index.js                  # Server entry — mounts all routes
│   ├── database.js               # JSON file store (read/write helpers)
│   ├── auth.js                   # HMAC-SHA256 token generation & verification
│   ├── leveling.js               # Level thresholds & getLevel()
│   ├── xp.js                     # XP formula (base + bonuses)
│   ├── achievements.js           # Auto-grant achievement checker
│   ├── data.json                 # Persistent database file (gitignored)
│   ├── .env.example              # Environment variable template
│   ├── package.json              # express + cors + dotenv
│   ├── middleware/
│   │   ├── adminAuth.js          # Bearer token verification middleware
│   │   └── requestLogger.js      # API request logging middleware
│   ├── services/
│   │   └── geolocate.js          # IP geolocation (ip-api.com + cache)
│   └── routes/
│       ├── users.js              # GET /api/users, GET /api/users/:id
│       ├── progress.js           # GET/POST /api/progress/:userId
│       ├── leaderboard.js        # GET /api/leaderboard
│       ├── achievements.js       # GET/POST /api/achievements/:userId
│       ├── challenges.js         # GET /api/challenges, POST /api/challenges/complete
│       ├── admin.js              # POST /login, GET /analytics, /logs, /sessions
│       └── session.js            # POST /start, /heartbeat, /end
│
├── index.html                    # Vite HTML entry
├── package.json                  # Frontend deps + scripts
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

---

## Curriculum

### Week 1 — Technical Analysis 📊
| Day | Lesson |
|-----|--------|
| 1 | Price Action Basics |
| 2 | Support & Resistance |
| 3 | Trend Lines |
| 4 | Moving Averages |
| 5 | RSI Fundamentals |
| 6 | Volume Analysis |
| 7 | Week 1 Review |

### Week 2 — Options Greeks 🏛️
| Day | Lesson |
|-----|--------|
| 8  | Delta Deep Dive |
| 9  | Theta Mastery |
| 10 | Implied Volatility |
| 11 | Vega Management |
| 12 | Probability of Profit |
| 13 | DTE Selection |
| 14 | Week 2 Review |

### Week 3 — Advanced Strategies 🎯
| Day | Lesson |
|-----|--------|
| 15 | Iron Condor Optimization |
| 16 | Credit Spread Timing |
| 17 | Managing Assignments |
| 18 | Rolling Strategies |
| 19 | Position Sizing |
| 20 | Trading Plan |
| 21 | Final Assessment |

Each lesson contains: structured content sections, key learning points, real stock examples (NVDA, META, QQQ, etc.), and a 5–10 question quiz.

---

## Gamification System

### XP Formula
```
XP per lesson = 100 (base)
              + floor(quizScore / 100 × 50)   # up to 50 XP
              + min(currentStreak × 5, 50)    # up to 50 XP
              + 25 (if quiz score = 100%)      # perfect bonus
              = 100–225 XP per lesson
```

### Level System
| Level | Name    | XP Required |
|-------|---------|-------------|
| 1     | Rookie  | 0           |
| 2     | Learner | 500         |
| 3     | Trader  | 1,200       |
| 4     | Pro     | 2,200       |
| 5     | Expert  | 3,500       |
| 6     | Master  | 5,000       |

### Achievements (12 total)
| Badge | Requirement | Rarity |
|-------|-------------|--------|
| 🎯 First Steps | Complete 1 lesson | Common |
| 📚 Week 1 Complete | Finish all 7 Week 1 lessons | Rare |
| 📈 Week 2 Complete | Finish all 7 Week 2 lessons | Rare |
| 🏆 Week 3 Complete | Finish all 7 Week 3 lessons | Epic |
| 🔥 Streak Starter | 3-day streak | Common |
| ⚡ Week Warrior | 7-day streak | Rare |
| 👑 Consistency King | 14-day streak | Epic |
| 🎓 Master Trader | Complete all 21 days | Legendary |
| 🧠 Quiz Master | Score 100% on 5 quizzes | Rare |
| 📊 RSI Expert | Ace Day 5 with 100% | Common |
| ⏰ Theta King | Ace Day 9 with 100% | Rare |
| 🏛️ Greek God | 90%+ on all Week 2 lessons | Epic |

### Weekly Challenges (9 total, 3 per week)
| Week | Challenge | XP Reward |
|------|-----------|-----------|
| 1 | Hot Streak — 3 lessons in a row | 150 |
| 1 | Perfect Week — all 7 Week 1 lessons | 500 |
| 1 | Quiz Ace — 100% on any Week 1 quiz | 200 |
| 2 | Greek God In Training — all Week 2 lessons | 500 |
| 2 | No Mistakes — 90%+ on 3 Week 2 quizzes | 300 |
| 2 | Speed Runner — 3 lessons in one day | 250 |
| 3 | Iron Will — complete Iron Condor lesson | 200 |
| 3 | 21 Day Challenge — all 21 lessons | 1,000 |
| 3 | Master Scorer — 90%+ average across all quizzes | 750 |

---

## Admin Dashboard

A password-protected analytics dashboard at `/admin` for monitoring user activity.

### Features
- **Overview cards** — total logins, active sessions, lessons completed, avg quiz score
- **Login timeline** — 30-day area chart (TradingView lightweight-charts)
- **User statistics table** — per-user logins, time spent, quiz scores, streaks, and levels
- **Geographic distribution** — IP-based city/country breakdown
- **Quiz performance** — per-lesson attempt counts and average scores
- **Popular lessons** — most-completed lessons ranked by completions
- **Activity feed** — real-time feed of logins, lesson completions, and quiz attempts
- **Request logs** — paginated table of all API requests with method, status, IP, and client

### Access
- URL: `http://localhost:5173/admin`
- Default password: set via `ADMIN_PASSWORD` environment variable
- Tokens expire after 24 hours (HMAC-SHA256 signed)

---

## Tech Stack

### Frontend
| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool & dev server |
| React Router 6 | Client-side routing |
| Zustand | State management + localStorage persistence |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Animations |
| Lucide React | Icons |
| Lightweight Charts | Financial charts (candlestick + admin timeline) |

### Backend
| Tool | Purpose |
|------|---------|
| Node.js | Runtime |
| Express 4 | HTTP framework |
| CORS | Cross-origin support |
| JSON file store | Zero-dependency persistence (`server/data.json`) |

---

## Getting Started

### Prerequisites
- Node.js ≥ 18
- npm

### 1. Install frontend dependencies
```bash
npm install
```

### 2. Install backend dependencies
```bash
cd server && npm install
```

### 3. Start the backend API (port 3001)
```bash
# From project root:
npm run server

# Or from the server directory:
cd server && npm start
```

### 4. Start the frontend dev server (port 5173)
```bash
npm run dev
```

### 5. Open the app
```
http://localhost:5173
```

You'll land on the profile selection screen. Pick a user to begin.

> **Note:** The app works without the backend server — it falls back to empty stats with local-only progress. Run the server to enable multi-user persistence, leaderboard, and challenge sync.

### 6. Access the admin dashboard
```
http://localhost:5173/admin
```

Enter the admin password (set via `ADMIN_PASSWORD` in `server/.env`, or use the default fallback). See [Admin Dashboard](#admin-dashboard) for details.

### Build for production
```bash
npm run build
npm run serve   # serves dist/ on port 3000
```

---

## API Reference

Base URL: `http://localhost:3001/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | All 3 users with stats |
| GET | `/users/:id` | Single user with full detail |
| GET | `/progress/:userId` | Full progress for a user |
| POST | `/progress/:userId/lesson` | Save lesson completion |
| POST | `/progress/:userId/quiz-attempt` | Record quiz attempt |
| GET | `/leaderboard` | All users ranked by XP |
| GET | `/achievements/:userId` | User's unlocked achievements |
| POST | `/achievements/:userId` | Grant an achievement |
| GET | `/challenges?userId=X` | All challenges with completion status |
| POST | `/challenges/complete` | Complete a challenge and award XP |
| GET | `/health` | Server health check |
| POST | `/session/start` | Start a user session |
| POST | `/session/heartbeat` | Session heartbeat (60s) |
| POST | `/session/end` | End a session (supports sendBeacon) |

### Admin Endpoints (require `Authorization: Bearer <token>`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/admin/login` | Authenticate with admin password |
| GET | `/admin/analytics` | Full analytics (overview, per-user, charts) |
| GET | `/admin/logs?page=N` | Paginated request logs (50/page) |
| GET | `/admin/sessions` | Session history |

### POST `/progress/:userId/lesson` body
```json
{
  "dayNumber": 5,
  "completed": true,
  "quizScore": 90,
  "exerciseCompleted": true,
  "timeSpentMinutes": 25
}
```

### Response includes
```json
{
  "success": true,
  "newAchievements": ["first-steps", "streak-starter"],
  "total_xp": 265,
  "current_streak": 3,
  "level": { "level": 1, "name": "Rookie", "minXp": 0, "maxXp": 500 }
}
```

---

## Data Persistence

All backend data is stored in `data.json` (project root) — a single JSON file containing:

```
users / lesson_progress / quiz_attempts / user_achievements
user_stats / weekly_challenges / user_challenge_completions
request_logs / login_events / sessions / geo_cache
```

This file is created automatically on first server start and is listed in `.gitignore`.

---

*Built for Devan, Nanda, and Srihari — happy trading! 📈*
