'use client';

import { ReactNode, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SPRINGS } from '@/lib/transitions/constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
  blur?: boolean;
}

/**
 * SectionReveal uses spring physics to fade sections into existence organically.
 * Avoids linear motion.
 */
export function SectionReveal({
  children,
  className,
  delay = 0,
  yOffset = 50,
  blur = true
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        y: yOffset, 
        scale: 0.95,
        filter: blur ? 'blur(12px)' : 'blur(0px)'
      }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        filter: 'blur(0px)'
      } : {}}
      transition={{
        ...SPRINGS.reveal,
        delay,
      }}
      className={cn("w-full relative z-10", className)}
    >
      {children}
    </motion.div>
  );
}
