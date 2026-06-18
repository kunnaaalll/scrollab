import type { Transition } from "framer-motion";

export const durations = {
  instant: 0,
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  verySlow: 0.8,
};

export const easings = {
  easeOut: [0.16, 1, 0.3, 1] as const,
  easeInOut: [0.65, 0, 0.35, 1] as const,
  anticipate: [0.36, 0, 0.66, -0.56] as const,
};

export const springs = {
  default: { type: "spring", stiffness: 400, damping: 30 } as Transition,
  bouncy: { type: "spring", stiffness: 300, damping: 20 } as Transition,
};
