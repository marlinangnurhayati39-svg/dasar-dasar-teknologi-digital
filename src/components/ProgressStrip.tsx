import React from 'react';
import { Award, Star, Trophy, Volume2, VolumeX } from 'lucide-react';
import { StudentProgress } from '../types';
import { calculateMetrics } from '../utils/storage';
import { BADGES } from '../data/curriculum';

interface ProgressStripProps {
  progress: StudentProgress;
  onToggleSound: () => void;
}

export const ProgressStrip: React.FC<ProgressStripProps> = ({ progress, onToggleSound }) => {
  const metrics = calculateMetrics(progress);
  const displayName = progress.studentName.trim() || 'Petualang Cilik';

  return (
    <section
      aria-label="Progres Belajar Siswa"
      className="bg-white border-b border-slate-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Student & Completion */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <div>
            <p className="text-xs font-semibold text-slate-500">Siswa Petualang</p>
            <p className="font-display text-base font-bold text-slate-900">{displayName}</p>
          </div>

          <div className="h-8 w-px bg-slate-200 hidden sm:block" aria-hidden="true" />

          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500 shrink-0" aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold text-slate-500">Total Poin</p>
              <p className="font-mono text-base font-bold text-slate-900 tabular-nums">
                {metrics.totalPoints}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-400 shrink-0" aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold text-slate-500">Bintang</p>
              <p className="font-mono text-base font-bold text-slate-900 tabular-nums">
                {metrics.totalStars}/{metrics.maxStars}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-600 shrink-0" aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold text-slate-500">Lencana</p>
              <p className="font-mono text-base font-bold text-slate-900 tabular-nums">
                {metrics.unlockedBadges.length}/{BADGES.length}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar + Sound Toggle */}
        <div className="flex items-center gap-4 ml-auto">
          <div className="w-36 sm:w-48">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-1">
              <span>Progres Belajar</span>
              <span className="font-mono tabular-nums text-blue-700">{metrics.completionPercent}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div
                className="h-full bg-blue-600 transition-all duration-300 rounded-full"
                style={{ width: `${metrics.completionPercent}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={onToggleSound}
            aria-label={progress.soundEnabled ? 'Matikan Efek Suara' : 'Nyalakan Efek Suara'}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              progress.soundEnabled
                ? 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100'
                : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {progress.soundEnabled ? (
              <Volume2 className="w-4 h-4 shrink-0" aria-hidden="true" />
            ) : (
              <VolumeX className="w-4 h-4 shrink-0" aria-hidden="true" />
            )}
            <span>{progress.soundEnabled ? 'Suara Nyala' : 'Suara Mati'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
