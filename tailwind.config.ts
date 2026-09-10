import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        noir: "#0E0E0E",
        bone: "#F2EBE0",
        pearl: "#FAF7F2",
        taupe: "#A89684",
        bronze: "#A8884F",
        ink: "#2A2522",
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
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
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
