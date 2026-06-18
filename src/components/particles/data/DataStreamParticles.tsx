'use client';

import { useMemo, useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { PARTICLE_CONFIGS, PARTICLE_COLORS, getQualityLevel, DENSITY_MULTIPLIER } from '@/lib/particles/constants';

interface DataStreamParticlesProps {
  density?: 'low' | 'medium' | 'high';
}

export function DataStreamParticles({ density = 'medium' }: DataStreamParticlesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { size, viewport } = useThree();
  const prefersReducedMotion = useReducedMotion();

  const quality = getQualityLevel(size.width);
  const baseCount = PARTICLE_CONFIGS.data.counts[quality];
  
  const densityFactors = { low: 0.5, medium: 1, high: 1.5 };
  const particleCount = Math.floor(baseCount * densityFactors[density] * DENSITY_MULTIPLIER[quality]);

  const config = PARTICLE_CONFIGS.data;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * viewport.width * 2;
      const y = (Math.random() - 0.5) * viewport.height * 2;
      // Staggered depths
      const z = (Math.random() - 0.5) * 4 - 2;
      
      // Flow primarily rightwards and slightly upwards
      const vx = config.speed * (Math.random() * 0.5 + 0.5);
      const vy = config.speed * (Math.random() * 0.2);

      const scale = config.size.min + Math.random() * (config.size.max - config.size.min);
      
      temp.push({ x, y, z, vx, vy, scale, phase: Math.random() * Math.PI * 2 });
    }
    return temp;
  }, [particleCount, viewport.width, viewport.height, config.speed, config.size]);

  const colors = useMemo(() => {
    const temp = new Float32Array(particleCount * 3);
    const colorPrimary = new THREE.Color(PARTICLE_COLORS.primary);
    const colorHighlight = new THREE.Color(PARTICLE_COLORS.highlight);
    
    for (let i = 0; i < particleCount; i++) {
      const color = Math.random() > 0.8 ? colorHighlight : colorPrimary;
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
    
    const dt = Math.min(delta, 0.1);
    time += dt;

    for (let i = 0; i < particleCount; i++) {
      const p = particles[i];
      
      p.x += p.vx * dt;
      p.y += p.vy * dt + Math.sin(time + p.phase) * 0.05 * dt;

      // Wrap around screen
      const halfWidth = viewport.width;
      const halfHeight = viewport.height;
      if (p.x > halfWidth) p.x = -halfWidth;
      if (p.y > halfHeight) p.y = -halfHeight;

      dummy.position.set(p.x, p.y, p.z);
      
      // Stretch particles slightly along flow direction
      dummy.scale.set(p.scale * 2, p.scale * 0.5, p.scale);
      
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, particleCount]}>
      <boxGeometry args={[1, 1, 1]} />
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
