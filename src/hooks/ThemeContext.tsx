"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setThemeState] = useState<Theme>("light");

    // ---- Load theme on mount (localStorage → device preference) ----
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as Theme | null;

        if (savedTheme) {
            applyTheme(savedTheme);
        } else {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            applyTheme(prefersDark ? "dark" : "light");
        }

        // ---- Detect system theme change in real time ----
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const systemThemeListener = (event: MediaQueryListEvent) => {
            const newTheme = event.matches ? "dark" : "light";
            const saved = localStorage.getItem("theme");

            // Only auto-switch if user has not explicitly chosen a theme
            if (!saved) applyTheme(newTheme);
        };

        mediaQuery.addEventListener("change", systemThemeListener);

        return () => {
            mediaQuery.removeEventListener("change", systemThemeListener);
        };
    }, []);

    // Apply theme helper
    const applyTheme = (newTheme: Theme) => {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(newTheme);

        setThemeState(newTheme);
    };

    // User-selected theme → override system
    const setTheme = (newTheme: Theme) => {
        applyTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    // Toggle theme
    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
    return ctx;
};
