'use client';

import { useMemo, useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { PARTICLE_CONFIGS, PARTICLE_COLORS, getQualityLevel, DENSITY_MULTIPLIER } from '@/lib/particles/constants';

interface GlowParticlesProps {
  density?: 'low' | 'medium' | 'high';
}

export function GlowParticles({ density = 'medium' }: GlowParticlesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { size, viewport } = useThree();
  const prefersReducedMotion = useReducedMotion();

  const quality = getQualityLevel(size.width);
  const baseCount = PARTICLE_CONFIGS.glow.counts[quality];
  
  const densityFactors = { low: 0.5, medium: 1, high: 1.5 };
  const particleCount = Math.floor(baseCount * densityFactors[density] * DENSITY_MULTIPLIER[quality]);

  const config = PARTICLE_CONFIGS.glow;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      // Glows should be somewhat clustered but dispersed
      const x = (Math.random() - 0.5) * viewport.width * 1.5;
      const y = (Math.random() - 0.5) * viewport.height * 1.5;
      const z = (Math.random() - 0.5) * 5 - 5; // Behind the main focal point
      
      const vx = (Math.random() - 0.5) * config.speed;
      const vy = (Math.random() - 0.5) * config.speed;

      const scale = config.size.min + Math.random() * (config.size.max - config.size.min);
      
      // Phase for pulsating opacity or scale
      temp.push({ x, y, z, vx, vy, baseScale: scale, phase: Math.random() * Math.PI * 2, speedMultiplier: Math.random() * 0.5 + 0.5 });
    }
    return temp;
  }, [particleCount, viewport.width, viewport.height, config.speed, config.size]);

  const colors = useMemo(() => {
    const temp = new Float32Array(particleCount * 3);
    const colorPrimary = new THREE.Color(PARTICLE_COLORS.primary);
    const colorSecondary = new THREE.Color(PARTICLE_COLORS.secondary);
    const colorHighlight = new THREE.Color(PARTICLE_COLORS.highlight);
    
    for (let i = 0; i < particleCount; i++) {
      const rand = Math.random();
      let color = colorPrimary;
      if (rand > 0.9) color = colorHighlight;
      else if (rand > 0.6) color = colorSecondary;
      
      color.toArray(temp, i * 3);
    }
    return temp;
  }, [particleCount]);

  useEffect(() => {
    if (!meshRef.current) return;
    
    for (let i = 0; i < particleCount; i++) {
      const p = particles[i];
      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.setScalar(p.baseScale);
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
      p.y += p.vy * dt;

      // Wrap around
      const halfWidth = viewport.width;
      const halfHeight = viewport.height;
      if (p.x > halfWidth) p.x = -halfWidth;
      if (p.x < -halfWidth) p.x = halfWidth;
      if (p.y > halfHeight) p.y = -halfHeight;
      if (p.y < -halfHeight) p.y = halfHeight;

      // Pulsate scale slightly
      const currentScale = p.baseScale + Math.sin(time * p.speedMultiplier + p.phase) * (p.baseScale * 0.1);

      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.setScalar(currentScale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, particleCount]}>
      <sphereGeometry args={[1, 16, 16]} />
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
