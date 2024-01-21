const { parsed: myEnv } = require("dotenv").config();

const nextConfig = {
  env: myEnv,
  images: {
    domains: ["galleryportwhalter.s3.sa-east-1.amazonaws.com"],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
