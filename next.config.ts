import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" && {
      exclude: ["error", "warn"],
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },

  logging: { fetches: { fullUrl: true } },

  typedRoutes: true,
};

export default nextConfig;
