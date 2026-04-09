import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "3826222.fs1.hubspotusercontent-na1.net",
      },
    ],
  },
};

export default nextConfig;