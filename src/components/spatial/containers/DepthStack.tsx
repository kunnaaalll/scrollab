"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { DEPTH_SCALES } from '@/lib/spatial/constants';

interface DepthStackProps extends React.HTMLAttributes<HTMLDivElement> {
  background?: React.ReactNode;
  midground?: React.ReactNode;
  foreground?: React.ReactNode;
  floating?: React.ReactNode;
}

export const DepthStack = ({ background, midground, foreground, floating, className, ...props }: DepthStackProps) => {
  return (
    <div className={cn('relative w-full h-full', className)} {...props}>
      {background && (
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: DEPTH_SCALES.background }}>
          {background}
        </div>
      )}
      {midground && (
        <div className="absolute inset-0" style={{ zIndex: DEPTH_SCALES.midground }}>
          {midground}
        </div>
      )}
      {foreground && (
        <div className="relative z-10 w-full h-full" style={{ zIndex: DEPTH_SCALES.foreground }}>
          {foreground}
        </div>
      )}
      {floating && (
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: DEPTH_SCALES.floating }}>
          <div className="pointer-events-auto h-full w-full">
            {floating}
          </div>
        </div>
      )}
    </div>
  );
};
