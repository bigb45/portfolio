/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
    // output: "export", // this is used to build static websites
    distDir: "dist",

    trailingSlash: true,

    images: {
        loader: "custom",
        loaderFile: "./image-loader.js",
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            issuer: /\.[jt]sx?$/,
            use: ["@svgr/webpack"],
        });

        return config;
    },
};

export default nextConfig;
