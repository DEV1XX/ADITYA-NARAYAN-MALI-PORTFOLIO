// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // experimental: {
//   //   appDir: true,
//   // },
//   images: {
//     domains: ["images.unsplash.com"],
//   },
//   eslint: {
//     ignoreDuringBuilds: true, // ✅ This disables ESLint errors during Vercel builds
//   },
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // keep strict mode for React
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**", // allow all paths from this host
      },
    ],
  },
  // remove eslint from here — configure separately in .eslintrc.js
};

export default nextConfig;