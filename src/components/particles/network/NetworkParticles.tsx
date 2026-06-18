'use client';

import { useState, useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { PARTICLE_CONFIGS, PARTICLE_COLORS, getQualityLevel, DENSITY_MULTIPLIER } from '@/lib/particles/constants';

interface NetworkParticlesProps {
  density?: 'low' | 'medium' | 'high';
}

export function NetworkParticles({ density = 'medium' }: NetworkParticlesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { size, viewport } = useThree();
  const prefersReducedMotion = useReducedMotion();

  const quality = getQualityLevel(size.width);
  const baseCount = PARTICLE_CONFIGS.network.counts[quality];
  
  const densityFactors = { low: 0.5, medium: 1, high: 1.5 };
  const particleCount = Math.floor(baseCount * densityFactors[density] * DENSITY_MULTIPLIER[quality]);

  const config = PARTICLE_CONFIGS.network;
  const dummy = useRef<THREE.Object3D | null>(null);
  if (dummy.current === null) {
    dummy.current = new THREE.Object3D();
  }

  // Generate random nodes for particles to travel between
  const generateNodes = () => {
    const temp = [];
    const numNodes = 10;
    for (let i = 0; i < numNodes; i++) {
      temp.push(new THREE.Vector3(
        (Math.random() - 0.5) * viewport.width,
        (Math.random() - 0.5) * viewport.height,
        (Math.random() - 0.5) * 5
      ));
    }
    return temp;
  };

  const [nodes, setNodes] = useState(generateNodes);

  const generateParticles = (currentNodes: THREE.Vector3[]) => {
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      const startIndex = Math.floor(Math.random() * currentNodes.length);
      let endIndex = Math.floor(Math.random() * currentNodes.length);
      if (startIndex === endIndex) endIndex = (endIndex + 1) % currentNodes.length;

      const progress = Math.random(); 
      const scale = config.size.min + Math.random() * (config.size.max - config.size.min);
      const speedMultiplier = Math.random() * 0.5 + 0.5; 
      
      temp.push({ 
        startIndex, 
        endIndex, 
        progress, 
        scale,
        speedMultiplier
      });
    }
    return temp;
  };

  const particlesRef = useRef(generateParticles(nodes));

  const generateColors = () => {
    const temp = new Float32Array(particleCount * 3);
    const colorPrimary = new THREE.Color(PARTICLE_COLORS.primary);
    const colorSecondary = new THREE.Color(PARTICLE_COLORS.secondary);
    
    for (let i = 0; i < particleCount; i++) {
      const color = Math.random() > 0.6 ? colorSecondary : colorPrimary;
      color.toArray(temp, i * 3);
    }
    return temp;
  };

  const [colors, setColors] = useState(generateColors);

  useEffect(() => {
    const newNodes = generateNodes();
    setNodes(newNodes);
    particlesRef.current = generateParticles(newNodes);
    setColors(generateColors());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewport.width, viewport.height, particleCount, config.size]);

  useEffect(() => {
    if (!meshRef.current) return;
    
    for (let i = 0; i < particleCount; i++) {
      const p = particlesRef.current[i];
      const startNode = nodes[p.startIndex];
      const endNode = nodes[p.endIndex];
      
      const x = THREE.MathUtils.lerp(startNode.x, endNode.x, p.progress);
      const y = THREE.MathUtils.lerp(startNode.y, endNode.y, p.progress);
      const z = THREE.MathUtils.lerp(startNode.z, endNode.z, p.progress);

      dummy.current!.position.set(x, y, z);
      dummy.current!.scale.setScalar(p.scale);
      dummy.current!.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.current!.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [nodes, particleCount]);

  useFrame((state, delta) => {
    if (!meshRef.current || prefersReducedMotion) return;
    
    const dt = Math.min(delta, 0.1);

    for (let i = 0; i < particleCount; i++) {
      const p = particlesRef.current[i];
      
      // Update progress
      p.progress += config.speed * p.speedMultiplier * dt;

      if (p.progress >= 1) {
        // Reached destination, pick a new one
        p.progress = 0;
        p.startIndex = p.endIndex;
        let nextIndex = Math.floor(Math.random() * nodes.length);
        if (nextIndex === p.startIndex) {
          nextIndex = (nextIndex + 1) % nodes.length;
        }
        p.endIndex = nextIndex;
      }

      const startNode = nodes[p.startIndex];
      const endNode = nodes[p.endIndex];
      
      const x = THREE.MathUtils.lerp(startNode.x, endNode.x, p.progress);
      const y = THREE.MathUtils.lerp(startNode.y, endNode.y, p.progress);
      const z = THREE.MathUtils.lerp(startNode.z, endNode.z, p.progress);

      dummy.current!.position.set(x, y, z);
      
      // Optionally fade out at ends (progress near 0 or 1) by scaling down
      const fadeScale = Math.sin(p.progress * Math.PI);
      dummy.current!.scale.setScalar(p.scale * fadeScale);
      
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
