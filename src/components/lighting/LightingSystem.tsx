"use client";

import React from 'react';
import { HeroLighting } from './HeroLighting';
import { AILighting } from './AILighting';
import { DashboardLighting } from './DashboardLighting';
import { CTALighting } from './CTALighting';

export type LightingVariant = 'hero' | 'ai' | 'dashboard' | 'cta';

interface LightingSystemProps {
  variant: LightingVariant;
  className?: string;
}

export const LightingSystem = ({ variant, className = '' }: LightingSystemProps) => {
  const getLightingVariant = () => {
    switch (variant) {
      case 'hero':
        return <HeroLighting />;
      case 'ai':
        return <AILighting />;
      case 'dashboard':
        return <DashboardLighting />;
      case 'cta':
        return <CTALighting />;
      default:
        return null;
    }
  };

  return (
    <div className={`absolute inset-0 w-full h-full ${className}`}>
      {getLightingVariant()}
    </div>
  );
};
