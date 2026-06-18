"use client";

import React from 'react';
import { FloatingObject } from '@/components/physics/floating/FloatingObject';
import { ParallaxLayer } from '@/components/parallax/ParallaxLayer';
import { ParticleField } from '@/components/particles/ParticleField';
import { CTALighting } from '@/components/lighting/CTALighting';
import { LightingSystem } from '@/components/lighting/LightingSystem';
import { OrbitalRing } from '@/components/spatial/rings/OrbitalRing';

export function FinalOrbCTA() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black py-32">
      <LightingSystem variant="cta" />

      <ParallaxLayer depth={0.1} mouseEnabled={false}>
        <ParticleField variant="cta" density="high" />
      </ParallaxLayer>

      {/* Central Orb Environment */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <ParallaxLayer depth={0.2}>
          <div className="relative flex items-center justify-center w-[600px] h-[600px]">
            {/* Core Orb */}
            <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse" />
            <div className="w-64 h-64 bg-gradient-to-br from-cyan-400 to-pink-500 rounded-full blur-[40px] opacity-60" />
            
            {/* Orbiting Elements representing metrics converging */}
            <OrbitalRing size={400} duration={20} color="cyan" className="opacity-40" />
            <OrbitalRing size={550} duration={35} reverse color="pink" className="opacity-30" />
          </div>
        </ParallaxLayer>
      </div>

      <div className="relative z-20 w-full max-w-4xl mx-auto px-6 text-center">
        <ParallaxLayer depth={0.4}>
          <FloatingObject amplitudeY={6} duration={8}>
            <div className="bg-black/20 backdrop-blur-md p-12 md:p-20 rounded-3xl border border-white/10 shadow-[0_0_100px_rgba(6,182,212,0.15)]">
              <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight">
                Ready To Build A<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">
                  Revenue System?
                </span>
              </h2>
              <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto font-medium">
                No pressure. Just a strategy session to audit your current growth engine and see if we're a fit.
              </p>
              
              <button className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-cyan-500 font-display rounded-full hover:bg-cyan-400 hover:scale-105 hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 overflow-hidden">
                <span className="relative z-10 text-lg">Book Strategy Call</span>
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              </button>
            </div>
          </FloatingObject>
        </ParallaxLayer>
      </div>
    </section>
  );
}
