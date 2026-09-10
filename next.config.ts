import type { NextConfig } from "next";
import path from "node:path";

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  outputFileTracingRoot: path.join(__dirname),
  async redirects() {
    return [
      // Event-name alias for the October 10 landing page. The canonical
      // route stays /fashion-show so existing links and the share card's
      // printed URL keep working.
      { source: "/desert-after-dark", destination: "/fashion-show", permanent: true },
    ];
  },
};

export default config;
