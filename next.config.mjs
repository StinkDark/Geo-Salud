/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // Activa la nueva estructura de directorios "app"
  },
  env: {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  },
};

export default nextConfig; // Si usas ESM (mjs) 
// module.exports = nextConfig; // Si usas CommonJS (js)
