import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  /*
    API theke workout image external website-er URL hisebe ashe.
    Next/Image security reason-e automatically sob external domain
    allow kore na, tai img.magnific.com ke explicitly allow korchi.
  */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.magnific.com",
      },
    ],
  },
};

export default nextConfig;
