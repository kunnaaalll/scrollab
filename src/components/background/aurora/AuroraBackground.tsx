"use client";

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { BG_OPACITY, BG_ANIMATION_DURATIONS, BG_COLORS } from '@/lib/background/constants';

interface AuroraBackgroundProps {
  className?: string;
  variant?: 'hero' | 'default' | 'subtle';
}

export function AuroraBackground({ className, variant = 'default' }: AuroraBackgroundProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const opacity = BG_OPACITY.aurora[variant];

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none -z-10",
        className
      )}
      style={{ opacity }}
    >
      <div 
        className={cn(
          "absolute -inset-[10%] opacity-50 blur-[100px]",
          !prefersReducedMotion && "animate-aurora"
        )}
      >
        {/* Cyan Aurora */}
        <div 
          className="absolute top-[20%] left-[20%] w-[50%] h-[50%] rounded-full mix-blend-screen"
          style={{ 
            background: `radial-gradient(circle at center, rgba(${BG_COLORS.primaryCyanBase}, 0.8) 0%, rgba(${BG_COLORS.primaryCyanBase}, 0) 60%)`,
            transform: 'translateZ(0)',
          }}
        />
        {/* Pink Aurora */}
        <div 
          className="absolute top-[40%] right-[20%] w-[40%] h-[60%] rounded-full mix-blend-screen"
          style={{ 
            background: `radial-gradient(circle at center, rgba(${BG_COLORS.secondaryPinkBase}, 0.6) 0%, rgba(${BG_COLORS.secondaryPinkBase}, 0) 60%)`,
            transform: 'translateZ(0)',
          }}
        />
      </div>

      <style jsx>{`
        @keyframes aurora {
          0% {
            transform: rotate(0deg) scale(1) translateZ(0);
          }
          33% {
            transform: rotate(120deg) scale(1.1) translateZ(0);
          }
          66% {
            transform: rotate(240deg) scale(0.9) translateZ(0);
          }
          100% {
            transform: rotate(360deg) scale(1) translateZ(0);
          }
        }
        .animate-aurora {
          animation: aurora ${BG_ANIMATION_DURATIONS.auroraDrift} linear infinite;
        }
      `}</style>
    </div>
  );
}
