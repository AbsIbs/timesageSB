"use client";
import { ThemeProvider } from "next-themes";
import { NextUIProvider } from "@nextui-org/react";

export default function Provider({ children }) {
  return (
    <NextUIProvider className="flex-1">
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
      >
        {children}
      </ThemeProvider>
    </NextUIProvider>
  );
}
