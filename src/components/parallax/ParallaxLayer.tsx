"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MouseParallax } from './MouseParallax';
import { ScrollParallax } from './ScrollParallax';
import { useDepth } from '@/hooks/useDepth';
import { useReducedMotion } from 'framer-motion';

interface ParallaxLayerProps {
  children: React.ReactNode;
  depth: number;
  className?: string;
  mouseEnabled?: boolean;
  scrollEnabled?: boolean;
  perspectiveEnabled?: boolean;
}

export const ParallaxLayer = ({ 
  children, 
  depth, 
  className = '',
  mouseEnabled = true,
  scrollEnabled = true,
  perspectiveEnabled = true
}: ParallaxLayerProps) => {
  const { zIndex, translateZ, scale } = useDepth(depth);
  const reducedMotion = useReducedMotion();

  let content = children;

  // Layer behaviors based on depth and reduced motion preferences
  if (!reducedMotion) {
    if (mouseEnabled) {
      content = (
        <MouseParallax depth={depth} className="w-full h-full">
          {content}
        </MouseParallax>
      );
    }

    if (scrollEnabled) {
      content = (
        <ScrollParallax depth={depth} className="w-full h-full">
          {content}
        </ScrollParallax>
      );
    }
  }

  // Base styles for the layer to maintain absolute positioning
  // We use Framer Motion to apply the Z-axis translation and scale compensation
  return (
    <motion.div 
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ 
        zIndex,
        // When reduced motion is on, or perspective disabled, we don't push into Z space
        z: (!reducedMotion && perspectiveEnabled) ? translateZ : 0,
        scale: (!reducedMotion && perspectiveEnabled) ? scale : 1,
        transformOrigin: 'center center',
      }}
    >
      {content}
    </motion.div>
  );
};
