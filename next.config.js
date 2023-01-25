/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['default', 'en', 'ru', 'ro'],
    defaultLocale: 'default',
    localeDetection: false,
  }
}

module.exports = nextConfig
