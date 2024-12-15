/** @type {import('next').NextConfig} */
import { defineConfig } from "next/config";

const nextConfig = defineConfig({
  experimental: {
    appDir: true,
  },
  env: {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  }
});

export default nextConfig;