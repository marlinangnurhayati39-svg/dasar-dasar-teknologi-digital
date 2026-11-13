export type ViewRoute =
  | 'home'
  | 'map'
  | 'world-1'
  | 'world-2'
  | 'world-3'
  | 'game-1'
  | 'game-2'
  | 'game-3'
  | 'game-4'
  | 'game-5'
  | 'final-quiz'
  | 'final-result';

export type WorldId = 'world-1' | 'world-2' | 'world-3';

export type GameId = 'game-1' | 'game-2' | 'game-3' | 'game-4' | 'game-5';

export type BadgeId = 'detektif_teknologi' | 'ahli_komputer' | 'pahlawan_keamanan';

export type IllustrationId =
  | 'smartphone'
  | 'laptop'
  | 'computer'
  | 'tablet'
  | 'camera'
  | 'tv'
  | 'atm'
  | 'weather_news'
  | 'schedule'
  | 'family_photo'
  | 'teacher_msg'
  | 'learning_video'
  | 'book'
  | 'bicycle'
  | 'pencil'
  | 'wooden_chair'
  | 'soccer_ball'
  | 'umbrella'
  | 'monitor'
  | 'keyboard'
  | 'mouse'
  | 'cpu'
  | 'speaker'
  | 'printer'
  | 'webcam'
  | 'microphone'
  | 'windows'
  | 'word'
  | 'powerpoint'
  | 'paint'
  | 'chrome'
  | 'calculator'
  | 'shield_lock'
  | 'password_key'
  | 'stranger_chat'
  | 'gift_scam'
  | 'teacher_link'
  | 'shared_pc'
  | 'personal_id';

export interface GameRecord {
  completed: boolean;
  bestPoints: number;
  bestCorrect: number;
  totalQuestions: number;
  stars: number;
}

export interface QuizRecord {
  completed: boolean;
  bestPoints: number;
  bestCorrect: number;
  totalQuestions: number;
  stars: number;
}

export interface StudentProgress {
  studentName: string;
  soundEnabled: boolean;
  completedMaterials: Record<WorldId, boolean>;
  games: Record<GameId, GameRecord>;
  finalQuiz: QuizRecord;
}

export interface BadgeInfo {
  id: BadgeId;
  title: string;
  subtitle: string;
  worldId: WorldId;
  accentColor: 'blue' | 'purple' | 'emerald';
}
