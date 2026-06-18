"use client";

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PerspectiveGroupProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
}

export const PerspectiveGroup = ({ children, className, style, ...props }: PerspectiveGroupProps) => {
  return (
    <motion.div
      className={cn('relative w-full h-full', className)}
      style={{
        transformStyle: 'preserve-3d',
        ...style
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
