import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: false,
  cacheMaxMemorySize: 0,
  images: {
    domains: ["res.cloudinary.com"],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
