import React, { ReactNode } from 'react';
import { FloatingObject } from './FloatingObject';
import { FloatingGroup } from './FloatingGroup';

export interface FloatingFieldItem {
  id: string | number;
  content: ReactNode;
  x: number; // percentage (0-100) or pixel depending on usage, default assume % for responsiveness
  y: number; // percentage (0-100)
}

interface FloatingFieldProps {
  items: FloatingFieldItem[];
  className?: string;
  baseDuration?: number;
  phaseOffset?: number;
}

export function FloatingField({ 
  items, 
  className = '',
  baseDuration = 25,
  phaseOffset = 1.37
}: FloatingFieldProps) {
  return (
    <div className={`relative w-full h-full pointer-events-none ${className}`}>
      <FloatingGroup baseDuration={baseDuration} phaseOffset={phaseOffset}>
        {items.map((item) => (
          <div 
            key={item.id} 
            className="absolute pointer-events-auto"
            style={{ 
              left: `${item.x}%`, 
              top: `${item.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <FloatingObject>
              {item.content}
            </FloatingObject>
          </div>
        ))}
      </FloatingGroup>
    </div>
  );
}
