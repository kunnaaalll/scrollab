import { useAnimationFrame, useMotionValue, useTransform, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface OrbitOptions {
  radius?: number;
  radiusX?: number;
  radiusY?: number;
  duration?: number; // Time for one full orbit in seconds
  phase?: number;
  direction?: 1 | -1;
  enabled?: boolean;
}

export function useOrbit({
  radius = 150,
  radiusX,
  radiusY,
  duration = 30,
  phase = 0,
  direction = 1,
  enabled = true,
}: OrbitOptions = {}) {
  const shouldReduceMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);
  const time = useMotionValue(0);

  // Only start after client mount to prevent SSR/client hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const rx = radiusX ?? radius;
  const ry = radiusY ?? radius;

  useAnimationFrame((t) => {
    if (!enabled || shouldReduceMotion || !isMounted) return;
    time.set(t);
  });

  const x = useTransform(time, (t) => {
    if (!enabled || shouldReduceMotion || !isMounted) return 0;
    const progress = ((t / 1000) / duration) * Math.PI * 2 * direction + phase;
    return Math.cos(progress) * rx;
  });

  const y = useTransform(time, (t) => {
    if (!enabled || shouldReduceMotion || !isMounted) return 0;
    const progress = ((t / 1000) / duration) * Math.PI * 2 * direction + phase;
    return Math.sin(progress) * ry;
  });

  return { x, y };
}
