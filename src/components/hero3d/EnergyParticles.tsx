'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const AMBIENT_COUNT = 120;
const GLOW_COUNT = 40;

/**
 * EnergyParticles — ambient particle field inside and around the energy sphere.
 *
 * Two particle systems in one component:
 * 1. AmbientParticles: slow-drifting dust in the scene volume (Points, 1 draw call)
 * 2. GlowParticles: slightly larger, brighter orbs near the sphere core (Points, 1 draw call)
 */
export function EnergyParticles() {
  // ── Ambient particles ──────────────────────────────────────────────────────
  const ambientRef = useRef<THREE.Points>(null);
  const ambientGeo = useMemo(() => {
    const positions = new Float32Array(AMBIENT_COUNT * 3);
    const scales = new Float32Array(AMBIENT_COUNT);

    for (let i = 0; i < AMBIENT_COUNT; i++) {
      // Distribute across a 10-unit sphere volume
      const r = 1.5 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      scales[i] = 0.008 + Math.random() * 0.012;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  const ambientInitPos = useMemo(() => {
    const arr = ambientGeo.attributes.position.array as Float32Array;
    return Float32Array.from(arr);
  }, [ambientGeo]);

  useFrame((state) => {
    if (!ambientRef.current) return;
    const t = state.clock.elapsedTime;
    const pos = ambientRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < AMBIENT_COUNT; i++) {
      const ix = i * 3;
      // Gentle sinusoidal drift
      pos[ix]     = ambientInitPos[ix]     + Math.sin(t * 0.15 + i * 0.5) * 0.18;
      pos[ix + 1] = ambientInitPos[ix + 1] + Math.cos(t * 0.12 + i * 0.7) * 0.18;
      pos[ix + 2] = ambientInitPos[ix + 2] + Math.sin(t * 0.10 + i * 0.3) * 0.18;
    }
    ambientRef.current.geometry.attributes.position.needsUpdate = true;
  });

  // ── Glow particles (orbital near sphere) ──────────────────────────────────
  const glowRef = useRef<THREE.Points>(null);
  const glowGeo = useMemo(() => {
    const positions = new Float32Array(GLOW_COUNT * 3);
    for (let i = 0; i < GLOW_COUNT; i++) {
      const r = 1.0 + Math.random() * 2.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  const glowInitPos = useMemo(() => {
    const arr = glowGeo.attributes.position.array as Float32Array;
    return Float32Array.from(arr);
  }, [glowGeo]);

  useFrame((state) => {
    if (!glowRef.current) return;
    const t = state.clock.elapsedTime;
    const pos = glowRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < GLOW_COUNT; i++) {
      const ix = i * 3;
      pos[ix]     = glowInitPos[ix]     + Math.sin(t * 0.3 + i * 1.2) * 0.3;
      pos[ix + 1] = glowInitPos[ix + 1] + Math.cos(t * 0.25 + i * 0.8) * 0.3;
      pos[ix + 2] = glowInitPos[ix + 2] + Math.sin(t * 0.2 + i * 1.5) * 0.3;
    }
    glowRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <>
      {/* Ambient dust — cyan, very small */}
      <points ref={ambientRef} geometry={ambientGeo}>
        <pointsMaterial
          color="#06B6D4"
          size={0.025}
          transparent
          opacity={0.35}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Glow orbs — larger, pink accent near sphere */}
      <points ref={glowRef} geometry={glowGeo}>
        <pointsMaterial
          color="#EC4899"
          size={0.055}
          transparent
          opacity={0.50}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
}
