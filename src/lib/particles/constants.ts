export const PARTICLE_COLORS = {
  primary: '#06B6D4', // Cyan
  secondary: '#EC4899', // Pink
  highlight: '#FFFFFF', // White
};

export const DEVICE_PIXEL_RATIO = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1;

export type QualityLevel = 'desktop' | 'tablet' | 'mobile';

export const getQualityLevel = (width: number): QualityLevel => {
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

// Scaling factors for different devices
export const DENSITY_MULTIPLIER = {
  desktop: 1,
  tablet: 0.75,
  mobile: 0.5,
};

export const PARTICLE_CONFIGS = {
  ambient: {
    counts: { desktop: 600, tablet: 450, mobile: 300 },
    speed: 0.05,
    size: { min: 0.01, max: 0.04 },
    opacity: { min: 0.05, max: 0.2 },
  },
  glow: {
    counts: { desktop: 50, tablet: 35, mobile: 20 },
    speed: 0.02,
    size: { min: 0.5, max: 2.0 },
    opacity: { min: 0.1, max: 0.4 },
  },
  orbital: {
    counts: { desktop: 200, tablet: 150, mobile: 100 },
    speed: 0.1,
    size: { min: 0.02, max: 0.06 },
    opacity: { min: 0.2, max: 0.6 },
    radius: { min: 2, max: 5 },
  },
  network: {
    counts: { desktop: 150, tablet: 100, mobile: 75 },
    speed: 0.3,
    size: { min: 0.03, max: 0.08 },
    opacity: { min: 0.3, max: 0.8 },
  },
  data: {
    counts: { desktop: 300, tablet: 200, mobile: 100 },
    speed: 0.5,
    size: { min: 0.02, max: 0.05 },
    opacity: { min: 0.1, max: 0.5 },
  },
};
