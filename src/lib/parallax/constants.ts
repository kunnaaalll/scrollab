export const PARALLAX_CONSTANTS = {
  // Layer Depths (Range: 0 to 1)
  // 1 is closest (foreground/floating), 0 is furthest (background)
  DEPTHS: {
    BACKGROUND: 0.1,
    MIDGROUND: 0.3,
    FOREGROUND: 0.6,
    FLOATING: 0.9,
  },
  
  // Motion Intensities
  INTENSITY: {
    MOUSE: 30, // Maximum pixel translation for mouse movement
    SCROLL: 150, // Maximum pixel translation for scroll parallax
  },
  
  // Spring Settings (Physics-based easing)
  SPRING: {
    MOUSE: { stiffness: 100, damping: 30, mass: 0.5 },
    SCROLL: { stiffness: 50, damping: 20, mass: 1 },
  },
  
  // Camera & Perspective Settings
  PERSPECTIVE: {
    FOV: 1200, // Depth compression base (pixels)
    MAX_Z: -1000, // Maximum depth push for background elements
  },
  
  // Motion Limits
  LIMITS: {
    MAX_ROTATION: 5, // Maximum rotation in degrees for floating panels
  }
};
