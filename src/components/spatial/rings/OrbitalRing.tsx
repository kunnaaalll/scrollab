"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from 'framer-motion';

interface OrbitalRingProps {
  size?: number;
  duration?: number;
  reverse?: boolean;
  color?: 'cyan' | 'pink' | 'white';
  className?: string;
  children?: React.ReactNode;
}

const colorMap = {
  cyan: 'border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]',
  pink: 'border-pink-500/20 shadow-[0_0_15px_rgba(236,72,153,0.1)]',
  white: 'border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]',
};

export const OrbitalRing = ({ 
  size = 300, 
  duration = 20, 
  reverse = false, 
  color = 'cyan',
  className,
  children
}: OrbitalRingProps) => {
  const reducedMotion = useReducedMotion();

  return (
    <div 
      className={cn('absolute rounded-full border border-dashed flex items-center justify-center', colorMap[color], className)}
      style={{
        width: size,
        height: size,
      }}
    >
      <motion.div
        className="w-full h-full rounded-full absolute inset-0"
        animate={{
          rotate: reducedMotion ? 0 : (reverse ? -360 : 360),
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Orbiting elements placed here will revolve around the center */}
        {children}
      </motion.div>
    </div>
  );
};
