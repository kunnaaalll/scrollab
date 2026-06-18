"use client";

export function ResultsLighting() {
  return (
    <group>
      {/* Ambient base lighting to ensure nothing is pitch black */}
      <ambientLight intensity={0.1} color="#ffffff" />
      
      {/* Cyan key light (left) */}
      <directionalLight 
        position={[-10, 5, 5]} 
        intensity={2.5} 
        color="#06B6D4" 
      />
      
      {/* Pink rim light (right) */}
      <directionalLight 
        position={[10, 5, -5]} 
        intensity={1.5} 
        color="#EC4899" 
      />
      
      {/* White area/top light */}
      <directionalLight 
        position={[0, 10, 0]} 
        intensity={0.5} 
        color="#ffffff" 
      />
      
      {/* Soft bottom underglow (cyan) */}
      <pointLight 
        position={[0, -5, 0]} 
        intensity={1.0} 
        color="#06B6D4" 
        distance={20}
      />
    </group>
  );
}
