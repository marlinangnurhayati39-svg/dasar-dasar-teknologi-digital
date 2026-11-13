import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Gamepad2, GraduationCap, RotateCcw, Star, Trophy } from 'lucide-react';
import { GameId, StudentProgress, ViewRoute, WorldId } from '../types';
import { BADGES, WORLD_IMAGES } from '../data/curriculum';
import { BadgeIllustration, DigiAvatar } from './CartoonIllustrations';
import { calculateMetrics, isWorldCompleted } from '../utils/storage';
import { playClickSound } from '../utils/sound';

interface AdventureMapViewProps {
  progress: StudentProgress;
  onNavigate: (route: ViewRoute) => void;
  onResetProgress: () => void;
}

interface WorldCardConfig {
  id: WorldId;
  numberLabel: string;
  title: string;
  summary: string;
  image: string;
  accentBg: string;
  accentBorder: string;
  accentBtn: string;
  games: { id: GameId; title: string }[];
  badgeTitle: string;
}

const WORLDS: WorldCardConfig[] = [
  {
    id: 'world-1',
    numberLabel: 'Dunia 1',
    title: 'Mengenal Teknologi Digital',
    summary:
      'Kenali perangkat digital di sekitar kita, arti informasi, dan manfaat teknologi untuk belajar.',
    image: WORLD_IMAGES.world1,
    accentBg: 'bg-sky-50',
    accentBorder: 'border-sky-200',
    accentBtn: 'bg-blue-600 hover:bg-blue-700',
    games: [
      { id: 'game-1', title: 'Game 1: Detektif Teknologi' },
      { id: 'game-2', title: 'Game 2: Teknologi atau Bukan?' },
    ],
    badgeTitle: 'Detektif Teknologi',
  },
  {
    id: 'world-2',
    numberLabel: 'Dunia 2',
    title: 'Mengenal Sistem Komputer',
    summary:
      'Pelajari bagian komputer yang bisa disentuh (Hardware) dan program aplikasinya (Software).',
    image: WORLD_IMAGES.world2,
    accentBg: 'bg-purple-50',
    accentBorder: 'border-purple-200',
    accentBtn: 'bg-purple-600 hover:bg-purple-700',
    games: [
      { id: 'game-3', title: 'Game 3: Kelompokkan Perangkat' },
      { id: 'game-4', title: 'Game 4: Tebak Fungsi Perangkat' },
    ],
    badgeTitle: 'Ahli Komputer',
  },
  {
    id: 'world-3',
    numberLabel: 'Dunia 3',
    title: 'Pahlawan Keamanan Digital',
    summary:
      'Lindungi informasi pribadimu, kenali pesan mencurigakan, dan jadilah anak yang aman di internet.',
    image: WORLD_IMAGES.world3,
    accentBg: 'bg-emerald-50',
    accentBorder: 'border-emerald-200',
    accentBtn: 'bg-emerald-600 hover:bg-emerald-700',
    games: [{ id: 'game-5', title: 'Game 5: Detektif Keamanan Digital' }],
    badgeTitle: 'Pahlawan Keamanan Digital',
  },
];

