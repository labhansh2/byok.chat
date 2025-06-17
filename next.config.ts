import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TODO : remove this once we have a proper error handling
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
