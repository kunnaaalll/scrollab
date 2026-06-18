"use client";

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { LIGHTING_COLORS, LIGHTING_DURATIONS } from '@/lib/lighting/constants';

interface RimLightLayerProps {
  primaryColor?: string;
  secondaryColor?: string;
  className?: string;
}

export const RimLightLayer = ({
  primaryColor = LIGHTING_COLORS.CYAN,
  secondaryColor = LIGHTING_COLORS.PINK,
  className = '',
}: RimLightLayerProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`absolute inset-0 pointer-events-none z-10 ${className}`}>
      {/* Top/Left Cyan Edge */}
      <motion.div
        className="absolute inset-0"
        style={{
          boxShadow: `inset 1px 1px 15px 0px ${primaryColor}15, inset 0px 1px 1px 0px ${primaryColor}30`,
        }}
        animate={
          shouldReduceMotion
            ? { opacity: 1 }
            : { opacity: [0.6, 1, 0.6] }
        }
        transition={{
          duration: LIGHTING_DURATIONS.MEDIUM,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Bottom/Right Pink Edge */}
      <motion.div
        className="absolute inset-0"
        style={{
          boxShadow: `inset -1px -1px 20px 0px ${secondaryColor}10, inset 0px -1px 1px 0px ${secondaryColor}20`,
        }}
        animate={
          shouldReduceMotion
            ? { opacity: 1 }
            : { opacity: [1, 0.5, 1] }
        }
        transition={{
          duration: LIGHTING_DURATIONS.FAST,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};
