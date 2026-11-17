import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Images are served through a custom loader (lib/images.ts) that asks
    // Unsplash's CDN for the exact width needed; the patterns below also
    // allow the built-in optimiser should the loader ever be swapped out.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
    formats: ["image/avif", "image/webp"],
    // Photo.tsx requests quality 72; Next 16 only allows listed values.
    qualities: [72, 75],
  },
};

export default nextConfig;
