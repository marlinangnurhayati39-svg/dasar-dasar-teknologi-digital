import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, Star, XCircle } from 'lucide-react';
import { GAME4_QUESTIONS } from '../../data/curriculum';
import { ViewRoute } from '../../types';
import { CartoonIllustration, DigiAvatar } from '../CartoonIllustrations';
import { playClickSound, playCorrectSound, playVictorySound, playWrongSound } from '../../utils/sound';

interface GameProps {
  soundEnabled: boolean;
  onFinishGame: (correctCount: number, totalQuestions: number, pointsEarned: number) => void;
  onNavigate: (route: ViewRoute) => void;
}

export const GameTebakFungsi: React.FC<GameProps> = ({
  soundEnabled,
  onFinishGame,
  onNavigate,
}) => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const total = GAME4_QUESTIONS.length;
  const current = GAME4_QUESTIONS[index];
  const isAnswered = selected !== null;
  const isCorrect = selected === current?.correctAnswer;

  const optionLetters = ['A', 'B', 'C', 'D'];

  const handleSelect = (opt: string) => {
    if (isAnswered) return;
    setSelected(opt);
    if (opt === current.correctAnswer) {
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
      setSelected(null);
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
    setSelected(null);
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
                <p className="text-xs font-bold text-purple-700">
                  Dunia 2 · Game 4 · Pertanyaan {index + 1} dari {total}
                </p>
                <h1 className="font-display text-2xl font-extrabold text-slate-900 mt-0.5">
                  Tebak Fungsi Perangkat
                </h1>
              </div>
              <div className="w-40 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-600 transition-all duration-300"
                  style={{ width: `${((index + (isAnswered ? 1 : 0)) / total) * 100}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-4 bg-purple-50 border border-purple-200 rounded-3xl p-6 flex items-center justify-center">
                <CartoonIllustration
                  id={current.illustration}
                  className="w-32 h-32 animate-gentle-float"
                />
              </div>

              <div className="md:col-span-8 space-y-4">
                <h2 className="font-display text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                  {current.question}
                </h2>

                <div className="space-y-3">
                  {current.options.map((opt, idx) => {
                    const isPicked = selected === opt;
                    const isRightOpt = opt === current.correctAnswer;
                    let style =
                      'bg-slate-50 hover:bg-purple-50 border-slate-200 hover:border-purple-400 text-slate-900';

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
                        key={opt}
                        type="button"
                        disabled={isAnswered}
                        onClick={() => handleSelect(opt)}
                        className={`w-full px-5 py-4 rounded-2xl border-2 font-display font-bold text-base text-left flex items-center justify-between gap-3 transition-all cursor-pointer disabled:cursor-default ${style}`}
                      >
                        <span className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-sm font-mono font-bold text-slate-700 shrink-0">
                            {optionLetters[idx]}
                          </span>
                          <span>{opt}</span>
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
                      {isCorrect ? 'Tepat Sekali! (+10 Poin)' : 'Belum Tepat, Yuk Simak Jawabannya!'}
                    </p>
                    <p className="text-sm mt-0.5">{current.explanation}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm rounded-xl cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>{index + 1 < total ? 'Soal Berikutnya' : 'Lihat Hasil Game'}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-6 space-y-6 animate-pop-in">
            <DigiAvatar className="w-24 h-24 mx-auto" mood="celebrate" />
            <div>
              <p className="text-sm font-bold text-emerald-700">Game 4 Selesai · Bonus +20 Poin!</p>
              <h2 className="font-display text-3xl font-extrabold text-slate-900 mt-1">
                Selamat, Ahli Komputer!
              </h2>
              <p className="text-slate-600 mt-2">
                Kamu menjawab benar{' '}
                <strong className="font-mono tabular-nums text-slate-900">
                  {correctCount} dari {total}
                </strong>{' '}
                pertanyaan · Skor Game:{' '}
                <strong className="font-mono tabular-nums text-purple-700">{score} poin</strong>!
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
                  onNavigate('world-3');
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl cursor-pointer"
              >
                <span>Lanjut ke Dunia 3: Keamanan Digital</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
