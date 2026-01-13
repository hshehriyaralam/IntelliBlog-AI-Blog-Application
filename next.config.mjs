import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    resolveAlias: {
      "@": path.resolve(process.cwd(), "src"),
      "@/app": path.resolve(process.cwd(), "src/app"),
    },
  },
};

export default nextConfig;