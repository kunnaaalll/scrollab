'use client';

import { ReactNode } from 'react';
import { motion, useTransform } from 'framer-motion';
import { useSceneProgress } from '@/hooks/useSceneProgress';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface DepthFadeProps {
  children: ReactNode;
  className?: string;
  depthOffset?: number; // Distance on Z-axis
}

/**
 * DepthFade provides a Vision Pro inspired effect where objects further away 
 * disappear first based on scroll progress.
 */
export function DepthFade({ children, className, depthOffset = -100 }: DepthFadeProps) {
  const { ref, progress } = useSceneProgress<HTMLDivElement>();

  // The further away an object is (more negative), the earlier it starts fading out
  const fadeStart = 0.6 + (depthOffset / 1000); 
  const fadeEnd = 0.8 + (depthOffset / 1000);   
  
  const safeFadeStart = Math.max(0, Math.min(0.9, fadeStart));
  const safeFadeEnd = Math.max(0.1, Math.min(1, fadeEnd));

  const opacity = useTransform(progress, [0, safeFadeStart, safeFadeEnd, 1], [1, 1, 0, 0]);
  
  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        translateZ: depthOffset,
      }}
      className={cn("relative [transform-style:preserve-3d]", className)}
    >
      {children}
    </motion.div>
  );
}
