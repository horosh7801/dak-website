/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['default', 'en', 'ru'],
    defaultLocale: 'default',
    localeDetection: false,
  }
}

module.exports = nextConfig
