'use client';

import { Suspense, useMemo } from 'react';
import { AmbientParticles } from './ambient/AmbientParticles';
import { GlowParticles } from './glow/GlowParticles';
import { OrbitalParticles } from './orbital/OrbitalParticles';
import { NetworkParticles } from './network/NetworkParticles';
import { DataStreamParticles } from './data/DataStreamParticles';

export type ParticleVariant = 'hero' | 'results' | 'process' | 'ai' | 'dashboard' | 'cta' | 'default';

interface ParticleFieldProps {
  variant?: ParticleVariant;
  density?: 'low' | 'medium' | 'high';
}

/**
 * ParticleScene — pure R3F scene graph.
 * ONLY use this when already inside a <Canvas> (e.g. HeroSection).
 */
export function ParticleScene({ variant = 'default', density = 'medium' }: ParticleFieldProps) {
  return (
    <Suspense fallback={null}>
      <group>
        {variant === 'hero' && (
          <>
            <AmbientParticles density={density} />
            <GlowParticles density={density} />
            <OrbitalParticles density="low" />
          </>
        )}
        {variant === 'ai' && (
          <>
            <NetworkParticles density={density} />
            <GlowParticles density={density} />
          </>
        )}
        {variant === 'cta' && (
          <>
            <OrbitalParticles density={density} />
            <GlowParticles density={density} />
            <AmbientParticles density="low" />
          </>
        )}
        {variant === 'dashboard' && (
          <>
            <AmbientParticles density="low" />
            <DataStreamParticles density={density} />
            <GlowParticles density="low" />
          </>
        )}
        {variant === 'process' && (
          <>
            <DataStreamParticles density={density} />
            <NetworkParticles density="low" />
          </>
        )}
        {variant === 'results' && (
          <>
            <OrbitalParticles density={density} />
            <DataStreamParticles density="low" />
          </>
        )}
        {variant === 'default' && (
          <AmbientParticles density={density} />
        )}
      </group>
    </Suspense>
  );
}

// Particle counts per density — cheap CSS dots, zero WebGL cost
const DENSITY_COUNT = { low: 18, medium: 30, high: 50 } as const;

// Colour accent per variant
const VARIANT_COLORS: Record<ParticleVariant, string[]> = {
  hero:      ['#06B6D4', '#EC4899', '#ffffff'],
  ai:        ['#06B6D4', '#8B5CF6', '#22D3EE'],
  cta:       ['#06B6D4', '#EC4899', '#A78BFA'],
  dashboard: ['#10B981', '#06B6D4', '#ffffff'],
  process:   ['#06B6D4', '#F59E0B', '#ffffff'],
  results:   ['#EC4899', '#06B6D4', '#F59E0B'],
  default:   ['#06B6D4', '#ffffff', '#EC4899'],
};

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function ParticleField({ variant = 'default', density = 'medium' }: ParticleFieldProps) {
  const count = DENSITY_COUNT[density];
  const colors = VARIANT_COLORS[variant];

  // Generate stable particle data on first render only
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${((Math.sin(i * 2.4) * 0.5 + 0.5) * 100).toFixed(3)}%`,
      top: `${((Math.cos(i * 1.7) * 0.5 + 0.5) * 100).toFixed(3)}%`,
      size: Number(((Math.sin(i * 3.1) * 0.5 + 0.5) * 3 + 0.8).toFixed(3)),
      color: colors[i % colors.length],
      durationFloat: `${((Math.cos(i * 0.9) * 0.5 + 0.5) * 8 + 5).toFixed(3)}s`,
      durationPulse: `${((Math.sin(i * 1.3) * 0.5 + 0.5) * 4 + 3).toFixed(3)}s`,
      delay: `${((Math.sin(i * 2.1) * 0.5 + 0.5) * 6).toFixed(3)}s`,
      opacity: Number(((Math.cos(i * 1.1) * 0.5 + 0.5) * 0.45 + 0.08).toFixed(3)),
    }));
    // We intentionally exclude colors from deps — variant changes remake via new key
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, variant]);

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
      style={{ zIndex: 0 }}
    >
      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            position: 'absolute',
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            backgroundColor: p.color,
            boxShadow: `0px 0px ${(p.size * 4).toFixed(3)}px ${hexToRgba(p.color, 0.533)}`,
            opacity: p.opacity,
            animation: [
              `pf-drift ${p.durationFloat} ${p.delay} ease-in-out infinite`,
              `pf-pulse ${p.durationPulse} ${p.delay} ease-in-out infinite`,
            ].join(', '),
            willChange: 'transform, opacity',
          }}
        />
      ))}

      {/* Scoped keyframes — injected once per ParticleField mount */}
      <style>{`
        @keyframes pf-drift {
          0%   { transform: translate(0, 0); }
          25%  { transform: translate(6px, -14px); }
          50%  { transform: translate(-4px, -22px); }
          75%  { transform: translate(8px, -10px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes pf-pulse {
          0%, 100% { filter: blur(0px); }
          50%       { filter: blur(1px); }
        }
      `}</style>
    </div>
  );
}
