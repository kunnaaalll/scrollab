import { SpringOptions } from 'framer-motion';

// Durations (seconds)
export const TRANSITION_DURATIONS = {
  instant: 0,
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  verySlow: 0.8,
  ambient: 5,
};

// Easing Curves (Cubic Bezier)
export const EASING = {
  easeOut: [0.16, 1, 0.3, 1],
  easeInOut: [0.65, 0, 0.35, 1],
  anticipate: [0.36, 0, 0.66, -0.56],
};

export const SPRINGS: Record<string, any> = {
  bouncy: { type: 'spring', stiffness: 400, damping: 30 },
  smooth: { type: 'spring', stiffness: 100, damping: 20, mass: 1 },
  heavy: { type: 'spring', stiffness: 50, damping: 20, mass: 2 },
  reveal: { type: 'spring', stiffness: 60, damping: 20, mass: 1.5 },
  morph: { type: 'spring', stiffness: 40, damping: 25, mass: 2 },
};

// Morph & Depth Ranges
export const OPACITY_RANGES = {
  hidden: 0,
  subtle: 0.4,
  visible: 1,
};

export const BLUR_RANGES = {
  none: '0px',
  sm: '4px',
  md: '12px',
  lg: '24px',
  xl: '48px',
};

// Z-axis Spatial Layers
export const Z_LAYERS = {
  background: -100,
  midground: -50,
  foreground: 0,
  floating: 50,
  overlay: 100,
};

// Intersection Observer Thresholds for Reveals
export const REVEAL_THRESHOLDS = {
  early: 0.1,
  normal: 0.3,
  late: 0.6,
};
