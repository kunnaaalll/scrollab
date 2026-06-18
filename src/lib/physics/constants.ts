export const PHYSICS_CONSTANTS = {
  FLOATING: {
    AMPLITUDES: {
      SUBTLE: 5,
      DEFAULT: 15,
      PRONOUNCED: 30,
    },
    FREQUENCIES: {
      SLOW: 30, // seconds
      DEFAULT: 20,
      FAST: 10, // still slow enough to feel organic
    },
    ROTATION: {
      SUBTLE: 1, // degrees
      DEFAULT: 2,
      PRONOUNCED: 5,
    },
    SCALE: {
      MIN: 1,
      MAX: 1.02,
    }
  },
  ORBIT: {
    RADII: {
      CLOSE: 50,
      DEFAULT: 150,
      FAR: 300,
    },
    SPEEDS: {
      SLOW: 45, // seconds per revolution
      DEFAULT: 30,
      FAST: 15,
    }
  },
  SPRING: {
    GENTLE: { stiffness: 40, damping: 20, mass: 1 },
    RESPONSIVE: { stiffness: 100, damping: 15, mass: 1 },
    SNAPPY: { stiffness: 200, damping: 20, mass: 1 },
  }
} as const;
