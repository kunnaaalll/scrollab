"use client";

import React from 'react';
import { cn } from '@/lib/utils';

export type SpatialSectionVariant = 'hero' | 'services' | 'results' | 'process' | 'ai' | 'dashboard' | 'testimonials' | 'cta';

interface SpatialSectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: SpatialSectionVariant;
  children: React.ReactNode;
}

const variantStyles: Record<SpatialSectionVariant, string> = {
  hero: 'min-h-screen pt-32 pb-16 flex flex-col justify-center overflow-hidden',
  services: 'py-24 relative',
  results: 'py-24 bg-zinc-950 relative',
  process: 'py-32 relative',
  ai: 'py-32 overflow-hidden relative',
  dashboard: 'py-24 relative',
  testimonials: 'py-32 overflow-hidden relative',
  cta: 'min-h-[80vh] flex items-center justify-center py-24 overflow-hidden relative',
};

export const SpatialSection = ({ variant = 'services', children, className, ...props }: SpatialSectionProps) => {
  return (
    <section 
      className={cn(
        'w-full',
        variantStyles[variant],
        className
      )}
      style={{ perspective: '1200px' }}
      {...props}
    >
      {children}
    </section>
  );
};
