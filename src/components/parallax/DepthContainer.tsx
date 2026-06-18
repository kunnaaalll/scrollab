"use client";

import React from 'react';

interface DepthContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const DepthContainer = ({ children, className = '' }: DepthContainerProps) => {
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {children}
    </div>
  );
};
