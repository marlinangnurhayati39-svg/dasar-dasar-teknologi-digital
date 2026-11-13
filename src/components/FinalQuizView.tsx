import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Award, CheckCircle2, RotateCcw, XCircle } from 'lucide-react';
import { FINAL_QUIZ_QUESTIONS } from '../data/curriculum';
import { ViewRoute } from '../types';
import { CartoonIllustration, DigiAvatar } from './CartoonIllustrations';
import { playClickSound, playCorrectSound, playVictorySound, playWrongSound } from '../utils/sound';

interface FinalQuizViewProps {
  soundEnabled: boolean;
  onFinishQuiz: (correctCount: number, totalQuestions: number, pointsEarned: number) => void;
  onNavigate: (route: ViewRoute) => void;
}

export const FinalQuizView: React.FC<FinalQuizViewProps> = ({
  soundEnabled,
  onFinishQuiz,
  onNavigate,
}) => {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const total = FINAL_QUIZ_QUESTIONS.length;
  const current = FINAL_QUIZ_QUESTIONS[index];
  const selected = answers[current.id] ?? null;
  const isAnswered = selected !== null;
  const isCorrect = selected === current.correctAnswer;
  const letters = ['A', 'B', 'C', 'D'];

  const handleChoose = (opt: string) => {
    if (isAnswered) return;
    setAnswers((prev) => ({ ...prev, [current.id]: opt }));
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
    } else {
      const finalScore = score + 20;
      playVictorySound(soundEnabled);
      onFinishQuiz(correctCount, total, finalScore);
      onNavigate('final-result');
    }
  };

  const handleResetQuiz = () => {
    playClickSound(soundEnabled);
    setIndex(0);
    setAnswers({});
    setScore(0);
    setCorrectCount(0);
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
          <div className="px-4 py-2 bg-blue-50 border border-blue-200 rounded-xl text-sm font-bold text-blue-900 font-mono tabular-nums">
            Skor Kuis: {score}
          </div>
          <button
            type="button"
            onClick={handleResetQuiz}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-700 font-bold text-sm rounded-xl border border-slate-200 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>Ulangi Kuis</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="pb-4 border-b border-slate-100">
          <p className="text-xs font-bold text-blue-700">
            Evaluasi Akhir · Topik: {current.category} · Soal {index + 1} dari {total}
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0.5">
            Kuis Petualangan Digital
          </h1>

          {/* 1-15 Question Number Indicator Strip */}
          <div className="flex flex-wrap gap-1.5 mt-4" aria-label="Indikator Nomor Soal">
            {FINAL_QUIZ_QUESTIONS.map((q, qIdx) => {
              const ans = answers[q.id];
              const answered = ans !== undefined;
              const right = ans === q.correctAnswer;
              let chipClass = 'bg-slate-100 text-slate-600 border-slate-200';
              if (qIdx === index) {
                chipClass = 'bg-blue-600 text-white border-blue-600';
              } else if (answered) {
                chipClass = right
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  : 'bg-orange-100 text-orange-800 border-orange-300';
              }
              return (
                <span
                  key={q.id}
                  className={`w-8 h-8 rounded-lg border font-mono text-xs font-bold flex items-center justify-center tabular-nums ${chipClass}`}
                >
                  {qIdx + 1}
                </span>
              );
            })}
          </div>
        </div>

        {/* Question Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-4 bg-sky-50 border border-sky-200 rounded-3xl p-6 flex items-center justify-center">
            <CartoonIllustration id={current.illustration} className="w-28 h-28" />
          </div>

          <div className="md:col-span-8 space-y-4">
            <h2 className="font-display text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
              {index + 1}. {current.question}
            </h2>

            <div className="space-y-2.5">
              {current.options.map((opt, idx) => {
                const isPicked = selected === opt;
                const isRightOpt = opt === current.correctAnswer;
                let style =
                  'bg-slate-50 hover:bg-blue-50 border-slate-200 hover:border-blue-400 text-slate-900';

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
                    onClick={() => handleChoose(opt)}
                    className={`w-full px-4 py-3.5 rounded-2xl border-2 font-semibold text-sm sm:text-base text-left flex items-center justify-between gap-3 transition-all cursor-pointer disabled:cursor-default ${style}`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-mono font-bold text-sm text-slate-800 shrink-0">
                        {letters[idx]}
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

        {/* Immediate Feedback + Pembahasan */}
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
                  {isCorrect ? 'Jawaban Benar! (+10 Poin)' : 'Pembahasan Jawaban:'}
                </p>
                <p className="text-sm mt-0.5">{current.explanation}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl cursor-pointer whitespace-nowrap shrink-0"
            >
              {index + 1 < total ? (
                <>
                  <span>Soal Berikutnya</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </>
              ) : (
                <>
                  <Award className="w-4 h-4" aria-hidden="true" />
                  <span>Lihat Halaman Hasil Akhir</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </main>
  );
};
