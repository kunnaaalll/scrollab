import type { Variants } from "framer-motion";
import { durations, easings, springs } from "./transitions";

export const fadeUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.slow, ease: easings.easeOut },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: { duration: durations.fast, ease: easings.easeOut },
  },
};

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: durations.normal, ease: easings.easeOut },
  },
  exit: {
    opacity: 0,
    transition: { duration: durations.fast, ease: easings.easeOut },
  },
};

export const fadeLeft: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: durations.slow, ease: easings.easeOut },
  },
  exit: {
    opacity: 0,
    x: 10,
    transition: { duration: durations.fast, ease: easings.easeOut },
  },
};

export const fadeRight: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: durations.slow, ease: easings.easeOut },
  },
  exit: {
    opacity: 0,
    x: -10,
    transition: { duration: durations.fast, ease: easings.easeOut },
  },
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: springs.default,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: durations.fast, ease: easings.easeOut },
  },
};

export const heroReveal: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.verySlow, ease: easings.easeOut },
  },
};

export const staggerContainer: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.slow, ease: easings.easeOut },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: { duration: durations.fast, ease: easings.easeOut },
  },
};

export const hoverCard: Variants = {
  initial: { y: 0, scale: 1 },
  hover: {
    y: -2,
    scale: 1.01,
    transition: { duration: durations.fast, ease: easings.easeOut },
  },
  tap: {
    scale: 0.98,
    transition: { duration: durations.fast, ease: easings.easeOut },
  },
};

export const hoverButton: Variants = {
  initial: { y: 0, scale: 1 },
  hover: {
    y: -1,
    scale: 1.02,
    transition: { duration: durations.fast, ease: easings.easeOut },
  },
  tap: {
    scale: 0.98,
    transition: { duration: durations.fast, ease: easings.easeOut },
  },
};

export const navbarReveal: Variants = {
  initial: { y: "-100%", opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: durations.slow, ease: easings.easeOut },
  },
  exit: {
    y: "-100%",
    opacity: 0,
    transition: { duration: durations.normal, ease: easings.easeOut },
  },
};

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.normal, ease: easings.easeOut },
  },
  exit: {
    opacity: 0,
    transition: { duration: durations.fast, ease: easings.easeOut },
  },
};
