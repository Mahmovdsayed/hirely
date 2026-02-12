import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: false,
  cacheMaxMemorySize: 0,
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
