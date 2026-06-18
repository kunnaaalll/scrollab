'use client';

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SharedGlowProps {
  color?: 'cyan' | 'pink' | 'primary';
  position?: 'top' | 'bottom' | 'center';
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

/**
 * SharedGlow carries lighting between sections to avoid hard lighting resets.
 * It provides the ambient background atmosphere.
 */
export function SharedGlow({ 
  color = 'cyan', 
  position = 'center', 
  intensity = 'medium',
  className 
}: SharedGlowProps) {
  
  const colors = {
    cyan: 'bg-cyan-500/20',
    pink: 'bg-pink-500/20',
    primary: 'bg-pink-500/20', // Scrollab primary is pinkish
  };

  const positions = {
    top: 'top-0 -translate-y-1/2',
    bottom: 'bottom-0 translate-y-1/2',
    center: 'top-1/2 -translate-y-1/2'
  };

  const intensities = {
    low: 'opacity-30 blur-[100px]',
    medium: 'opacity-50 blur-[120px]',
    high: 'opacity-80 blur-[150px]'
  };

  return (
    <div 
      className={cn(
        "absolute left-1/2 -translate-x-1/2 w-[80vw] h-[80vh] rounded-full pointer-events-none mix-blend-screen -z-10",
        colors[color],
        positions[position],
        intensities[intensity],
        className
      )} 
    />
  );
}
