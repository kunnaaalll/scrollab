"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Circle, Ring } from "@react-three/drei";

export function CommandCenterCore() {
  const outerRingRef = useRef<THREE.Mesh>(null);
  const middleRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z -= delta * 0.1;
    }
    if (middleRingRef.current) {
      middleRingRef.current.rotation.z += delta * 0.15;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z -= delta * 0.2;
    }
  });

  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      {/* Outer Ring */}
      <Ring ref={outerRingRef} args={[2.8, 2.85, 64]} position={[0, 0, 0]}>
        <meshBasicMaterial color="#06B6D4" transparent opacity={0.3} side={THREE.DoubleSide} />
      </Ring>

      {/* Middle Ring */}
      <Ring ref={middleRingRef} args={[2.4, 2.45, 64]} position={[0, 0, 0.05]}>
        <meshBasicMaterial color="#EC4899" transparent opacity={0.4} side={THREE.DoubleSide} />
      </Ring>

      {/* Inner Ring */}
      <Ring ref={innerRingRef} args={[1.8, 1.85, 64]} position={[0, 0, 0.1]}>
        <meshBasicMaterial color="#06B6D4" transparent opacity={0.5} side={THREE.DoubleSide} />
      </Ring>

      {/* Core Base Surface */}
      <Circle args={[2.8, 64]} position={[0, 0, -0.1]}>
        <meshPhysicalMaterial
          color="#000000"
          transparent
          opacity={0.6}
          roughness={0.2}
          metalness={0.8}
          transmission={0.5}
          side={THREE.DoubleSide}
        />
      </Circle>

      {/* Glowing Core Energy */}
      <mesh position={[0, 0, 0.2]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#06B6D4" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}
