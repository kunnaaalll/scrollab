'use client';

export function ProcessLighting() {
  return (
    <>
      <ambientLight intensity={0.2} color="#FDF2F8" />
      <hemisphereLight groundColor="#000000" color="#EC4899" intensity={0.5} />
      
      {/* Cyan key light */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={2}
        color="#06B6D4"
        castShadow
      />
      
      {/* Pink rim light */}
      <directionalLight
        position={[-10, 5, -5]}
        intensity={3}
        color="#EC4899"
      />
      
      {/* White top light */}
      <directionalLight
        position={[0, 20, 0]}
        intensity={1}
        color="#ffffff"
      />
    </>
  );
}
