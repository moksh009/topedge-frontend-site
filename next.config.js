/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['topedgeai.com', 'i.vimeocdn.com', 'player.vimeo.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
  },
  // Enable compression
  compress: true,
  // Enable SWC minification for improved performance
  swcMinify: true,
  // Configure headers for security and caching
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' player.vimeo.com *.vimeocdn.com https://*.daily.co https://*.firebaseapp.com https://*.googleapis.com https://*.sentry.io; frame-src 'self' player.vimeo.com https://*.daily.co https://*.firebaseapp.com; img-src 'self' data: *.vimeocdn.com https://*.wikimedia.org https://*.licdn.com https://*.shutterstock.com https://*.vapi.ai; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; connect-src 'self' player.vimeo.com *.vimeocdn.com https://*.daily.co https://*.firebaseapp.com https://*.googleapis.com https://*.sentry.io https://*.vapi.ai https://api.vapi.ai wss://*.daily.co https://topedge-backend.netlify.app"
          }
        ]
      },
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  },
  // Configure redirects for common patterns
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/blog/:slug',
        destination: '/posts/:slug',
        permanent: true,
      }
    ]
  }
}

module.exports = nextConfig 