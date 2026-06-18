import { useMemo } from 'react';
import { PARALLAX_CONSTANTS } from '@/lib/parallax/constants';

export const useDepth = (depth: number) => {
  return useMemo(() => {
    // Ensure depth is strictly between 0 and 1
    const safeDepth = Math.max(0, Math.min(1, depth));
    
    // Closer objects (higher depth) react more to mouse
    const mouseMultiplier = safeDepth; 
    
    // Further objects (lower depth) have a stronger scroll parallax offset
    // Background (0.1) has high offset, Foreground (0.6+) has lower offset
    const scrollMultiplier = 1 - safeDepth; 
    
    // Calculate Z-axis push based on depth
    // 1 (Foreground) = 0px
    // 0 (Background) = MAX_Z
    const translateZ = (1 - safeDepth) * PARALLAX_CONSTANTS.PERSPECTIVE.MAX_Z;

    // Calculate optical scale to maintain apparent size when pushed back
    // Scale = (FOV - Z) / FOV
    const fov = PARALLAX_CONSTANTS.PERSPECTIVE.FOV;
    const scale = (fov - translateZ) / fov;

    return {
      safeDepth,
      mouseMultiplier,
      scrollMultiplier,
      translateZ,
      scale,
      zIndex: Math.floor(safeDepth * 100)
    };
  }, [depth]);
};
