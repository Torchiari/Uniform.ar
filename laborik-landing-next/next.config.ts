import { join } from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  outputFileTracingRoot: join(__dirname),

  experimental: {
    
  },
};

export default nextConfig;
