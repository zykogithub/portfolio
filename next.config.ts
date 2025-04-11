/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false, // Désactive les source maps en production
  webpack: (config: import('webpack').Configuration, { dev, isServer }: { dev: boolean; isServer: boolean }) => {
    // Désactive les source maps en développement
    if (!dev) {
      config.devtool = false;
    }
    return config;
  },
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
