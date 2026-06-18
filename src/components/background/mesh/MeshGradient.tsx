"use client";

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { BG_OPACITY, BG_ANIMATION_DURATIONS, BG_COLORS } from '@/lib/background/constants';

interface MeshGradientProps {
  className?: string;
  variant?: 'hero' | 'default';
}

export function MeshGradient({ className, variant = 'default' }: MeshGradientProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const opacity = BG_OPACITY.mesh[variant];

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none -z-20",
        className
      )}
      style={{ opacity, backgroundColor: BG_COLORS.baseZinc }}
    >
      <div 
        className={cn(
          "absolute inset-0 blur-[120px] opacity-80 mix-blend-screen",
          !prefersReducedMotion && "animate-mesh"
        )}
      >
        {/* Blob 1 */}
        <div 
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full mix-blend-screen animate-blob"
          style={{ 
            background: `radial-gradient(circle at center, rgba(${BG_COLORS.primaryCyanBase}, 0.7) 0%, rgba(${BG_COLORS.primaryCyanBase}, 0) 70%)`,
            transform: 'translateZ(0)',
          }}
        />
        {/* Blob 2 */}
        <div 
          className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full mix-blend-screen animate-blob animation-delay-2000"
          style={{ 
            background: `radial-gradient(circle at center, rgba(${BG_COLORS.secondaryPinkBase}, 0.5) 0%, rgba(${BG_COLORS.secondaryPinkBase}, 0) 70%)`,
            transform: 'translateZ(0)',
          }}
        />
        {/* Blob 3 */}
        <div 
          className="absolute top-[20%] right-[10%] w-[50%] h-[50%] rounded-full mix-blend-screen animate-blob animation-delay-4000"
          style={{ 
            background: `radial-gradient(circle at center, rgba(${BG_COLORS.primaryCyanBase}, 0.4) 0%, rgba(${BG_COLORS.primaryCyanBase}, 0) 70%)`,
            transform: 'translateZ(0)',
          }}
        />
      </div>

      <style jsx>{`
        @keyframes mesh {
          0% {
            transform: scale(1) translate(0px, 0px) translateZ(0);
          }
          33% {
            transform: scale(1.1) translate(30px, -50px) translateZ(0);
          }
          66% {
            transform: scale(0.9) translate(-20px, 20px) translateZ(0);
          }
          100% {
            transform: scale(1) translate(0px, 0px) translateZ(0);
          }
        }
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1) translateZ(0);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1) translateZ(0);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9) translateZ(0);
          }
          100% {
            transform: translate(0px, 0px) scale(1) translateZ(0);
          }
        }
        .animate-mesh {
          animation: mesh ${BG_ANIMATION_DURATIONS.meshMorph} ease-in-out infinite alternate;
        }
        .animate-blob {
          animation: blob ${BG_ANIMATION_DURATIONS.meshMorph} infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
