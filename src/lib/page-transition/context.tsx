'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export type TransitionState = 'idle' | 'exiting' | 'overlay' | 'loading' | 'entering';
export type Direction = 'forward' | 'backward' | 'neutral';

export interface PageTransitionContextValue {
  state: TransitionState;
  progress: number;
  direction: Direction;
  isTransitioning: boolean;
  setTransitionState: (state: TransitionState) => void;
  updateProgress: (progress: number) => void;
}

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null);

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [state, setState] = useState<TransitionState>('idle');
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState<Direction>('neutral');
  const [prevPath, setPrevPath] = useState(pathname);

  // Monitor route changes to trigger transition states
  useEffect(() => {
    if (pathname !== prevPath) {
      // Basic heuristic for direction, can be enhanced
      const isBack = pathname.length < prevPath.length;
      setDirection(isBack ? 'backward' : 'forward');
      
      setState('exiting');
      setProgress(0);
      
      setPrevPath(pathname);
    }
  }, [pathname, searchParams, prevPath]);

  const setTransitionState = useCallback((newState: TransitionState) => {
    setState(newState);
  }, []);

  const updateProgress = useCallback((newProgress: number) => {
    setProgress(Math.max(0, Math.min(100, newProgress)));
  }, []);

  const value = useMemo(
    () => ({
      state,
      progress,
      direction,
      isTransitioning: state !== 'idle',
      setTransitionState,
      updateProgress,
    }),
    [state, progress, direction, setTransitionState, updateProgress]
  );

  return (
    <PageTransitionContext.Provider value={value}>
      {children}
    </PageTransitionContext.Provider>
  );
}

export function usePageTransition() {
  const context = useContext(PageTransitionContext);
  if (!context) {
    throw new Error('usePageTransition must be used within a PageTransitionProvider');
  }
  return context;
}
