"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Sphere } from "@react-three/drei";

export function AICoreSphere() {
  const outerSphereRef = useRef<THREE.Mesh>(null);
  const innerSphereRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (outerSphereRef.current) {
      outerSphereRef.current.rotation.y += delta * 0.1;
      outerSphereRef.current.rotation.x += delta * 0.05;
    }
    if (innerSphereRef.current) {
      innerSphereRef.current.rotation.y -= delta * 0.15;
      innerSphereRef.current.rotation.z += delta * 0.08;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
      ringsRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group>
      {/* Outer Glass Shell */}
      <Sphere ref={outerSphereRef} args={[2.5, 64, 64]}>
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.95}
          opacity={1}
          metalness={0.1}
          roughness={0.1}
          ior={1.5}
          thickness={2}
          specularIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </Sphere>

      {/* Inner Energy Sphere */}
      <Sphere ref={innerSphereRef} args={[1.8, 64, 64]}>
        <meshPhysicalMaterial
          color="#06B6D4"
          emissive="#06B6D4"
          emissiveIntensity={2}
          roughness={0.4}
          metalness={0.8}
          wireframe={true}
          transparent={true}
          opacity={0.3}
        />
      </Sphere>

      {/* Central White Pulse */}
      <Sphere args={[1, 32, 32]}>
        <meshBasicMaterial color="#ffffff" />
      </Sphere>
      
      {/* Rotating Energy Rings */}
      <group ref={ringsRef}>
        {[0, 1, 2].map((index) => (
          <mesh key={index} rotation-x={Math.PI / 2} rotation-y={(Math.PI / 3) * index}>
            <torusGeometry args={[3.2 + index * 0.4, 0.01, 16, 100]} />
            <meshBasicMaterial color="#EC4899" transparent opacity={0.4} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
