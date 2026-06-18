export const PAGE_TRANSITION_CONSTANTS = {
  // Cinematic durations ensuring no harsh cuts
  durations: {
    overlayEntry: 0.8,
    overlayExit: 1.2,
    routeExit: 0.8,
    routeEntry: 1.5,
    longAmbient: 2.5,
  },
  
  // Depth of field and blur effects for the overlay veil
  blur: {
    initial: 'blur(0px)',
    max: 'blur(48px)', // High blur for Apple Vision Pro style
    overlay: 'blur(24px)',
  },

  // Graceful fades
  opacity: {
    hidden: 0,
    visible: 1,
    dimmed: 0.5,
  },

  // Z-axis simulation scales
  scale: {
    deepBackground: 0.9,
    midground: 0.95,
    normal: 1,
    foregroundFocus: 1.05,
  },
  
  // Actual Z translation (if using 3D perspective transforms)
  translateZ: {
    back: -100,
    neutral: 0,
    forward: 100,
  },

  // Physical motion presets ensuring elegance and restraint
  springs: {
    // Used for entering elements - confident, deliberate
    cinematicEntry: {
      type: 'spring',
      stiffness: 100,
      damping: 30,
      mass: 1,
    },
    // Used for exiting elements - fading away
    gentleExit: {
      type: 'spring',
      stiffness: 80,
      damping: 20,
      mass: 0.8,
    },
    // Floating objects, continuous
    float: {
      type: 'spring',
      stiffness: 40,
      damping: 10,
      mass: 2,
    }
  },

  // Enforced Z-indexes to prevent overlaps
  zIndex: {
    background: -10,
    oldRoute: 0,
    overlay: 100,
    loadingWorld: 150,
    newRoute: 200,
    progress: 300,
  }
} as const;
