'use client';

import React, { memo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useRouteTransition } from '@/hooks/useRouteTransition';
import { PAGE_TRANSITION_CONSTANTS } from '@/lib/page-transition/constants';

/**
 * LoadingWorld
 * 
 * Replaces traditional spinners with an atmospheric, breathing environment.
 * Features floating particles and orbital rings to make loading feel alive.
 */
export const LoadingWorld = memo(function LoadingWorld() {
  const { state } = useRouteTransition();
  const shouldReduceMotion = useReducedMotion();

  const isLoading = state === 'loading';

  if (shouldReduceMotion) return null; // Fallback for accessibility

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading-world"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: PAGE_TRANSITION_CONSTANTS.durations.overlayEntry }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: PAGE_TRANSITION_CONSTANTS.zIndex.loadingWorld,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Central breathing orb */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, rgba(236,72,153,0.1) 60%, transparent 100%)',
              filter: 'blur(10px)',
            }}
          />

          {/* Orbital Ring */}
          <motion.div
            animate={{
              rotateZ: 360,
              rotateX: [60, 70, 60],
              rotateY: [10, 30, 10],
            }}
            transition={{
              rotateZ: { duration: 15, repeat: Infinity, ease: "linear" },
              rotateX: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              rotateY: { duration: 12, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{
              position: 'absolute',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.05)',
              borderTop: '1px solid rgba(6,182,212,0.4)',
              transformStyle: 'preserve-3d',
            }}
          />

          {/* Ambient Particles (CSS version for lightweight loading) */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -30, 0],
                x: [0, (i % 2 === 0 ? 20 : -20), 0],
                opacity: [0, 0.5, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
              style={{
                position: 'absolute',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: i % 2 === 0 ? '#06B6D4' : '#F472B6',
                filter: 'blur(1px)',
                left: `calc(50% + ${(i - 3) * 30}px)`,
                top: `calc(50% + ${(i % 3) * 20}px)`,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
});
