import { useEffect, useState } from 'react';
import { Award, X } from 'lucide-react';
import { BadgeId, GameId, StudentProgress, ViewRoute, WorldId } from './types';
import {
  computeGameStars,
  computeQuizStars,
  getUnlockedBadges,
  loadProgress,
  resetProgressStorage,
  saveProgress,
} from './utils/storage';
import { BADGES } from './data/curriculum';
import { playBadgeSound, playClickSound } from './utils/sound';
import { TopBar } from './components/TopBar';
import { ProgressStrip } from './components/ProgressStrip';
import { GuideModal } from './components/GuideModal';
import { HomeView } from './components/HomeView';
import { AdventureMapView } from './components/AdventureMapView';
import { WorldLessonView } from './components/WorldLessonView';
import { GameDetektifTeknologi } from './components/games/GameDetektifTeknologi';
import { GameTeknologiAtauBukan } from './components/games/GameTeknologiAtauBukan';
import { GameSortirKomputer } from './components/games/GameSortirKomputer';
import { GameTebakFungsi } from './components/games/GameTebakFungsi';
import { GameKeamananDigital } from './components/games/GameKeamananDigital';
import { FinalQuizView } from './components/FinalQuizView';
import { FinalResultView } from './components/FinalResultView';
import { BadgeIllustration } from './components/CartoonIllustrations';

