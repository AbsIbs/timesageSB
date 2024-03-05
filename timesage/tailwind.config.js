const { nextui } = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          layout: {},
          colors: {
            background: "#F4F5FA",
            primary: "#99d",
            surface: "#ffffff",
            secondary: "#03DAC6",
            tertiary: "#885217",
            fourth: "#26D0FF",
            fifth: "#5078F9",
            text70: "#090909",
            "on-surface": "#000000",
            "on-primary": "#000000",
            line: "#DDD",
            "input-background": "#f4f5fa",
            card: "#fff"
          },
        },
        dark: {
          layout: {},
          colors: {
            background: "#1F1E25",
            primary: "#547EFE",
            surface: "#0C0B10",
            secondary: "#03DAC6",
            tertiary: "#885217",
            fourth: "#26D0FF",
            fifth: "#5078F9",
            text70: "#BBBBBB",
            "on-surface": "#fff",
            "on-primary": "#000",
            line: "#333",
            "input-background": "#121212",
            card: "#151419",
          },
        },
      },
    }),
  ],
};
