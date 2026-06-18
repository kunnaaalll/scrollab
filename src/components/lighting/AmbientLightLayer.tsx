"use client";

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { LIGHTING_COLORS, LIGHTING_INTENSITIES, LIGHTING_DURATIONS } from '@/lib/lighting/constants';

interface AmbientLightLayerProps {
  color?: string;
  intensity?: number;
  className?: string;
}

export const AmbientLightLayer = ({
  color = LIGHTING_COLORS.CYAN,
  intensity = LIGHTING_INTENSITIES.GHOST,
  className = '',
}: AmbientLightLayerProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}>
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${color} 0%, transparent 70%)`,
          opacity: intensity,
        }}
        animate={
          shouldReduceMotion
            ? { opacity: intensity }
            : {
                opacity: [intensity * 0.8, intensity * 1.2, intensity * 0.8],
                scale: [1, 1.05, 1],
              }
        }
        transition={{
          duration: LIGHTING_DURATIONS.GLACIAL,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};
