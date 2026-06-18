'use client';

import { useEffect, useContext } from 'react';
import { useThree } from '@react-three/fiber';
import { CanvasViewContext } from './LazyCanvasWrapper';

export function SceneOptimizer() {
  const isInView = useContext(CanvasViewContext);
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    // When out of view, we hide the scene entirely.
    // Three.js will skip rendering all children (saving CPU and GPU cycles).
    // eslint-disable-next-line react-hooks/immutability
    scene.visible = isInView;
  }, [isInView, scene]);

  return null;
}
