"use client";

import React from 'react';
import { FloatingCard } from '@/components/spatial/cards/FloatingCard';
import { Activity } from 'lucide-react';

export const ConversionCard = () => {
  return (
    <FloatingCard 
      depth={2.5} 
      blur="medium"
      className="p-4 w-48 flex flex-col gap-2 border-white/10"
      withGlow
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-white/60">Conversion Rate</span>
        <Activity className="w-4 h-4 text-emerald-400" />
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold font-display text-white">8.6%</span>
      </div>
    </FloatingCard>
  );
};
