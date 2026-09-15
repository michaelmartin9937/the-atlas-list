import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Base palette — values from the Figma "Atlas List — Site" redesign.
        noir: "#0E0C0A", // dark surfaces, primary buttons
        bone: "#F2EBDB", // cream: text on dark, light button fill
        pearl: "#F8F6F1", // page background
        ink: "#241F17", // body text on light
        ember: "#BD5A21", // eyebrows / accent
        sand: "#D0BF9E", // hairline rules
        taupe: "#A89684",
        bronze: "#A8884F",
        // "Velvet Sunset" — the Desert After Dark event palette (sampled from
        // the brand deck). Used only on /desert-after-dark.
        velvet: "#0A0A0A",
        "velvet-deep": "#110C10", // velvet with a plum cast, for alternating sections
        burgundy: "#A43E78",
        rosewood: "#A39380",
        terracotta: "#D48155",
        rosegold: "#E28062",
        champagne: "#D79C50",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      letterSpacing: {
        widest: "0.2em",
      },
      maxWidth: {
        prose: "42rem",
      },
    },
  },
  plugins: [],
};

export default config;
