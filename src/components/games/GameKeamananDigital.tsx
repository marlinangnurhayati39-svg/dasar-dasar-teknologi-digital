import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, Shield, Star, XCircle } from 'lucide-react';
import { GAME5_CHALLENGES } from '../../data/curriculum';
import { ViewRoute } from '../../types';
import { CartoonIllustration, DigiAvatar } from '../CartoonIllustrations';
import { playClickSound, playCorrectSound, playVictorySound, playWrongSound } from '../../utils/sound';

interface GameProps {
  soundEnabled: boolean;
  onFinishGame: (correctCount: number, totalQuestions: number, pointsEarned: number) => void;
  onNavigate: (route: ViewRoute) => void;
}

export const GameKeamananDigital: React.FC<GameProps> = ({
  soundEnabled,
  onFinishGame,
  onNavigate,
}) => {
  const [index, setIndex] = useState(0);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const total = GAME5_CHALLENGES.length;
  const current = GAME5_CHALLENGES[index];
  const isAnswered = selectedLabel !== null;
  const isCorrect = selectedLabel === current?.correctLabel;

  const handleChoose = (label: string) => {
    if (isAnswered) return;
    setSelectedLabel(label);
    if (label === current.correctLabel) {
      playCorrectSound(soundEnabled);
      setScore((prev) => prev + 10);
      setCorrectCount((prev) => prev + 1);
    } else {
      playWrongSound(soundEnabled);
    }
  };

  const handleNext = () => {
    playClickSound(soundEnabled);
    if (index + 1 < total) {
      setIndex((prev) => prev + 1);
      setSelectedLabel(null);
    } else {
      const finalScore = score + 20;
      setScore(finalScore);
      setFinished(true);
      playVictorySound(soundEnabled);
      onFinishGame(correctCount, total, finalScore);
    }
  };

  const handleReplay = () => {
    playClickSound(soundEnabled);
    setIndex(0);
    setSelectedLabel(null);
    setScore(0);
    setCorrectCount(0);
    setFinished(false);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => {
            playClickSound(soundEnabled);
            onNavigate('map');
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-800 font-bold text-sm rounded-xl border border-slate-200 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Kembali ke Peta</span>
        </button>

        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-amber-50 border border-amber-200 rounded-xl text-sm font-bold text-amber-900 font-mono tabular-nums">
            Skor: {score}
          </div>
          <button
            type="button"
            onClick={handleReplay}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-700 font-bold text-sm rounded-xl border border-slate-200 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>Ulangi Permainan</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
        {!finished ? (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <p className="text-xs font-bold text-emerald-700">
                  Dunia 3 · Game 5 · Tantangan {index + 1} dari {total}
                </p>
                <h1 className="font-display text-2xl font-extrabold text-slate-900 mt-0.5">
                  Misi Menyelamatkan Data Pribadi
                </h1>
              </div>
              <div className="w-40 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 transition-all duration-300"
                  style={{ width: `${((index + (isAnswered ? 1 : 0)) / total) * 100}%` }}
                />
              </div>
            </div>

            {/* Story Card */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5">
              <CartoonIllustration
                id={current.illustration}
                className="w-24 h-24 shrink-0 animate-gentle-float"
              />
              <div>
                <p className="text-xs font-bold text-emerald-800">{current.title}</p>
                <p className="font-display text-lg sm:text-xl font-bold text-slate-900 mt-1 leading-snug">
                  {current.story}
                </p>
              </div>
            </div>

            {/* Choices */}
            <div className="space-y-3">
              <p className="text-sm font-bold text-slate-700">
                Bantu DIGI memilih tindakan yang paling aman:
              </p>
              {current.options.map((opt) => {
                const isPicked = selectedLabel === opt.label;
                const isRightOpt = opt.label === current.correctLabel;
                let style =
                  'bg-slate-50 hover:bg-emerald-50 border-slate-200 hover:border-emerald-400 text-slate-900';

                if (isAnswered) {
                  if (isRightOpt) {
                    style = 'bg-emerald-50 border-emerald-500 text-emerald-950';
                  } else if (isPicked) {
                    style = 'bg-red-50 border-red-400 text-red-950';
                  } else {
                    style = 'bg-slate-50 border-slate-200 text-slate-400';
                  }
                }

                return (
                  <button
                    key={opt.label}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => handleChoose(opt.label)}
                    className={`w-full px-5 py-4 rounded-2xl border-2 font-semibold text-base text-left flex items-center justify-between gap-3 transition-all cursor-pointer disabled:cursor-default ${style}`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-mono font-bold text-sm text-slate-800 shrink-0">
                        {opt.label}
                      </span>
                      <span>{opt.text}</span>
                    </span>
                    {isAnswered && isRightOpt && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" aria-hidden="true" />
                    )}
                    {isAnswered && isPicked && !isRightOpt && (
                      <XCircle className="w-5 h-5 text-red-600 shrink-0" aria-hidden="true" />
                    )}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div
                className={`p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-pop-in ${
                  isCorrect
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-orange-50 border-orange-300 text-orange-950'
                }`}
              >
                <div className="flex items-start gap-3">
                  <DigiAvatar className="w-12 h-12 shrink-0" mood={isCorrect ? 'celebrate' : 'thinking'} />
                  <div>
                    <p className="font-display font-extrabold text-base">
                      {isCorrect ? 'Misi Berhasil! (+10 Poin)' : 'Hati-hati! Ini Tindakan yang Aman:'}
                    </p>
                    <p className="text-sm mt-0.5">{current.explanation}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>{index + 1 < total ? 'Tantangan Berikutnya' : 'Selesaikan Misi'}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-6 space-y-6 animate-pop-in">
            <DigiAvatar className="w-24 h-24 mx-auto" mood="celebrate" />
            <div>
              <p className="text-sm font-bold text-emerald-700">Game 5 Selesai · Bonus +20 Poin!</p>
              <h2 className="font-display text-3xl font-extrabold text-slate-900 mt-1">
                Misi Menyelamatkan Data Berhasil!
              </h2>
              <p className="text-slate-600 mt-2">
                Kamu menyelamatkan{' '}
                <strong className="font-mono tabular-nums text-slate-900">
                  {correctCount} dari {total}
                </strong>{' '}
                tantangan · Skor Misi:{' '}
                <strong className="font-mono tabular-nums text-emerald-700">{score} poin</strong>!
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 font-bold">
              <Star className="w-5 h-5 fill-amber-400 text-amber-500" aria-hidden="true" />
              <span>Bintang Permainan: {correctCount / total >= 0.7 ? '2 / 2 Bintang' : '1 / 2 Bintang'}</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleReplay}
                className="inline-flex items-center gap-2 px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                <span>Main Lagi</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  playClickSound(soundEnabled);
                  onNavigate('final-quiz');
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl cursor-pointer"
              >
                <Shield className="w-4 h-4" aria-hidden="true" />
                <span>Lanjut ke Kuis Petualangan Digital</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
