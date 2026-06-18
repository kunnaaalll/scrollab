'use client';

import { ReactNode, useState } from 'react';
import { AdaptiveDpr, AdaptiveEvents, PerformanceMonitor } from '@react-three/drei';
import { DPR_MIN, DPR_MAX } from '@/lib/three/constants';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ThreeProviderProps {
  children?: ReactNode;
}

export function ThreeProvider({ children }: ThreeProviderProps) {
  const [dpr, setDpr] = useState(DPR_MAX);
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <PerformanceMonitor 
        onIncline={() => setDpr(DPR_MAX)} 
        onDecline={() => setDpr(DPR_MIN)} 
      />
      {prefersReducedMotion ? null : <AdaptiveDpr pixelated />}
      <AdaptiveEvents />
      {/* 
        Here we can add global scene management defaults:
        - Default Lighting setup
        - Environment Maps
        - Post-processing effects via @react-three/postprocessing
      */}
      {children}
    </>
  );
}
