const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Any other next config options here
  experimental: {
    turbopack: {
      root: __dirname,
    }
  }
}

module.exports = withPWA(nextConfig)
