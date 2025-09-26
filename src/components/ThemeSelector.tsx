"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeSelector() {
  const { currentTheme, setTheme } = useTheme();

  return (
    <div className="inline-flex items-center gap-2">
      <button
        onClick={() => setTheme("peacock")}
        className={`h-8 w-8 rounded-full border ${
          currentTheme === "peacock" ? "ring-2 ring-[var(--primary)]" : ""
        }`}
        style={{
          background: "linear-gradient(135deg, #0f766e, #115e59)",
          borderColor: "#1f8a80",
        }}
        aria-label="Use Peacock theme"
        title="Peacock (green)"
      />
      <button
        onClick={() => setTheme("violet")}
        className={`h-8 w-8 rounded-full border ${
          currentTheme === "violet" ? "ring-2 ring-[var(--primary)]" : ""
        }`}
        style={{
          background: "linear-gradient(135deg, #6d28d9, #5b21b6)",
          borderColor: "#7c3aed",
        }}
        aria-label="Use Violet theme"
        title="Violet (purple)"
      />
    </div>
  );
}


