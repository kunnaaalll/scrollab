"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { GlassPanel } from '@/components/spatial/panels/GlassPanel';
import { FloatingObject } from '@/components/physics/floating/FloatingObject';

export const RevenueCore = ({ className }: { className?: string }) => {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {/* Outer ambient glow */}
      <motion.div
        className="absolute inset-[-100px] rounded-full bg-cyan-500/20 blur-[80px]"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Core Sphere */}
      <FloatingObject
        amplitudeY={15}
        amplitudeX={10}
        duration={8}
        rotationRange={5}
        className="z-10"
      >
        <GlassPanel
          blur="heavy"
          opacity="light"
          radius="full"
          withGlow
          className="w-48 h-48 md:w-64 md:h-64 flex items-center justify-center border-white/20 shadow-[0_0_80px_rgba(6,182,212,0.3)] relative overflow-hidden"
        >
          {/* Inner core pulse */}
          <motion.div 
            className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-cyan-400 to-pink-500 blur-2xl opacity-80"
            animate={{
              scale: [0.8, 1.2, 0.8],
              rotate: [0, 90, 0]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </GlassPanel>
      </FloatingObject>

      {/* Orbital Rings */}
      <div className="absolute inset-[-150px] pointer-events-none z-0">
        <svg viewBox="0 0 500 500" className="w-full h-full">
          <motion.circle 
            cx="250" cy="250" r="180" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1" 
            className="text-white/10" 
            strokeDasharray="4 8"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            style={{ originX: "250px", originY: "250px" }}
          />
          <motion.circle 
            cx="250" cy="250" r="220" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1" 
            className="text-white/5" 
            strokeDasharray="2 6"
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            style={{ originX: "250px", originY: "250px" }}
          />
        </svg>
      </div>
    </div>
  );
};
