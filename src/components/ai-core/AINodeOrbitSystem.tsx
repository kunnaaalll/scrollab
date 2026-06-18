"use client";

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { AINode } from './AINode';
import { NeuralNetworkLines } from './NeuralNetworkLines';
import { NetworkEnergyPackets } from './NetworkEnergyPackets';

export const AI_NODES_DATA = [
  { id: 'seo', label: 'SEO', description: 'Compounding organic growth systems.', color: '#10B981', radius: 4.5, speed: 0.15, offset: 0 },
  { id: 'paid', label: 'Paid Media', description: 'Performance marketing engineered for scale.', color: '#06B6D4', radius: 6.5, speed: 0.12, offset: Math.PI / 2.5 },
  { id: 'content', label: 'Content', description: 'Authority engines that compound.', color: '#EC4899', radius: 5.5, speed: 0.2, offset: Math.PI },
  { id: 'website', label: 'Website', description: 'High-converting digital experiences.', color: '#3B82F6', radius: 7.5, speed: 0.08, offset: (Math.PI * 3) / 2 },
  { id: 'automation', label: 'Automation', description: 'AI workflows and systems.', color: '#8B5CF6', radius: 6, speed: 0.18, offset: Math.PI / 4 },
];

export function AINodeOrbitSystem({ reduceMotion = false }: { reduceMotion?: boolean }) {
  const nodePositions = useMemo(() => AI_NODES_DATA.map(() => new THREE.Vector3()), []);
  const nodeColors = useMemo(() => AI_NODES_DATA.map((n) => n.color), []);

  useFrame((state) => {
    const time = reduceMotion ? 0 : state.clock.elapsedTime;
    AI_NODES_DATA.forEach((node, i) => {
      const angle = time * node.speed + node.offset;
      // Elliptical or circular orbit with vertical variation
      const x = Math.cos(angle) * node.radius;
      const z = Math.sin(angle) * node.radius;
      const y = Math.sin(angle * 2) * 1.5; // slight bobbing
      nodePositions[i].set(x, y, z);
    });
  });

  return (
    <group>
      {AI_NODES_DATA.map((node, i) => (
        <OrbitingNode key={node.id} data={node} positionRef={nodePositions[i]} />
      ))}
      <NeuralNetworkLines nodePositions={nodePositions} />
      {!reduceMotion && <NetworkEnergyPackets nodePositions={nodePositions} nodeColors={nodeColors} />}
    </group>
  );
}

function OrbitingNode({ data, positionRef }: { data: typeof AI_NODES_DATA[0], positionRef: THREE.Vector3 }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.copy(positionRef);
    }
  });

  return (
    <group ref={groupRef}>
      <AINode color={data.color} label={data.label} description={data.description} />
    </group>
  );
}
