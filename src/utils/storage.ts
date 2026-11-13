import { BadgeId, GameId, StudentProgress, WorldId } from '../types';

const STORAGE_KEY = 'petualangan_dunia_digital_v1';

export const DEFAULT_PROGRESS: StudentProgress = {
  studentName: '',
  soundEnabled: true,
  completedMaterials: {
    'world-1': false,
    'world-2': false,
    'world-3': false,
  },
  games: {
    'game-1': { completed: false, bestPoints: 0, bestCorrect: 0, totalQuestions: 8, stars: 0 },
    'game-2': { completed: false, bestPoints: 0, bestCorrect: 0, totalQuestions: 10, stars: 0 },
    'game-3': { completed: false, bestPoints: 0, bestCorrect: 0, totalQuestions: 12, stars: 0 },
    'game-4': { completed: false, bestPoints: 0, bestCorrect: 0, totalQuestions: 12, stars: 0 },
    'game-5': { completed: false, bestPoints: 0, bestCorrect: 0, totalQuestions: 10, stars: 0 },
  },
  finalQuiz: {
    completed: false,
    bestPoints: 0,
    bestCorrect: 0,
    totalQuestions: 15,
    stars: 0,
  },
};

export function loadProgress(): StudentProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<StudentProgress>;
    return {
      studentName: typeof parsed.studentName === 'string' ? parsed.studentName : '',
      soundEnabled: typeof parsed.soundEnabled === 'boolean' ? parsed.soundEnabled : true,
      completedMaterials: {
        ...DEFAULT_PROGRESS.completedMaterials,
        ...(parsed.completedMaterials || {}),
      },
      games: {
        ...DEFAULT_PROGRESS.games,
        ...(parsed.games || {}),
      },
      finalQuiz: {
        ...DEFAULT_PROGRESS.finalQuiz,
        ...(parsed.finalQuiz || {}),
      },
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(progress: StudentProgress): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Ignore storage quota errors cleanly
  }
}

export function resetProgressStorage(): StudentProgress {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }
  return {
    ...DEFAULT_PROGRESS,
    completedMaterials: { ...DEFAULT_PROGRESS.completedMaterials },
    games: {
      'game-1': { ...DEFAULT_PROGRESS.games['game-1'] },
      'game-2': { ...DEFAULT_PROGRESS.games['game-2'] },
      'game-3': { ...DEFAULT_PROGRESS.games['game-3'] },
      'game-4': { ...DEFAULT_PROGRESS.games['game-4'] },
      'game-5': { ...DEFAULT_PROGRESS.games['game-5'] },
    },
    finalQuiz: { ...DEFAULT_PROGRESS.finalQuiz },
  };
}

export function isWorldCompleted(progress: StudentProgress, worldId: WorldId): boolean {
  if (!progress.completedMaterials[worldId]) return false;
  if (worldId === 'world-1') {
    return progress.games['game-1'].completed && progress.games['game-2'].completed;
  }
  if (worldId === 'world-2') {
    return progress.games['game-3'].completed && progress.games['game-4'].completed;
  }
  return progress.games['game-5'].completed;
}

export function getUnlockedBadges(progress: StudentProgress): BadgeId[] {
  const badges: BadgeId[] = [];
  if (isWorldCompleted(progress, 'world-1')) badges.push('detektif_teknologi');
  if (isWorldCompleted(progress, 'world-2')) badges.push('ahli_komputer');
  if (isWorldCompleted(progress, 'world-3')) badges.push('pahlawan_keamanan');
  return badges;
}

export function calculateMetrics(progress: StudentProgress) {
  const materialCount = (Object.values(progress.completedMaterials) as boolean[]).filter(Boolean).length;
  const materialPoints = materialCount * 10;
  const materialStars = materialCount;

  const gameList = Object.values(progress.games);
  const completedGamesCount = gameList.filter((g) => g.completed).length;
  const gamePoints = gameList.reduce((acc, g) => acc + g.bestPoints, 0);
  const gameStars = gameList.reduce((acc, g) => acc + g.stars, 0);

  const quizPoints = progress.finalQuiz.bestPoints;
  const quizStars = progress.finalQuiz.stars;

  const totalPoints = materialPoints + gamePoints + quizPoints;
  const totalStars = materialStars + gameStars + quizStars;
  const maxStars = 16; // 3 materials + (5 games * 2) + 3 quiz

  const completedMilestones =
    materialCount + completedGamesCount + (progress.finalQuiz.completed ? 1 : 0);
  const totalMilestones = 9;
  const completionPercent = Math.round((completedMilestones / totalMilestones) * 100);

  const unlockedBadges = getUnlockedBadges(progress);
  const isHero = unlockedBadges.length === 3 && progress.finalQuiz.completed;

  const totalCorrectAnswers =
    gameList.reduce((acc, g) => acc + g.bestCorrect, 0) + progress.finalQuiz.bestCorrect;

  return {
    totalPoints,
    totalStars,
    maxStars,
    completionPercent,
    unlockedBadges,
    isHero,
    completedMilestones,
    totalMilestones,
    totalCorrectAnswers,
  };
}

export function computeGameStars(correct: number, total: number, completed: boolean): number {
  if (!completed) return 0;
  const ratio = total > 0 ? correct / total : 0;
  return ratio >= 0.7 ? 2 : 1;
}

export function computeQuizStars(correct: number, total: number, completed: boolean): number {
  if (!completed) return 0;
  const ratio = total > 0 ? correct / total : 0;
  if (ratio >= 0.8) return 3;
  if (ratio >= 0.5) return 2;
  return 1;
}

export function getWorldGames(worldId: WorldId): GameId[] {
  if (worldId === 'world-1') return ['game-1', 'game-2'];
  if (worldId === 'world-2') return ['game-3', 'game-4'];
  return ['game-5'];
}
