import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile Sanity packages for better compatibility
  transpilePackages: ['sanity', '@sanity/vision', 'next-sanity'],
};

export default nextConfig;
