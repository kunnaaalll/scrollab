"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { BG_OPACITY } from '@/lib/background/constants';

interface NoiseTextureProps {
  className?: string;
  variant?: 'hero' | 'default' | 'subtle';
}

export function NoiseTexture({ className, variant = 'default' }: NoiseTextureProps) {
  const opacity = BG_OPACITY.noise[variant];

  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none -z-10 mix-blend-overlay",
        className
      )}
      style={{ opacity }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}
