import { join } from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    turbopack: {
      root: join(__dirname), // Usa la ruta absoluta correcta
    },
    outputFileTracingRoot: join(__dirname), // Hace que coincidan ambos
  },
};

export default nextConfig;
