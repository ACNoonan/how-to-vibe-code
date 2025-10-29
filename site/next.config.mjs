const isProduction = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true
  },
  // GitHub Pages configuration (only for production)
  ...(isProduction && {
    output: 'export',
    basePath: '/vibe-coding-course',
    assetPrefix: '/vibe-coding-course/',
  }),
}

export default nextConfig
