import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
};

module.exports = nextConfig;
