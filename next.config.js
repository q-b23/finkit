/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/blog/snowball-vs-avalanche",
        destination: "/debt-avalanche-vs-snowball",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
