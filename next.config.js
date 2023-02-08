/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['default', 'en', 'ru', 'ro'],
    defaultLocale: 'default',
    localeDetection: false,
  },
  images: {
 //     minimumCacheTTL: 31536000
    },  
}

module.exports = nextConfig
