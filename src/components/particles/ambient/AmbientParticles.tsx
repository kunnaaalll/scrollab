'use client';

import { useMemo, useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { PARTICLE_CONFIGS, PARTICLE_COLORS, getQualityLevel, DENSITY_MULTIPLIER } from '@/lib/particles/constants';

interface AmbientParticlesProps {
  density?: 'low' | 'medium' | 'high';
}

export function AmbientParticles({ density = 'medium' }: AmbientParticlesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { size, viewport } = useThree();
  const prefersReducedMotion = useReducedMotion();

  const quality = getQualityLevel(size.width);
  const baseCount = PARTICLE_CONFIGS.ambient.counts[quality];
  
  const densityFactors = { low: 0.5, medium: 1, high: 1.5 };
  const particleCount = Math.floor(baseCount * densityFactors[density] * DENSITY_MULTIPLIER[quality]);

  const config = PARTICLE_CONFIGS.ambient;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Particle data: position, velocity, phase
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * viewport.width * 2;
      const y = (Math.random() - 0.5) * viewport.height * 2;
      const z = (Math.random() - 0.5) * 10 - 2; // Depth
      
      const vx = (Math.random() - 0.5) * config.speed;
      const vy = (Math.random() - 0.5) * config.speed;
      const vz = (Math.random() - 0.5) * config.speed * 0.5;

      const scale = config.size.min + Math.random() * (config.size.max - config.size.min);
      
      // We store initial position, velocity, and phase
      temp.push({ x, y, z, vx, vy, vz, scale, phase: Math.random() * Math.PI * 2 });
    }
    return temp;
  }, [particleCount, viewport.width, viewport.height, config.speed, config.size]);

  const colors = useMemo(() => {
    const temp = new Float32Array(particleCount * 3);
    const colorPrimary = new THREE.Color(PARTICLE_COLORS.primary);
    const colorSecondary = new THREE.Color(PARTICLE_COLORS.secondary);
    
    for (let i = 0; i < particleCount; i++) {
      const color = Math.random() > 0.8 ? colorSecondary : colorPrimary;
      color.toArray(temp, i * 3);
    }
    return temp;
  }, [particleCount]);

  useEffect(() => {
    if (!meshRef.current) return;
    
    for (let i = 0; i < particleCount; i++) {
      const p = particles[i];
      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [particles, dummy, particleCount]);

  let time = 0;

  useFrame((state, delta) => {
    if (!meshRef.current || prefersReducedMotion) return;
    
    // Frame throttling: only update logic every other frame or use delta
    const dt = Math.min(delta, 0.1); // Cap delta to prevent huge jumps
    time += dt;

    for (let i = 0; i < particleCount; i++) {
      const p = particles[i];
      
      // Physics-based drift (sine waves for organic feel)
      p.x += p.vx * dt + Math.sin(time + p.phase) * 0.01 * dt;
      p.y += p.vy * dt + Math.cos(time + p.phase) * 0.01 * dt;
      p.z += p.vz * dt;

      // Wrap around screen
      const halfWidth = viewport.width;
      const halfHeight = viewport.height;
      if (p.x > halfWidth) p.x = -halfWidth;
      if (p.x < -halfWidth) p.x = halfWidth;
      if (p.y > halfHeight) p.y = -halfHeight;
      if (p.y < -halfHeight) p.y = halfHeight;
      if (p.z > 5) p.z = -15;
      if (p.z < -15) p.z = 5;

      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, particleCount]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial 
        transparent 
        opacity={config.opacity.max} 
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
      <instancedBufferAttribute attach="instanceColor" args={[colors, 3]} />
    </instancedMesh>
  );
}
