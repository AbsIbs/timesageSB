"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

// Icons
import {
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from "@mui/icons-material";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className={`flex gap-2 p-2 rounded-full hover:scale-110 active:scale-100 duration-200 border-line border-2`}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme == "light" ? (
        <DarkModeIcon sx={{ color: "#121212" }} />
      ) : (
        <LightModeIcon sx={{ color: "white" }} />
      )}
    </button>
  );
};
