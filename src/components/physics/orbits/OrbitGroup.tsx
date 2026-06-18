import React, { ReactNode } from 'react';

export const OrbitGroupContext = React.createContext<{
  register: () => { phase: number };
} | null>(null);

interface OrbitGroupProps {
  children: ReactNode;
  centerNode?: ReactNode;
  className?: string;
  phaseOffset?: number; // Phase spacing between orbiting objects
}

export function OrbitGroup({ 
  children, 
  centerNode, 
  className = '',
  phaseOffset = Math.PI / 2, // Default 90 degrees offset
}: OrbitGroupProps) {
  const countRef = React.useRef(0);

  const register = React.useCallback(() => {
    const count = countRef.current++;
    return {
      phase: count * phaseOffset,
    };
  }, [phaseOffset]);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {centerNode && <div className="z-10 relative">{centerNode}</div>}
      <div className="absolute inset-0 pointer-events-none">
        <OrbitGroupContext.Provider value={{ register }}>
          {children}
        </OrbitGroupContext.Provider>
      </div>
    </div>
  );
}
