"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Html } from "@react-three/drei";
import * as THREE from "three";

interface ChartPlane3DProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  title: string;
  children: React.ReactNode;
}

export function ChartPlane3D({ position, rotation = [0, 0, 0], title, children }: ChartPlane3DProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Subtle floating motion
  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.position.y = position[1] + Math.sin(t * 0.5 + position[0]) * 0.1;
      groupRef.current.rotation.x = rotation[0] + Math.sin(t * 0.3) * 0.02;
      groupRef.current.rotation.y = rotation[1] + Math.cos(t * 0.4) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Glass Panel Geometry */}
      <RoundedBox args={[3.2, 2.4, 0.05]} radius={0.1} smoothness={4}>
        <meshPhysicalMaterial
          color="#000000"
          transparent
          opacity={0.4}
          roughness={0.1}
          metalness={0.9}
          transmission={0.8}
          clearcoat={1}
          side={THREE.DoubleSide}
        />
      </RoundedBox>
      
      {/* Glow Behind Panel */}
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[3.0, 2.2]} />
        <meshBasicMaterial color="#EC4899" transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>

      {/* HTML Chart Content */}
      <Html transform distanceFactor={4} position={[0, 0, 0.03]} className="pointer-events-none">
        <div className="w-[280px] h-[200px] p-4 flex flex-col justify-between text-white border border-white/10 rounded-lg bg-black/20 backdrop-blur-md">
          <h4 className="text-xs font-heading font-medium text-zinc-300 uppercase tracking-wider mb-2">{title}</h4>
          <div className="flex-grow w-full h-full">
            {children}
          </div>
        </div>
      </Html>
    </group>
  );
}
