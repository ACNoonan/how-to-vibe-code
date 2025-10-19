import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.js',
  latex: true,
  search: {
    codeblocks: false
  }
})

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
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/index.html',
        permanent: false,
      },
    ]
  },
}

export default withNextra(nextConfig)
