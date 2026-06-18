"use client";

import { Environment } from "@react-three/drei";

export function AICoreLighting() {
  return (
    <>
      <ambientLight intensity={0.2} color="#ffffff" />
      
      {/* Cyan Key Light */}
      <directionalLight position={[10, 10, 5]} intensity={3} color="#06B6D4" />
      
      {/* Pink Rim Light */}
      <directionalLight position={[-10, -10, -5]} intensity={2} color="#EC4899" />
      
      {/* White Top Light */}
      <pointLight position={[0, 10, 0]} intensity={1.5} color="#ffffff" distance={20} />
      
      {/* Soft Underglow */}
      <pointLight position={[0, -10, 0]} intensity={1} color="#06B6D4" distance={20} />
      {/* Procedural Environment Map (no external downloads) */}
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <directionalLight position={[10, 10, 5]} intensity={4} color="#06B6D4" />
          <directionalLight position={[-10, -10, -5]} intensity={4} color="#EC4899" />
          <pointLight position={[0, 10, 0]} intensity={4} color="#ffffff" distance={20} />
        </group>
      </Environment>
    </>
  );
}
