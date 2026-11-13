import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, Star, XCircle } from 'lucide-react';
import { GAME2_QUESTIONS } from '../../data/curriculum';
import { ViewRoute } from '../../types';
import { CartoonIllustration, DigiAvatar } from '../CartoonIllustrations';
import { playClickSound, playCorrectSound, playVictorySound, playWrongSound } from '../../utils/sound';

interface GameProps {
  soundEnabled: boolean;
  onFinishGame: (correctCount: number, totalQuestions: number, pointsEarned: number) => void;
  onNavigate: (route: ViewRoute) => void;
}

export const GameTeknologiAtauBukan: React.FC<GameProps> = ({
  soundEnabled,
  onFinishGame,
  onNavigate,
}) => {
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const total = GAME2_QUESTIONS.length;
  const current = GAME2_QUESTIONS[index];
  const isAnswered = choice !== null;
  const isCorrect = choice === current?.isDigital;

  const handleAnswer = (pickDigital: boolean) => {
    if (isAnswered) return;
    setChoice(pickDigital);
    if (pickDigital === current.isDigital) {
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
      setChoice(null);
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
    setChoice(null);
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
                <p className="text-xs font-bold text-blue-700">
                  Dunia 1 · Game 2 · Benda {index + 1} dari {total}
                </p>
                <h1 className="font-display text-2xl font-extrabold text-slate-900 mt-0.5">
                  Teknologi Digital atau Bukan?
                </h1>
              </div>
              <div className="w-40 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500 transition-all duration-300"
                  style={{ width: `${((index + (isAnswered ? 1 : 0)) / total) * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-gradient-to-b from-sky-50 to-white border border-sky-200 rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center gap-4">
              <CartoonIllustration
                id={current.illustration}
                className="w-36 h-36 animate-gentle-float"
              />
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {current.name}
                </h2>
                <p className="text-slate-600 text-sm sm:text-base mt-1">
                  Apakah benda ini termasuk <strong>teknologi digital</strong>?
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg pt-2">
                <button
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleAnswer(true)}
                  className={`px-6 py-4 rounded-2xl border-2 font-display font-extrabold text-base flex items-center justify-center gap-2 transition-all cursor-pointer disabled:cursor-default ${
                    isAnswered && current.isDigital
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                      : isAnswered && choice === true && !current.isDigital
                        ? 'bg-red-50 border-red-400 text-red-900'
                        : 'bg-blue-600 hover:bg-blue-700 border-blue-600 text-white'
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                  <span>Ya, Teknologi Digital</span>
                </button>

                <button
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleAnswer(false)}
                  className={`px-6 py-4 rounded-2xl border-2 font-display font-extrabold text-base flex items-center justify-center gap-2 transition-all cursor-pointer disabled:cursor-default ${
                    isAnswered && !current.isDigital
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                      : isAnswered && choice === false && current.isDigital
                        ? 'bg-red-50 border-red-400 text-red-900'
                        : 'bg-orange-500 hover:bg-orange-600 border-orange-500 text-white'
                  }`}
                >
                  <XCircle className="w-5 h-5" aria-hidden="true" />
                  <span>Bukan Teknologi Digital</span>
                </button>
              </div>
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
                      {isCorrect ? 'Benar Sekali! (+10 Poin)' : 'Yuk, Perhatikan Penjelasannya!'}
                    </p>
                    <p className="text-sm mt-0.5">{current.explanation}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>{index + 1 < total ? 'Benda Berikutnya' : 'Lihat Hasil Game'}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-6 space-y-6 animate-pop-in">
            <DigiAvatar className="w-24 h-24 mx-auto" mood="celebrate" />
            <div>
              <p className="text-sm font-bold text-emerald-700">Game 2 Selesai · Bonus +20 Poin!</p>
              <h2 className="font-display text-3xl font-extrabold text-slate-900 mt-1">
                Luar Biasa! Dunia 1 Tuntas!
              </h2>
              <p className="text-slate-600 mt-2">
                Skor jawaban benarmu:{' '}
                <strong className="font-mono tabular-nums text-slate-900">
                  {correctCount} dari {total}
                </strong>{' '}
                benda · Total Skor Game:{' '}
                <strong className="font-mono tabular-nums text-blue-700">{score} poin</strong>!
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
                  onNavigate('world-2');
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-extrabold rounded-xl cursor-pointer"
              >
                <span>Lanjut ke Dunia 2: Sistem Komputer</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
