import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "popupdomination.com",
      "tse1.mm.bing.net",
      "tse2.mm.bing.net",
      "tse3.mm.bing.net",
      "tse4.mm.bing.net",
      "coderscoach.com",
      "wallpaperaccess.com",
      "content.altexsoft.com",
    ],
  },

  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(process.cwd(), "src");
    config.resolve.alias["@/app"] = path.resolve(process.cwd(), "src/app");
    return config;
  },
};

export default nextConfig;
