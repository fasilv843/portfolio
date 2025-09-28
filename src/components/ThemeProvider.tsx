"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

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

function getInitialTheme(): ThemeName {
  if (typeof window === "undefined") return "cyan";
  const stored = window.localStorage.getItem("theme") as ThemeName | null;
  return stored === "peacock" || stored === "violet" || stored === "cyan" ? stored : "cyan";
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }>= ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", currentTheme);
    window.localStorage.setItem("theme", currentTheme);
  }, [currentTheme]);

  const setTheme = useCallback((theme: ThemeName) => setCurrentTheme(theme), []);
  const toggleTheme = useCallback(() => {
    setCurrentTheme((prev) => (prev === "cyan" ? "peacock" : prev === "peacock" ? "violet" : "cyan"));
  }, []);

  const value = useMemo(
    () => ({ currentTheme, setTheme, toggleTheme }),
    [currentTheme, setTheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};


