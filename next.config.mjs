/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
// const nextConfig = {
//   output: "export",
//   distDir: "dist",
//   // basePath: isProd ? "/nextjs-blog-deployment" : "",
// };
// next.config.mjs
const nextConfig = {
  output: "export",
  distDir: "dist",

  images: {
    loader: "custom",
    loaderFile: "./image-loader.js",
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
