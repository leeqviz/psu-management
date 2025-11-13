import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  /* webpack: (config) => {
    // This tells Webpack to treat this module as an empty object
    // when it tries to bundle it.
    config.resolve.alias = {
      ...config.resolve.alias,
      "@yaacovcr/transform": false,
    };
    

    return config;
  }, */
};

export default nextConfig;
