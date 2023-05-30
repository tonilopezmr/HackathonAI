/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
  images: {
    domains: [
      'images.unsplash.com',       
      "tailwind.com"
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'        
      },
      {
        protocol: 'https',
        hostname: 'tailwind.com'        
      }
    ],
  }
}

module.exports = nextConfig
