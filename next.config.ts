import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    unoptimized: process.env.NODE_ENV === "development",
  },
  // MOVE IT HERE (Top level, not inside experimental)
  // @ts-ignore - Ignore the type error if VS Code complains; the terminal requested this.
  allowedDevOrigins: ["192.168.1.52", "localhost:3000"],
};

export default withNextIntl(nextConfig);