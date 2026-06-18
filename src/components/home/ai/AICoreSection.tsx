"use client";

import React from 'react';
import { FloatingObject } from '@/components/physics/floating/FloatingObject';
import { GlassPanel } from '@/components/spatial/panels/GlassPanel';
import { ParallaxLayer } from '@/components/parallax/ParallaxLayer';
import { ParticleField } from '@/components/particles/ParticleField';
import { AILighting } from '@/components/lighting/AILighting';
import { LightingSystem } from '@/components/lighting/LightingSystem';
import { NetworkLine } from '@/components/spatial/lines/NetworkLine';

const AI_NODES = [
  { label: 'Automation', x: 20, y: 15, delay: 0 },
  { label: 'Creative', x: 75, y: 25, delay: 1 },
  { label: 'SEO', x: 15, y: 70, delay: 2 },
  { label: 'Analytics', x: 80, y: 65, delay: 0.5 },
  { label: 'Content', x: 50, y: 10, delay: 1.5 },
  { label: 'Funnels', x: 50, y: 85, delay: 2.5 },
];

export function AICoreSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020617] py-24">
      <LightingSystem variant="ai" />
      
      <ParallaxLayer depth={0.1} mouseEnabled={false}>
        <ParticleField variant="ai" density="medium" />
      </ParallaxLayer>

      <div className="relative z-10 w-full max-w-6xl mx-auto min-h-[700px] flex items-center justify-center">
        
        {/* Network Lines to center (simulated conceptually with a background SVG) */}
        <div className="absolute inset-0 z-0 opacity-40">
           {AI_NODES.map((node, i) => (
             <NetworkLine 
               key={i} 
               startX={node.x} 
               startY={node.y} 
               endX={50} 
               endY={50} 
               color={i % 2 === 0 ? "rgba(6, 182, 212, 0.5)" : "rgba(236, 72, 153, 0.5)"}
               duration={2 + (i * 0.5)}
             />
           ))}
        </div>

        {/* Central AI Core */}
        <ParallaxLayer depth={0.2} className="flex items-center justify-center z-20">
          <FloatingObject amplitudeY={5} duration={6}>
            <div className="relative w-40 h-40 md:w-56 md:h-56">
              {/* Core Glow */}
              <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-[40px] animate-pulse" />
              <div className="absolute inset-4 bg-pink-500/20 rounded-full blur-[20px]" />
              
              {/* Core Physical Object */}
              <GlassPanel className="w-full h-full rounded-full flex flex-col items-center justify-center border-2 border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.4)] backdrop-blur-xl">
                <span className="text-xl md:text-2xl font-bold text-white tracking-widest font-display">SCROLLAB</span>
                <span className="text-sm font-medium text-cyan-400 mt-1">AI CORE</span>
              </GlassPanel>
            </div>
          </FloatingObject>
        </ParallaxLayer>

        {/* Orbiting / Floating Nodes */}
        {AI_NODES.map((node, i) => (
          <div 
            key={node.label} 
            className="absolute w-24 md:w-32 z-30"
            style={{ 
              top: `${node.y}%`, 
              left: `${node.x}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <ParallaxLayer depth={0.3 + (i * 0.05)}>
              <FloatingObject phase={node.delay} duration={5 + i} amplitudeY={8}>
                <GlassPanel className="px-4 py-3 rounded-xl border border-white/10 bg-black/50 text-center hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all cursor-pointer">
                  <span className="text-sm md:text-base font-medium text-white/90">{node.label}</span>
                </GlassPanel>
              </FloatingObject>
            </ParallaxLayer>
          </div>
        ))}
        
      </div>
    </section>
  );
}
