import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "standalone",

  // IMPORTANT: Prevent OpenNext from relying on Cloudflare Images runtime modules.
  // This avoids: "No such module cloudflare/images.js"
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
