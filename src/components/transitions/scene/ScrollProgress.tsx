'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { SPRINGS } from '@/lib/transitions/constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ScrollProgressProps {
  className?: string;
}

/**
 * Exposes global normalized scroll progress.
 * Supports future narrative animations tied to global scroll.
 */
export function ScrollProgress({ className }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, SPRINGS.smooth);

  return (
    <motion.div
      className={cn(
        "fixed top-0 left-0 right-0 h-[2px] bg-cyan-500 origin-left z-[100]",
        className
      )}
      style={{ scaleX }}
    />
  );
}
