'use client';

import React, { ReactNode } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { PAGE_TRANSITION_CONSTANTS } from '@/lib/page-transition/constants';

interface RouteTransitionProps {
  children: ReactNode;
}

export function RouteTransition({ children }: RouteTransitionProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  // Define variants for cinematic entry and exit
  const variants: import('framer-motion').Variants = {
    initial: {
      opacity: PAGE_TRANSITION_CONSTANTS.opacity.hidden,
      scale: shouldReduceMotion ? 1 : PAGE_TRANSITION_CONSTANTS.scale.midground,
      z: shouldReduceMotion ? 0 : PAGE_TRANSITION_CONSTANTS.translateZ.back,
      filter: shouldReduceMotion ? 'blur(0px)' : PAGE_TRANSITION_CONSTANTS.blur.overlay,
    },
    enter: {
      opacity: PAGE_TRANSITION_CONSTANTS.opacity.visible,
      scale: PAGE_TRANSITION_CONSTANTS.scale.normal,
      z: PAGE_TRANSITION_CONSTANTS.translateZ.neutral,
      filter: PAGE_TRANSITION_CONSTANTS.blur.initial,
      transition: {
        ...PAGE_TRANSITION_CONSTANTS.springs.cinematicEntry,
        opacity: { duration: PAGE_TRANSITION_CONSTANTS.durations.routeEntry, ease: 'easeOut' },
        filter: { duration: PAGE_TRANSITION_CONSTANTS.durations.routeEntry, ease: 'easeOut' }
      }
    },
    exit: {
      opacity: PAGE_TRANSITION_CONSTANTS.opacity.hidden,
      scale: shouldReduceMotion ? 1 : PAGE_TRANSITION_CONSTANTS.scale.foregroundFocus,
      z: shouldReduceMotion ? 0 : PAGE_TRANSITION_CONSTANTS.translateZ.forward,
      filter: shouldReduceMotion ? 'blur(0px)' : PAGE_TRANSITION_CONSTANTS.blur.overlay,
      transition: {
        ...PAGE_TRANSITION_CONSTANTS.springs.gentleExit,
        opacity: { duration: PAGE_TRANSITION_CONSTANTS.durations.routeExit, ease: 'easeIn' },
        filter: { duration: PAGE_TRANSITION_CONSTANTS.durations.routeExit, ease: 'easeIn' }
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={variants}
        style={{
          transformOrigin: 'center center',
          width: '100%',
          minHeight: '100vh',
          // Ensure hardware acceleration for these transforms
          willChange: 'transform, opacity, filter',
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
