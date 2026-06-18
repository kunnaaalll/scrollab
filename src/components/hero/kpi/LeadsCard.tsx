"use client";

import React from 'react';
import { FloatingCard } from '@/components/spatial/cards/FloatingCard';
import { Users } from 'lucide-react';

export const LeadsCard = () => {
  return (
    <FloatingCard 
      depth={1.5} 
      blur="medium"
      className="p-4 w-48 flex flex-col gap-2 border-cyan-500/20"
      withGlow
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-white/60">Total Leads</span>
        <Users className="w-4 h-4 text-cyan-500" />
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold font-display text-white">14,200</span>
      </div>
    </FloatingCard>
  );
};
