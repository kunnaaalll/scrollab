"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Sphere, Ring } from "@react-three/drei";
import * as THREE from "three";

export function ServicesCore() {
  const coreRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.2;
      ring1Ref.current.rotation.y += delta * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x -= delta * 0.15;
      ring2Ref.current.rotation.y += delta * 0.25;
    }
    if (coreRef.current) {
      coreRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={coreRef}>
      {/* Outer Glass Sphere */}
      <Sphere args={[1.5, 64, 64]}>
        <meshPhysicalMaterial
          transparent
          opacity={0.3}
          roughness={0.1}
          transmission={0.9}
          thickness={0.5}
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          color="#ffffff"
        />
      </Sphere>

      {/* Inner Energy Sphere */}
      <Sphere args={[1, 32, 32]}>
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.6} />
      </Sphere>

      {/* Rotating Rings */}
      <Ring ref={ring1Ref} args={[1.8, 1.85, 64]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.4} side={THREE.DoubleSide} />
      </Ring>
      
      <Ring ref={ring2Ref} args={[2.2, 2.22, 64]} rotation={[0, Math.PI / 4, 0]}>
        <meshBasicMaterial color="#ec4899" transparent opacity={0.3} side={THREE.DoubleSide} />
      </Ring>

      {/* Core Label */}
      <Html center position={[0, 0, 0]} className="pointer-events-none select-none">
        <div className="flex flex-col items-center justify-center text-center">
          <span className="text-sm font-bold tracking-[0.2em] text-white/90 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)] font-heading">
            SCROLLAB
          </span>
          <span className="text-xs font-semibold tracking-widest text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)] font-sans">
            SYSTEMS
          </span>
        </div>
      </Html>
    </group>
  );
}
