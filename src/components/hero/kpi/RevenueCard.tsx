"use client";

import React from 'react';
import { FloatingCard } from '@/components/spatial/cards/FloatingCard';
import { TrendingUp } from 'lucide-react';

export const RevenueCard = () => {
  return (
    <FloatingCard 
      depth={2} 
      blur="medium"
      className="p-4 w-48 flex flex-col gap-2 border-pink-500/20"
      withGlow
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-white/60">ROAS</span>
        <TrendingUp className="w-4 h-4 text-pink-500" />
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold font-display text-white">+327%</span>
      </div>
    </FloatingCard>
  );
};
