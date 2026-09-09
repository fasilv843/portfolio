"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type ThemeName = "peacock" | "violet" | "cyan";

type ThemeContextValue = {
  currentTheme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

/**
 * Cyan is hardcoded as the only theme for now.
 *
 * The persisted value is deliberately NOT read: a stale localStorage entry from
 * when the theme selector was live is what made the site render violet. To bring
 * theme switching back later, restore the localStorage read/write below and
 * render <ThemeSelector /> somewhere in the Navbar.
 */
const DEFAULT_THEME: ThemeName = "cyan";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>(DEFAULT_THEME);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, [currentTheme]);

  const setTheme = useCallback(
    (theme: ThemeName) => setCurrentTheme(theme),
    [],
  );
  const toggleTheme = useCallback(() => {
    setCurrentTheme((prev) =>
      prev === "cyan" ? "peacock" : prev === "peacock" ? "violet" : "cyan",
    );
  }, []);

  const value = useMemo(
    () => ({ currentTheme, setTheme, toggleTheme }),
    [currentTheme, setTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
