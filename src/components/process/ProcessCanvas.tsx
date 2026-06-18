'use client';

import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Preload,
  AdaptiveDpr,
  AdaptiveEvents,
  BakeShadows,
} from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { ProcessScene } from './ProcessScene';
import { LazyCanvasWrapper } from '@/components/performance/LazyCanvasWrapper';
import { SceneOptimizer } from '@/components/performance/SceneOptimizer';

export function ProcessCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 h-full w-full">
      <LazyCanvasWrapper>
        <Canvas
          camera={{ position: [0, 0, 300], fov: 45, near: 0.1, far: 1000 }}
          dpr={[1, 2]} // Limit DPR to 2 for performance
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
            alpha: true,
          }}
          style={{ pointerEvents: 'auto' }} // Allow mouse events for hover and parallax
        >
          <Suspense fallback={null}>
            <SceneOptimizer />
            <ProcessScene />

            {/* Post Processing: Subtle Bloom */}
            <EffectComposer multisampling={4}>
              <Bloom
                luminanceThreshold={1.5} // Only bloom highly emissive things (like the core)
                luminanceSmoothing={0.1}
                intensity={0.5}
                mipmapBlur
              />
            </EffectComposer>

            <Preload all />
            <AdaptiveDpr pixelated />
            <AdaptiveEvents />
            <BakeShadows />
          </Suspense>
        </Canvas>
      </LazyCanvasWrapper>
    </div>
  );
}
