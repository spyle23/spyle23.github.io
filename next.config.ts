import type { NextConfig } from "next";

// Set by the GitHub Pages workflow (e.g. "/portfolio" for a project site, "" for spyle23.github.io)
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  // Two root layouts (FR at "/", EN at "/en/") need a standalone 404 page
  experimental: { globalNotFound: true },
};

export default nextConfig;
