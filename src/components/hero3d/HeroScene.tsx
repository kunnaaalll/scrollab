'use client';

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import { useReducedMotion } from 'framer-motion';
import { HeroLights } from './HeroLights';
import { RevenueCore3D } from './RevenueCore3D';
import { OrbitMetrics } from './OrbitMetrics';
import { ConnectionBeams } from './ConnectionBeam';
import { DataStreams } from './DataStreams';
import { EnergyParticles } from './EnergyParticles';

/**
 * HeroScene — the main R3F scene graph for the hero Revenue Engine.
 *
 * Mouse parallax: tracks mouse, max ±5° camera group rotation.
 * Reduced motion: pauses all frame-by-frame animations.
 */
export function HeroScene() {
  const sceneGroupRef = useRef<THREE.Group>(null);
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const currentRotationRef = useRef({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const { gl } = useThree();

  // Mouse tracking — normalised to [-1, 1]
  useEffect(() => {
    const canvas = gl.domElement;

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      // Max ±5° = ±0.087 radians per axis
      targetRotationRef.current.y = x * 0.08;
      targetRotationRef.current.x = y * 0.06;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [gl.domElement, prefersReducedMotion]);

  useFrame((_, delta) => {
    if (!sceneGroupRef.current || prefersReducedMotion) return;
    // Smooth damp toward target (lerp with ~12% per frame at 60fps)
    const lerpFactor = 1 - Math.pow(0.88, delta * 60);
    currentRotationRef.current.x +=
      (targetRotationRef.current.x - currentRotationRef.current.x) * lerpFactor;
    currentRotationRef.current.y +=
      (targetRotationRef.current.y - currentRotationRef.current.y) * lerpFactor;

    sceneGroupRef.current.rotation.x = currentRotationRef.current.x;
    sceneGroupRef.current.rotation.y = currentRotationRef.current.y;
  });

  return (
    <>
      <HeroLights />

      <group ref={sceneGroupRef}>
        <RevenueCore3D />
        <OrbitMetrics />
        <ConnectionBeams />
        <DataStreams />
        <EnergyParticles />
      </group>

      {/* ── Post-processing ── */}
      {!prefersReducedMotion && (
        <EffectComposer>
          <Bloom
            intensity={1.8}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={new THREE.Vector2(0.0005, 0.0005)}
            radialModulation={false}
            modulationOffset={0}
          />
        </EffectComposer>
      )}
    </>
  );
}
