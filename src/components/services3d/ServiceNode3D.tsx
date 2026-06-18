"use client";

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Html } from "@react-three/drei";
import * as THREE from "three";
import { LucideIcon } from "lucide-react";
import { ServiceTooltip3D } from "./ServiceTooltip3D";

interface ServiceNode3DProps {
  title: string;
  description: string;
  color: string;
  icon: LucideIcon;
  position?: [number, number, number];
}

export function ServiceNode3D({ title, description, color, icon: Icon, position = [0, 0, 0] }: ServiceNode3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const targetScale = hovered ? 1.1 : 1;

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Gentle floating motion on top of orbit
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 2 + position[0]) * delta * 0.2;
      
      // Smooth scaling on hover
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 8);
    }
  });

  return (
    <group position={position}>
      <RoundedBox
        ref={meshRef}
        args={[1.5, 1.5, 0.4]} // Width, Height, Depth
        radius={0.2}
        smoothness={4}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <meshPhysicalMaterial
          transparent
          opacity={hovered ? 0.9 : 0.7}
          roughness={0.2}
          transmission={0.9}
          thickness={0.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
          color="#ffffff"
          emissive={color}
          emissiveIntensity={hovered ? 0.4 : 0.1}
        />
        
        {/* Render Icon via HTML */}
        <Html center position={[0, 0, 0.21]} className="pointer-events-none select-none">
          <div 
            className="flex items-center justify-center transition-transform duration-300"
            style={{ transform: hovered ? 'scale(1.1)' : 'scale(1)', filter: `drop-shadow(0 0 10px ${color})` }}
          >
            <Icon size={32} color={color} strokeWidth={1.5} />
          </div>
        </Html>
      </RoundedBox>

      <ServiceTooltip3D 
        title={title} 
        description={description} 
        color={color} 
        visible={hovered} 
      />
    </group>
  );
}
