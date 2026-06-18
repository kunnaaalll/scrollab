"use client";

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, RoundedBox } from '@react-three/drei';
import { useReducedMotion } from 'framer-motion';
import * as THREE from 'three';
import { Star } from 'lucide-react';
import { TestimonialData } from './TestimonialsData';

interface Props {
  data: TestimonialData;
}

export function TestimonialCard3D({ data }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const [hovered, setHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Floating organic motion
  useFrame((state) => {
    if (shouldReduceMotion || !groupRef.current) return;
    
    const t = state.clock.elapsedTime + data.delay;
    
    // Smooth organic floating
    groupRef.current.position.y = data.position.y + Math.sin(t * 0.5) * 15;
    groupRef.current.position.x = data.position.x + Math.cos(t * 0.3) * 10;
    
    // Subtle rotation
    groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.05;
    groupRef.current.rotation.y = Math.cos(t * 0.6) * 0.05;

    // Hover effect smoothing
    if (materialRef.current) {
      const targetEmissive = hovered ? 0.8 : 0.0;
      materialRef.current.emissiveIntensity += (targetEmissive - materialRef.current.emissiveIntensity) * 0.1;
    }
    
    // Scale smoothing
    const targetScale = hovered ? 1.05 : 1.0;
    groupRef.current.scale.x += (targetScale - groupRef.current.scale.x) * 0.1;
    groupRef.current.scale.y += (targetScale - groupRef.current.scale.y) * 0.1;
    groupRef.current.scale.z += (targetScale - groupRef.current.scale.z) * 0.1;
  });

  return (
    <group 
      ref={groupRef} 
      position={data.position}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(false); }}
    >
      <RoundedBox args={[280, 200, 10]} radius={10} smoothness={4}>
        <meshPhysicalMaterial
          ref={materialRef}
          color="#000000"
          transparent
          opacity={0.8}
          transmission={0.9}
          roughness={0.2}
          thickness={5}
          clearcoat={1}
          clearcoatRoughness={0.1}
          emissive="#EC4899"
          emissiveIntensity={0}
        />
      </RoundedBox>

      {/* HTML Overlay for Text */}
      <Html 
        transform 
        occlude="blending" 
        position={[0, 0, 6]} // Slightly in front of the box
        className="w-[260px] pointer-events-none select-none"
      >
        <div className="flex flex-col p-6 font-sans text-white h-[180px] justify-between">
          <div>
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-pink-500 text-pink-500" />
              ))}
            </div>
            <p className="text-sm md:text-base font-medium leading-relaxed opacity-90 font-display">
              "{data.quote}"
            </p>
          </div>
          
          <div className="flex items-center gap-3 mt-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/40 to-pink-500/40 border border-white/20" />
            <div>
              <h4 className="font-bold text-xs">{data.author}</h4>
              <p className="text-[10px] text-white/50">{data.role}</p>
            </div>
          </div>
        </div>

        {/* Tooltip on Hover */}
        <div className={`absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-black px-3 py-1.5 rounded-md text-xs font-bold whitespace-nowrap transition-all duration-300 ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          View Case Study
        </div>
      </Html>
    </group>
  );
}
