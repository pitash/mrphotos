
const nextConfig = {
  output: 'export',
  images: {
    domains: ['admin.mr-photos.com'],
    unoptimized: true,
  },
  env: {
    ImagebaseUrl: 'https://admin.mr-photos.com',
    baseUrl: 'https://admin.mr-photos.com/api',
  },
};

module.exports = nextConfig;



