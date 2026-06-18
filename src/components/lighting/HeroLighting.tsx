"use client";

import React from 'react';
import { AmbientLightLayer } from './AmbientLightLayer';
import { DirectionalLightLayer } from './DirectionalLightLayer';
import { RimLightLayer } from './RimLightLayer';
import { GlowLight } from './GlowLight';
import { LIGHTING_COLORS, LIGHTING_INTENSITIES } from '@/lib/lighting/constants';

export const HeroLighting = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-1]">
      {/* Base Atmosphere */}
      <AmbientLightLayer color={LIGHTING_COLORS.ZINC_900} intensity={1} />
      
      {/* Deep Background Glows */}
      <GlowLight color={LIGHTING_COLORS.CYAN} intensity={LIGHTING_INTENSITIES.LOW} size="80vw" x="20%" y="30%" duration={35} />
      <GlowLight color={LIGHTING_COLORS.PINK} intensity={LIGHTING_INTENSITIES.GHOST} size="60vw" x="80%" y="70%" duration={25} />
      
      {/* Key Directional Light */}
      <DirectionalLightLayer color={LIGHTING_COLORS.WHITE} intensity={LIGHTING_INTENSITIES.GHOST} angle={135} />
      
      {/* Central Focus Glow for Revenue Engine 3D objects */}
      <GlowLight color={LIGHTING_COLORS.CYAN} intensity={LIGHTING_INTENSITIES.MEDIUM} size="50vw" x="50%" y="50%" duration={20} blur="blur(120px)" />
      
      {/* Edge Separation */}
      <RimLightLayer />
    </div>
  );
};
