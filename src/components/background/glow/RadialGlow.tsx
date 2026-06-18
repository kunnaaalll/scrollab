import React from 'react';
import { cn } from '@/lib/utils';
import { BG_OPACITY, BG_COLORS } from '@/lib/background/constants';

interface RadialGlowProps {
  className?: string;
  color?: 'cyan' | 'pink' | 'white';
  variant?: 'intense' | 'default' | 'subtle';
  position?: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  size?: number; // width and height in px
}

const colorMap = {
  cyan: BG_COLORS.primaryCyanBase,
  pink: BG_COLORS.secondaryPinkBase,
  white: BG_COLORS.whiteBase,
};

const positionMap = {
  'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  'top-left': 'top-0 left-0 -translate-x-1/2 -translate-y-1/2',
  'top-right': 'top-0 right-0 translate-x-1/2 -translate-y-1/2',
  'bottom-left': 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
  'bottom-right': 'bottom-0 right-0 translate-x-1/2 translate-y-1/2',
};

export function RadialGlow({ 
  className, 
  color = 'cyan', 
  variant = 'default',
  position = 'center',
  size = 600,
}: RadialGlowProps) {
  const opacity = BG_OPACITY.radialGlow[variant];
  const baseColor = colorMap[color];
  const posClass = positionMap[position];

  return (
    <div
      className={cn(
        "absolute pointer-events-none -z-10 mix-blend-screen rounded-full",
        posClass,
        className
      )}
      style={{ 
        opacity,
        width: size,
        height: size,
        background: `radial-gradient(circle at center, rgba(${baseColor}, 1) 0%, rgba(${baseColor}, 0) 70%)`,
        filter: `blur(${size / 4}px)`,
        transform: `${position === 'center' ? 'translate(-50%, -50%)' : ''} translateZ(0)`,
      }}
    />
  );
}
