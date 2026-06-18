'use client';

import React, { memo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useRouteTransition } from '@/hooks/useRouteTransition';
import { PAGE_TRANSITION_CONSTANTS } from '@/lib/page-transition/constants';

export const TransitionOverlay = memo(function TransitionOverlay() {
  const { isTransitioning, state } = useRouteTransition();
  const shouldReduceMotion = useReducedMotion();

  // The overlay is only active when we are in the 'overlay' or 'loading' states
  const isOverlayActive = state === 'overlay' || state === 'loading' || state === 'exiting';

  return (
    <AnimatePresence>
      {isOverlayActive && (
        <motion.div
          key="transition-overlay"
          initial={{ 
            opacity: 0,
            backdropFilter: PAGE_TRANSITION_CONSTANTS.blur.initial 
          }}
          animate={{ 
            opacity: 1,
            backdropFilter: shouldReduceMotion 
              ? 'blur(0px)' 
              : PAGE_TRANSITION_CONSTANTS.blur.overlay 
          }}
          exit={{ 
            opacity: 0,
            backdropFilter: PAGE_TRANSITION_CONSTANTS.blur.initial 
          }}
          transition={{ 
            duration: state === 'exiting' 
              ? PAGE_TRANSITION_CONSTANTS.durations.overlayEntry 
              : PAGE_TRANSITION_CONSTANTS.durations.overlayExit,
            ease: 'easeInOut' 
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: PAGE_TRANSITION_CONSTANTS.zIndex.overlay,
            pointerEvents: 'none',
            // Create a huge blurred atmospheric gradient instead of a solid color
            background: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.05) 0%, rgba(236, 72, 153, 0.02) 50%, transparent 100%)',
          }}
        >
          {/* Add a subtle noise texture to ground the overlay physically */}
          <div 
            className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: 'url("/assets/textures/noise.png")', // Assumes a global noise asset exists
              backgroundRepeat: 'repeat',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
});
