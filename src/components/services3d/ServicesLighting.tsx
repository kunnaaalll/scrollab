"use client";

import React from "react";

export function ServicesLighting() {
  return (
    <>
      {/* Soft overall ambient light */}
      <ambientLight intensity={0.2} color="#ffffff" />
      
      {/* Cyan key light from the front-right */}
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={2.5} 
        color="#06b6d4" 
        castShadow 
      />
      
      {/* Pink rim light from the back-left */}
      <directionalLight 
        position={[-5, 2, -5]} 
        intensity={3} 
        color="#ec4899" 
      />
      
      {/* Soft white top light for general illumination */}
      <spotLight 
        position={[0, 10, 0]} 
        intensity={1} 
        color="#ffffff" 
        angle={Math.PI / 3} 
        penumbra={1} 
      />
    </>
  );
}
