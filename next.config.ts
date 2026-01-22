import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // keep your compiler
  reactCompiler: true,

  // ✅ REQUIRED for OpenNext on Cloudflare Workers
  output: "standalone",

  // optional but safe
  poweredByHeader: false,
};

export default nextConfig;
