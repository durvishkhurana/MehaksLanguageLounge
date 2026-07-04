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
        paper: "#FCFAF4",
        "paper-warm": "#F4EBDC",
        "paper-deep": "#ECE0CC",
        ink: "#182420",
        "ink-soft": "#33433D",
        green: "#2E6A56",
        "green-deep": "#1E4A3D",
        "green-soft": "#E7F1EB",
        marigold: "#E8A02E",
        "marigold-d": "#C67C14",
        teal: "#2C7A72",
        muted: "#67796F",
        line: "#DED4C2",
        card: "#FFFFFF",
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
