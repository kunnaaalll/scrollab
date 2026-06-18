import { ThemeProviderProps } from 'next-themes';

/**
 * Theme configuration for next-themes
 * Scrollab is built natively for a modern premium dark mode.
 */
export const themeConfig: ThemeProviderProps = {
  attribute: 'class',
  defaultTheme: 'dark',
  enableSystem: false, // Force dark mode as default
  themes: ['dark'],
  disableTransitionOnChange: true,
};
