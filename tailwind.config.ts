import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Palette matched to esp.ethereum.foundation.
        accent: "#ff4d15",
        indigo: { brand: "#232264" },
        cream: "#fff8ec",
        // Coverage status palette - neutral, legible on a light background.
        covered: "#2f855a",
        partial: "#b7791f",
        notyet: "#8a8a99",
      },
      fontFamily: {
        sans: ["var(--font-franklin)", "Libre Franklin", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