export default function App() {
  const [progress, setProgress] = useState<StudentProgress>(() => loadProgress());
  const [route, setRoute] = useState<ViewRoute>('home');
  const [guideOpen, setGuideOpen] = useState(false);
  const [newBadgeId, setNewBadgeId] = useState<BadgeId | null>(null);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const navigate = (nextRoute: ViewRoute) => {
    setRoute(nextRoute);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const updateProgressWithBadgeCheck = (updater: (prev: StudentProgress) => StudentProgress) => {
    setProgress((prev) => {
      const prevBadges = getUnlockedBadges(prev);
      const next = updater(prev);
      const nextBadges = getUnlockedBadges(next);
      const newlyUnlocked = nextBadges.find((b) => !prevBadges.includes(b));
      if (newlyUnlocked) {
        setNewBadgeId(newlyUnlocked);
        playBadgeSound(next.soundEnabled);
      }
      return next;
    });
  };

  const handleStartAdventure = (name: string) => {
    setProgress((prev) => ({ ...prev, studentName: name }));
    navigate('map');
  };

  const handleToggleSound = () => {
    setProgress((prev) => {
      const nextSound = !prev.soundEnabled;
      if (nextSound) playClickSound(true);
      return { ...prev, soundEnabled: nextSound };
    });
  };

  const handleCompleteMaterial = (worldId: WorldId) => {
    updateProgressWithBadgeCheck((prev) => ({
      ...prev,
      completedMaterials: {
        ...prev.completedMaterials,
        [worldId]: true,
      },
    }));
  };

  const handleFinishGame = (
    gameId: GameId,
    correctCount: number,
    totalQuestions: number,
    pointsEarned: number
  ) => {
    updateProgressWithBadgeCheck((prev) => {
      const existing = prev.games[gameId];
      const nextCorrect = Math.max(existing.bestCorrect, correctCount);
      const nextPoints = Math.max(existing.bestPoints, pointsEarned);
      const nextStars = Math.max(existing.stars, computeGameStars(correctCount, totalQuestions, true));
      return {
        ...prev,
        games: {
          ...prev.games,
          [gameId]: {
            completed: true,
            bestCorrect: nextCorrect,
            bestPoints: nextPoints,
            totalQuestions,
            stars: nextStars,
          },
        },
      };
    });
  };

  const handleFinishQuiz = (
    correctCount: number,
    totalQuestions: number,
    pointsEarned: number
  ) => {
    updateProgressWithBadgeCheck((prev) => {
      const existing = prev.finalQuiz;
      return {
        ...prev,
        finalQuiz: {
          completed: true,
          bestCorrect: Math.max(existing.bestCorrect, correctCount),
          bestPoints: Math.max(existing.bestPoints, pointsEarned),
          totalQuestions,
          stars: Math.max(existing.stars, computeQuizStars(correctCount, totalQuestions, true)),
        },
      };
    });
  };

  const handleResetProgress = () => {
    const fresh = resetProgressStorage();
    setProgress(fresh);
    setNewBadgeId(null);
  };

  const unlockedBadgeInfo = newBadgeId ? BADGES.find((b) => b.id === newBadgeId) : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F8FF] text-slate-900">
      <TopBar
        currentRoute={route}
        onNavigate={navigate}
        onOpenGuide={() => setGuideOpen(true)}
        soundEnabled={progress.soundEnabled}
      />

      {route !== 'home' && (
        <ProgressStrip progress={progress} onToggleSound={handleToggleSound} />
      )}

      <div className="flex-1">
        {route === 'home' && (
          <HomeView
            studentName={progress.studentName}
            soundEnabled={progress.soundEnabled}
            onStartAdventure={handleStartAdventure}
            onOpenGuide={() => setGuideOpen(true)}
          />
        )}

        {route === 'map' && (
          <AdventureMapView
            progress={progress}
            onNavigate={navigate}
            onResetProgress={handleResetProgress}
          />
        )}

        {(route === 'world-1' || route === 'world-2' || route === 'world-3') && (
          <WorldLessonView
            key={route}
            worldId={route}
            isCompleted={progress.completedMaterials[route]}
            soundEnabled={progress.soundEnabled}
            onCompleteMaterial={handleCompleteMaterial}
            onNavigate={navigate}
          />
        )}

        {route === 'game-1' && (
          <GameDetektifTeknologi
            soundEnabled={progress.soundEnabled}
            onFinishGame={(c, t, p) => handleFinishGame('game-1', c, t, p)}
            onNavigate={navigate}
          />
        )}

        {route === 'game-2' && (
          <GameTeknologiAtauBukan
            soundEnabled={progress.soundEnabled}
            onFinishGame={(c, t, p) => handleFinishGame('game-2', c, t, p)}
            onNavigate={navigate}
          />
        )}

        {route === 'game-3' && (
          <GameSortirKomputer
            soundEnabled={progress.soundEnabled}
            onFinishGame={(c, t, p) => handleFinishGame('game-3', c, t, p)}
            onNavigate={navigate}
          />
        )}

        {route === 'game-4' && (
          <GameTebakFungsi
            soundEnabled={progress.soundEnabled}
            onFinishGame={(c, t, p) => handleFinishGame('game-4', c, t, p)}
            onNavigate={navigate}
          />
        )}

        {route === 'game-5' && (
          <GameKeamananDigital
            soundEnabled={progress.soundEnabled}
            onFinishGame={(c, t, p) => handleFinishGame('game-5', c, t, p)}
            onNavigate={navigate}
          />
        )}

        {route === 'final-quiz' && (
          <FinalQuizView
            soundEnabled={progress.soundEnabled}
            onFinishQuiz={handleFinishQuiz}
            onNavigate={navigate}
          />
        )}

        {route === 'final-result' && (
          <FinalResultView
            progress={progress}
            onNavigate={navigate}
            onResetProgress={handleResetProgress}
          />
        )}
      </div>

      {/* Badge Unlocked Celebration Toast */}
      {unlockedBadgeInfo && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-40 max-w-sm bg-white border-2 border-amber-400 rounded-3xl shadow-xl p-4 flex items-center gap-4 animate-pop-in"
        >
          <BadgeIllustration badgeId={unlockedBadgeInfo.id} unlocked className="w-16 h-16 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-amber-700 flex items-center gap-1">
              <Award className="w-4 h-4" aria-hidden="true" />
              <span>Lencana Baru Terbuka!</span>
            </p>
            <p className="font-display font-extrabold text-base text-slate-900 truncate">
              {unlockedBadgeInfo.title}
            </p>
            <p className="text-xs text-slate-600">{unlockedBadgeInfo.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={() => setNewBadgeId(null)}
            aria-label="Tutup pemberitahuan lencana"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <GuideModal isOpen={guideOpen} onClose={() => setGuideOpen(false)} />

      <footer className="border-t border-slate-200 bg-white mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p className="font-semibold text-slate-700">
            Petualangan Dunia Digital · Media Pembelajaran Informatika Kelas 4 SD
          </p>
          <p>Progres belajar tersimpan aman hanya di perangkat ini.</p>
        </div>
      </footer>
    </div>
  );
}
