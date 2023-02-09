/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'ru', 'ro'],
    defaultLocale: 'en',
    localeDetection: true,
  },
  images: {
//      minimumCacheTTL: 31536000
    },  
}

module.exports = nextConfig
