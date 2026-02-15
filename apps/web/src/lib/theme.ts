// Theme management utility

export type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'finance-tracker-theme';

/**
 * Get the current theme from localStorage or system preference
 */
export function getCurrentTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';

  // Check localStorage first
  const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
  if (stored) {
    return stored;
  }

  // Check system preference
  if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }

  return 'dark'; // Default to dark
}

/**
 * Set the theme and update the DOM
 */
export function setTheme(theme: Theme): void {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;

  if (theme === 'light') {
    root.classList.add('light');
  } else {
    root.classList.remove('light');
  }

  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

/**
 * Toggle between light and dark themes
 */
export function toggleTheme(): Theme {
  const current = getCurrentTheme();
  const next = current === 'dark' ? 'light' : 'dark';
  setTheme(next);
  return next;
}

/**
 * Initialize theme on app load
 */
export function initializeTheme(): void {
  const theme = getCurrentTheme();
  setTheme(theme);
}
