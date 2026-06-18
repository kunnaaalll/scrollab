"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Html } from "@react-three/drei";
import * as THREE from "three";

interface KPISlab3DProps {
  position: [number, number, number];
  metric: string;
  explanation: string;
  color?: string;
  delay?: number;
}

export function KPISlab3D({ position, metric, explanation, color = "#06B6D4", delay = 0 }: KPISlab3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const [hovered, setHover] = useState(false);

  // Floating and hover animation
  useFrame((state, delta) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime() + delay;
      // Floating motion
      groupRef.current.position.y = position[1] + Math.sin(t) * 0.1;

      // Scale interpolation
      const targetScale = hovered ? 1.05 : 1;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 10);
    }

    if (materialRef.current) {
      // Glow interpolation
      const targetIntensity = hovered ? 1.5 : 0.5;
      materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(materialRef.current.emissiveIntensity, targetIntensity, delta * 10);
    }
  });

  return (
    <group 
      ref={groupRef} 
      position={position} 
      onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
      onPointerOut={(e) => { e.stopPropagation(); setHover(false); }}
    >
      {/* 3D Slab Geometry */}
      <RoundedBox args={[1.6, 0.8, 0.1]} radius={0.05} smoothness={4}>
        <meshPhysicalMaterial
          ref={materialRef}
          color="#0a0a0a"
          roughness={0.2}
          metalness={0.8}
          transmission={0.5}
          thickness={0.5}
          clearcoat={1}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </RoundedBox>

      {/* HTML Overlay for Text */}
      <Html transform distanceFactor={5} position={[0, 0, 0.06]}>
        <div className="flex flex-col items-center justify-center text-center pointer-events-none select-none w-32 h-16">
          <h3 className="text-xl font-bold font-heading text-white m-0 leading-tight" style={{ textShadow: `0 0 10px ${color}` }}>
            {metric}
          </h3>
          <p 
            className="text-[8px] font-sans text-zinc-300 mt-1 transition-opacity duration-300"
            style={{ opacity: hovered ? 1 : 0 }}
          >
            {explanation}
          </p>
        </div>
      </Html>
    </group>
  );
}
