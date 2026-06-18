"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { BgVariant, BG_COLORS } from '@/lib/background/constants';
import { AuroraBackground } from './aurora/AuroraBackground';
import { MeshGradient } from './mesh/MeshGradient';
import { NoiseTexture } from './noise/NoiseTexture';
import { GridTexture } from './grid/GridTexture';
import { RadialGlow } from './glow/RadialGlow';

interface BackgroundLayerProps {
  className?: string;
  variant?: BgVariant;
  children?: React.ReactNode;
}

export function BackgroundLayer({ className, variant = 'hero', children }: BackgroundLayerProps) {
  
  // Logic to compose the background based on variant
  const renderBackgrounds = () => {
    switch (variant) {
      case 'hero':
        return (
          <>
            <AuroraBackground variant="hero" />
            <GridTexture variant="hero" perspective={true} />
            <RadialGlow color="cyan" position="center" variant="intense" size={800} />
            <NoiseTexture variant="hero" />
          </>
        );
      case 'services':
        return (
          <>
            <RadialGlow color="cyan" position="top-left" variant="default" size={600} />
            <RadialGlow color="pink" position="bottom-right" variant="subtle" size={500} />
            <NoiseTexture variant="default" />
          </>
        );
      case 'results':
        return (
          <>
            <MeshGradient variant="default" />
            <NoiseTexture variant="subtle" />
          </>
        );
      case 'process':
        return (
          <>
            <AuroraBackground variant="subtle" />
            <NoiseTexture variant="default" />
          </>
        );
      case 'ai':
        return (
          <>
            <GridTexture variant="hero" perspective={false} />
            <RadialGlow color="cyan" position="center" variant="intense" size={700} />
            <NoiseTexture variant="hero" />
          </>
        );
      case 'dashboard':
        return (
          <>
            <GridTexture variant="default" perspective={false} />
            <NoiseTexture variant="default" />
          </>
        );
      case 'testimonials':
        return (
          <>
            <RadialGlow color="pink" position="center" variant="default" size={800} />
            <AuroraBackground variant="subtle" />
            <NoiseTexture variant="subtle" />
          </>
        );
      case 'cta':
        return (
          <>
            <AuroraBackground variant="hero" />
            <RadialGlow color="cyan" position="center" variant="intense" size={1000} />
            <NoiseTexture variant="hero" />
          </>
        );
      default:
        return (
          <>
            <AuroraBackground variant="default" />
            <NoiseTexture variant="default" />
          </>
        );
    }
  };

  return (
    <div 
      className={cn("relative w-full overflow-hidden min-h-[100vh]", className)}
      style={{ backgroundColor: BG_COLORS.baseZinc }}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        {renderBackgrounds()}
      </div>
      
      {/* Foreground content wrapper */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
