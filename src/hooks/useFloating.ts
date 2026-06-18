import { useAnimationFrame, useMotionValue, useTransform, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FloatingOptions {
  amplitudeY?: number;
  amplitudeX?: number;
  duration?: number; // seconds
  phase?: number;
  rotationRange?: number;
  enabled?: boolean;
}

export function useFloating({
  amplitudeY = 15,
  amplitudeX = 5,
  duration = 20,
  phase = 0,
  rotationRange = 2,
  enabled = true,
}: FloatingOptions = {}) {
  const shouldReduceMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);
  const time = useMotionValue(0);

  // Only start after client mount to prevent SSR/client hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useAnimationFrame((t) => {
    if (!enabled || shouldReduceMotion || !isMounted) return;
    time.set(t); // t is absolute time since start in ms
  });

  // Combine two sine waves for X and Y to make it feel organic, avoiding mechanical loops
  const y = useTransform(time, (t) => {
    if (!enabled || shouldReduceMotion || !isMounted) return 0;
    const tSec = t / 1000;
    const f1 = (tSec / duration) * Math.PI * 2 + phase;
    const f2 = (tSec / (duration * 1.34)) * Math.PI * 2 + phase * 1.5;
    return (Math.sin(f1) * 0.7 + Math.sin(f2) * 0.3) * amplitudeY;
  });

  const x = useTransform(time, (t) => {
    if (!enabled || shouldReduceMotion || !isMounted) return 0;
    const tSec = t / 1000;
    const f1 = (tSec / (duration * 1.17)) * Math.PI * 2 + phase * 0.8;
    const f2 = (tSec / (duration * 0.83)) * Math.PI * 2 + phase * 2.1;
    return (Math.sin(f1) * 0.6 + Math.sin(f2) * 0.4) * amplitudeX;
  });

  const rotate = useTransform(time, (t) => {
    if (!enabled || shouldReduceMotion || !isMounted) return 0;
    const tSec = t / 1000;
    const f1 = (tSec / (duration * 1.45)) * Math.PI * 2 + phase * 1.2;
    return Math.sin(f1) * rotationRange;
  });

  return { x, y, rotate };
}
