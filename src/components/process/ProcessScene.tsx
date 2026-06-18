'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from 'framer-motion';

import { ProcessStation3D } from './ProcessStation3D';
import { JourneyPath } from './JourneyPath';
import { JourneyPackets } from './JourneyPackets';
import { ProcessLighting } from './ProcessLighting';
import { ParticleScene } from '../particles/ParticleField';

export function ProcessScene() {
  const sceneGroup = useRef<THREE.Group>(null);
  const shouldReduceMotion = useReducedMotion();

  // Define the stations and their positions with True Spatial Depth
  const stations = useMemo(() => [
    {
      id: 'discover',
      title: 'Discover',
      description: 'Understanding your business and opportunities.',
      number: '01',
      position: new THREE.Vector3(-8, 4, -200),
      rotationSpeed: 0.3,
    },
    {
      id: 'build',
      title: 'Build',
      description: 'Building systems that drive growth.',
      number: '02',
      position: new THREE.Vector3(6, 0, -50),
      rotationSpeed: 0.5,
    },
    {
      id: 'optimize',
      title: 'Optimize',
      description: 'Improving every metric continuously.',
      number: '03',
      position: new THREE.Vector3(-4, -2, 100),
      rotationSpeed: 0.4,
    },
    {
      id: 'scale',
      title: 'Scale',
      description: 'Compounding revenue across channels.',
      number: '04',
      position: new THREE.Vector3(5, 2, 250),
      rotationSpeed: 0.6,
    },
  ], []);

  // Generate intermediate points for a smooth curved path
  const pathPoints = useMemo(() => {
    // Adding control points to make the curve organic
    const p1 = stations[0].position;
    const p2 = stations[1].position;
    const p3 = stations[2].position;
    const p4 = stations[3].position;

    return [
      new THREE.Vector3(p1.x - 5, p1.y + 5, p1.z - 20), // Start extension
      p1,
      new THREE.Vector3((p1.x + p2.x) / 2 + 5, (p1.y + p2.y) / 2 - 2, (p1.z + p2.z) / 2),
      p2,
      new THREE.Vector3((p2.x + p3.x) / 2 - 5, (p2.y + p3.y) / 2 + 2, (p2.z + p3.z) / 2),
      p3,
      new THREE.Vector3((p3.x + p4.x) / 2 + 3, (p3.y + p4.y) / 2 - 1, (p3.z + p4.z) / 2),
      p4,
      new THREE.Vector3(p4.x + 5, p4.y - 5, p4.z + 20), // End extension
    ];
  }, [stations]);

  // Mouse Parallax (subtle: max 8px visually, translated to 3D units roughly)
  useFrame((state) => {
    if (shouldReduceMotion || !sceneGroup.current) return;
    
    // state.pointer is normalized mouse coordinates between -1 and 1
    const targetX = (state.pointer.x * 2); 
    const targetY = (state.pointer.y * 2);

    // Smoothly interpolate current rotation towards target
    sceneGroup.current.position.x = THREE.MathUtils.lerp(sceneGroup.current.position.x, targetX, 0.05);
    sceneGroup.current.position.y = THREE.MathUtils.lerp(sceneGroup.current.position.y, targetY, 0.05);
  });

  return (
    <>
      <ProcessLighting />
      
      {/* 3D Particle Environment */}
      <group position={[0, 0, -50]}>
        {!shouldReduceMotion && <ParticleScene variant="process" density="low" />}
      </group>

      <group ref={sceneGroup}>
        {/* The glowing curved path */}
        <JourneyPath points={pathPoints} />
        
        {/* Energy packets traveling the path */}
        {!shouldReduceMotion && <JourneyPackets points={pathPoints} count={20} />}

        {/* The floating stations */}
        {stations.map((station) => (
          <ProcessStation3D
            key={station.id}
            position={[station.position.x, station.position.y, station.position.z]}
            title={station.title}
            description={station.description}
            number={station.number}
            rotationSpeed={station.rotationSpeed}
          />
        ))}
      </group>
    </>
  );
}
