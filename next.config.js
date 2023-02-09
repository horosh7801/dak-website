/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'ru', 'ro'],
    defaultLocale: 'en',
    localeDetection: true,
  },
  images: {
    minimumCacheTTL: 31536000

    },  
  async redirects() {
      return [
        {
          source: '/admin',
          destination: 'http://45.93.138.174:1337/admin',
          permanent: true,
        },
      ]
    }, 
}

module.exports = nextConfig
