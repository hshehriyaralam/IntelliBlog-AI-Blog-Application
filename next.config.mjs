import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
   turbopack: {},
  images: {
    remotePatterns: [
       {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "popupdomination.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "tse1.mm.bing.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "tse2.mm.bing.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "tse3.mm.bing.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "tse4.mm.bing.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "coderscoach.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "wallpaperaccess.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "content.altexsoft.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  webpack: (config) => {
    // Ensure '@' alias works in Vercel build too
    config.resolve.alias["@" ] = path.resolve(process.cwd(), "src");
    // Optional: also expose '@/app' alias explicitly (redundant but safe)
    config.resolve.alias["@/app"] = path.resolve(process.cwd(), "src/app");
    return config;
  },
};

export default nextConfig;