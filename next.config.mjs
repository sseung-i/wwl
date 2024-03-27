/** @type {import('next').NextConfig} */

const nextConfig = {
  sassOptions: {
    includePaths: ["styles"],
    prependData: `@import "styles/variables.scss"; @import "styles/mixin.scss";`, // prependData 옵션 추가
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
};

export default nextConfig;
