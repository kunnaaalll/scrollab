export const LIGHTING_COLORS = {
  CYAN: '#06B6D4',
  PINK: '#EC4899',
  PINK_LIGHT: '#F472B6',
  WHITE: '#FFFFFF',
  ZINC_900: '#18181B',
  TRANSPARENT: 'transparent',
} as const;

export const LIGHTING_INTENSITIES = {
  GHOST: 0.05,
  LOW: 0.1,
  MEDIUM: 0.25,
  HIGH: 0.5,
  PEAK: 0.8,
} as const;

export const LIGHTING_DURATIONS = {
  FAST: 10, // 10s cycles
  MEDIUM: 20, // 20s cycles
  SLOW: 30, // 30s cycles
  GLACIAL: 40, // 40s cycles
} as const;

export const LIGHTING_BLUR = {
  SOFT: 'blur(60px)',
  MEDIUM: 'blur(100px)',
  HEAVY: 'blur(150px)',
} as const;
