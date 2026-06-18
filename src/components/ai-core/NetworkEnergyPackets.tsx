"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function NetworkEnergyPackets({ 
  nodePositions, 
  nodeColors 
}: { 
  nodePositions: THREE.Vector3[], 
  nodeColors: string[] 
}) {
  const count = 30; // 6 packets per line
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  // Track progress of each packet [0, 1]
  const packetData = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      const lineIndex = i % nodePositions.length;
      data.push({
        lineIndex,
        progress: Math.random(), // start at random positions along the line
        speed: 0.15 + Math.random() * 0.15, // travel speed
      });
    }
    return data;
  }, [nodePositions.length, count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colorObj = useMemo(() => new THREE.Color(), []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      packetData.forEach((packet, i) => {
        packet.progress += packet.speed * delta;
        if (packet.progress > 1) {
          packet.progress = 0; // loop back to node
        }
        
        // Progress 0 is node, progress 1 is center.
        const startPos = nodePositions[packet.lineIndex];
        const endPos = new THREE.Vector3(0, 0, 0); // center
        
        // Only calculate if startPos is not exactly 0,0,0 to avoid initial frame glitches
        if (startPos.lengthSq() > 0.1) {
          dummy.position.lerpVectors(startPos, endPos, packet.progress);
          // Scale size based on progress so they fade in/out
          const scale = Math.sin(packet.progress * Math.PI) * 1.5;
          dummy.scale.setScalar(scale);
          dummy.updateMatrix();
          
          meshRef.current!.setMatrixAt(i, dummy.matrix);
          
          colorObj.set(nodeColors[packet.lineIndex]);
          meshRef.current!.setColorAt(i, colorObj);
        }
      });
      
      meshRef.current.instanceMatrix.needsUpdate = true;
      if (meshRef.current.instanceColor) {
        meshRef.current.instanceColor.needsUpdate = true;
      }
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.06, 16, 16]} />
      <meshBasicMaterial transparent opacity={0.9} />
    </instancedMesh>
  );
}
