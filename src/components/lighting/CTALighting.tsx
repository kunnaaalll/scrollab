"use client";

import React from 'react';
import { AmbientLightLayer } from './AmbientLightLayer';
import { GlowLight } from './GlowLight';
import { RimLightLayer } from './RimLightLayer';
import { LIGHTING_COLORS, LIGHTING_INTENSITIES } from '@/lib/lighting/constants';

export const CTALighting = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-1]">
      <AmbientLightLayer color={LIGHTING_COLORS.ZINC_900} intensity={1} />
      
      {/* Massive warm atmospheric glow around CTA */}
      <GlowLight color={LIGHTING_COLORS.PINK} intensity={LIGHTING_INTENSITIES.HIGH} size="80vw" x="50%" y="50%" duration={20} blur="blur(150px)" />
      
      {/* Core intensity at the button */}
      <GlowLight color={LIGHTING_COLORS.WHITE} intensity={LIGHTING_INTENSITIES.MEDIUM} size="30vw" x="50%" y="50%" duration={15} blur="blur(60px)" />
      
      <RimLightLayer primaryColor={LIGHTING_COLORS.PINK} secondaryColor={LIGHTING_COLORS.PINK_LIGHT} />
    </div>
  );
};
