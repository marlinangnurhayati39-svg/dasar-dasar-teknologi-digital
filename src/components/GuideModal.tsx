import React from 'react';
import { X, ShieldCheck, Star, Trophy, Compass } from 'lucide-react';
import { DigiAvatar } from './CartoonIllustrations';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="guide-modal-title"
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 sm:p-8 animate-pop-in">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <DigiAvatar className="w-14 h-14 shrink-0" mood="happy" />
            <div>
              <h2 id="guide-modal-title" className="font-display text-2xl font-extrabold text-slate-900">
                Petunjuk Permainan
              </h2>
              <p className="text-sm text-slate-600">
                Panduan seru menjelajahi Petualangan Dunia Digital bersama DIGI
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup Petunjuk"
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-slate-700 text-base leading-relaxed">
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-start gap-3">
            <Compass className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h3 className="font-display font-bold text-slate-900">1. Jelajahi 3 Dunia Belajar</h3>
              <p className="text-sm text-slate-700 mt-1">
                Pelajari materi di <strong>Dunia 1 (Teknologi Digital)</strong>,{' '}
                <strong>Dunia 2 (Sistem Komputer)</strong>, dan{' '}
                <strong>Dunia 3 (Keamanan Digital)</strong>, lalu mainkan semua permainannya!
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <Trophy className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h3 className="font-display font-bold text-slate-900">2. Kumpulkan Poin &amp; Bintang</h3>
              <p className="text-sm text-slate-700 mt-1">
                Setiap jawaban benar bernilai <strong>10 poin</strong>. Menyelesaikan satu permainan
                memberikan <strong>bonus 20 poin</strong>! Ayo kumpulkan bintang sebanyak-banyaknya.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 flex items-start gap-3">
            <Star className="w-6 h-6 text-purple-600 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h3 className="font-display font-bold text-slate-900">3. Raih 3 Lencana &amp; Gelar Pahlawan</h3>
              <p className="text-sm text-slate-700 mt-1">
                Selesaikan materi dan permainan di tiap dunia untuk meraih lencana{' '}
                <strong>Detektif Teknologi</strong>, <strong>Ahli Komputer</strong>, dan{' '}
                <strong>Pahlawan Keamanan Digital</strong>. Selesaikan semua dunia &amp; kuis akhir untuk
                mendapat gelar <strong>PAHLAWAN DIGITAL</strong>!
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h3 className="font-display font-bold text-slate-900">4. Aman &amp; Tersimpan di Perangkatmu</h3>
              <p className="text-sm text-slate-700 mt-1">
                Cukup isi nama panggilanmu saja. Progres belajarmu tersimpan otomatis di browser
                perangkat ini dan tidak dikirim ke mana-mana.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl cursor-pointer transition-colors whitespace-nowrap"
          >
            Siap Bermain!
          </button>
        </div>
      </div>
    </div>
  );
};
