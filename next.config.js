const { parsed: myEnv } = require("dotenv").config();

const nextConfig = {
  env: myEnv,
  images: {
  
    domains: ["whalter.serveirc.com", "api.bytebushido.tech"],
    loader: 'default', 
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
