/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Content negotiation: Next serves whichever of these a browser supports,
    // smallest/most-efficient first. Works alongside the pre-generated
    // .avif/.webp files from `npm run optimize-images` — this covers
    // on-the-fly resizing for every breakpoint, the pipeline covers the
    // base optimized source and any statically-served/OG use of the file.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [375, 425, 640, 768, 1024, 1280, 1440, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

module.exports = nextConfig;
