/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'ru', 'ro'],
    defaultLocale: 'en',
  }
}

module.exports = nextConfig
