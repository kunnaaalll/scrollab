"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ServiceNode3D } from "./ServiceNode3D";
import { TrendingUp, Search, Cpu, Share2, Globe, FileText } from "lucide-react";

export const SERVICES_DATA = [
  { id: "perf", title: "Performance Marketing", description: "Data-driven campaigns that scale.", color: "#06b6d4", icon: TrendingUp },
  { id: "seo", title: "SEO", description: "Organic growth systems that compound.", color: "#10b981", icon: Search },
  { id: "ai", title: "AI Marketing", description: "Automated intelligence for your brand.", color: "#ec4899", icon: Cpu },
  { id: "social", title: "Social Media", description: "Engaging narratives that build community.", color: "#8b5cf6", icon: Share2 },
  { id: "web", title: "Website Development", description: "High-performance digital experiences.", color: "#3b82f6", icon: Globe },
  { id: "content", title: "Content Systems", description: "Scalable content engines.", color: "#f97316", icon: FileText }
];

export function ServiceOrbitSystem() {
  // Pre-calculate random but fixed orbital parameters for each service
  const orbitalParams = useMemo(() => {
    return SERVICES_DATA.map(() => {
      // Radius between 3.5 and 5.5
      const radius = 3.5 + Math.random() * 2;
      // Duration between 40 and 80 seconds
      const duration = 40 + Math.random() * 40;
      // Speed multiplier
      const speed = (Math.PI * 2) / duration;
      // Initial offset so they don't start at the same angle
      const offset = Math.random() * Math.PI * 2;
      // Height variance
      const height = (Math.random() - 0.5) * 2;
      // Direction 1 or -1
      const direction = Math.random() > 0.5 ? 1 : -1;
      
      return { radius, speed, offset, height, direction };
    });
  }, []);

  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    
    // Update each child's position manually to avoid re-renders
    groupRef.current.children.forEach((child, i) => {
      const params = orbitalParams[i];
      if (!params) return;
      const angle = params.offset + time * params.speed * params.direction;
      child.position.x = Math.cos(angle) * params.radius;
      child.position.z = Math.sin(angle) * params.radius;
      child.position.y = params.height + Math.sin(time * 0.5 + params.offset) * 0.5; // Additional bobbing
    });
  });

  return (
    <group ref={groupRef}>
      {SERVICES_DATA.map((service, i) => (
        <group key={service.id}>
          <ServiceNode3D 
            title={service.title}
            description={service.description}
            color={service.color}
            icon={service.icon}
          />
        </group>
      ))}
    </group>
  );
}
