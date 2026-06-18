'use client';

import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import { HeroScene } from './HeroScene';
import { LazyCanvasWrapper } from '@/components/performance/LazyCanvasWrapper';
import { SceneOptimizer } from '@/components/performance/SceneOptimizer';

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
      style={{
        background:
          'radial-gradient(circle at 50% 50%, rgba(5,5,5,1) 0%, rgba(0,0,0,1) 100%)',
      }}
    >
      <LazyCanvasWrapper>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 2]}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: 'high-performance',
          }}
        >
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
          <Suspense fallback={null}>
            <SceneOptimizer />
            <HeroScene />
          </Suspense>
        </Canvas>
      </LazyCanvasWrapper>
    </div>
  );
}
