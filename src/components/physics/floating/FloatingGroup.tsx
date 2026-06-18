import React, { ReactNode } from 'react';

export const FloatingGroupContext = React.createContext<{
  register: () => { phase: number; durationModifier: number };
} | null>(null);

interface FloatingGroupProps {
  children: ReactNode;
  baseDuration?: number;
  phaseOffset?: number; // Offset added to each consecutive child
}

export function FloatingGroup({
  children,
  baseDuration = 20,
  phaseOffset = Math.PI / 4,
}: FloatingGroupProps) {
  // Use a ref to keep track of how many children have registered
  const countRef = React.useRef(0);

  const register = React.useCallback(() => {
    const count = countRef.current++;
    return {
      phase: count * phaseOffset,
      // Slight variation per item to break mechanical uniformity
      durationModifier: 1 + (count % 3) * 0.1, 
    };
  }, [phaseOffset]);

  return (
    <FloatingGroupContext.Provider value={{ register }}>
      {children}
    </FloatingGroupContext.Provider>
  );
}
