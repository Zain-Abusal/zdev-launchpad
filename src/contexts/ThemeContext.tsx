import React, { createContext, useContext, useEffect, useState } from 'react';
import { env } from '@/lib/env';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // initialize from localStorage, then system, then default env
    try {
      const stored = localStorage.getItem('theme') as Theme | null;
      if (stored) return stored;
    } catch (e) {}
    if (typeof window !== 'undefined' && window.matchMedia) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) return 'dark';
    }
    return (env.defaultTheme as Theme) || 'light';
  });

  useEffect(() => {
    // apply initial theme class
    document.documentElement.classList.toggle('dark', theme === 'dark');

    // listen for system changes only if user hasn't chosen a theme
    let mq: MediaQueryList | null = null;
    try {
      if (typeof window !== 'undefined' && window.matchMedia) {
        mq = window.matchMedia('(prefers-color-scheme: dark)');
        const onChange = (e: MediaQueryListEvent) => {
          try {
            const stored = localStorage.getItem('theme');
            if (stored) return; // user override, don't follow system
          } catch (e) {}
          setTheme(e.matches ? 'dark' : 'light');
        };
        // Modern API
        if ((mq as any).addEventListener) {
          (mq as any).addEventListener('change', onChange);
        } else {
          (mq as any).addListener(onChange);
        }
      }
    } catch (e) {
      // ignore
    }

    return () => {
      try {
        if (mq) {
          if ((mq as any).removeEventListener) {
            (mq as any).removeEventListener('change', () => {});
          } else {
            (mq as any).removeListener(() => {});
          }
        }
      } catch (e) {}
    };
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    try {
      localStorage.setItem('theme', newTheme);
    } catch (e) {}
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
