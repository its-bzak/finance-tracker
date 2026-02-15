'use client';

import { useState, useEffect } from 'react';
import { getCurrentTheme, setTheme, toggleTheme as toggleThemeUtil, type Theme } from '@/lib/theme';

/**
 * Hook to access and manage theme state
 */
export function useTheme() {
  const [theme, setCurrentTheme] = useState<Theme | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Get initial theme
    const currentTheme = getCurrentTheme();
    setCurrentTheme(currentTheme);
    setIsMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = toggleThemeUtil();
    setCurrentTheme(newTheme);
  };

  const setThemeManually = (newTheme: Theme) => {
    setTheme(newTheme);
    setCurrentTheme(newTheme);
  };

  return {
    theme,
    isMounted,
    toggleTheme,
    setTheme: setThemeManually,
  };
}
