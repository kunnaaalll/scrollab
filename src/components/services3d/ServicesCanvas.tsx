'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr } from '@react-three/drei';
import { ServicesScene } from './ServicesScene';
import { LazyCanvasWrapper } from '@/components/performance/LazyCanvasWrapper';
import { SceneOptimizer } from '@/components/performance/SceneOptimizer';

export function ServicesCanvas() {
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
          camera={{ position: [0, 0, 400], fov: 45 }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
            alpha: true,
          }}
          style={{ pointerEvents: 'auto' }} // Enable pointer events on the canvas
        >
          <Suspense fallback={null}>
            <SceneOptimizer />
            <ServicesScene />
            {/* Performance optimization: Drops resolution on fast movements */}
            <AdaptiveDpr pixelated />
          </Suspense>
        </Canvas>
      </LazyCanvasWrapper>
    </div>
  );
}
