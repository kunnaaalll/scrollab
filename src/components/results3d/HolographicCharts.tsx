"use client";

import { ChartPlane3D } from "./ChartPlane3D";

// Simple CSS based charts to maintain high performance without importing heavy charting libraries
function LineChart() {
  return (
    <div className="w-full h-full flex items-end gap-1 overflow-hidden relative">
      {/* Simple SVG line chart representation */}
      <svg viewBox="0 0 100 50" className="absolute inset-0 w-full h-full drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
        <path 
          d="M0 45 Q 10 40, 20 35 T 40 20 T 60 25 T 80 10 T 100 5" 
          fill="none" 
          stroke="#06B6D4" 
          strokeWidth="2" 
          strokeLinecap="round"
        />
        <path 
          d="M0 45 Q 10 40, 20 35 T 40 20 T 60 25 T 80 10 T 100 5 L 100 50 L 0 50 Z" 
          fill="url(#lineGradient)" 
          opacity="0.3"
        />
        <defs>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function BarChart() {
  const bars = [30, 45, 25, 60, 40, 75, 55, 90, 85, 100];
  return (
    <div className="w-full h-full flex items-end justify-between gap-[2px]">
      {bars.map((h, i) => (
        <div 
          key={i} 
          className="w-full bg-gradient-to-t from-pink-500/20 to-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)] rounded-t-sm"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

export function HolographicCharts() {
  return (
    <group>
      {/* Left Chart (Line) */}
      <ChartPlane3D 
        title="Traffic Growth" 
        position={[-4.5, 0, -2]} 
        rotation={[0, Math.PI / 8, 0]}
      >
        <LineChart />
      </ChartPlane3D>

      {/* Right Chart (Bar) */}
      <ChartPlane3D 
        title="Conversion Volume" 
        position={[4.5, -0.5, -1.5]} 
        rotation={[0, -Math.PI / 6, 0]}
      >
        <BarChart />
      </ChartPlane3D>
    </group>
  );
}
