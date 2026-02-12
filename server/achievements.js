/**
 * After saving lesson progress, check which achievements should be granted.
 * Returns array of achievement IDs newly granted.
 */
function checkAndGrantAchievements(db, userId) {
  const granted = [];

  const lessons       = db.getLessons(userId).filter(l => l.completed);
  const completedDays = new Set(lessons.map(l => l.day_number));
  const stats         = db.getStats(userId);
  const streak        = stats ? stats.current_streak : 0;

  const quizAttempts  = db.getQuizAttempts(userId);
  const perfectCount  = quizAttempts.filter(a => a.score === 100).length;

  const tryGrant = (id) => {
    if (db.grantAchievement(userId, id)) granted.push(id);
  };

  if (completedDays.size >= 1) tryGrant('first-steps');

  const week1Done = [1,2,3,4,5,6,7].every(d => completedDays.has(d));
  const week2Done = [8,9,10,11,12,13,14].every(d => completedDays.has(d));
  const week3Done = [15,16,17,18,19,20,21].every(d => completedDays.has(d));

  if (week1Done) tryGrant('week1-complete');
  if (week2Done) tryGrant('week2-complete');
  if (week3Done) tryGrant('week3-complete');
  if (week1Done && week2Done && week3Done) tryGrant('master-trader');

  if (streak >= 3)  tryGrant('streak-starter');
  if (streak >= 7)  tryGrant('week-warrior');
  if (streak >= 14) tryGrant('consistency-king');

  if (perfectCount >= 5) tryGrant('quiz-master');

  const day5 = lessons.find(l => l.day_number === 5);
  if (day5 && day5.quiz_score === 100) tryGrant('rsi-expert');

  const day9 = lessons.find(l => l.day_number === 9);
  if (day9 && day9.quiz_score === 100) tryGrant('theta-king');

  const greekGod = [8,9,10,11,12,13,14].every(d => {
    const l = lessons.find(x => x.day_number === d);
    return l && l.quiz_score >= 90;
  });
  if (greekGod) tryGrant('greek-god');

  return granted;
}

module.exports = { checkAndGrantAchievements };
