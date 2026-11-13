import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, GraduationCap, RotateCcw, Star, Trophy } from 'lucide-react';
import { BADGES, WORLD_IMAGES } from '../data/curriculum';
import { StudentProgress, ViewRoute } from '../types';
import { calculateMetrics } from '../utils/storage';
import { BadgeIllustration, DigiAvatar } from './CartoonIllustrations';
import { playClickSound } from '../utils/sound';

interface FinalResultViewProps {
  progress: StudentProgress;
  onNavigate: (route: ViewRoute) => void;
  onResetProgress: () => void;
}

export const FinalResultView: React.FC<FinalResultViewProps> = ({
  progress,
  onNavigate,
  onResetProgress,
}) => {
  const [imgError, setImgError] = useState(false);
  const metrics = calculateMetrics(progress);
  const displayName = progress.studentName.trim() || 'Petualang Cilik';
  const quizPercent = Math.round((progress.finalQuiz.bestCorrect / 15) * 100);

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => {
            playClickSound(progress.soundEnabled);
            onNavigate('map');
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-800 font-bold text-sm rounded-xl border border-slate-200 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Kembali ke Peta Petualangan</span>
        </button>

        <button
          type="button"
          onClick={() => {
            playClickSound(progress.soundEnabled);
            onNavigate('final-quiz');
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl cursor-pointer"
        >
          <GraduationCap className="w-4 h-4" aria-hidden="true" />
          <span>Ulangi Kuis Akhir</span>
        </button>
      </div>

      {/* Hero Trophy Celebration Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5">
            <div className="aspect-square rounded-3xl overflow-hidden border border-amber-200 bg-gradient-to-br from-sky-100 to-amber-50 flex items-center justify-center">
              {!imgError ? (
                <img
                  src={WORLD_IMAGES.trophy}
                  alt="DIGI memegang piala bintang emas untuk Pahlawan Digital"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <DigiAvatar className="w-36 h-36" mood="celebrate" />
              )}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <div>
              <p className="text-sm font-bold text-emerald-700">
                Rapor Petualangan · {displayName}
              </p>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">
                {metrics.isHero ? 'HEBAT SEKALI! PAHLAWAN DIGITAL!' : 'HEBAT SEKALI! TERUS SEMANGAT!'}
              </h1>
            </div>

            <div className="p-5 rounded-2xl bg-sky-50 border border-sky-200 text-slate-800 text-base leading-relaxed space-y-2">
              <p className="font-bold text-blue-900">
                Selamat, {displayName}!
              </p>
              <p>
                Kamu telah menjelajahi <strong>Petualangan Dunia Digital</strong>. Sekarang kamu sudah
                mengenal teknologi digital, memahami sistem komputer, dan mengetahui cara menjaga
                informasi pribadi.
              </p>
              <p className="font-display font-extrabold text-orange-600 text-lg">
                {metrics.isHero
                  ? 'Kamu resmi menjadi PAHLAWAN DIGITAL!'
                  : 'Selesaikan semua dunia & kuis akhir untuk membuka gelar PAHLAWAN DIGITAL!'}
              </p>
            </div>

            {/* Summary KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                <p className="text-xs font-bold text-amber-800">Total Skor</p>
                <p className="font-mono text-2xl font-extrabold text-slate-900 tabular-nums mt-1">
                  {metrics.totalPoints}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200">
                <p className="text-xs font-bold text-blue-800">Jawaban Benar</p>
                <p className="font-mono text-2xl font-extrabold text-slate-900 tabular-nums mt-1">
                  {metrics.totalCorrectAnswers}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200">
                <p className="text-xs font-bold text-purple-800">Bintang</p>
                <p className="font-mono text-2xl font-extrabold text-slate-900 tabular-nums mt-1">
                  {metrics.totalStars}/{metrics.maxStars}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <p className="text-xs font-bold text-emerald-800">Nilai Kuis Akhir</p>
                <p className="font-mono text-2xl font-extrabold text-slate-900 tabular-nums mt-1">
                  {progress.finalQuiz.completed ? `${quizPercent}%` : '0%'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Earned Badges Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-extrabold text-slate-900">
              Lencana &amp; Pencapaianmu
            </h2>
            <p className="text-sm text-slate-600">
              {metrics.unlockedBadges.length} dari 3 lencana dunia berhasil kamu raih
            </p>
          </div>
          <div className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 font-mono tabular-nums">
            <Trophy className="w-5 h-5 text-amber-500" aria-hidden="true" />
            <span>Penyelesaian: {metrics.completionPercent}%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {BADGES.map((badge) => {
            const unlocked = metrics.unlockedBadges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`p-5 rounded-2xl border flex items-center gap-4 ${
                  unlocked
                    ? 'bg-amber-50/70 border-amber-300'
                    : 'bg-slate-50 border-slate-200 opacity-75'
                }`}
              >
                <BadgeIllustration badgeId={badge.id} unlocked={unlocked} className="w-16 h-16 shrink-0" />
                <div>
                  <h3 className="font-display font-extrabold text-base text-slate-900">
                    {badge.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">{badge.subtitle}</p>
                  <div className="mt-2 inline-flex items-center gap-1 text-xs font-bold">
                    {unlocked ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                        <span className="text-emerald-700">Lencana Terbuka</span>
                      </>
                    ) : (
                      <>
                        <Star className="w-4 h-4 text-slate-400" aria-hidden="true" />
                        <span className="text-slate-500">Selesaikan dunia untuk membuka</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              playClickSound(progress.soundEnabled);
              onNavigate('map');
            }}
            className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl cursor-pointer"
          >
            Jelajahi Peta Dunia
          </button>

          <button
            type="button"
            onClick={() => {
              playClickSound(progress.soundEnabled);
              onResetProgress();
              onNavigate('home');
            }}
            className="inline-flex items-center gap-2 px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>Mulai Petualangan Baru</span>
          </button>
        </div>
      </div>
    </main>
  );
};
