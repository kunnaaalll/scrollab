'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 180;

/**
 * DataStreams — InstancedMesh particles flowing around the sphere on a toroidal path.
 * Represents leads, traffic, revenue, conversions.
 * InstancedMesh = 1 draw call for all 180 particles.
 */
export function DataStreams() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Pre-compute per-particle: phase, torusRadius, tubeOffset, speed
  const particleData = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      // Primary angle around the big circle
      phase: (i / PARTICLE_COUNT) * Math.PI * 2,
      // Toroidal minor angle
      minor: Math.random() * Math.PI * 2,
      // Orbit radius varies slightly for depth
      majorR: 2.2 + Math.random() * 1.0,
      minorR: 0.05 + Math.random() * 0.25,
      speed: 0.3 + Math.random() * 0.4,
      // Tilt the orbit plane
      tiltX: Math.random() * Math.PI,
      tiltZ: Math.random() * Math.PI * 0.5,
    }));
  }, []);

  const matrix = useMemo(() => new THREE.Matrix4(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    particleData.forEach((p, i) => {
      const angle = p.phase + t * p.speed;
      const minorAngle = p.minor + t * p.speed * 0.5;

      // Toroidal position
      const x = (p.majorR + p.minorR * Math.cos(minorAngle)) * Math.cos(angle);
      const y = p.minorR * Math.sin(minorAngle);
      const z = (p.majorR + p.minorR * Math.cos(minorAngle)) * Math.sin(angle);

      // Apply tilt
      dummy.position.set(
        x * Math.cos(p.tiltZ) - z * Math.sin(p.tiltZ),
        y * Math.cos(p.tiltX) - z * Math.sin(p.tiltX) * 0.3,
        x * Math.sin(p.tiltZ) + z * Math.cos(p.tiltZ),
      );
      dummy.scale.setScalar(0.015 + Math.random() * 0.01);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshStandardMaterial
        color="#06B6D4"
        emissive="#06B6D4"
        emissiveIntensity={4}
        roughness={1}
        metalness={0}
        transparent
        opacity={0.8}
      />
    </instancedMesh>
  );
}
