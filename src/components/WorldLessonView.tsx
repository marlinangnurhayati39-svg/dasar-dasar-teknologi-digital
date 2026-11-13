import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Gamepad2, ShieldAlert, ShieldCheck, Sparkles } from 'lucide-react';
import { GameId, ViewRoute, WorldId } from '../types';
import {
  HARDWARE_ITEMS,
  PERSONAL_INFO_ITEMS,
  SAFETY_REASONS,
  SAFETY_RULES,
  SAFETY_SITUATIONS,
  SOFTWARE_ITEMS,
  WORLD1_BENEFITS,
  WORLD1_DEVICES,
  WORLD1_INFO_EXAMPLES,
} from '../data/curriculum';
import { CartoonIllustration, DigiAvatar } from './CartoonIllustrations';
import { playClickSound, playCorrectSound } from '../utils/sound';

interface WorldLessonViewProps {
  worldId: WorldId;
  isCompleted: boolean;
  soundEnabled: boolean;
  onCompleteMaterial: (worldId: WorldId) => void;
  onNavigate: (route: ViewRoute) => void;
}

export const WorldLessonView: React.FC<WorldLessonViewProps> = ({
  worldId,
  isCompleted,
  soundEnabled,
  onCompleteMaterial,
  onNavigate,
}) => {
  const [step, setStep] = useState(0);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [hwSwMode, setHwSwMode] = useState<'hardware' | 'software'>('hardware');
  const [revealedSituations, setRevealedSituations] = useState<Record<string, boolean>>({});

  const worldMeta: Record<
    WorldId,
    {
      title: string;
      tabs: string[];
      firstGame: GameId;
      firstGameLabel: string;
      secondGame?: { id: GameId; label: string };
      digiTip: string;
    }
  > = {
    'world-1': {
      title: 'Dunia 1: Mengenal Teknologi Digital',
      tabs: ['A. Teknologi Digital', 'B. Apa Itu Informasi?', 'C. Manfaat Teknologi'],
      firstGame: 'game-1',
      firstGameLabel: 'Main Game 1: Detektif Teknologi',
      secondGame: { id: 'game-2', label: 'Main Game 2: Teknologi atau Bukan?' },
      digiTip: 'Klik setiap gambar perangkat atau informasi untuk melihat penjelasannya ya!',
    },
    'world-2': {
      title: 'Dunia 2: Mengenal Sistem Komputer',
      tabs: [
        'A. Sistem Komputer',
        'B. Perangkat Keras (Hardware)',
        'C. Perangkat Lunak (Software)',
        'D. Perbedaan & Kerja Sama',
      ],
      firstGame: 'game-3',
      firstGameLabel: 'Main Game 3: Kelompokkan Perangkat',
      secondGame: { id: 'game-4', label: 'Main Game 4: Tebak Fungsi Perangkat' },
      digiTip: 'Ingat ya: Hardware bisa disentuh tangan, sedangkan Software adalah program di dalam layar!',
    },
    'world-3': {
      title: 'Dunia 3: Pahlawan Keamanan Digital',
      tabs: [
        'A. Informasi Pribadi',
        'B. Mengapa Harus Dijaga?',
        'C. Cara Melindungi Data',
        'D. Aman vs Tidak Aman',
      ],
      firstGame: 'game-5',
      firstGameLabel: 'Main Game 5: Detektif Keamanan Digital',
      digiTip: 'Jadilah anak hebat! Jangan pernah bagikan kata sandi atau alamat rumah kepada orang asing.',
    },
  };

  const meta = worldMeta[worldId];
  const totalSteps = meta.tabs.length;

  const handleSelectTab = (idx: number) => {
    playClickSound(soundEnabled);
    setStep(idx);
    setSelectedCardId(null);
  };

  const handleFinishAndPlay = () => {
    playCorrectSound(soundEnabled);
    onCompleteMaterial(worldId);
    onNavigate(meta.firstGame);
  };

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header & Back to Map */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => {
            playClickSound(soundEnabled);
            onNavigate('map');
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-800 font-bold text-sm rounded-xl border border-slate-200 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Kembali ke Peta</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              playClickSound(soundEnabled);
              onNavigate(meta.firstGame);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-sm rounded-xl border border-amber-300 transition-colors cursor-pointer"
          >
            <Gamepad2 className="w-4 h-4" aria-hidden="true" />
            <span>{meta.firstGameLabel}</span>
          </button>
          {meta.secondGame && (
            <button
              type="button"
              onClick={() => {
                playClickSound(soundEnabled);
                onNavigate(meta.secondGame!.id);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-purple-100 hover:bg-purple-200 text-purple-950 font-bold text-sm rounded-xl border border-purple-300 transition-colors cursor-pointer"
            >
              <Gamepad2 className="w-4 h-4" aria-hidden="true" />
              <span>{meta.secondGame.label}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Lesson Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <p className="text-xs font-bold text-blue-700">
              Materi Pembelajaran · Bagian {step + 1} dari {totalSteps}
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              {meta.title}
            </h1>
          </div>
          {isCompleted && (
            <div className="inline-flex items-center gap-2 text-emerald-700 font-bold text-sm shrink-0">
              <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
              <span>Materi Sudah Dipelajari</span>
            </div>
          )}
        </div>

        {/* DIGI Guide Tip */}
        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 flex items-center gap-4">
          <DigiAvatar className="w-14 h-14 shrink-0" mood="happy" />
          <p className="text-sm sm:text-base font-medium text-slate-800">{meta.digiTip}</p>
        </div>

        {/* Interactive Section Tabs */}
        <div className="flex flex-wrap gap-2 bg-slate-100 p-1.5 rounded-2xl">
          {meta.tabs.map((tabLabel, idx) => (
            <button
              key={tabLabel}
              type="button"
              onClick={() => handleSelectTab(idx)}
              className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                step === idx
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tabLabel}
            </button>
          ))}
        </div>

        {/* ==================== DUNIA 1 CONTENT ==================== */}
        {worldId === 'world-1' && step === 0 && (
          <div className="space-y-6 animate-pop-in">
            <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200">
              <h2 className="font-display text-xl font-extrabold text-slate-900">
                Apa Itu Teknologi Digital?
              </h2>
              <p className="text-slate-700 text-base sm:text-lg leading-relaxed mt-2">
                <strong>Teknologi digital</strong> adalah teknologi yang membantu manusia{' '}
                <strong>membuat, menyimpan, mengolah, dan menyampaikan informasi</strong> menggunakan
                perangkat elektronik.
              </p>
            </div>

            <div>
              <h3 className="font-display text-lg font-bold text-slate-900 mb-3">
                Contoh Teknologi Digital dalam Kehidupan Sehari-hari (Klik gambarnya!):
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {WORLD1_DEVICES.map((item) => {
                  const active = selectedCardId === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        playClickSound(soundEnabled);
                        setSelectedCardId(active ? null : item.id);
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-4 ${
                        active
                          ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-200'
                          : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                      }`}
                    >
                      <CartoonIllustration id={item.illustration} className="w-16 h-16 shrink-0" />
                      <div>
                        <p className="font-display font-bold text-base text-slate-900">{item.name}</p>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-snug">
                          {item.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {worldId === 'world-1' && step === 1 && (
          <div className="space-y-6 animate-pop-in">
            <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200">
              <h2 className="font-display text-xl font-extrabold text-slate-900">
                Apa Itu Informasi?
              </h2>
              <p className="text-slate-700 text-base sm:text-lg leading-relaxed mt-2">
                <strong>Informasi</strong> adalah sesuatu yang memberikan{' '}
                <strong>pengetahuan atau kabar</strong> kepada kita agar kita tahu tentang suatu hal.
              </p>
            </div>

            <div>
              <h3 className="font-display text-lg font-bold text-slate-900 mb-3">
                Contoh Informasi di Sekitar Kita:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {WORLD1_INFO_EXAMPLES.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-4"
                  >
                    <CartoonIllustration id={item.illustration} className="w-16 h-16 shrink-0" />
                    <div>
                      <p className="font-display font-bold text-base text-slate-900">{item.name}</p>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-snug">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {worldId === 'world-1' && step === 2 && (
          <div className="space-y-6 animate-pop-in">
            <h2 className="font-display text-xl font-extrabold text-slate-900">
              Manfaat Teknologi Digital Bagi Kita
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {WORLD1_BENEFITS.map((b, i) => (
                <div key={b.title} className={`p-5 rounded-2xl border ${b.color}`}>
                  <p className="text-xs font-bold opacity-75">Manfaat {i + 1}</p>
                  <h3 className="font-display text-lg font-extrabold mt-1">{b.title}</h3>
                  <p className="text-sm mt-2 leading-relaxed">{b.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== DUNIA 2 CONTENT ==================== */}
        {worldId === 'world-2' && step === 0 && (
          <div className="space-y-6 animate-pop-in">
            <div className="p-6 rounded-2xl bg-purple-50 border border-purple-200">
              <h2 className="font-display text-xl font-extrabold text-slate-900">
                Apa Itu Sistem Komputer?
              </h2>
              <p className="text-slate-700 text-base sm:text-lg leading-relaxed mt-2">
                <strong>Sistem komputer</strong> adalah gabungan{' '}
                <strong>perangkat keras (hardware)</strong> dan{' '}
                <strong>perangkat lunak (software)</strong> yang bekerja bersama untuk menjalankan
                berbagai tugas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-5 rounded-2xl bg-sky-50 border border-sky-200 flex items-center gap-4">
                <CartoonIllustration id="monitor" className="w-20 h-20 shrink-0" />
                <div>
                  <h3 className="font-display text-lg font-extrabold text-blue-900">
                    1. Perangkat Keras (Hardware)
                  </h3>
                  <p className="text-sm text-slate-700 mt-1 leading-relaxed">
                    Bagian komputer yang berwujud nyata, bisa kita <strong>lihat</strong> dan bisa kita{' '}
                    <strong>sentuh</strong> dengan tangan.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-4">
                <CartoonIllustration id="paint" className="w-20 h-20 shrink-0" />
                <div>
                  <h3 className="font-display text-lg font-extrabold text-amber-900">
                    2. Perangkat Lunak (Software)
                  </h3>
                  <p className="text-sm text-slate-700 mt-1 leading-relaxed">
                    Program atau aplikasi di dalam komputer yang membantu kita menulis, menggambar,
                    menghitung, dan membuka internet.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {worldId === 'world-2' && step === 1 && (
          <div className="space-y-4 animate-pop-in">
            <div>
              <h2 className="font-display text-xl font-extrabold text-slate-900">
                8 Perangkat Keras (Hardware) Komputer
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Hardware adalah bagian fisik komputer yang dapat dilihat dan disentuh. Klik tiap
                perangkat untuk mengenalnya!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {HARDWARE_ITEMS.map((item) => {
                const active = selectedCardId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      playClickSound(soundEnabled);
                      setSelectedCardId(active ? null : item.id);
                    }}
                    className={`p-4 rounded-2xl border text-center flex flex-col items-center gap-2 transition-all cursor-pointer ${
                      active
                        ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-200'
                        : 'bg-white border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <CartoonIllustration id={item.illustration} className="w-20 h-20" />
                    <h3 className="font-display font-extrabold text-base text-slate-900">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.shortFunction}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {worldId === 'world-2' && step === 2 && (
          <div className="space-y-4 animate-pop-in">
            <div>
              <h2 className="font-display text-xl font-extrabold text-slate-900">
                6 Contoh Perangkat Lunak (Software)
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Software adalah program atau aplikasi yang membantu komputer melakukan berbagai tugas.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SOFTWARE_ITEMS.map((item) => {
                const active = selectedCardId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      playClickSound(soundEnabled);
                      setSelectedCardId(active ? null : item.id);
                    }}
                    className={`p-5 rounded-2xl border text-left flex items-center gap-4 transition-all cursor-pointer ${
                      active
                        ? 'bg-purple-50 border-purple-500 ring-2 ring-purple-200'
                        : 'bg-white border-slate-200 hover:border-purple-300'
                    }`}
                  >
                    <CartoonIllustration id={item.illustration} className="w-16 h-16 shrink-0" />
                    <div>
                      <h3 className="font-display font-extrabold text-base text-slate-900">
                        {item.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-snug">
                        {item.shortFunction}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {worldId === 'world-2' && step === 3 && (
          <div className="space-y-6 animate-pop-in">
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
              <h2 className="font-display text-xl font-extrabold text-slate-900">
                Perbedaan Hardware &amp; Software — Saling Membutuhkan!
              </h2>
              <p className="text-slate-700 text-base leading-relaxed mt-2">
                Hardware dan software saling membutuhkan agar komputer dapat bekerja dengan baik.
                Misalnya: saat kamu menggambar dengan aplikasi <strong>Paint</strong> (software), kamu
                memerlukan <strong>Monitor</strong> dan <strong>Mouse</strong> (hardware)!
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  playClickSound(soundEnabled);
                  setHwSwMode('hardware');
                }}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm cursor-pointer transition-colors ${
                  hwSwMode === 'hardware'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Lihat Contoh Hardware
              </button>
              <button
                type="button"
                onClick={() => {
                  playClickSound(soundEnabled);
                  setHwSwMode('software');
                }}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm cursor-pointer transition-colors ${
                  hwSwMode === 'software'
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Lihat Contoh Software
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {hwSwMode === 'hardware' ? (
                <>
                  <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 flex items-center gap-4">
                    <CartoonIllustration id="monitor" className="w-16 h-16 shrink-0" />
                    <div>
                      <p className="font-display font-bold text-slate-900">Monitor adalah Hardware</p>
                      <p className="text-sm text-slate-700 mt-1">
                        Layarnya berwujud nyata, bisa dilihat dan disentuh.
                      </p>
                    </div>
                  </div>
                  <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 flex items-center gap-4">
                    <CartoonIllustration id="keyboard" className="w-16 h-16 shrink-0" />
                    <div>
                      <p className="font-display font-bold text-slate-900">Keyboard adalah Hardware</p>
                      <p className="text-sm text-slate-700 mt-1">
                        Tombol-tombolnya bisa kita tekan langsung dengan jari.
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200 flex items-center gap-4">
                    <CartoonIllustration id="word" className="w-16 h-16 shrink-0" />
                    <div>
                      <p className="font-display font-bold text-slate-900">
                        Microsoft Word adalah Software
                      </p>
                      <p className="text-sm text-slate-700 mt-1">
                        Program aplikasi di layar untuk mengetik cerita atau tugas sekolah.
                      </p>
                    </div>
                  </div>
                  <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200 flex items-center gap-4">
                    <CartoonIllustration id="paint" className="w-16 h-16 shrink-0" />
                    <div>
                      <p className="font-display font-bold text-slate-900">Paint adalah Software</p>
                      <p className="text-sm text-slate-700 mt-1">
                        Aplikasi digital untuk menggambar dan mewarnai di dalam komputer.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* ==================== DUNIA 3 CONTENT ==================== */}
        {worldId === 'world-3' && step === 0 && (
          <div className="space-y-6 animate-pop-in">
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-4">
              <CartoonIllustration id="personal_id" className="w-16 h-16 shrink-0" />
              <div>
                <h2 className="font-display text-xl font-extrabold text-slate-900">
                  Apa Itu Informasi Pribadi?
                </h2>
                <p className="text-slate-700 text-base mt-1">
                  <strong>Informasi pribadi</strong> adalah informasi tentang diri seseorang yang
                  harus dijaga agar tidak disalahgunakan orang lain.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {PERSONAL_INFO_ITEMS.map((item, idx) => (
                <div
                  key={item.label}
                  className="p-4 rounded-2xl bg-white border border-slate-200"
                >
                  <p className="text-xs font-bold text-emerald-700">Data Pribadi {idx + 1}</p>
                  <h3 className="font-display font-extrabold text-base text-slate-900 mt-0.5">
                    {item.label}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {worldId === 'world-3' && step === 1 && (
          <div className="space-y-6 animate-pop-in">
            <h2 className="font-display text-xl font-extrabold text-slate-900">
              Mengapa Informasi Pribadi Harus Dijaga?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SAFETY_REASONS.map((reason, idx) => (
                <div
                  key={reason.title}
                  className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-3"
                >
                  <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-display font-extrabold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-base text-slate-900">
                      {reason.title}
                    </h3>
                    <p className="text-sm text-slate-700 mt-1 leading-relaxed">{reason.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {worldId === 'world-3' && step === 2 && (
          <div className="space-y-5 animate-pop-in">
            <h2 className="font-display text-xl font-extrabold text-slate-900">
              7 Cara Melindungi Informasi Pribadi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SAFETY_RULES.map((rule, idx) => (
                <div
                  key={rule}
                  className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 flex items-start gap-3"
                >
                  <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-mono font-bold text-sm flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-sm sm:text-base font-semibold text-slate-800">{rule}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {worldId === 'world-3' && step === 3 && (
          <div className="space-y-5 animate-pop-in">
            <div>
              <h2 className="font-display text-xl font-extrabold text-slate-900">
                Kenali Perilaku Aman &amp; Tidak Aman di Internet
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Klik tombol di setiap situasi untuk memeriksa apakah situasi itu aman dan apa tindakan
                yang tepat!
              </p>
            </div>

            <div className="space-y-3">
              {SAFETY_SITUATIONS.map((sit) => {
                const revealed = !!revealedSituations[sit.id];
                return (
                  <div
                    key={sit.id}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <CartoonIllustration id={sit.illustration} className="w-16 h-16 shrink-0" />
                      <div>
                        <p className="font-display font-bold text-base text-slate-900">
                          {sit.situation}
                        </p>
                        {revealed && (
                          <div
                            className={`mt-2 inline-flex items-center gap-2 text-sm font-bold ${
                              sit.isSafe ? 'text-emerald-700' : 'text-red-700'
                            }`}
                          >
                            {sit.isSafe ? (
                              <ShieldCheck className="w-5 h-5 shrink-0" aria-hidden="true" />
                            ) : (
                              <ShieldAlert className="w-5 h-5 shrink-0" aria-hidden="true" />
                            )}
                            <span>{sit.action}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        playClickSound(soundEnabled);
                        setRevealedSituations((prev) => ({ ...prev, [sit.id]: !prev[sit.id] }));
                      }}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {revealed ? 'Sembunyikan Jawaban' : 'Lihat Tindakan Tepat'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer Step Controls */}
        <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            disabled={step === 0}
            onClick={() => handleSelectTab(step - 1)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-bold text-slate-700 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Materi Sebelumnya</span>
          </button>

          {step < totalSteps - 1 ? (
            <button
              type="button"
              onClick={() => handleSelectTab(step + 1)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-extrabold cursor-pointer transition-colors"
            >
              <span>Lanjut ke Materi Berikutnya</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinishAndPlay}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-display text-base font-extrabold cursor-pointer transition-colors shadow-sm"
            >
              <Sparkles className="w-5 h-5" aria-hidden="true" />
              <span>Selesai Materi &amp; Mainkan Game!</span>
            </button>
          )}
        </div>
      </div>
    </main>
  );
};
