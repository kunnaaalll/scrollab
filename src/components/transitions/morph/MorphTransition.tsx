'use client';

import { ReactNode } from 'react';
import { motion, useTransform } from 'framer-motion';
import { useSceneProgress } from '@/hooks/useSceneProgress';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MorphTransitionProps {
  children: ReactNode;
  className?: string;
  // Dictates the feel of the transition
  type?: 'fog' | 'memory' | 'depth'; 
}

/**
 * MorphTransition allows one scene to dissolve into another.
 * Handles the cinematic feeling like fog, memory, or depth.
 */
export function MorphTransition({ children, className, type = 'fog' }: MorphTransitionProps) {
  const { ref, progress } = useSceneProgress<HTMLDivElement>({
    offset: ['start end', 'end start']
  });

  const opacity = useTransform(
    progress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  const blur = useTransform(
    progress,
    [0, 0.2, 0.8, 1],
    ['blur(20px)', 'blur(0px)', 'blur(0px)', 'blur(20px)']
  );

  const scale = useTransform(
    progress,
    [0, 0.2, 0.8, 1],
    [0.9, 1, 1, 1.1]
  );

  const z = useTransform(
    progress,
    [0, 0.2, 0.8, 1],
    [-200, 0, 0, 200]
  );

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        ...(type === 'fog' && { filter: blur }),
        ...(type === 'memory' && { scale }),
        ...(type === 'depth' && { translateZ: z, scale }),
      }}
      className={cn("w-full relative", className)}
    >
      {children}
    </motion.div>
  );
}
