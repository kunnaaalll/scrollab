'use client';

import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
} from '@react-three/postprocessing';
import { useReducedMotion } from 'framer-motion';
import * as THREE from 'three';
import { BlendFunction } from 'postprocessing';

import { MemoryCore } from './MemoryCore';
import { MemoryParticles } from './MemoryParticles';
import { MemoryConnections } from './MemoryConnections';
import { TestimonialsLighting } from './TestimonialsLighting';
import { TestimonialCard3D } from './TestimonialCard3D';
import { TESTIMONIALS_3D } from './TestimonialsData';
import { LazyCanvasWrapper } from '@/components/performance/LazyCanvasWrapper';
import { SceneOptimizer } from '@/components/performance/SceneOptimizer';

function SceneParallax({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const shouldReduceMotion = useReducedMotion();

  useFrame((state) => {
    if (shouldReduceMotion || !groupRef.current) return;

    // Subtle mouse parallax (5-10px max movement based on mouse pointer)
    const targetX = state.pointer.x * 10;
    const targetY = state.pointer.y * 10;

    groupRef.current.position.x +=
      (targetX - groupRef.current.position.x) * 0.05;
    groupRef.current.position.y +=
      (targetY - groupRef.current.position.y) * 0.05;
  });

  return <group ref={groupRef}>{children}</group>;
}

export function TestimonialsScene() {
  return (
    <div className="pointer-events-auto absolute inset-0 h-full w-full">
      <LazyCanvasWrapper>
        <Canvas
          dpr={[1, 2]}
          gl={{ antialias: false, powerPreference: 'high-performance' }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 400]} fov={45} />

          <color attach="background" args={['#050505']} />
          <fog attach="fog" args={['#050505', 300, 800]} />

          <Suspense fallback={null}>
            <SceneOptimizer />
            <SceneParallax>
              <TestimonialsLighting />
              <MemoryCore />
              <MemoryParticles />
              <MemoryConnections testimonials={TESTIMONIALS_3D} />

              {TESTIMONIALS_3D.map((testimonial) => (
                <TestimonialCard3D key={testimonial.id} data={testimonial} />
              ))}
            </SceneParallax>

            <EffectComposer multisampling={4}>
              <Bloom
                luminanceThreshold={0.5}
                luminanceSmoothing={0.9}
                intensity={0.8}
                mipmapBlur
              />
              <ChromaticAberration
                offset={new THREE.Vector2(0.0005, 0.0005)}
                blendFunction={BlendFunction.NORMAL}
              />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </LazyCanvasWrapper>
    </div>
  );
}
