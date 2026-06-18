'use client';

import { Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';

interface ProcessTooltipProps {
  visible: boolean;
  title: string;
  description: string;
  number: string;
}

export function ProcessTooltip({ visible, title, description, number }: ProcessTooltipProps) {
  return (
    <Html
      position={[0, 1.5, 0]}
      center
      zIndexRange={[100, 0]}
      style={{
        pointerEvents: 'none',
        transition: 'all 0.3s',
        opacity: visible ? 1 : 0,
        transform: `scale(${visible ? 1 : 0.95})`,
      }}
    >
      <div className="flex flex-col items-center justify-center w-64 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
        <span className="absolute -top-6 -right-4 text-8xl font-bold text-white/5 select-none font-space-grotesk z-0">
          {number}
        </span>
        <div className="relative z-10 flex flex-col items-center text-center gap-2">
          <h3 className="text-xl font-bold text-white tracking-wider font-space-grotesk uppercase">
            {title}
          </h3>
          <p className="text-sm text-pink-100/80 leading-relaxed font-dm-sans">
            {description}
          </p>
        </div>
      </div>
    </Html>
  );
}
