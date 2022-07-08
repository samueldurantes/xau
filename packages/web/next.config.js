/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    relay: require('./relay.config'),
  },
}

module.exports = nextConfig
