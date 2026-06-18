/**
 * Scrollab Design Tokens
 * 
 * Source of truth for styling values used across the application.
 * Values align with styles/globals.css and the Scrollab design system.
 */

export const COLORS = {
  primary: '#EC4899', // Pink
  secondary: '#F472B6', // Light Pink
  accent: '#06B6D4', // Cyan
  
  background: '#0A0A0A', // Deep Onyx
  surface: '#141414', // Dark Gray
  surfaceElevated: '#1A1A1A', // For popovers/modals
  
  border: '#27272A', // Subtle Gray
  
  textHigh: '#FAFAFA', // Pure White
  textMuted: '#A1A1AA', // Ash Gray
  
  success: '#10B981', // Emerald
  warning: '#F59E0B', // Amber
  error: '#F43F5E', // Rose
  info: '#3B82F6', // Blue
} as const;

export const TYPOGRAPHY = {
  fonts: {
    heading: "'Space Grotesk', sans-serif",
    body: "'DM Sans', sans-serif",
  },
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  }
} as const;

export const SPACING = {
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
  32: '128px',
} as const;

export const RADII = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
} as const;

export const SHADOWS = {
  sm: '0 1px 2px rgba(0,0,0,0.4)',
  md: '0 4px 6px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
  lg: '0 10px 25px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
  xl: '0 20px 25px -5px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
  glow: '0 0 20px rgba(6,182,212,0.15)',
} as const;

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const CONTAINERS = {
  large: '1440px',
  standard: '1280px',
  content: '800px',
} as const;

export const GRID = {
  columns: 12,
  gutterDesktop: '24px',
  gutterMobile: '16px',
} as const;

export const MOTION = {
  easing: {
    standard: [0.4, 0, 0.2, 1], // cubic-bezier(0.4, 0, 0.2, 1)
    snappy: [0.16, 1, 0.3, 1], // cubic-bezier(0.16, 1, 0.3, 1)
  },
  durations: {
    fast: 150,
    standard: 200,
    page: 300,
    slow: 400,
  }
} as const;
