"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

interface NetworkLineProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color?: string;
  duration?: number;
}

export const NetworkLine = ({ 
  startX, 
  startY, 
  endX, 
  endY, 
  color = 'rgba(6, 182, 212, 0.5)',
  duration = 3
}: NetworkLineProps) => {
  const reducedMotion = useReducedMotion();
  
  // Calculate a subtle bezier curve between points
  const path = `M ${startX} ${startY} Q ${(startX + endX) / 2} ${(startY + endY) / 2 - 50} ${endX} ${endY}`;

  return (
    <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
      {/* Base faint line */}
      <path 
        d={path}
        fill="transparent"
        stroke={color}
        strokeWidth={1}
        strokeOpacity={0.2}
      />
      {/* Animated glowing packet */}
      {!reducedMotion && (
        <motion.path
          d={path}
          fill="transparent"
          stroke={color}
          strokeWidth={2}
          strokeDasharray="10 1000"
          initial={{ strokeDashoffset: 1000 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ filter: 'drop-shadow(0 0 4px currentColor)' }}
        />
      )}
    </svg>
  );
};
