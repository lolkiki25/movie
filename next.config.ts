import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["upload.wikimedia.org", "image.tmdb.org"], // TMDB-г нэмэв
  },
};

export default nextConfig;