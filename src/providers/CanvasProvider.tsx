'use client';

import { Suspense, ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { SimpleErrorBoundary } from '@/components/canvas/SimpleErrorBoundary';
import { ThreeProvider } from './ThreeProvider';
import { DPR_MIN, DPR_MAX, CAMERA_FOV, CAMERA_NEAR, CAMERA_FAR } from '@/lib/three/constants';

interface CanvasProviderProps {
  children?: ReactNode;
}

function ErrorFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/90 text-white/50 text-sm">
      <p>Unable to initialize 3D context. Continuing in 2D mode.</p>
    </div>
  );
}

export function CanvasProvider({ children }: CanvasProviderProps) {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <SimpleErrorBoundary fallback={<ErrorFallback />}>
        <Canvas
          dpr={[DPR_MIN, DPR_MAX]}
          camera={{ fov: CAMERA_FOV, near: CAMERA_NEAR, far: CAMERA_FAR, position: [0, 0, 5] }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <Suspense fallback={null}>
            <ThreeProvider />
          </Suspense>
        </Canvas>
      </SimpleErrorBoundary>
    </div>
  );
}
