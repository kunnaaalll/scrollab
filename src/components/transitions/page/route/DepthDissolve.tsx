'use client';

import React, { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useRouteTransition } from '@/hooks/useRouteTransition';
import { PAGE_TRANSITION_CONSTANTS } from '@/lib/page-transition/constants';

interface DepthDissolveProps {
  children: ReactNode;
  depthOffset?: number; // Allows tweaking how "far" this object is
  delay?: number; // Base delay
}

/**
 * DepthDissolve
 * Inspired by Apple Vision Pro. Far objects disappear first, near objects last.
 * Wrap elements with this to give them a volumetric exit/entry sequence.
 */
export function DepthDissolve({ children, depthOffset = 0, delay = 0 }: DepthDissolveProps) {
  const { state } = useRouteTransition();
  const shouldReduceMotion = useReducedMotion();
  
  const isExiting = state === 'exiting';

  // Calculate dynamic exit timing based on depth
  // Farther objects (negative depth) exit faster
  const exitDuration = Math.max(0.3, PAGE_TRANSITION_CONSTANTS.durations.routeExit + (depthOffset * 0.1));
  const exitDelay = delay + (depthOffset < 0 ? 0 : depthOffset * 0.05);

  const variants: import('framer-motion').Variants = {
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        duration: PAGE_TRANSITION_CONSTANTS.durations.routeEntry,
        ease: 'easeOut',
      }
    },
    hidden: {
      opacity: 0,
      filter: shouldReduceMotion ? 'blur(0px)' : PAGE_TRANSITION_CONSTANTS.blur.overlay,
      scale: shouldReduceMotion ? 1 : (1 - (depthOffset * 0.02)), // Objects shrink slightly as they recede
      transition: {
        duration: exitDuration,
        delay: exitDelay,
        ease: 'easeIn',
      }
    }
  };

  return (
    <motion.div
      initial="visible"
      animate={isExiting ? 'hidden' : 'visible'}
      variants={variants}
      style={{
        willChange: 'opacity, filter, transform'
      }}
    >
      {children}
    </motion.div>
  );
}
