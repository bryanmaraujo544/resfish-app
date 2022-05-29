/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'drive.google.com',
      'images.unsplash.com',
      'user-images.githubusercontent.com',
      'wallpaperaccess.com',
      'http2.mlstatic.com',
    ],
  },
};

module.exports = nextConfig;
