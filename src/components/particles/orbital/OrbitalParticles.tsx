'use client';

import { useState, useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { PARTICLE_CONFIGS, PARTICLE_COLORS, getQualityLevel, DENSITY_MULTIPLIER } from '@/lib/particles/constants';

interface OrbitalParticlesProps {
  density?: 'low' | 'medium' | 'high';
}

export function OrbitalParticles({ density = 'medium' }: OrbitalParticlesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { size } = useThree();
  const prefersReducedMotion = useReducedMotion();

  const quality = getQualityLevel(size.width);
  const baseCount = PARTICLE_CONFIGS.orbital.counts[quality];
  
  const densityFactors = { low: 0.5, medium: 1, high: 1.5 };
  const particleCount = Math.floor(baseCount * densityFactors[density] * DENSITY_MULTIPLIER[quality]);

  const config = PARTICLE_CONFIGS.orbital;
  const dummy = useRef<THREE.Object3D | null>(null);
  if (!dummy.current) {
    dummy.current = new THREE.Object3D();
  }

  // Use a stable time reference to prevent jumps
  const timeRef = useRef(0);

  const generateParticles = () => {
    const temp = [];
    const minRadius = config.radius?.min ?? 2;
    const maxRadius = config.radius?.max ?? 5;

    for (let i = 0; i < particleCount; i++) {
      const radius = minRadius + Math.random() * (maxRadius - minRadius);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1); 
      const angularVelocity = (Math.random() - 0.5) * config.speed;
      const scale = config.size.min + Math.random() * (config.size.max - config.size.min);
      
      temp.push({ radius, theta, phi, angularVelocity, scale });
    }
    return temp;
  };

  const generateColors = () => {
    const temp = new Float32Array(particleCount * 3);
    const colorPrimary = new THREE.Color(PARTICLE_COLORS.primary);
    const colorSecondary = new THREE.Color(PARTICLE_COLORS.secondary);
    
    for (let i = 0; i < particleCount; i++) {
      const color = Math.random() > 0.5 ? colorPrimary : colorSecondary;
      color.toArray(temp, i * 3);
    }
    return temp;
  };

  const [particles, setParticles] = useState(generateParticles);
  const [colors, setColors] = useState(generateColors);

  useEffect(() => {
    setParticles(generateParticles());
    setColors(generateColors());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [particleCount, config.radius, config.speed, config.size]);

  useEffect(() => {
    if (!meshRef.current) return;
    
    for (let i = 0; i < particleCount; i++) {
      const p = particles[i];
      // Initial positions
      const x = p.radius * Math.sin(p.phi) * Math.cos(p.theta);
      const y = p.radius * Math.sin(p.phi) * Math.sin(p.theta);
      const z = p.radius * Math.cos(p.phi);

      dummy.current!.position.set(x, y, z);
      dummy.current!.scale.setScalar(p.scale);
      dummy.current!.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.current!.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [particles, particleCount]);

  useFrame((state, delta) => {
    if (!meshRef.current || prefersReducedMotion) return;
    
    const dt = Math.min(delta, 0.1);
    timeRef.current += dt;
    const time = timeRef.current;

    for (let i = 0; i < particleCount; i++) {
      const p = particles[i];
      
      // Update theta for orbital movement
      const currentTheta = p.theta + time * p.angularVelocity;
      
      const x = p.radius * Math.sin(p.phi) * Math.cos(currentTheta);
      const y = p.radius * Math.sin(p.phi) * Math.sin(currentTheta);
      const z = p.radius * Math.cos(p.phi);

      dummy.current!.position.set(x, y, z);
      dummy.current!.scale.setScalar(p.scale);
      dummy.current!.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.current!.matrix);
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
