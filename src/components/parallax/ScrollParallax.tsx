"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { PARALLAX_CONSTANTS } from '@/lib/parallax/constants';
import { useDepth } from '@/hooks/useDepth';

interface ScrollParallaxProps {
  children: React.ReactNode;
  depth?: number;
  className?: string;
}

export const ScrollParallax = ({ children, depth = 0.5, className = '' }: ScrollParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollMultiplier } = useDepth(depth);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Apply physics-based smoothing
  const smoothProgress = useSpring(scrollYProgress, PARALLAX_CONSTANTS.SPRING.SCROLL);

  // Background layers move more to create parallax separation
  const maxOffset = PARALLAX_CONSTANTS.INTENSITY.SCROLL * scrollMultiplier;
  
  // As we scroll down (progress 0 to 1), move the element up (from positive offset to negative)
  const y = useTransform(smoothProgress, [0, 1], [maxOffset, -maxOffset]);

  if (reducedMotion) {
    return <div className={className} ref={ref}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};
