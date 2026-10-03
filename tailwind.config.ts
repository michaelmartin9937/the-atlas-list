import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Editorial palette — Figma "Altas List Desert After Dark" (Oct 2026):
        // cream pages, near-black bands, one coral accent, mono eyebrows.
        cream: "#F5F1EA", // page background
        night: "#0C0A0A", // dark bands, footer, forms
        coral: "#E87A5C", // numerals, progress bars, primary buttons on dark
        brass: "#AE8A4C", // gold eyebrows inside the dark apply sections
        hairline: "#CDC7C1", // rules and card borders on cream
        "hairline-dark": "#35322F", // rules and card borders on night
        blush: "#E5DDDB", // secondary tier cards (Partner)
        // Base palette — values from the Figma "Atlas List — Site" redesign.
        noir: "#0E0C0A", // dark surfaces, primary buttons
        umber: "#231F1B", // About / Partner hero band
        bone: "#F2EBDB", // cream: text on dark, light button fill
        pearl: "#F8F6F1", // page background
        ink: "#241F17", // body text on light
        ember: "#BD5A21", // legal-page tabs, hover accent
        gold: "#C59C55", // eyebrows, footer headings, gold buttons (Diana's Sep 2026 revision)
        sand: "#D0BF9E", // hairline rules
        taupe: "#A89684",
        bronze: "#A8884F",
        // "Velvet Sunset" — the Desert After Dark event palette (Figma:
        // "Desert After Dark — Full Page"). Used only on /desert-after-dark.
        velvet: "#0D0D0D", // page background
        "velvet-deep": "#110C10", // velvet with a plum cast
        "velvet-card": "#141112", // carousel card surface
        "velvet-line": "#2C2822", // hairlines and field rules on velvet
        "velvet-text": "#BDB7AE", // body copy on velvet
        plum: "#54223D", // card borders (burgundy at rest on velvet)
        orchid: "#6E2D5C", // Instagram chip borders ("Dusk Orchid")
        sunset: "#E07D4A", // hero date eyebrow ("Ember Glow")
        burgundy: "#A43E78",
        rosewood: "#A39380",
        terracotta: "#D48155",
        rosegold: "#E28062",
        champagne: "#D29147",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        // Tracked eyebrows, labels and buttons ("01 — HOW WE GATHER").
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        // Condensed card titles ("WEEKLY", "THE RUNWAY", "FULL BAR, ALL NIGHT").
        condensed: ["var(--font-condensed)", "Impact", "sans-serif"],
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
