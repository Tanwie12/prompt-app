/** @type {import('next').NextConfig} */
const nextConfig = {
  future: { webpack5: true },

    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
            port: '',
            pathname: '/a/**',
          },
          {
            protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        
          },
        ],
      },
};

export default nextConfig;
