import React, { ReactNode, useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { useFloating } from '../../../hooks/useFloating';
import { FloatingGroupContext } from './FloatingGroup';
import { PHYSICS_CONSTANTS } from '../../../lib/physics/constants';

interface FloatingObjectProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  amplitudeY?: number;
  amplitudeX?: number;
  duration?: number;
  phase?: number;
  rotationRange?: number;
  enabled?: boolean;
}

export function FloatingObject({
  children,
  amplitudeY = PHYSICS_CONSTANTS.FLOATING.AMPLITUDES.DEFAULT,
  amplitudeX = PHYSICS_CONSTANTS.FLOATING.AMPLITUDES.SUBTLE,
  duration = PHYSICS_CONSTANTS.FLOATING.FREQUENCIES.DEFAULT,
  phase = 0,
  rotationRange = PHYSICS_CONSTANTS.FLOATING.ROTATION.DEFAULT,
  enabled = true,
  style,
  ...props
}: FloatingObjectProps) {
  const group = React.useContext(FloatingGroupContext);
  
  // Get offset values only once on mount
  const [groupOffsets] = useState(() => group ? group.register() : { phase: 0, durationModifier: 1 });

  const finalPhase = phase + groupOffsets.phase;
  const finalDuration = duration * groupOffsets.durationModifier;

  const { x, y, rotate } = useFloating({
    amplitudeY,
    amplitudeX,
    duration: finalDuration,
    phase: finalPhase,
    rotationRange,
    enabled,
  });

  return (
    <motion.div
      style={{
        ...style,
        x,
        y,
        rotate,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
