import React, { ReactNode } from 'react';
import { motion, useTransform, useMotionValue, useAnimationFrame, useReducedMotion } from 'framer-motion';
import { PHYSICS_CONSTANTS } from '../../../lib/physics/constants';

interface BreathingScaleProps {
  children: ReactNode;
  minScale?: number;
  maxScale?: number;
  duration?: number;
  phase?: number;
  enabled?: boolean;
  className?: string;
}

export function BreathingScale({
  children,
  minScale = PHYSICS_CONSTANTS.FLOATING.SCALE.MIN,
  maxScale = PHYSICS_CONSTANTS.FLOATING.SCALE.MAX,
  duration = PHYSICS_CONSTANTS.FLOATING.FREQUENCIES.DEFAULT,
  phase = 0,
  enabled = true,
  className = '',
}: BreathingScaleProps) {
  const shouldReduceMotion = useReducedMotion();
  const time = useMotionValue(0);

  useAnimationFrame((t) => {
    if (!enabled || shouldReduceMotion) return;
    time.set(t);
  });

  const scale = useTransform(time, (t) => {
    if (!enabled || shouldReduceMotion) return 1;
    const tSec = t / 1000;
    const progress = (tSec / duration) * Math.PI * 2 + phase;
    // Map sine [-1, 1] to [minScale, maxScale]
    const normalizedSin = (Math.sin(progress) + 1) / 2;
    return minScale + normalizedSin * (maxScale - minScale);
  });

  return (
    <motion.div style={{ scale }} className={className}>
      {children}
    </motion.div>
  );
}
