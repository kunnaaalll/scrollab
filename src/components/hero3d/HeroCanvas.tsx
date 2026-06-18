'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import { HeroScene } from './HeroScene';

import { LazyCanvasWrapper } from '@/components/performance/LazyCanvasWrapper';

/**
 * HeroCanvas — Canvas wrapper for the Revenue Engine hero experience.
 *
 * Performance:
 * - AdaptiveDpr: dynamically lowers pixel ratio under frame-rate pressure
 * - AdaptiveEvents: optimises event handling
 * - camera FOV: 45° for premium architectural look (doc 17_3D_SYSTEM §11)
 * - dpr capped at [1, 1.5] for mobile performance
 */
export function HeroCanvas() {
  return (
    <div
      className="h-full w-full"
      style={{ minHeight: '480px' }}
      aria-hidden="true"
    >
      <LazyCanvasWrapper>
        <Canvas
          camera={{
            position: [0, 0, 8],
            fov: 45,
            near: 0.1,
            far: 100,
          }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          style={{ background: 'transparent' }}
        >
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </Canvas>
      </LazyCanvasWrapper>
    </div>
  );
}
