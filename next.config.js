/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'drive.google.com',
      'images.unsplash.com',
      'user-images.githubusercontent.com',
    ],
  },
};

module.exports = nextConfig;
