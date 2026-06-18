"use client";

import React, { useEffect } from 'react';
import { motion, motionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { PARALLAX_CONSTANTS } from '@/lib/parallax/constants';
import { useDepth } from '@/hooks/useDepth';

// Global shared motion values — use `motionValue()` factory (not the hook) so
// they can safely live at module scope and be shared across all instances.
const globalMouseX = motionValue(0);
const globalMouseY = motionValue(0);
let isListenerActive = false;

interface MouseParallaxProps {
  children: React.ReactNode;
  depth?: number;
  className?: string;
}

export const MouseParallax = ({ children, depth = 0.5, className = '' }: MouseParallaxProps) => {
  const reducedMotion = useReducedMotion();
  const { mouseMultiplier } = useDepth(depth);

  useEffect(() => {
    if (typeof window !== 'undefined' && !isListenerActive && !reducedMotion) {
      isListenerActive = true;
      const handlePointerMove = (e: PointerEvent) => {
        // Normalize coordinates from -1 to 1 based on screen center
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        globalMouseX.set(x);
        globalMouseY.set(y);
      };

      window.addEventListener('pointermove', handlePointerMove, { passive: true });
      return () => {
        window.removeEventListener('pointermove', handlePointerMove);
        isListenerActive = false;
      };
    }
  }, [reducedMotion]);

  // Apply smooth spring physics
  const springX = useSpring(globalMouseX, PARALLAX_CONSTANTS.SPRING.MOUSE);
  const springY = useSpring(globalMouseY, PARALLAX_CONSTANTS.SPRING.MOUSE);

  // Maximum movement is scaled by depth multiplier
  const maxMovement = PARALLAX_CONSTANTS.INTENSITY.MOUSE * mouseMultiplier;
  
  const x = useTransform(springX, [-1, 1], [-maxMovement, maxMovement]);
  const y = useTransform(springY, [-1, 1], [-maxMovement, maxMovement]);

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div style={{ x, y }} className={className}>
      {children}
    </motion.div>
  );
};
