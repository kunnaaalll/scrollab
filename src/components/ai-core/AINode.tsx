"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Sphere } from "@react-three/drei";
import { NodeLabel3D } from "./NodeLabel3D";

interface AINodeProps {
  color: string;
  label: string;
  description: string;
}

export function AINode({ color, label, description }: AINodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = "pointer";
    } else {
      document.body.style.cursor = "auto";
    }
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Smooth scale on hover
      const targetScale = hovered ? 1.3 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5);
      
      // Rotate the node itself slowly
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.rotation.x += delta * 0.2;
    }
  });

  return (
    <group>
      <Sphere
        ref={meshRef}
        args={[0.6, 32, 32]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 1.5 : 0.4}
          transmission={0.9}
          opacity={1}
          metalness={0.2}
          roughness={0.1}
          ior={1.5}
          thickness={1}
          clearcoat={1}
          transparent={true}
        />
      </Sphere>
      <NodeLabel3D label={label} description={description} visible={hovered} />
    </group>
  );
}
