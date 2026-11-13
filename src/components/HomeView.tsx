import React, { useState } from 'react';
import { ArrowRight, BookOpen, Laptop, Shield, Smartphone, Tablet } from 'lucide-react';
import { WORLD_IMAGES } from '../data/curriculum';
import { DigiAvatar } from './CartoonIllustrations';
import { playClickSound } from '../utils/sound';

interface HomeViewProps {
  studentName: string;
  soundEnabled: boolean;
  onStartAdventure: (name: string) => void;
  onOpenGuide: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  studentName,
  soundEnabled,
  onStartAdventure,
  onOpenGuide,
}) => {
  const [nameInput, setNameInput] = useState(studentName);
  const [imgError, setImgError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound(soundEnabled);
    onStartAdventure(nameInput.trim() || 'Petualang Cilik');
  };

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Title, DIGI Speech, Name Input & CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            <div>
              <p className="text-sm font-bold text-blue-700 tracking-wide">
                Informatika Kelas 4 SD · Media Belajar Interaktif
              </p>
              <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 mt-2 leading-tight">
                PETUALANGAN DUNIA DIGITAL
              </h1>
              <p className="font-display text-lg sm:text-xl font-bold text-orange-600 mt-2">
                Ayo Belajar Informatika Sambil Bermain!
              </p>
            </div>

            {/* DIGI Greeting Bubble */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 sm:p-5 flex items-start gap-4">
              <DigiAvatar className="w-16 h-16 shrink-0" mood="happy" />
              <div>
                <p className="text-xs font-bold text-blue-800 mb-1">DIGI — Pemandu Pintarmu</p>
                <p className="text-slate-800 text-base leading-relaxed font-medium">
                  &ldquo;Halo teman-teman! Aku DIGI. Yuk, kita menjelajahi dunia teknologi digital
                  dan menjadi anak yang pintar serta aman menggunakan teknologi!&rdquo;
                </p>
              </div>
            </div>

            {/* Student Name Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="student-name-input"
                  className="block text-sm font-bold text-slate-800 mb-1.5"
                >
                  Siapa nama panggilanmu?
                </label>
                <input
                  id="student-name-input"
                  type="text"
                  maxLength={32}
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Contoh: Bima atau Siti"
                  className="w-full px-4 py-3.5 text-base font-semibold text-slate-900 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                />
                <p className="text-xs text-slate-500 mt-1.5">
                  Cukup tulis nama panggilan saja ya! Tidak perlu alamat rumah atau nomor telepon.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-display text-base sm:text-lg font-extrabold rounded-2xl shadow-md transition-all cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>MULAI PETUALANGAN</span>
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playClickSound(soundEnabled);
                    onOpenGuide();
                  }}
                  className="inline-flex items-center justify-center gap-2 px-5 py-4 bg-amber-100 hover:bg-amber-200 text-amber-900 font-display text-base font-bold rounded-2xl border border-amber-300 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <BookOpen className="w-5 h-5" aria-hidden="true" />
                  <span>PETUNJUK PERMAINAN</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Hero 3D Illustration + Device Highlights */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="relative flex-1 min-h-[280px] sm:min-h-[340px] rounded-3xl overflow-hidden border border-sky-200 bg-gradient-to-br from-sky-100 via-blue-50 to-amber-50 flex items-center justify-center">
              {!imgError ? (
                <img
                  src={WORLD_IMAGES.hero}
                  alt="Robot DIGI menyapa bersama laptop, tablet, smartphone, dan perisai keamanan digital"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="p-8 text-center flex flex-col items-center gap-3">
                  <DigiAvatar className="w-32 h-32 animate-gentle-float" mood="happy" />
                  <p className="font-display font-bold text-blue-900 text-lg">
                    DIGI Siap Memandu Petualanganmu!
                  </p>
                </div>
              )}
            </div>

            {/* 4 Key Icon Strips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-2xl bg-sky-50 border border-sky-200 flex items-center gap-2.5">
                <Laptop className="w-6 h-6 text-blue-600 shrink-0" aria-hidden="true" />
                <span className="text-xs font-bold text-slate-800">Komputer &amp; Laptop</span>
              </div>
              <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200 flex items-center gap-2.5">
                <Tablet className="w-6 h-6 text-purple-600 shrink-0" aria-hidden="true" />
                <span className="text-xs font-bold text-slate-800">Tablet Pintar</span>
              </div>
              <div className="p-3 rounded-2xl bg-orange-50 border border-orange-200 flex items-center gap-2.5">
                <Smartphone className="w-6 h-6 text-orange-600 shrink-0" aria-hidden="true" />
                <span className="text-xs font-bold text-slate-800">Smartphone</span>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-2.5">
                <Shield className="w-6 h-6 text-emerald-600 shrink-0" aria-hidden="true" />
                <span className="text-xs font-bold text-slate-800">Keamanan Data</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
