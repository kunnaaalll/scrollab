"use client";

import React from 'react';
import { FloatingCard } from '../cards/FloatingCard';
import { cn } from '@/lib/utils';

interface KPINodeProps {
  label: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  depth?: number;
  className?: string;
}

export const KPINode = ({ label, value, trend, depth = 1, className }: KPINodeProps) => {
  return (
    <FloatingCard 
      depth={depth} 
      className={cn('p-6 flex flex-col justify-center items-start min-w-[200px]', className)}
      blur="medium"
      opacity="medium"
      withGlow
    >
      <div className="text-sm font-medium text-zinc-400 mb-2">{label}</div>
      <div className="text-4xl font-bold text-white font-space-grotesk tracking-tight">
        {value}
      </div>
      {trend && (
        <div className={cn(
          "mt-2 text-sm font-medium flex items-center",
          trend.isPositive ? "text-cyan-400" : "text-pink-400"
        )}>
          {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
        </div>
      )}
    </FloatingCard>
  );
};
