"use client";

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { LIGHTING_COLORS, LIGHTING_INTENSITIES, LIGHTING_DURATIONS } from '@/lib/lighting/constants';

interface DirectionalLightLayerProps {
  color?: string;
  intensity?: number;
  angle?: number; // degrees
  className?: string;
}

export const DirectionalLightLayer = ({
  color = LIGHTING_COLORS.WHITE,
  intensity = LIGHTING_INTENSITIES.LOW,
  angle = 45,
  className = '',
}: DirectionalLightLayerProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}>
      <motion.div
        className="absolute inset-0 w-[150%] h-[150%] -left-[25%] -top-[25%]"
        style={{
          background: `linear-gradient(${angle}deg, ${color} 0%, transparent 40%)`,
          opacity: intensity,
        }}
        animate={
          shouldReduceMotion
            ? { opacity: intensity }
            : {
                opacity: [intensity * 0.7, intensity, intensity * 0.7],
                rotate: [0, 2, 0, -2, 0],
              }
        }
        transition={{
          duration: LIGHTING_DURATIONS.SLOW,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};
