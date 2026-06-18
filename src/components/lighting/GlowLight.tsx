"use client";

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { LIGHTING_COLORS, LIGHTING_INTENSITIES, LIGHTING_DURATIONS, LIGHTING_BLUR } from '@/lib/lighting/constants';

interface GlowLightProps {
  color?: string;
  intensity?: number;
  size?: string; // e.g., '400px', '50vw'
  x?: string; // e.g., '50%'
  y?: string; // e.g., '50%'
  blur?: string;
  duration?: number;
  className?: string;
}

export const GlowLight = ({
  color = LIGHTING_COLORS.CYAN,
  intensity = LIGHTING_INTENSITIES.MEDIUM,
  size = '600px',
  x = '50%',
  y = '50%',
  blur = LIGHTING_BLUR.MEDIUM,
  duration = LIGHTING_DURATIONS.SLOW,
  className = '',
}: GlowLightProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none mix-blend-screen z-0 ${className}`}
      style={{
        width: size,
        height: size,
        left: `calc(${x} - ${size} / 2)`,
        top: `calc(${y} - ${size} / 2)`,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: blur,
        opacity: intensity,
      }}
      animate={
        shouldReduceMotion
          ? { opacity: intensity }
          : {
              opacity: [intensity * 0.7, intensity * 1.1, intensity * 0.7],
              scale: [1, 1.1, 1],
            }
      }
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};
