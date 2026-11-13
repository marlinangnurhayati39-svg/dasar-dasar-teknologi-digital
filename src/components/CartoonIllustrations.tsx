import React from 'react';
import { BadgeId, IllustrationId } from '../types';

interface IllustrationProps {
  id: IllustrationId;
  className?: string;
}

export const DigiAvatar: React.FC<{ className?: string; mood?: 'happy' | 'thinking' | 'celebrate' }> = ({
  className = 'w-16 h-16',
  mood = 'happy',
}) => (
  <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
    <circle cx="60" cy="60" r="56" fill="#E0F2FE" stroke="#BAE6FD" strokeWidth="3" />
    {/* Antennae */}
    <line x1="36" y1="26" x2="28" y2="14" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
    <circle cx="26" cy="12" r="5" fill="#F59E0B" />
    <line x1="84" y1="26" x2="92" y2="14" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
    <circle cx="94" cy="12" r="5" fill="#F59E0B" />
    {/* Ears */}
    <rect x="16" y="46" width="12" height="24" rx="6" fill="#F97316" />
    <rect x="92" y="46" width="12" height="24" rx="6" fill="#F97316" />
    {/* Head */}
    <rect x="24" y="24" width="72" height="58" rx="24" fill="#FFFFFF" stroke="#2563EB" strokeWidth="4" />
    {/* Screen Face */}
    <rect x="33" y="34" width="54" height="38" rx="14" fill="#0F172A" />
    {/* Eyes */}
    {mood === 'celebrate' ? (
      <>
        <path d="M42 50 Q47 43 52 50" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />
        <path d="M68 50 Q73 43 78 50" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />
      </>
    ) : (
      <>
        <circle cx="47" cy="49" r="6" fill="#38BDF8" />
        <circle cx="49" cy="47" r="2" fill="#FFFFFF" />
        <circle cx="73" cy="49" r="6" fill="#38BDF8" />
        <circle cx="75" cy="47" r="2" fill="#FFFFFF" />
      </>
    )}
    {/* Mouth */}
    {mood === 'thinking' ? (
      <circle cx="60" cy="62" r="3.5" fill="#38BDF8" />
    ) : (
      <path d="M51 60 Q60 67 69 60" stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round" />
    )}
    {/* Body top */}
    <path d="M38 86 C38 80 82 80 82 86 L86 106 C70 114 50 114 34 106 Z" fill="#2563EB" />
    <circle cx="60" cy="96" r="7" fill="#FBBF24" />
  </svg>
);

