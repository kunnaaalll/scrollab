"use client";

import React from 'react';
import { PARALLAX_CONSTANTS } from '@/lib/parallax/constants';

interface PerspectiveLayerProps {
  children: React.ReactNode;
  className?: string;
  fov?: number;
}

export const PerspectiveLayer = ({ 
  children, 
  className = '',
  fov = PARALLAX_CONSTANTS.PERSPECTIVE.FOV
}: PerspectiveLayerProps) => {
  return (
    <div 
      className={`relative w-full h-full ${className}`}
      style={{
        perspective: `${fov}px`,
        transformStyle: 'preserve-3d',
        perspectiveOrigin: 'center center',
      }}
    >
      {children}
    </div>
  );
};
