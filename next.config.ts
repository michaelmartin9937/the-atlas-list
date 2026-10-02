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
      // The men's ticket page was rebuilt as the private, post-approval
      // preview (Oct 2026). Temporary so the old address can be reused.
      { source: "/desert-after-dark/tickets", destination: "/private/desert-after-dark-1010", permanent: false },
    ];
  },
};

export default config;
