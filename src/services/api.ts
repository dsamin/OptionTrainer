const BASE = 'http://localhost:3001/api';

export interface UserStats {
  user_id: number;
  total_xp: number;
  current_streak: number;
  longest_streak: number;
  last_completed_date: string | null;
  start_date: string | null;
  level: number;
  level_name: string;
}

export interface ApiUser {
  id: number;
  name: string;
  avatar: string;
  total_xp: number;
  current_streak: number;
  longest_streak: number;
  level: number;
  level_name: string;
  lessons_completed: number;
  average_quiz_score: number;
  achievements_count: number;
}

export interface LeaderboardEntry extends ApiUser {
  rank: number;
}

export interface LessonRecord {
  user_id: number;
  day_number: number;
  completed: boolean;
  completed_at: string | null;
  quiz_score: number | null;
  exercise_completed: boolean;
  time_spent_minutes: number;
}

export interface Achievement {
  achievement_id: string;
  unlocked_at: string;
}

export interface Challenge {
  id: number;
  week_number: number;
  title: string;
  description: string;
  xp_reward: number;
  requirement_type: string;
  requirement_value: number;
  completed?: boolean;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json();
}

export const api = {
  // Users
  getUsers: ()              => request<ApiUser[]>('/users'),
  getUser:  (id: number)    => request<ApiUser>(`/users/${id}`),

  // Progress
  getProgress: (userId: number) => request<{
    lessons: LessonRecord[];
    quizAttempts: { day_number: number; score: number; attempted_at: string }[];
    achievements: Achievement[];
    stats: UserStats;
  }>(`/progress/${userId}`),

  saveLesson: (userId: number, data: {
    dayNumber: number;
    completed: boolean;
    quizScore?: number;
    exerciseCompleted?: boolean;
    timeSpentMinutes?: number;
  }) => request<{ success: boolean; newAchievements: string[]; total_xp: number; current_streak: number }>
    (`/progress/${userId}/lesson`, { method: 'POST', body: JSON.stringify(data) }),

  saveQuizAttempt: (userId: number, dayNumber: number, score: number) =>
    request<{ success: boolean }>(`/progress/${userId}/quiz-attempt`, {
      method: 'POST',
      body: JSON.stringify({ dayNumber, score }),
    }),

  // Leaderboard
  getLeaderboard: () => request<LeaderboardEntry[]>('/leaderboard'),

  // Achievements
  getAchievements: (userId: number) => request<Achievement[]>(`/achievements/${userId}`),

  // Challenges
  getChallenges: (userId?: number) =>
    request<Challenge[]>(`/challenges${userId ? `?userId=${userId}` : ''}`),

  completeChallenge: (userId: number, challengeId: number) =>
    request<{ success: boolean; xpAwarded: number }>('/challenges/complete', {
      method: 'POST',
      body: JSON.stringify({ userId, challengeId }),
    }),

  // Health check
  healthCheck: () => fetch(`${BASE}/health`).then(r => r.ok).catch(() => false),
};
