"use client";

import React from 'react';
import { GlassPanel } from '../panels/GlassPanel';
import { ParallaxLayer } from '@/components/parallax/ParallaxLayer';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FloatingCardProps extends React.ComponentProps<typeof GlassPanel> {
  depth?: number;
  interactive?: boolean;
}

export const FloatingCard = ({ 
  children, 
  depth = 1, 
  interactive = true,
  className,
  ...props 
}: FloatingCardProps) => {
  const reducedMotion = useReducedMotion();

  const content = (
    <GlassPanel 
      className={cn(
        'w-full h-full transition-all duration-300 ease-out',
        interactive && !reducedMotion ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer' : '',
        className
      )}
      {...props}
    >
      {children}
    </GlassPanel>
  );

  if (depth === 0) {
    return content;
  }

  return (
    <ParallaxLayer depth={depth}>
      {content}
    </ParallaxLayer>
  );
};
