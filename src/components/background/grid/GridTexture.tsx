"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { BG_OPACITY, BG_COLORS } from '@/lib/background/constants';

interface GridTextureProps {
  className?: string;
  variant?: 'hero' | 'default';
  perspective?: boolean;
}

export function GridTexture({ className, variant = 'default', perspective = false }: GridTextureProps) {
  const opacity = BG_OPACITY.grid[variant];

  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none -z-10",
        perspective && "perspective-[1000px]",
        className
      )}
      style={{ opacity }}
    >
      <div 
        className={cn(
          "absolute inset-0 w-full h-full",
          perspective && "origin-bottom transform rotateX-[60deg] scale-150"
        )}
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(${BG_COLORS.whiteBase}, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(${BG_COLORS.whiteBase}, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
        }}
      />
    </div>
  );
}
