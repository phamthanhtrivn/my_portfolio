import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
        pathname: "/phamthanhtrivn.png",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ]
  },
};

export default nextConfig;
