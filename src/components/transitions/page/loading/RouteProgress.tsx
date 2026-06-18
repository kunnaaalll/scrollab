'use client';

import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouteTransition } from '@/hooks/useRouteTransition';
import { PAGE_TRANSITION_CONSTANTS } from '@/lib/page-transition/constants';

/**
 * RouteProgress
 * 
 * Exposes the transition progress visually. This is not a traditional percentage bar,
 * but rather a subtle cinematic indicator (like a light streak) that supports narrative
 * route animations.
 */
export const RouteProgress = memo(function RouteProgress() {
  const { state, progress } = useRouteTransition();

  // Show progress if we're not idle
  const isVisible = state !== 'idle';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="route-progress-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            zIndex: PAGE_TRANSITION_CONSTANTS.zIndex.progress,
            pointerEvents: 'none',
          }}
        >
          {/* The light streak */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            transition={{ ease: "easeOut", duration: 0.3 }}
            style={{
              height: '100%',
              width: '100%',
              background: 'linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.8) 50%, rgba(236,72,153,1) 100%)',
              transformOrigin: 'left',
              boxShadow: '0 0 10px rgba(236,72,153,0.5)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
});
