'use client';

import React, { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PAGE_TRANSITION_CONSTANTS } from '@/lib/page-transition/constants';

interface SharedElementContainerProps {
  children: ReactNode;
  layoutId: string;
  className?: string;
}

/**
 * SharedElementContainer
 * 
 * Preserves spatial continuity across route transitions for hero objects,
 * logos, cards, etc.
 * 
 * Requires that the parent route is wrapped in an <AnimatePresence mode="wait">
 * or that this is used within a context that understands layoutId.
 */
export function SharedElementContainer({ children, layoutId, className }: SharedElementContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  // If the user prefers reduced motion, we skip the complex layout animation
  // and just render the content normally to avoid layout shifts they might find jarring.
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      layoutId={layoutId}
      className={className}
      transition={PAGE_TRANSITION_CONSTANTS.springs.cinematicEntry}
      style={{
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </motion.div>
  );
}
