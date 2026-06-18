"use client";

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BLUR_VALUES, GLASS_OPACITIES, SPATIAL_RADII } from '@/lib/spatial/constants';

interface GlassPanelProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  blur?: keyof typeof BLUR_VALUES;
  opacity?: keyof typeof GLASS_OPACITIES;
  radius?: keyof typeof SPATIAL_RADII;
  withGlow?: boolean;
}

export const GlassPanel = ({ 
  children, 
  className, 
  blur = 'medium', 
  opacity = 'medium', 
  radius = 'md',
  withGlow = false,
  style,
  ...props 
}: GlassPanelProps) => {
  return (
    <motion.div
      className={cn(
        'relative overflow-hidden',
        // 1px subtle gradient border simulating glass edge
        'border border-white/10 dark:border-white/5',
        // Shadow for depth
        'shadow-md',
        className
      )}
      style={{
        backdropFilter: BLUR_VALUES[blur],
        backgroundColor: `rgba(255, 255, 255, ${GLASS_OPACITIES[opacity]})`,
        borderRadius: SPATIAL_RADII[radius],
        ...style
      }}
      {...props}
    >
      {/* Optional ambient inner glow to simulate light scattering */}
      {withGlow && (
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/10 to-transparent mix-blend-overlay" />
      )}
      
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};
