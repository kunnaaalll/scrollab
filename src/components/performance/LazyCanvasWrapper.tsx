'use client';

import { useRef, ReactNode, createContext } from 'react';
import { useInView, UseInViewOptions } from 'framer-motion';

export const CanvasViewContext = createContext(true);

interface LazyCanvasWrapperProps {
  children: ReactNode;
  /**
   * Margin around the viewport. E.g., "400px" means the canvas will mount
   * when it is 400px away from entering the viewport.
   */
  margin?: UseInViewOptions['margin'];
  className?: string;
}

export function LazyCanvasWrapper({
  children,
  margin = '600px',
  className = 'absolute inset-0 w-full h-full pointer-events-none z-0',
}: LazyCanvasWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin });

  return (
    <div ref={ref} className={className}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: isInView ? '100%' : '1px',
          height: isInView ? '100%' : '1px',
          opacity: isInView ? 1 : 0,
          pointerEvents: isInView ? 'auto' : 'none',
          overflow: 'hidden',
        }}
      >
        <CanvasViewContext.Provider value={isInView}>
          {children}
        </CanvasViewContext.Provider>
      </div>
    </div>
  );
}
