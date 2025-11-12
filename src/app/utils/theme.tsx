import React from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined
);

const STORAGE_KEY = 'theme-preference';

function getSystemTheme() {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY) as Theme | null;
      return raw ?? 'system';
    } catch {
      return 'system';
    }
  });

  const [resolvedTheme, setResolvedTheme] = React.useState<'light' | 'dark'>(
    () => (theme === 'system' ? (getSystemTheme() as 'light' | 'dark') : theme)
  );

  // Sync to system changes when theme === 'system'
  React.useEffect(() => {
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)');
    function handle() {
      const sys = getSystemTheme();
      if (theme === 'system') {
        setResolvedTheme(sys as 'light' | 'dark');
        if (sys === 'dark') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
      }
    }

    handle();
    if (!mq) return;
    if (mq.addEventListener) mq.addEventListener('change', handle);
    else mq.addListener(handle as any);

    return () => {
      if ((mq as any).removeEventListener)
        (mq as any).removeEventListener('change', handle);
      else (mq as any).removeListener(handle as any);
    };
  }, [theme]);

  // Apply theme when changed
  React.useEffect(() => {
    const apply = (t: Theme) => {
      if (t === 'system') {
        const sys = getSystemTheme();
        setResolvedTheme(sys as 'light' | 'dark');
        if (sys === 'dark') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
      } else {
        setResolvedTheme(t);
        if (t === 'dark') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
      }
    };

    apply(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const setTheme = React.useCallback((t: Theme) => setThemeState(t), []);

  const toggleTheme = React.useCallback(() => {
    setThemeState((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {}
      return next;
    });
  }, []);

  const value = React.useMemo(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    [theme, resolvedTheme, setTheme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

export default ThemeProvider;
