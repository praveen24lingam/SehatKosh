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
<<<<<<< HEAD
    },
  },
=======
    }
  }
>>>>>>> 8d2d8951c19ab2e8168f26f39e8d2da0b6bb60a5
}

module.exports = withPWA(nextConfig)
