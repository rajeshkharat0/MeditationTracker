// Types for our data structures
export interface MeditationSession {
  date: string;
  duration: number; // in seconds
}

export interface DailyTotal {
  date: string;
  total: number; // in seconds
}

export interface Goal {
  id: string;
  description: string;
  targetHours: number;
  startDate: string;
  endDate: string;
}

// Function to save a meditation session
export function saveMeditationSession(session: MeditationSession) {
  const sessions = getMeditationSessions();
  sessions.push(session);
  localStorage.setItem('meditationSessions', JSON.stringify(sessions));
  updateDailyTotal(session.date, session.duration);
}

// Function to get all meditation sessions
export function getMeditationSessions(): MeditationSession[] {
  const sessions = localStorage.getItem('meditationSessions');
  return sessions ? JSON.parse(sessions) : [];
}

// Function to update daily total
function updateDailyTotal(date: string, duration: number) {
  const dailyTotals = getDailyTotals();
  const existingTotal = dailyTotals.find(total => total.date === date);
  if (existingTotal) {
    existingTotal.total += duration;
  } else {
    dailyTotals.push({ date, total: duration });
  }
  localStorage.setItem('dailyTotals', JSON.stringify(dailyTotals));
}

// Function to get daily totals
export function getDailyTotals(): DailyTotal[] {
  const totals = localStorage.getItem('dailyTotals');
  return totals ? JSON.parse(totals) : [];
}

// Function to get today's total
export function getTodayTotal(): number {
  const today = new Date().toISOString().split('T')[0];
  const dailyTotals = getDailyTotals();
  const todayTotal = dailyTotals.find(total => total.date === today);
  return todayTotal ? todayTotal.total : 0;
}

// Function to get data for a specific time range
export function getDataForTimeRange(days: number): DailyTotal[] {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days + 1);
  
  const dailyTotals = getDailyTotals();
  return dailyTotals.filter(total => {
    const totalDate = new Date(total.date);
    return totalDate >= startDate && totalDate <= endDate;
  });
}

export function saveGoal(goal: Goal) {
  const goals = getGoals();
  goals.push(goal);
  localStorage.setItem('meditationGoals', JSON.stringify(goals));
}

export function getGoals(): Goal[] {
  const goals = localStorage.getItem('meditationGoals');
  return goals ? JSON.parse(goals) : [];
}

export function updateGoal(updatedGoal: Goal) {
  const goals = getGoals();
  const index = goals.findIndex(goal => goal.id === updatedGoal.id);
  if (index !== -1) {
    goals[index] = updatedGoal;
    localStorage.setItem('meditationGoals', JSON.stringify(goals));
  }
}

export function deleteGoal(goalId: string) {
  const goals = getGoals();
  const updatedGoals = goals.filter(goal => goal.id !== goalId);
  localStorage.setItem('meditationGoals', JSON.stringify(updatedGoals));
}

export function getGoalProgress(goalId: string): number {
  const goal = getGoals().find(g => g.id === goalId);
  if (!goal) return 0;

  const sessions = getMeditationSessions();
  const goalSessions = sessions.filter(session => 
    session.date >= goal.startDate && session.date <= goal.endDate
  );

  const totalHours = goalSessions.reduce((sum, session) => sum + session.duration / 3600, 0);
  return Math.min(totalHours / goal.targetHours, 1);
}

