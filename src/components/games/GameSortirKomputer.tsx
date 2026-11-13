import React, { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Cpu, AppWindow, RotateCcw, Star, XCircle } from 'lucide-react';
import { ComputerItem, GAME3_SORT_ITEMS } from '../../data/curriculum';
import { ViewRoute } from '../../types';
import { CartoonIllustration, DigiAvatar } from '../CartoonIllustrations';
import { playClickSound, playCorrectSound, playVictorySound, playWrongSound } from '../../utils/sound';

interface GameProps {
  soundEnabled: boolean;
  onFinishGame: (correctCount: number, totalQuestions: number, pointsEarned: number) => void;
  onNavigate: (route: ViewRoute) => void;
}

function shuffleItems(items: ComputerItem[]): ComputerItem[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const GameSortirKomputer: React.FC<GameProps> = ({
  soundEnabled,
  onFinishGame,
  onNavigate,
}) => {
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const deck = useMemo(() => shuffleItems(GAME3_SORT_ITEMS), [shuffleSeed]);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [placedHardware, setPlacedHardware] = useState<ComputerItem[]>([]);
  const [placedSoftware, setPlacedSoftware] = useState<ComputerItem[]>([]);
  const [attemptedWrongIds, setAttemptedWrongIds] = useState<Record<string, boolean>>({});
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    itemName: string;
    message: string;
  } | null>(null);
  const [score, setScore] = useState(0);
  const [cleanCorrectCount, setCleanCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const placedIds = new Set([
    ...placedHardware.map((i) => i.id),
    ...placedSoftware.map((i) => i.id),
  ]);
  const remainingItems = deck.filter((item) => !placedIds.has(item.id));
  const total = deck.length;

  const placeItemIntoBox = (itemId: string, targetBox: 'hardware' | 'software') => {
    const item = deck.find((i) => i.id === itemId);
    if (!item || placedIds.has(item.id)) return;

    if (item.category === targetBox) {
      playCorrectSound(soundEnabled);
      const hadWrongAttempt = !!attemptedWrongIds[item.id];
      const nextScore = score + (hadWrongAttempt ? 5 : 10);
      const nextCleanCorrect = cleanCorrectCount + (hadWrongAttempt ? 0 : 1);

      if (targetBox === 'hardware') {
        setPlacedHardware((prev) => [...prev, item]);
      } else {
        setPlacedSoftware((prev) => [...prev, item]);
      }

      setScore(nextScore);
      setCleanCorrectCount(nextCleanCorrect);
      setSelectedId(null);
      setFeedback({
        correct: true,
        itemName: item.name,
        message: `Benar! ${item.name} adalah ${targetBox === 'hardware' ? 'Hardware (bisa disentuh)' : 'Software (program komputer)'}. ${item.shortFunction}`,
      });

      const willComplete = placedIds.size + 1 === total;
      if (willComplete) {
        const finalTotal = nextScore + 20;
        setScore(finalTotal);
        setFinished(true);
        playVictorySound(soundEnabled);
        onFinishGame(nextCleanCorrect, total, finalTotal);
      }
    } else {
      playWrongSound(soundEnabled);
      setAttemptedWrongIds((prev) => ({ ...prev, [item.id]: true }));
      setFeedback({
        correct: false,
        itemName: item.name,
        message: `Ups! ${item.name} bukan ${targetBox === 'hardware' ? 'Hardware' : 'Software'}. Petunjuk: ${item.shortFunction}`,
      });
    }
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
    setSelectedId(id);
  };

  const handleDrop = (e: React.DragEvent, targetBox: 'hardware' | 'software') => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain') || selectedId;
    if (id) {
      placeItemIntoBox(id, targetBox);
    }
  };

  const handleReplay = () => {
    playClickSound(soundEnabled);
    setShuffleSeed((s) => s + 1);
    setSelectedId(null);
    setPlacedHardware([]);
    setPlacedSoftware([]);
    setAttemptedWrongIds({});
    setFeedback(null);
    setScore(0);
    setCleanCorrectCount(0);
    setFinished(false);
  };

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
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

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <p className="text-xs font-bold text-purple-700">
              Dunia 2 · Game 3 · {placedIds.size} dari {total} Perangkat Dikelompokkan
            </p>
            <h1 className="font-display text-2xl font-extrabold text-slate-900 mt-0.5">
              Kelompokkan Perangkat Komputer
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Seret gambar ke kotak yang sesuai, atau <strong>klik satu objek</strong> lalu{' '}
              <strong>klik kotak Hardware / Software</strong>!
            </p>
          </div>
        </div>

        {!finished ? (
          <>
            {/* Feedback Banner */}
            {feedback && (
              <div
                className={`p-4 rounded-2xl border flex items-center gap-3 animate-pop-in ${
                  feedback.correct
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-orange-50 border-orange-300 text-orange-950'
                }`}
              >
                {feedback.correct ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" aria-hidden="true" />
                ) : (
                  <XCircle className="w-6 h-6 text-orange-600 shrink-0" aria-hidden="true" />
                )}
                <p className="text-sm font-semibold">{feedback.message}</p>
              </div>
            )}

            {/* Remaining Objects Pool */}
            <div>
              <p className="text-xs font-bold text-slate-500 mb-3">
                Objek yang Perlu Dikelompokkan ({remainingItems.length} tersisa):
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {remainingItems.map((item) => {
                  const isSelected = selectedId === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      draggable
                      onDragStart={(e) => handleDragStart(e, item.id)}
                      onClick={() => {
                        playClickSound(soundEnabled);
                        setSelectedId(isSelected ? null : item.id);
                      }}
                      className={`p-3 rounded-2xl border-2 flex flex-col items-center text-center gap-2 transition-all cursor-grab active:cursor-grabbing ${
                        isSelected
                          ? 'bg-blue-50 border-blue-600 ring-2 ring-blue-200 -translate-y-0.5'
                          : 'bg-slate-50 hover:bg-white border-slate-200 hover:border-blue-300'
                      }`}
                    >
                      <CartoonIllustration id={item.illustration} className="w-14 h-14" />
                      <span className="font-display font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                        {item.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2 Drop Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              {/* KOTAK 1: HARDWARE */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, 'hardware')}
                onClick={() => selectedId && placeItemIntoBox(selectedId, 'hardware')}
                className={`p-5 rounded-3xl border-2 border-dashed transition-colors min-h-[220px] flex flex-col gap-4 ${
                  selectedId
                    ? 'bg-sky-50 border-blue-500 cursor-pointer hover:bg-sky-100/80'
                    : 'bg-sky-50/50 border-sky-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                      <Cpu className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 className="font-display font-extrabold text-lg text-blue-950">
                        KOTAK 1: HARDWARE
                      </h2>
                      <p className="text-xs text-blue-800">Bagian fisik yang dapat disentuh</p>
                    </div>
                  </div>
                  {selectedId && (
                    <span className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg">
                      Taruh di Sini
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {placedHardware.map((item) => (
                    <div
                      key={item.id}
                      className="p-2.5 rounded-xl bg-white border border-blue-200 flex items-center gap-2 animate-pop-in"
                    >
                      <CartoonIllustration id={item.illustration} className="w-8 h-8 shrink-0" />
                      <span className="text-xs font-bold text-slate-800 truncate">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* KOTAK 2: SOFTWARE */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, 'software')}
                onClick={() => selectedId && placeItemIntoBox(selectedId, 'software')}
                className={`p-5 rounded-3xl border-2 border-dashed transition-colors min-h-[220px] flex flex-col gap-4 ${
                  selectedId
                    ? 'bg-purple-50 border-purple-500 cursor-pointer hover:bg-purple-100/80'
                    : 'bg-purple-50/50 border-purple-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center">
                      <AppWindow className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 className="font-display font-extrabold text-lg text-purple-950">
                        KOTAK 2: SOFTWARE
                      </h2>
                      <p className="text-xs text-purple-800">Program atau aplikasi komputer</p>
                    </div>
                  </div>
                  {selectedId && (
                    <span className="px-3 py-1.5 bg-purple-600 text-white text-xs font-bold rounded-lg">
                      Taruh di Sini
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {placedSoftware.map((item) => (
                    <div
                      key={item.id}
                      className="p-2.5 rounded-xl bg-white border border-purple-200 flex items-center gap-2 animate-pop-in"
                    >
                      <CartoonIllustration id={item.illustration} className="w-8 h-8 shrink-0" />
                      <span className="text-xs font-bold text-slate-800 truncate">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-6 space-y-6 animate-pop-in">
            <DigiAvatar className="w-24 h-24 mx-auto" mood="celebrate" />
            <div>
              <p className="text-sm font-bold text-emerald-700">Game 3 Selesai · Bonus +20 Poin!</p>
              <h2 className="font-display text-3xl font-extrabold text-slate-900 mt-1">
                Hebat! Kamu Sudah Bisa Membedakan Hardware &amp; Software!
              </h2>
              <p className="text-slate-600 mt-2">
                Kamu mengelompokkan tepat di percobaan pertama sebanyak{' '}
                <strong className="font-mono tabular-nums text-slate-900">
                  {cleanCorrectCount} dari {total}
                </strong>{' '}
                perangkat · Skor Game:{' '}
                <strong className="font-mono tabular-nums text-purple-700">{score} poin</strong>!
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 font-bold">
              <Star className="w-5 h-5 fill-amber-400 text-amber-500" aria-hidden="true" />
              <span>
                Bintang Permainan: {cleanCorrectCount / total >= 0.7 ? '2 / 2 Bintang' : '1 / 2 Bintang'}
              </span>
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
                  onNavigate('game-4');
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-extrabold rounded-xl cursor-pointer"
              >
                <span>Lanjut ke Game 4: Tebak Fungsi Perangkat</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
