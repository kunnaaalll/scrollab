import React, { ReactNode, useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { useOrbit } from '../../../hooks/useOrbit';
import { OrbitGroupContext } from './OrbitGroup';

interface OrbitObjectProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  radius?: number;
  radiusX?: number;
  radiusY?: number;
  duration?: number;
  phase?: number;
  direction?: 1 | -1;
  enabled?: boolean;
}

export function OrbitObject({
  children,
  radius = 150,
  radiusX,
  radiusY,
  duration = 30,
  phase = 0,
  direction = 1,
  enabled = true,
  style,
  className = '',
  ...props
}: OrbitObjectProps) {
  const group = React.useContext(OrbitGroupContext);
  const [groupOffsets] = useState(() => group ? group.register() : { phase: 0 });

  const finalPhase = phase + groupOffsets.phase;

  const { x, y } = useOrbit({
    radius,
    radiusX,
    radiusY,
    duration,
    phase: finalPhase,
    direction,
    enabled,
  });

  return (
    <motion.div
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto ${className}`}
      style={{
        ...style,
        x,
        y,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
