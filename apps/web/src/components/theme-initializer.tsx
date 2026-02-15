'use client';

import { useEffect } from 'react';
import { initializeTheme } from '@/lib/theme';

/**
 * Client-side theme initializer
 * Ensures the correct theme is applied on app load
 */
export function ThemeInitializer() {
  useEffect(() => {
    initializeTheme();
  }, []);

  return null;
}
