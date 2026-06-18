'use client';

import { useRef, ReactNode } from 'react';
import { useInView, UseInViewOptions } from 'framer-motion';

interface LazyCanvasWrapperProps {
  children: ReactNode;
  /**
   * Margin around the viewport. E.g., "400px" means the canvas will mount
   * when it is 400px away from entering the viewport.
   */
  margin?: UseInViewOptions['margin'];
  className?: string;
}

/**
 * Wraps a <Canvas> element to only mount it when it's near the viewport.
 * This saves massive amounts of GPU memory by completely destroying the
 * WebGL context and framebuffers when the section is scrolled far out of view.
 */
export function LazyCanvasWrapper({
  children,
  margin = '600px',
  className = 'absolute inset-0 w-full h-full',
}: LazyCanvasWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin });

  return (
    <div ref={ref} className={className}>
      {isInView && children}
    </div>
  );
}
