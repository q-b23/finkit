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
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.getfinkit.com" }],
        destination: "https://getfinkit.com/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
