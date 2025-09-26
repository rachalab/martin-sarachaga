/* import BuilderDevTools from "@builder.io/dev-tools/next";

@type {import('next').NextConfig}
const nextConfig = BuilderDevTools()({});

export default nextConfig;
 */

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'martinsarachaga.com',
        port: '',
        search: '',
      },
    ],
  },
}