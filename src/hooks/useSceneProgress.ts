'use client';

import { useScroll, useTransform, MotionValue, UseScrollOptions } from 'framer-motion';
import { useRef, RefObject } from 'react';

export interface SceneProgressHook<T extends HTMLElement = HTMLElement> {
  ref: RefObject<T | null>;
  progress: MotionValue<number>;
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
  parallax: {
    slow: MotionValue<number>;
    fast: MotionValue<number>;
  };
}

export function useSceneProgress<T extends HTMLElement = HTMLElement>(
  options?: Omit<UseScrollOptions, 'target'>
): SceneProgressHook<T> {
  const ref = useRef<T>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
    ...options,
  });

  // Calculate generic derived values for entry and exit
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.95, 1, 1, 0.95]);
  
  // Parallax generic speeds (Y-axis translation)
  const ySlow = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const yFast = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return {
    ref,
    progress: scrollYProgress,
    opacity,
    scale,
    parallax: {
      slow: ySlow,
      fast: yFast,
    },
  };
}