export const AdventureMapView: React.FC<AdventureMapViewProps> = ({
  progress,
  onNavigate,
  onResetProgress,
}) => {
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const [confirmReset, setConfirmReset] = useState(false);

  const metrics = calculateMetrics(progress);
  const displayName = progress.studentName.trim() || 'Petualang Cilik';

  const handleGo = (route: ViewRoute) => {
    playClickSound(progress.soundEnabled);
    onNavigate(route);
  };

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-4">
          <DigiAvatar
            className="w-16 h-16 shrink-0"
            mood={metrics.isHero ? 'celebrate' : 'happy'}
          />
          <div>
            <p className="text-sm font-bold text-blue-700">
              Peta Petualangan · Halo, {displayName}!
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0.5">
              Pilih Dunia Belajarmu
            </h1>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              Selesaikan materi dan permainan di ketiga dunia, lalu taklukkan Kuis Akhir untuk
              menjadi <strong>PAHLAWAN DIGITAL</strong>!
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleGo('final-result')}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-sm rounded-xl border border-amber-300 transition-colors cursor-pointer whitespace-nowrap"
          >
            <Trophy className="w-4 h-4" aria-hidden="true" />
            <span>Lihat Hasil Akhir</span>
          </button>

          {!confirmReset ? (
            <button
              type="button"
              onClick={() => {
                playClickSound(progress.soundEnabled);
                setConfirmReset(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl border border-slate-200 transition-colors cursor-pointer whitespace-nowrap"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>Ulangi dari Awal</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-1.5">
              <span className="text-xs font-bold text-red-800">Hapus progres?</span>
              <button
                type="button"
                onClick={() => {
                  playClickSound(progress.soundEnabled);
                  setConfirmReset(false);
                  onResetProgress();
                }}
                className="px-2.5 py-1 bg-red-600 text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                Ya
              </button>
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                className="px-2.5 py-1 bg-white text-slate-700 text-xs font-bold rounded-lg border border-slate-200 cursor-pointer"
              >
                Batal
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 3 Worlds Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {WORLDS.map((world) => {
          const materialDone = progress.completedMaterials[world.id];
          const worldDone = isWorldCompleted(progress, world.id);
          const worldStars =
            (materialDone ? 1 : 0) +
            world.games.reduce((acc, g) => acc + progress.games[g.id].stars, 0);
          const worldMaxStars = 1 + world.games.length * 2;

          return (
            <article
              key={world.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col"
            >
              {/* Illustration */}
              <div className={`relative h-48 sm:h-52 ${world.accentBg} border-b ${world.accentBorder}`}>
                {!imgErrors[world.id] ? (
                  <img
                    src={world.image}
                    alt={`${world.numberLabel}: ${world.title}`}
                    referrerPolicy="no-referrer"
                    onError={() => setImgErrors((prev) => ({ ...prev, [world.id]: true }))}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
                    <DigiAvatar className="w-20 h-20" mood="happy" />
                    <span className="font-display font-bold text-slate-800 mt-2">{world.title}</span>
                  </div>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between gap-5">
                <div>
                  {/* Clean unboxed metadata */}
                  <div className="flex items-center justify-between gap-2 text-xs font-bold text-slate-500">
                    <span>
                      {world.numberLabel} · {world.games.length} Permainan
                    </span>
                    <span className="inline-flex items-center gap-1 text-amber-600 font-mono tabular-nums">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-500" aria-hidden="true" />
                      {worldStars}/{worldMaxStars}
                    </span>
                  </div>

                  <h2 className="font-display text-xl font-extrabold text-slate-900 mt-1.5">
                    {world.title}
                  </h2>
                  <p className="text-slate-600 text-sm leading-relaxed mt-2">{world.summary}</p>

                  {/* Completion Status */}
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-600">Status Dunia:</span>
                      {worldDone ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700">
                          <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                          Selesai · Lencana Diraih
                        </span>
                      ) : materialDone ? (
                        <span className="text-blue-700">Materi Selesai · Ayo Main Game</span>
                      ) : (
                        <span className="text-slate-500">Siap Dipelajari</span>
                      )}
                    </div>

                    {/* Quick Game Buttons */}
                    <div className="space-y-1.5 pt-1">
                      {world.games.map((g) => {
                        const gameRec = progress.games[g.id];
                        return (
                          <button
                            key={g.id}
                            type="button"
                            onClick={() => handleGo(g.id)}
                            className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left text-xs font-bold text-slate-800 transition-colors cursor-pointer"
                          >
                            <span className="inline-flex items-center gap-2 truncate">
                              <Gamepad2 className="w-4 h-4 text-blue-600 shrink-0" aria-hidden="true" />
                              <span className="truncate">{g.title}</span>
                            </span>
                            <span className="font-mono tabular-nums shrink-0 text-slate-600">
                              {gameRec.completed ? `${gameRec.bestCorrect}/${gameRec.totalQuestions} ✓` : 'Mainkan'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleGo(world.id)}
                  className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-white font-display font-extrabold text-base rounded-2xl transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap ${world.accentBtn}`}
                >
                  <span>{materialDone ? 'PELAJARI LAGI' : 'MULAI BELAJAR'}</span>
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Final Quiz + Badges Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Final Quiz Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between gap-5 shadow-md">
          <div>
            <p className="text-xs font-bold text-blue-100">
              Evaluasi Akhir · 15 Soal Pilihan Ganda
            </p>
            <h2 className="font-display text-2xl font-extrabold mt-1">
              Kuis Petualangan Digital
            </h2>
            <p className="text-blue-100 text-sm leading-relaxed mt-2">
              Uji kemampuanmu tentang Teknologi Digital, Hardware &amp; Software, serta Keamanan
              Informasi Pribadi untuk meraih gelar Pahlawan Digital!
            </p>
          </div>

          <div className="bg-white/15 rounded-2xl p-4 flex items-center justify-between text-sm font-bold">
            <span>Status Kuis</span>
            <span className="font-mono tabular-nums">
              {progress.finalQuiz.completed
                ? `Selesai (${progress.finalQuiz.bestCorrect}/15 Benar)`
                : 'Belum Dikerjakan'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => handleGo('final-quiz')}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-display font-extrabold text-base rounded-2xl transition-colors cursor-pointer whitespace-nowrap"
          >
            <GraduationCap className="w-5 h-5" aria-hidden="true" />
            <span>{progress.finalQuiz.completed ? 'ULANGI KUIS AKHIR' : 'MULAI KUIS AKHIR'}</span>
          </button>
        </div>

        {/* Badges Showcase */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-slate-500">
              Koleksi Penghargaan · {metrics.unlockedBadges.length} dari 3 Lencana Diraih
            </p>
            <h2 className="font-display text-2xl font-extrabold text-slate-900 mt-1">
              Lencana Petualanganmu
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {BADGES.map((badge) => {
              const unlocked = metrics.unlockedBadges.includes(badge.id);
              return (
                <div
                  key={badge.id}
                  className={`p-4 rounded-2xl border text-center flex flex-col items-center gap-2 transition-colors ${
                    unlocked
                      ? 'bg-amber-50/70 border-amber-300'
                      : 'bg-slate-50 border-slate-200 opacity-75'
                  }`}
                >
                  <BadgeIllustration badgeId={badge.id} unlocked={unlocked} className="w-20 h-20" />
                  <h3 className="font-display font-bold text-sm text-slate-900">{badge.title}</h3>
                  <p className="text-xs text-slate-600 leading-snug">{badge.subtitle}</p>
                  <span
                    className={`text-xs font-bold mt-auto ${
                      unlocked ? 'text-emerald-700' : 'text-slate-500'
                    }`}
                  >
                    {unlocked ? 'Sudah Diraih ✓' : 'Belum Terbuka'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};
