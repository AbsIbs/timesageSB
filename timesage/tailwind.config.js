const { nextui } = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  /*   theme: {
    extend: {
      colors: {
        background: "var(--background)",
        primary: "var(--primary)",
        surface: "var(--surface)",
        "on-surface": "var(--on-surface)",
        line: "var(--line)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  }, */
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
            "on-surface": "#000000",
            "on-primary": "#000000",
            line: "#DDD",
            "input-background": "#f4f5fa",
          },
        },
        dark: {
          layout: {},
          colors: {
            background: "#121212",
            primary: "#BB86FC",
            surface: "#1E1E1E",
            secondary: "#03DAC6",
            "on-surface": "#fff",
            "on-primary": "#000",
            line: "#333",
            "input-background": "#121212",
          },
        },
      },
    }),
  ],
};
