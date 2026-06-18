'use client';

import { ReactNode } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SceneContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * SceneContainer provides the master spatial context for the page.
 * It establishes the 3D perspective and allows child sections to overlap
 * cleanly without layout breaking.
 */
export function SceneContainer({ children, className }: SceneContainerProps) {
  return (
    <div 
      className={cn(
        "relative w-full overflow-hidden",
        // Setup 3D perspective context for children
        "[perspective:1000px] [transform-style:preserve-3d]",
        className
      )}
    >
      {/* 
        Elements within this container can use z-index and translateZ
        to overlap organically.
      */}
      {children}
    </div>
  );
}