export const BadgeIllustration: React.FC<{ badgeId: BadgeId; unlocked: boolean; className?: string }> = ({
  badgeId,
  unlocked,
  className = 'w-20 h-20',
}) => {
  const palette = {
    detektif_teknologi: { bg: '#DBEAFE', ring: '#2563EB', inner: '#F59E0B' },
    ahli_komputer: { bg: '#EDE9FE', ring: '#7C3AED', inner: '#10B981' },
    pahlawan_keamanan: { bg: '#D1FAE5', ring: '#059669', inner: '#F97316' },
  }[badgeId];

  const bg = unlocked ? palette.bg : '#F1F5F9';
  const ring = unlocked ? palette.ring : '#CBD5E1';
  const inner = unlocked ? palette.inner : '#94A3B8';

  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
      {/* Ribbon tails */}
      <path d="M30 70 L22 94 L36 86 L44 96 L48 74 Z" fill={ring} opacity={unlocked ? 0.9 : 0.4} />
      <path d="M70 70 L78 94 L64 86 L56 96 L52 74 Z" fill={ring} opacity={unlocked ? 0.9 : 0.4} />
      {/* Medal circle */}
      <circle cx="50" cy="46" r="36" fill={bg} stroke={ring} strokeWidth="5" />
      <circle cx="50" cy="46" r="28" stroke={inner} strokeWidth="2.5" strokeDasharray="4 4" />
      {badgeId === 'detektif_teknologi' && (
        <>
          <circle cx="46" cy="42" r="11" fill="#FFFFFF" stroke={ring} strokeWidth="4" />
          <line x1="54" y1="50" x2="64" y2="60" stroke={ring} strokeWidth="5" strokeLinecap="round" />
          <circle cx="46" cy="42" r="4" fill={inner} />
        </>
      )}
      {badgeId === 'ahli_komputer' && (
        <>
          <rect x="31" y="32" width="38" height="24" rx="4" fill="#FFFFFF" stroke={ring} strokeWidth="3.5" />
          <rect x="36" y="37" width="28" height="14" rx="2" fill={inner} opacity="0.85" />
          <path d="M44 56 L56 56 L59 62 L41 62 Z" fill={ring} />
        </>
      )}
      {badgeId === 'pahlawan_keamanan' && (
        <>
          <path
            d="M50 25 L68 32 V46 C68 57 59 64 50 68 C41 64 32 57 32 46 V32 Z"
            fill="#FFFFFF"
            stroke={ring}
            strokeWidth="3.5"
          />
          <rect x="43" y="43" width="14" height="11" rx="2.5" fill={inner} />
          <path d="M46 43 V39 C46 36.5 54 36.5 54 39 V43" stroke={ring} strokeWidth="3" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
};

export const CartoonIllustration: React.FC<IllustrationProps> = ({ id, className = 'w-20 h-20' }) => {
  switch (id) {
    case 'smartphone':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
          <rect x="28" y="10" width="44" height="80" rx="10" fill="#1E293B" stroke="#0F172A" strokeWidth="3" />
          <rect x="33" y="18" width="34" height="58" rx="4" fill="#38BDF8" />
          <rect x="37" y="24" width="12" height="12" rx="3" fill="#FBBF24" />
          <rect x="51" y="24" width="12" height="12" rx="3" fill="#34D399" />
          <rect x="37" y="40" width="12" height="12" rx="3" fill="#F472B6" />
          <rect x="51" y="40" width="12" height="12" rx="3" fill="#A78BFA" />
          <rect x="37" y="58" width="26" height="10" rx="4" fill="#FFFFFF" opacity="0.9" />
          <circle cx="50" cy="83" r="3" fill="#94A3B8" />
        </svg>
      );

    case 'laptop':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
          <rect x="18" y="20" width="64" height="44" rx="6" fill="#1E293B" />
          <rect x="23" y="25" width="54" height="34" rx="3" fill="#60A5FA" />
          <circle cx="50" cy="40" r="8" fill="#FDE047" />
          <path d="M32 52 H68" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          <path d="M10 64 H90 L84 78 H16 Z" fill="#94A3B8" stroke="#475569" strokeWidth="2.5" />
          <rect x="40" y="68" width="20" height="5" rx="2" fill="#E2E8F0" />
        </svg>
      );

    case 'computer':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
          <rect x="12" y="18" width="54" height="40" rx="6" fill="#2563EB" />
          <rect x="17" y="23" width="44" height="30" rx="3" fill="#DBEAFE" />
          <path d="M33 58 H45 L47 68 H31 Z" fill="#64748B" />
          <rect x="24" y="68" width="30" height="5" rx="2.5" fill="#475569" />
          {/* Tower */}
          <rect x="70" y="22" width="20" height="50" rx="4" fill="#1E293B" />
          <rect x="74" y="28" width="12" height="4" rx="1.5" fill="#38BDF8" />
          <circle cx="80" cy="60" r="4" fill="#10B981" />
          {/* Keyboard */}
          <rect x="16" y="77" width="46" height="10" rx="3" fill="#CBD5E1" stroke="#64748B" strokeWidth="2" />
        </svg>
      );

    case 'tablet':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
          <rect x="18" y="14" width="64" height="74" rx="10" fill="#7C3AED" />
          <rect x="24" y="20" width="52" height="58" rx="5" fill="#F0F9FF" />
          <rect x="30" y="27" width="18" height="18" rx="4" fill="#FB923C" />
          <rect x="52" y="27" width="18" height="18" rx="4" fill="#34D399" />
          <rect x="30" y="49" width="40" height="8" rx="3" fill="#60A5FA" />
          <rect x="30" y="61" width="28" height="8" rx="3" fill="#FBBF24" />
          <circle cx="50" cy="83" r="2.5" fill="#EDE9FE" />
        </svg>
      );

    case 'camera':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
          <rect x="34" y="22" width="32" height="12" rx="4" fill="#F59E0B" />
          <rect x="14" y="30" width="72" height="48" rx="12" fill="#FBBF24" stroke="#D97706" strokeWidth="3" />
          <circle cx="50" cy="54" r="17" fill="#1E293B" stroke="#FFFFFF" strokeWidth="3" />
          <circle cx="50" cy="54" r="10" fill="#38BDF8" />
          <circle cx="54" cy="50" r="3" fill="#FFFFFF" />
          <circle cx="72" cy="40" r="4" fill="#EF4444" />
        </svg>
      );

    case 'tv':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
          <rect x="12" y="20" width="76" height="50" rx="8" fill="#1E293B" />
          <rect x="17" y="25" width="66" height="40" rx="4" fill="#38BDF8" />
          <circle cx="38" cy="44" r="9" fill="#FDE047" />
          <path d="M52 54 L62 40 L74 54 Z" fill="#10B981" />
          <rect x="44" y="70" width="12" height="8" fill="#64748B" />
          <rect x="32" y="78" width="36" height="5" rx="2.5" fill="#475569" />
        </svg>
      );

    case 'atm':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
          <rect x="22" y="12" width="56" height="76" rx="8" fill="#2563EB" />
          <rect x="29" y="20" width="42" height="24" rx="4" fill="#93C5FD" />
          <rect x="34" y="25" width="20" height="4" rx="2" fill="#1E3A8A" />
          <rect x="34" y="32" width="30" height="4" rx="2" fill="#FFFFFF" />
          {/* Keypad */}
          <rect x="29" y="50" width="22" height="18" rx="3" fill="#E2E8F0" />
          <circle cx="35" cy="55" r="1.8" fill="#475569" />
          <circle cx="40" cy="55" r="1.8" fill="#475569" />
          <circle cx="45" cy="55" r="1.8" fill="#475569" />
          <circle cx="35" cy="61" r="1.8" fill="#475569" />
          <circle cx="40" cy="61" r="1.8" fill="#475569" />
          <circle cx="45" cy="61" r="1.8" fill="#475569" />
          {/* Card slot & money */}
          <rect x="56" y="52" width="14" height="5" rx="2" fill="#1E293B" />
          <rect x="30" y="74" width="40" height="6" rx="2" fill="#0F172A" />
          <rect x="38" y="76" width="24" height="10" rx="2" fill="#34D399" />
        </svg>
      );

    case 'weather_news':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
          <rect x="14" y="18" width="72" height="64" rx="12" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="3" />
          <circle cx="40" cy="42" r="14" fill="#FBBF24" />
          <path d="M36 58 C30 58 26 53 28 47 C30 42 36 42 40 44 C43 38 54 38 58 44 C64 44 68 49 66 54 C65 57 62 58 58 58 Z" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2" />
          <rect x="28" y="67" width="44" height="6" rx="3" fill="#0284C7" />
        </svg>
      );

    case 'schedule':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
          <rect x="18" y="20" width="64" height="64" rx="10" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="3.5" />
          <rect x="18" y="20" width="64" height="18" rx="8" fill="#7C3AED" />
          <circle cx="34" cy="18" r="4" fill="#F59E0B" />
          <circle cx="66" cy="18" r="4" fill="#F59E0B" />
          <rect x="28" y="46" width="12" height="10" rx="2" fill="#DDD6FE" />
          <rect x="44" y="46" width="12" height="10" rx="2" fill="#A78BFA" />
          <rect x="60" y="46" width="12" height="10" rx="2" fill="#DDD6FE" />
          <rect x="28" y="62" width="12" height="10" rx="2" fill="#34D399" />
          <rect x="44" y="62" width="28" height="10" rx="2" fill="#FDE68A" />
        </svg>
      );

    case 'family_photo':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
          <rect x="14" y="20" width="72" height="60" rx="8" fill="#F97316" />
          <rect x="20" y="26" width="60" height="44" rx="4" fill="#FEF3C7" />
          <circle cx="38" cy="44" r="7" fill="#FB7185" />
          <path d="M26 68 C26 57 50 57 50 68" fill="#38BDF8" />
          <circle cx="60" cy="47" r="6" fill="#F59E0B" />
          <path d="M50 68 C50 58 70 58 70 68" fill="#34D399" />
        </svg>
      );

    case 'teacher_msg':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
          <path d="M16 24 H84 A8 8 0 0 1 92 32 V66 A8 8 0 0 1 84 74 H40 L22 86 V74 H16 A8 8 0 0 1 8 66 V32 A8 8 0 0 1 16 24 Z" fill="#10B981" />
          <rect x="22" y="37" width="46" height="6" rx="3" fill="#FFFFFF" />
          <rect x="22" y="49" width="56" height="6" rx="3" fill="#D1FAE5" />
          <rect x="22" y="61" width="32" height="6" rx="3" fill="#D1FAE5" />
        </svg>
      );

    case 'learning_video':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
          <rect x="14" y="22" width="72" height="52" rx="10" fill="#EF4444" />
          <circle cx="50" cy="48" r="15" fill="#FFFFFF" />
          <path d="M45 40 L60 48 L45 56 Z" fill="#EF4444" />
          <rect x="22" y="80" width="56" height="5" rx="2.5" fill="#CBD5E1" />
          <rect x="22" y="80" width="28" height="5" rx="2.5" fill="#EF4444" />
        </svg>
      );

    case 'book':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
          <rect x="22" y="16" width="56" height="68" rx="6" fill="#F97316" />
          <rect x="22" y="16" width="12" height="68" rx="4" fill="#C2410C" />
          <rect x="40" y="28" width="28" height="16" rx="3" fill="#FEF3C7" />
          <rect x="40" y="52" width="28" height="5" rx="2.5" fill="#FED7AA" />
        </svg>
      );

    case 'bicycle':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
          <circle cx="28" cy="64" r="16" stroke="#2563EB" strokeWidth="5" fill="#DBEAFE" />
          <circle cx="72" cy="64" r="16" stroke="#2563EB" strokeWidth="5" fill="#DBEAFE" />
          <path d="M28 64 L46 42 H64 L72 64 M46 42 L50 64 H28" stroke="#EF4444" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M40 36 H52" stroke="#1E293B" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M62 34 H72" stroke="#1E293B" strokeWidth="4.5" strokeLinecap="round" />
        </svg>
      );

    case 'pencil':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
          <g transform="rotate(-35 50 50)">
            <rect x="41" y="20" width="18" height="52" rx="3" fill="#FBBF24" stroke="#D97706" strokeWidth="2.5" />
            <rect x="41" y="14" width="18" height="10" rx="3" fill="#FB7185" />
            <path d="M41 72 L50 88 L59 72 Z" fill="#FDE68A" />
            <path d="M47 82 L50 88 L53 82 Z" fill="#1E293B" />
          </g>
        </svg>
      );

    case 'wooden_chair':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
          <rect x="28" y="18" width="44" height="24" rx="4" fill="#B45309" />
          <rect x="32" y="42" width="6" height="14" fill="#92400E" />
          <rect x="62" y="42" width="6" height="14" fill="#92400E" />
          <rect x="24" y="54" width="52" height="8" rx="3" fill="#D97706" />
          <rect x="28" y="62" width="7" height="24" rx="2" fill="#92400E" />
          <rect x="65" y="62" width="7" height="24" rx="2" fill="#92400E" />
        </svg>
      );

    case 'soccer_ball':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
          <circle cx="50" cy="50" r="34" fill="#FFFFFF" stroke="#1E293B" strokeWidth="4" />
          <polygon points="50,36 62,45 57,59 43,59 38,45" fill="#1E293B" />
          <line x1="50" y1="36" x2="50" y2="18" stroke="#1E293B" strokeWidth="3" />
          <line x1="62" y1="45" x2="80" y2="38" stroke="#1E293B" strokeWidth="3" />
          <line x1="38" y1="45" x2="20" y2="38" stroke="#1E293B" strokeWidth="3" />
          <line x1="57" y1="59" x2="68" y2="76" stroke="#1E293B" strokeWidth="3" />
          <line x1="43" y1="59" x2="32" y2="76" stroke="#1E293B" strokeWidth="3" />
        </svg>
      );

    case 'umbrella':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
          <path d="M16 52 C16 28 84 28 84 52 Z" fill="#8B5CF6" stroke="#6D28D9" strokeWidth="3" />
          <path d="M50 28 V76 C50 82 42 84 38 78" stroke="#D97706" strokeWidth="4.5" strokeLinecap="round" />
        </svg>
      );

    case 'monitor':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
          <rect x="12" y="18" width="76" height="52" rx="8" fill="#1E293B" />
          <rect x="18" y="24" width="64" height="40" rx="4" fill="#38BDF8" />
          <circle cx="38" cy="44" r="7" fill="#FDE047" />
          <rect x="50" y="36" width="24" height="6" rx="3" fill="#FFFFFF" />
          <rect x="50" y="46" width="18" height="6" rx="3" fill="#BAE6FD" />
          <rect x="43" y="70" width="14" height="10" fill="#64748B" />
          <rect x="30" y="80" width="40" height="6" rx="3" fill="#475569" />
        </svg>
      );

    case 'keyboard':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
          <rect x="10" y="30" width="80" height="42" rx="8" fill="#334155" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={`r1-${i}`} x={16 + i * 11.5} y="37" width="9" height="8" rx="2" fill="#F8FAFC" />
          ))}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={`r2-${i}`} x={16 + i * 11.5} y="48" width="9" height="8" rx="2" fill="#E2E8F0" />
          ))}
          <rect x="16" y="59" width="14" height="7" rx="2" fill="#FBBF24" />
          <rect x="33" y="59" width="34" height="7" rx="2" fill="#38BDF8" />
          <rect x="70" y="59" width="14" height="7" rx="2" fill="#34D399" />
        </svg>
      );

    case 'mouse':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
          <path d="M50 10 C50 18 58 18 58 24" stroke="#64748B" strokeWidth="3.5" strokeLinecap="round" />
          <rect x="30" y="24" width="40" height="62" rx="20" fill="#F8FAFC" stroke="#2563EB" strokeWidth="4" />
          <line x1="32" y1="48" x2="68" y2="48" stroke="#CBD5E1" strokeWidth="3" />
          <line x1="50" y1="24" x2="50" y2="48" stroke="#CBD5E1" strokeWidth="3" />
          <rect x="47" y="32" width="6" height="12" rx="3" fill="#F97316" />
        </svg>
      );

    case 'cpu':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
          <rect x="28" y="14" width="44" height="72" rx="8" fill="#1E293B" stroke="#3B82F6" strokeWidth="3" />
          <rect x="35" y="22" width="30" height="8" rx="2" fill="#38BDF8" />
          <rect x="35" y="34" width="30" height="8" rx="2" fill="#64748B" />
          <circle cx="50" cy="60" r="8" fill="#10B981" />
          <rect x="38" y="74" width="24" height="4" rx="2" fill="#94A3B8" />
        </svg>
      );

    case 'speaker':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
          <rect x="26" y="16" width="48" height="68" rx="10" fill="#7C3AED" />
          <circle cx="50" cy="36" r="9" fill="#DDD6FE" stroke="#4C1D95" strokeWidth="3" />
          <circle cx="50" cy="62" r="15" fill="#1E293B" stroke="#FBBF24" strokeWidth="3.5" />
          <circle cx="50" cy="62" r="6" fill="#FBBF24" />
        </svg>
      );

    case 'printer':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
          <rect x="30" y="16" width="40" height="20" rx="3" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2.5" />
          <rect x="14" y="34" width="72" height="34" rx="8" fill="#0EA5E9" />
          <circle cx="72" cy="44" r="3.5" fill="#34D399" />
          <rect x="26" y="54" width="48" height="28" rx="3" fill="#FFFFFF" stroke="#64748B" strokeWidth="2.5" />
          <line x1="34" y1="64" x2="66" y2="64" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
          <line x1="34" y1="72" x2="56" y2="72" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'webcam':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
          <circle cx="50" cy="44" r="24" fill="#1E293B" stroke="#F97316" strokeWidth="4" />
          <circle cx="50" cy="44" r="12" fill="#38BDF8" />
          <circle cx="54" cy="40" r="3.5" fill="#FFFFFF" />
          <circle cx="50" cy="26" r="2.5" fill="#10B981" />
          <path d="M32 72 L50 66 L68 72 L74 82 H26 Z" fill="#475569" />
        </svg>
      );

    case 'microphone':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
          <rect x="37" y="16" width="26" height="40" rx="13" fill="#F43F5E" stroke="#9F1239" strokeWidth="3" />
          <line x1="42" y1="28" x2="58" y2="28" stroke="#FFE4E6" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="42" y1="36" x2="58" y2="36" stroke="#FFE4E6" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M29 44 C29 58 71 58 71 44" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
          <line x1="50" y1="58" x2="50" y2="78" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
          <rect x="34" y="78" width="32" height="6" rx="3" fill="#1E293B" />
        </svg>
      );

    case 'windows':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
          <rect x="14" y="14" width="72" height="72" rx="16" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="3" />
          <rect x="26" y="26" width="22" height="22" rx="3" fill="#EF4444" />
          <rect x="52" y="26" width="22" height="22" rx="3" fill="#10B981" />
          <rect x="26" y="52" width="22" height="22" rx="3" fill="#3B82F6" />
          <rect x="52" y="52" width="22" height="22" rx="3" fill="#F59E0B" />
        </svg>
      );

    case 'word':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
          <rect x="22" y="14" width="60" height="72" rx="8" fill="#2563EB" />
          <rect x="32" y="24" width="40" height="52" rx="4" fill="#FFFFFF" />
          <path d="M36 38 L42 58 L50 44 L58 58 L64 38" stroke="#1D4ED8" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="36" y="65" width="32" height="4" rx="2" fill="#93C5FD" />
        </svg>
      );

    case 'powerpoint':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
          <rect x="16" y="18" width="68" height="64" rx="10" fill="#EA580C" />
          <rect x="26" y="26" width="48" height="48" rx="6" fill="#FFFFFF" />
          <circle cx="50" cy="50" r="14" fill="#FDBA74" />
          <path d="M50 50 L50 36 A14 14 0 0 1 64 50 Z" fill="#EA580C" />
        </svg>
      );

    case 'paint':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
          <path d="M50 16 C28 16 16 32 16 50 C16 68 32 84 52 84 C60 84 65 78 63 72 C61 66 67 62 74 62 C82 62 86 54 84 44 C80 26 66 16 50 16 Z" fill="#FEF3C7" stroke="#D97706" strokeWidth="3.5" />
          <circle cx="34" cy="40" r="6" fill="#EF4444" />
          <circle cx="50" cy="30" r="6" fill="#3B82F6" />
          <circle cx="66" cy="40" r="6" fill="#10B981" />
          <circle cx="38" cy="60" r="6" fill="#8B5CF6" />
          <circle cx="70" cy="52" r="5" fill="#F97316" />
        </svg>
      );

    case 'chrome':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
          <circle cx="50" cy="50" r="34" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="3" />
          <path d="M50 16 A34 34 0 0 1 80 34 H50 Z" fill="#EF4444" />
          <path d="M80 34 A34 34 0 0 1 50 84 L62 56 Z" fill="#FBBF24" />
          <path d="M50 84 A34 34 0 0 1 20 34 L38 56 Z" fill="#10B981" />
          <circle cx="50" cy="50" r="15" fill="#FFFFFF" />
          <circle cx="50" cy="50" r="11" fill="#3B82F6" />
        </svg>
      );

    case 'calculator':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
          <rect x="24" y="14" width="52" height="72" rx="10" fill="#0F766E" />
          <rect x="31" y="22" width="38" height="16" rx="4" fill="#CCFBF1" />
          <rect x="31" y="45" width="10" height="9" rx="2" fill="#FFFFFF" />
          <rect x="45" y="45" width="10" height="9" rx="2" fill="#FFFFFF" />
          <rect x="59" y="45" width="10" height="9" rx="2" fill="#FBBF24" />
          <rect x="31" y="58" width="10" height="9" rx="2" fill="#FFFFFF" />
          <rect x="45" y="58" width="10" height="9" rx="2" fill="#FFFFFF" />
          <rect x="59" y="58" width="10" height="22" rx="2" fill="#F97316" />
          <rect x="31" y="71" width="24" height="9" rx="2" fill="#FFFFFF" />
        </svg>
      );

    case 'shield_lock':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
          <path d="M50 14 L80 24 V48 C80 67 66 80 50 86 C34 80 20 67 20 48 V24 Z" fill="#2563EB" />
          <rect x="38" y="46" width="24" height="20" rx="4" fill="#FBBF24" />
          <path d="M43 46 V39 C43 33 57 33 57 39 V46" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
          <circle cx="50" cy="56" r="3" fill="#1E293B" />
        </svg>
      );

    case 'password_key':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
          <circle cx="34" cy="50" r="16" fill="#F59E0B" stroke="#B45309" strokeWidth="3.5" />
          <circle cx="34" cy="50" r="6" fill="#FEF3C7" />
          <rect x="48" y="46" width="36" height="8" rx="4" fill="#F59E0B" />
          <rect x="66" y="54" width="6" height="10" rx="2" fill="#F59E0B" />
          <rect x="76" y="54" width="6" height="12" rx="2" fill="#F59E0B" />
        </svg>
      );

    case 'stranger_chat':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
          <rect x="16" y="20" width="68" height="50" rx="12" fill="#FEE2E2" stroke="#EF4444" strokeWidth="3.5" />
          <circle cx="50" cy="40" r="9" fill="#EF4444" />
          <path d="M47 37 Q50 32 53 37 C54 40 50 41 50 44" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="28" y="55" width="44" height="6" rx="3" fill="#FCA5A5" />
        </svg>
      );

    case 'gift_scam':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
          <rect x="20" y="38" width="60" height="44" rx="8" fill="#FB923C" />
          <rect x="16" y="28" width="68" height="14" rx="5" fill="#EA580C" />
          <rect x="45" y="28" width="10" height="54" fill="#FEF08A" />
          <circle cx="76" cy="24" r="12" fill="#EF4444" />
          <path d="M76 18 V25 M76 29 V30" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'teacher_link':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
          <rect x="16" y="22" width="68" height="56" rx="12" fill="#D1FAE5" stroke="#10B981" strokeWidth="3.5" />
          <path d="M35 50 L46 61 L66 39" stroke="#059669" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'shared_pc':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
          <rect x="18" y="20" width="64" height="44" rx="6" fill="#1E293B" />
          <rect x="24" y="26" width="52" height="32" rx="3" fill="#A7F3D0" />
          <path d="M44 42 H56 M51 37 L57 42 L51 47" stroke="#047857" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="40" y="64" width="20" height="10" fill="#64748B" />
          <rect x="28" y="74" width="44" height="6" rx="3" fill="#475569" />
        </svg>
      );

    case 'personal_id':
    default:
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
          <rect x="14" y="24" width="72" height="52" rx="10" fill="#DBEAFE" stroke="#2563EB" strokeWidth="3.5" />
          <circle cx="34" cy="46" r="9" fill="#3B82F6" />
          <path d="M23 64 C23 56 45 56 45 64" fill="#60A5FA" />
          <rect x="52" y="38" width="24" height="6" rx="3" fill="#1E40AF" />
          <rect x="52" y="49" width="20" height="5" rx="2.5" fill="#60A5FA" />
          <rect x="52" y="59" width="16" height="5" rx="2.5" fill="#93C5FD" />
        </svg>
      );
  }
};
