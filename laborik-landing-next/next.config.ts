/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    // Opcional, solo si querés especificar el root correctamente
    root: './',
  },
};

export default nextConfig;
