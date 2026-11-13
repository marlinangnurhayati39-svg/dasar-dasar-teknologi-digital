import React from 'react';
import { ViewRoute } from '../types';
import { playClickSound } from '../utils/sound';

interface TopBarProps {
  currentRoute: ViewRoute;
  onNavigate: (route: ViewRoute) => void;
  onOpenGuide: () => void;
  soundEnabled: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentRoute,
  onNavigate,
  onOpenGuide,
  soundEnabled,
}) => {
  const handleNav = (route: ViewRoute) => {
    playClickSound(soundEnabled);
    onNavigate(route);
  };

  const navItems: { label: string; route: ViewRoute }[] = [
    { label: 'Beranda', route: 'home' },
    { label: 'Peta Belajar', route: 'map' },
    { label: 'Kuis Akhir', route: 'final-quiz' },
    { label: 'Hasil Akhir', route: 'final-result' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleNav('home')}
          className="font-display text-lg sm:text-xl font-extrabold tracking-tight text-blue-700 hover:text-blue-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 rounded-md"
        >
          Petualangan Dunia Digital
        </button>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="Navigasi Utama"
          className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600"
        >
          {navItems.map((item) => {
            const isActive =
              currentRoute === item.route ||
              (item.route === 'map' &&
                (currentRoute.startsWith('world-') || currentRoute.startsWith('game-')));
            return (
              <button
                key={item.route}
                type="button"
                onClick={() => handleNav(item.route)}
                className={`py-1.5 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 ${
                  isActive
                    ? 'border-blue-600 text-blue-700'
                    : 'border-transparent hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={() => {
              playClickSound(soundEnabled);
              onOpenGuide();
            }}
            className="px-4 py-2 text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 active:scale-[0.98] rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
          >
            Petunjuk
          </button>
        </div>
      </div>

      {/* Compact mobile navigation row */}
      <nav
        aria-label="Navigasi Seluler"
        className="flex md:hidden items-center justify-around border-t border-slate-100 px-2 py-1.5 bg-slate-50/80"
      >
        {navItems.map((item) => {
          const isActive =
            currentRoute === item.route ||
            (item.route === 'map' &&
              (currentRoute.startsWith('world-') || currentRoute.startsWith('game-')));
          return (
            <button
              key={item.route}
              type="button"
              onClick={() => handleNav(item.route)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                isActive ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
};
