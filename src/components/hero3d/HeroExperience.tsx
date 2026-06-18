'use client';

import { HeroCanvas } from './HeroCanvas';

/**
 * HeroExperience — the complete right-side 3D visual.
 * Exported as a single component to be placed in HeroSection's right column.
 */
export function HeroExperience() {
  return (
    <div className="relative w-full h-full">
      {/* The R3F Canvas — fills its parent */}
      <HeroCanvas />

      {/* Optional: very subtle vignette ring to blend with background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(6,6,18,0.5) 100%)',
        }}
      />
    </div>
  );
}
