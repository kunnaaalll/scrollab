"use client";

import React from 'react';
import { AmbientLightLayer } from './AmbientLightLayer';
import { GlowLight } from './GlowLight';
import { LIGHTING_COLORS, LIGHTING_INTENSITIES } from '@/lib/lighting/constants';

export const AILighting = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-1]">
      <AmbientLightLayer color={LIGHTING_COLORS.ZINC_900} intensity={1} />
      
      {/* Central Core Glow */}
      <GlowLight color={LIGHTING_COLORS.WHITE} intensity={LIGHTING_INTENSITIES.LOW} size="40vw" x="50%" y="50%" duration={15} blur="blur(80px)" />
      
      {/* Network Nodes Support */}
      <GlowLight color={LIGHTING_COLORS.CYAN} intensity={LIGHTING_INTENSITIES.MEDIUM} size="30vw" x="30%" y="40%" duration={20} />
      <GlowLight color={LIGHTING_COLORS.PINK} intensity={LIGHTING_INTENSITIES.LOW} size="25vw" x="70%" y="60%" duration={25} />
      <GlowLight color={LIGHTING_COLORS.CYAN} intensity={LIGHTING_INTENSITIES.LOW} size="20vw" x="80%" y="30%" duration={18} />
    </div>
  );
};
