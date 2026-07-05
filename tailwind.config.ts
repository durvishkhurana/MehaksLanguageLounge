import type { Config } from "tailwindcss";

// Design tokens ported from the original prototype. Use them as Tailwind
// utilities (e.g. text-green, bg-paper-warm) or via CSS variables in globals.css.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F3E4C9",
        "paper-warm": "#D3D4C0",
        "paper-deep": "#C7C9B4",
        ink: "#0A2947",
        "ink-soft": "#24405C",
        green: "#0A2947",
        "green-deep": "#061C33",
        "green-soft": "#E9E9DC",
        marigold: "#8B5E3C",
        "marigold-d": "#6F4A2E",
        teal: "#6B7355",
        muted: "#6A7364",
        line: "#D3D4C0",
        card: "#FFFBF0",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        accent: ["var(--font-newsreader)", "Georgia", "serif"],
      },
      maxWidth: {
        wrap: "1140px",
      },
    },
  },
  plugins: [],
};

export default config;
