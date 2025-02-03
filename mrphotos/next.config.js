// module.exports = {
//     images: {
//       domains: ['127.0.0.1', 'localhost', 'admin.mr-photos.com'],  // Add your local API's domain here
//     },
//     env: {
//       ImagebaseUrl:'https://admin.mr-photos.com/',
//       baseUrl:'https://admin.mr-photos.com/api'
//     }
//   };

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


