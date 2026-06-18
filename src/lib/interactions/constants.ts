export const MAGNETIC_STRENGTHS = {
  soft: 5, // 5px max translation
  medium: 8,
  strong: 12, // 12px max translation
};

export const HOVER_SCALE_LIMITS = {
  button: 1.02,
  card: 1.01,
  icon: 1.05,
};

export const GLOW_OPACITIES = {
  subtle: 0.05,
  medium: 0.1,
  active: 0.15,
};

export const RIPPLE_DURATIONS = {
  fast: 300, // ms
  standard: 500, // ms
};

export const CURSOR_SIZES = {
  default: 16,
  link: 24,
  button: 32,
  cta: 48,
  card: 40,
  text: 4,
};

export const SPRING_PRESETS = {
  smooth: { type: "spring", stiffness: 300, damping: 30, mass: 1 },
  bouncy: { type: "spring", stiffness: 400, damping: 20, mass: 1 },
  slow: { type: "spring", stiffness: 100, damping: 20, mass: 1.5 },
  magnetic: { type: "spring", stiffness: 150, damping: 15, mass: 0.5 },
};
