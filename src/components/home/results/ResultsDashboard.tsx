"use client";

import React from 'react';
import { GlassPanel } from '@/components/spatial/panels/GlassPanel';
import { KPINode } from '@/components/spatial/nodes/KPINode';
import { FloatingObject } from '@/components/physics/floating/FloatingObject';
import { LightingSystem } from '@/components/lighting/LightingSystem';
import { DashboardLighting } from '@/components/lighting/DashboardLighting';
import { ParticleField } from '@/components/particles/ParticleField';
import { ParallaxLayer } from '@/components/parallax/ParallaxLayer';

export function ResultsDashboard() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-32 bg-[#050505]">
      {/* Environment */}
      <LightingSystem variant="dashboard" />
      <ParallaxLayer depth={0.1} mouseEnabled={false}>
        <ParticleField variant="dashboard" density="medium" />
      </ParallaxLayer>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-8">
        <ParallaxLayer depth={0.2}>
          <FloatingObject amplitudeY={8} duration={10}>
            <GlassPanel className="w-full h-[500px] md:h-[700px] border border-white/10 bg-black/40 p-6 md:p-10 flex flex-col justify-between overflow-hidden relative rounded-2xl md:rounded-3xl shadow-2xl">
              {/* Header */}
              <div className="flex justify-between items-center mb-8 relative z-20">
                <div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">Growth Dashboard</h2>
                  <p className="text-white/60 text-sm md:text-base">Real-time Performance Metrics</p>
                </div>
                <div className="flex items-center gap-3 bg-black/50 px-4 py-2 rounded-full border border-white/5">
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)] animate-pulse" />
                  <span className="text-cyan-500 text-xs md:text-sm font-medium">Live sync</span>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 relative flex items-center justify-center rounded-xl overflow-hidden border border-white/5 bg-black/20">
                {/* Background Grid for Dashboard feel */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
                
                {/* Abstract Chart Representation */}
                <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-pink-500/10 to-transparent" />
                <svg className="absolute bottom-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path d="M0,100 L0,80 Q15,85 25,60 T50,50 T75,20 T100,10 L100,100 Z" fill="rgba(236,72,153,0.1)" />
                  <path d="M0,80 Q15,85 25,60 T50,50 T75,20 T100,10" fill="none" stroke="rgba(236,72,153,0.5)" strokeWidth="0.5" />
                  
                  {/* Secondary Line */}
                  <path d="M0,100 L0,90 Q20,95 30,70 T60,60 T85,30 T100,25 L100,100 Z" fill="rgba(6,182,212,0.05)" />
                  <path d="M0,90 Q20,95 30,70 T60,60 T85,30 T100,25" fill="none" stroke="rgba(6,182,212,0.3)" strokeWidth="0.5" />
                </svg>
              </div>
            </GlassPanel>
          </FloatingObject>
        </ParallaxLayer>

        {/* Floating KPI Nodes */}
        <div className="absolute inset-0 pointer-events-none z-30">
          <ParallaxLayer depth={0.4}>
             <FloatingObject phase={1} duration={6} className="absolute top-[10%] left-[5%] md:left-[-2%] pointer-events-auto">
               <KPINode value="+327%" label="Avg ROAS" trend={{ value: 327, isPositive: true }} />
             </FloatingObject>
          </ParallaxLayer>

          <ParallaxLayer depth={0.6}>
             <FloatingObject phase={2} duration={7.5} amplitudeY={12} className="absolute bottom-[20%] left-[15%] md:left-[10%] pointer-events-auto">
               <KPINode value="14.2K" label="Leads Generated" trend={{ value: 142, isPositive: true }} />
             </FloatingObject>
          </ParallaxLayer>

          <ParallaxLayer depth={0.5}>
             <FloatingObject phase={3} duration={5.5} className="absolute top-[30%] right-[5%] md:right-[-5%] pointer-events-auto">
               <KPINode value="-31%" label="CPA Reduction" trend={{ value: 31, isPositive: true }} />
             </FloatingObject>
          </ParallaxLayer>
        </div>
      </div>
    </section>
  );
}
