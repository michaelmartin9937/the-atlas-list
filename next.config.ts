import type { NextConfig } from "next";
import path from "node:path";

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  outputFileTracingRoot: path.join(__dirname),
  async redirects() {
    return [
      // The October 10 event page moved from /fashion-show to
      // /desert-after-dark (its name). Keep the old address working.
      { source: "/fashion-show", destination: "/desert-after-dark", permanent: true },
    ];
  },
};

export default config;
