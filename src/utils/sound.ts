let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (Ctx) {
      audioCtx = new Ctx();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function playTone(
  frequency: number,
  duration: number,
  type: OscillatorType = 'sine',
  startTimeOffset = 0,
  volume = 0.14
) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime + startTimeOffset;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, now);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(volume, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + duration + 0.02);
}

export function playClickSound(enabled: boolean) {
  if (!enabled) return;
  playTone(540, 0.07, 'triangle', 0, 0.08);
}

export function playCorrectSound(enabled: boolean) {
  if (!enabled) return;
  playTone(523.25, 0.12, 'sine', 0, 0.14); // C5
  playTone(659.25, 0.14, 'sine', 0.09, 0.14); // E5
  playTone(783.99, 0.22, 'sine', 0.18, 0.15); // G5
}

export function playWrongSound(enabled: boolean) {
  if (!enabled) return;
  playTone(310, 0.14, 'triangle', 0, 0.12);
  playTone(240, 0.22, 'triangle', 0.12, 0.12);
}

export function playVictorySound(enabled: boolean) {
  if (!enabled) return;
  const notes = [523.25, 659.25, 783.99, 1046.5];
  notes.forEach((freq, idx) => {
    playTone(freq, idx === notes.length - 1 ? 0.38 : 0.14, 'sine', idx * 0.11, 0.15);
  });
}

export function playBadgeSound(enabled: boolean) {
  if (!enabled) return;
  const notes = [587.33, 739.99, 880, 1174.66];
  notes.forEach((freq, idx) => {
    playTone(freq, idx === notes.length - 1 ? 0.42 : 0.12, 'triangle', idx * 0.1, 0.13);
  });
}
