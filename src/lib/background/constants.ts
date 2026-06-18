export const BG_COLORS = {
  primaryCyan: '#06B6D4',
  primaryCyanBase: '6, 182, 212',
  secondaryPink: '#EC4899',
  secondaryPinkBase: '236, 72, 153',
  baseZinc: '#0A0A0A',
  baseZincBase: '10, 10, 10',
  whiteBase: '255, 255, 255',
} as const;

export const BG_OPACITY = {
  aurora: {
    hero: 0.15,
    default: 0.1,
    subtle: 0.05,
  },
  mesh: {
    hero: 0.4,
    default: 0.25,
  },
  noise: {
    hero: 0.04,
    default: 0.02,
    subtle: 0.01,
  },
  grid: {
    hero: 0.15,
    default: 0.08,
  },
  radialGlow: {
    intense: 0.2,
    default: 0.1,
    subtle: 0.05,
  },
} as const;

export const BG_ANIMATION_DURATIONS = {
  auroraDrift: '30s',
  meshMorph: '20s',
  particleFloat: '15s',
  glowPulse: '8s',
} as const;

export const BG_VARIANTS = {
  hero: 'hero',
  services: 'services',
  results: 'results',
  process: 'process',
  ai: 'ai',
  dashboard: 'dashboard',
  testimonials: 'testimonials',
  cta: 'cta',
} as const;

export type BgVariant = keyof typeof BG_VARIANTS;
