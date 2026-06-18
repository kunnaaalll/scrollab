"use client";

import React from 'react';
import { AmbientLightLayer } from './AmbientLightLayer';
import { RimLightLayer } from './RimLightLayer';
import { DirectionalLightLayer } from './DirectionalLightLayer';
import { LIGHTING_COLORS, LIGHTING_INTENSITIES } from '@/lib/lighting/constants';

export const DashboardLighting = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-1]">
      {/* Very clean ambient background for dashboard */}
      <AmbientLightLayer color={LIGHTING_COLORS.ZINC_900} intensity={1} />
      
      {/* Subtle sweeping highlight across glass cards */}
      <DirectionalLightLayer color={LIGHTING_COLORS.CYAN} intensity={LIGHTING_INTENSITIES.GHOST} angle={110} />
      
      {/* Clean rim light definition without excessive color bleeding */}
      <RimLightLayer primaryColor={LIGHTING_COLORS.WHITE} secondaryColor={LIGHTING_COLORS.CYAN} />
    </div>
  );
};
