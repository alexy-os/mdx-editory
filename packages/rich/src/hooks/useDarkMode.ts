import { useState, useEffect, useCallback } from 'react';

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      if (saved !== null) {
        return JSON.parse(saved);
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
      
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [isDarkMode]);

  const toggle = useCallback(() => {
    setIsDarkMode((prev: boolean) => !prev);
  }, []);

  const enable = useCallback(() => {
    setIsDarkMode(true);
  }, []);

  const disable = useCallback(() => {
    setIsDarkMode(false);
  }, []);

  return {
    isDarkMode,
    toggle,
    enable,
    disable
  };
} 