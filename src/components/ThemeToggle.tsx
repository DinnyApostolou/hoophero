"use client";
import { useTheme } from "@/lib/theme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle light/dark mode"
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        border: "2px solid #FF6B00",
        background: "var(--bg2)",
        color: "var(--text)",
        fontSize: "22px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
        transition: "background 0.2s ease, color 0.2s ease",
      }}
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}
