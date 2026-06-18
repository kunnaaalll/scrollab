'use client';

import { usePageTransition, TransitionState, Direction } from '@/lib/page-transition/context';

export function useRouteTransition() {
  const { state, progress, direction, isTransitioning, setTransitionState, updateProgress } = usePageTransition();

  return {
    state,
    progress,
    direction,
    isTransitioning,
    setTransitionState,
    updateProgress,
  };
}

export type { TransitionState, Direction };
